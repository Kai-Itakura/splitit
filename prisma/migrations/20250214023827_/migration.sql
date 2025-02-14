-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Group_id_seq";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "RefreshToken_id_seq";
