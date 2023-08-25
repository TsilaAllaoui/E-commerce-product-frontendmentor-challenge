/*
  Warnings:

  - You are about to drop the column `ownerId` on the `OwnedProduct` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OwnedProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OwnedProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OwnedProduct" ("count", "id", "productId", "userId") SELECT "count", "id", "productId", "userId" FROM "OwnedProduct";
DROP TABLE "OwnedProduct";
ALTER TABLE "new_OwnedProduct" RENAME TO "OwnedProduct";
CREATE UNIQUE INDEX "OwnedProduct_userId_key" ON "OwnedProduct"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
