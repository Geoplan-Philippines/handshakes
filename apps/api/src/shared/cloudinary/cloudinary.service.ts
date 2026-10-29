import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';
import 'multer';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File, folder: string = 'identitree/avatars'): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload failed: No result returned'));

          const url = result.secure_url;
          const uploadToken = '/upload/';
          const uploadIndex = url.indexOf(uploadToken);

          if (uploadIndex !== -1) {
            const before = url.substring(0, uploadIndex + uploadToken.length);
            const after = url.substring(uploadIndex + uploadToken.length);
            result.secure_url = `${before}f_auto,q_auto/${after}`;
          }

          resolve(result);
        }
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  /**
   * Uploads a non-image file (e.g. PDF brochure) as a raw resource.
   *
   * Raw delivery is not subject to Cloudinary's PDF/ZIP delivery restriction,
   * so uploaded brochures serve reliably without extra account config. The
   * original filename is preserved so the delivered URL keeps its extension
   * (and correct content type).
   */
  async uploadRaw(file: Express.Multer.File, folder: string = 'identitree/documents'): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'raw',
          use_filename: true,
          unique_filename: true,
          // Streams carry no filename, so pass the original name explicitly.
          // This keeps the extension on the delivered URL (correct content
          // type + a sensible download filename instead of "file").
          filename_override: file.originalname,
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload failed: No result returned'));
          resolve(result);
        }
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  /**
   * Extracts the public ID from a Cloudinary URL.
   * Example: https://res.cloudinary.com/demo/image/upload/v12345678/sample.jpg -> sample
   */
  extractPublicId(url: string): string | null {
    try {
      // Cloudinary URL format: https://res.cloudinary.com/:cloud_name/:resource_type/:type/v:version/:public_id.:format
      // We want the part between /v:version/ and the last dot.
      const regex = /\/v\d+\/([^.]+)\./;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      return null;
    }
  }
}
