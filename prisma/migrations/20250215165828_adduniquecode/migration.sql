/*
  Warnings:

  - A unique constraint covering the columns `[verify_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_verify_code_key" ON "User"("verify_code");
