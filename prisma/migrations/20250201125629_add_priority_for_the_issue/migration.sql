-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW';
