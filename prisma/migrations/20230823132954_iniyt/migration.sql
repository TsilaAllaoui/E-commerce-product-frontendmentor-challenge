/*
  Warnings:

  - Added the required column `ownerId` to the `OwnedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OwnedProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OwnedProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OwnedProduct" ("count", "id", "productId", "userId") SELECT "count", "id", "productId", "userId" FROM "OwnedProduct";
DROP TABLE "OwnedProduct";
ALTER TABLE "new_OwnedProduct" RENAME TO "OwnedProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
