-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);
INSERT INTO "new_Collection" ("count", "id", "productId", "userId") SELECT "count", "id", "productId", "userId" FROM "Collection";
DROP TABLE "Collection";
ALTER TABLE "new_Collection" RENAME TO "Collection";
CREATE UNIQUE INDEX "Collection_productId_userId_key" ON "Collection"("productId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
