/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collection_userId_key" ON "Collection"("userId");
