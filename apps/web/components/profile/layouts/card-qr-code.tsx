"use client";

import { useEffect, useState } from "react";
import { generateQrCodeDataUrl } from "@/lib/utils/qr-code";
import { cn } from "@/lib/utils";

type CardQrCodeProps = {
  /**
   * URL to encode. Defaults to the current public profile URL
   * (origin + pathname), so the card's QR always follows the user's own page.
   */
  url?: string;
  /** Classes for the white container (size, radius, padding, shadow). */
  className?: string;
  /** Classes for the inner QR image. */
  imgClassName?: string;
};

/**
 * Renders a real, scannable QR code for the profile. On a public profile page
 * the encoded target defaults to that profile's own URL, so the QR "follows"
 * whichever user's card is being viewed. Client-only (uses window + canvas).
 */
export function CardQrCode({ url, className, imgClassName }: CardQrCodeProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let active = true;

    const target = url ?? `${window.location.origin}${window.location.pathname}`;
    try {
      const qrUrl = new URL(target);
      qrUrl.searchParams.set("ref", "qr");
      generateQrCodeDataUrl(qrUrl.toString())
        .then((res) => {
          if (active) setSrc(res);
        })
        .catch(console.error);
    } catch (error) {
      console.error("Failed to build QR code URL", error);
    }

    return () => {
      active = false;
    };
  }, [url]);

  return (
    <div className={cn("overflow-hidden bg-white", className)}>
      {src ? (
        <img
          src={src}
          alt="Scan to view this profile"
          className={cn("h-full w-full object-contain", imgClassName)}
        />
      ) : (
        <div className="h-full w-full animate-pulse bg-white" aria-hidden="true" />
      )}
    </div>
  );
}
