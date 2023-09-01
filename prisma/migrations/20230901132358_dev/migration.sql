-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "vendor" TEXT,
    "price" REAL NOT NULL,
    "discount" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "images" TEXT NOT NULL,
    "genderType" TEXT NOT NULL DEFAULT 'man'
);
INSERT INTO "new_Product" ("createdAt", "desc", "discount", "genderType", "id", "images", "name", "price", "updatedAt", "vendor") SELECT "createdAt", "desc", "discount", "genderType", "id", "images", "name", "price", "updatedAt", "vendor" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
