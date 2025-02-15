/*
  Warnings:

  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verify_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT NOT NULL,
ADD COLUMN     "verify_code" TEXT NOT NULL,
ADD COLUMN     "verifyed" BOOLEAN NOT NULL DEFAULT false;
