-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "passCount" INTEGER NOT NULL;
ALTER TABLE "Room" ADD COLUMN     "turn" INTEGER NOT NULL;
UPDATE "Room" SET "passCount" = 0 WHERE "passCount" IS NULL;
UPDATE "Room" SET "turn" = 0 WHERE "turn" IS NULL;
