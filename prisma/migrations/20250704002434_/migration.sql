-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "sale_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin_sale" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "sale_value" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "parcel_number" INTEGER NOT NULL,
    "products_id" TEXT NOT NULL,
    "delivery_date" DATETIME NOT NULL,
    "responsible_for_installation" TEXT NOT NULL,
    "obvervations_technical" TEXT NOT NULL,
    "warranty_time" INTEGER NOT NULL,
    "status_sale" TEXT NOT NULL,
    "called_technical" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Sale_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sale_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sale_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale" ("brand_id", "called_technical", "client_id", "createdAt", "delivery_date", "id", "observations", "obvervations_technical", "origin_sale", "parcel_number", "payment_method", "products_id", "responsible_for_installation", "sale_date", "sale_value", "seller", "status_sale", "updatedAt", "warranty_time") SELECT "brand_id", "called_technical", "client_id", "createdAt", "delivery_date", "id", "observations", "obvervations_technical", "origin_sale", "parcel_number", "payment_method", "products_id", "responsible_for_installation", "sale_date", "sale_value", "seller", "status_sale", "updatedAt", "warranty_time" FROM "Sale";
DROP TABLE "Sale";
ALTER TABLE "new_Sale" RENAME TO "Sale";
CREATE UNIQUE INDEX "Sale_products_id_key" ON "Sale"("products_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
