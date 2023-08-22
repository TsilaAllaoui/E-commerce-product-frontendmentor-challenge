/*
  Warnings:

  - Added the required column `desc` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("createdAt", "id", "name", "price", "updatedAt") SELECT "createdAt", "id", "name", "price", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
