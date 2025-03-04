/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" INTEGER,
    "pricetype" TEXT,
    "pictures" TEXT[],
    "floor" INTEGER NOT NULL,
    "elevator" BOOLEAN NOT NULL,
    "room" INTEGER NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "meter" INTEGER NOT NULL,
    "balkony" BOOLEAN NOT NULL,
    "address" TEXT NOT NULL,
    "authorid" INTEGER NOT NULL,
    "categoryid" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Requestes" (
    "id" SERIAL NOT NULL,
    "authorid" INTEGER NOT NULL,
    "houseid" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "authorid" INTEGER NOT NULL,
    "houseid" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "House_id_key" ON "House"("id");

-- CreateIndex
CREATE UNIQUE INDEX "House_slug_key" ON "House"("slug");

-- CreateIndex
CREATE INDEX "House_slug_idx" ON "House"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Requestes_id_key" ON "Requestes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_id_key" ON "Favorite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_houseid_key" ON "Favorite"("houseid");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requestes" ADD CONSTRAINT "Requestes_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requestes" ADD CONSTRAINT "Requestes_houseid_fkey" FOREIGN KEY ("houseid") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_houseid_fkey" FOREIGN KEY ("houseid") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
