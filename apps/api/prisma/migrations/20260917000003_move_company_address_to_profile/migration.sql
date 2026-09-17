-- AlterTable
ALTER TABLE "organization" DROP COLUMN "company_address";

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "company_address" TEXT;
