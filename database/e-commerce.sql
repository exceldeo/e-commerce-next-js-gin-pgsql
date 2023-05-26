-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               PostgreSQL 15.3 (Debian 15.3-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.addresses
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''addresses_id_seq''::regclass)',
	"user_id" BIGINT NULL DEFAULT NULL,
	"name" TEXT NULL DEFAULT NULL,
	"province_id" BIGINT NULL DEFAULT NULL,
	"province" TEXT NULL DEFAULT NULL,
	"city_id" BIGINT NULL DEFAULT NULL,
	"city_name" TEXT NULL DEFAULT NULL,
	"address_detail" TEXT NULL DEFAULT NULL,
	"zip_code" TEXT NULL DEFAULT NULL,
	"is_default" BOOLEAN NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_users_addresses" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.addresses: -1 rows
/*!40000 ALTER TABLE "addresses" DISABLE KEYS */;
INSERT INTO "addresses" ("id", "user_id", "name", "province_id", "province", "city_id", "city_name", "address_detail", "zip_code", "is_default", "created_at", "updated_at", "deleted_at") VALUES
	(1, 1, 'excel', 2, 'Jawa Barat', 4, 'Jakarta Utara', 'asdf', '123131', 'true', '2023-05-26 01:16:14.461132+00', '2023-05-26 01:16:14.461132+00', NULL);
/*!40000 ALTER TABLE "addresses" ENABLE KEYS */;

-- Dumping structure for table public.carts
CREATE TABLE IF NOT EXISTS "carts" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''carts_id_seq''::regclass)',
	"user_id" BIGINT NULL DEFAULT NULL,
	"product_id" BIGINT NULL DEFAULT NULL,
	"qty" BIGINT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_carts_product" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "fk_users_carts" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.carts: -1 rows
/*!40000 ALTER TABLE "carts" DISABLE KEYS */;
INSERT INTO "carts" ("id", "user_id", "product_id", "qty", "created_at", "updated_at", "deleted_at") VALUES
	(3, 1, 4, 1, '2023-05-26 02:04:11.14268+00', '2023-05-26 02:04:11.14268+00', '2023-05-26 02:24:22.325577+00');
/*!40000 ALTER TABLE "carts" ENABLE KEYS */;

-- Dumping structure for table public.categories
CREATE TABLE IF NOT EXISTS "categories" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''categories_id_seq''::regclass)',
	"parent_id" BIGINT NULL DEFAULT NULL,
	"name" TEXT NULL DEFAULT NULL,
	"slug" TEXT NULL DEFAULT NULL,
	"image" TEXT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_categories_child_category" FOREIGN KEY ("parent_id") REFERENCES "categories" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.categories: -1 rows
/*!40000 ALTER TABLE "categories" DISABLE KEYS */;
INSERT INTO "categories" ("id", "parent_id", "name", "slug", "image", "created_at", "updated_at", "deleted_at") VALUES
	(1, NULL, 'test', 'test', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', '2023-05-26 08:53:07+00', '2023-05-26 08:53:08+00', NULL);
/*!40000 ALTER TABLE "categories" ENABLE KEYS */;

-- Dumping structure for table public.orders
CREATE TABLE IF NOT EXISTS "orders" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''orders_id_seq''::regclass)',
	"user_id" BIGINT NULL DEFAULT NULL,
	"shop_id" BIGINT NULL DEFAULT NULL,
	"purchase_code" TEXT NULL DEFAULT NULL,
	"total_items_price" NUMERIC NULL DEFAULT NULL,
	"delivery_fee" NUMERIC NULL DEFAULT NULL,
	"resi_no" TEXT NULL DEFAULT NULL,
	"delivery_time" BIGINT NULL DEFAULT NULL,
	"cancel_notes" TEXT NULL DEFAULT NULL,
	"payment_notes" TEXT NULL DEFAULT NULL,
	"status" BIGINT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_orders_shop" FOREIGN KEY ("shop_id") REFERENCES "shops" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "fk_users_orders" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.orders: -1 rows
/*!40000 ALTER TABLE "orders" DISABLE KEYS */;
INSERT INTO "orders" ("id", "user_id", "shop_id", "purchase_code", "total_items_price", "delivery_fee", "resi_no", "delivery_time", "cancel_notes", "payment_notes", "status", "created_at", "updated_at", "deleted_at") VALUES
	(11, 1, 4, '', 0, 0, '', 0, '', '', 0, '2023-05-26 02:04:18.037568+00', '2023-05-26 02:04:18.037568+00', NULL),
	(12, 1, 4, '', 0, 0, '', 0, '', '', 0, '2023-05-26 02:21:46.185517+00', '2023-05-26 02:21:46.185517+00', NULL);
/*!40000 ALTER TABLE "orders" ENABLE KEYS */;

-- Dumping structure for table public.orders_addresses
CREATE TABLE IF NOT EXISTS "orders_addresses" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''orders_addresses_id_seq''::regclass)',
	"order_id" BIGINT NULL DEFAULT NULL,
	"name" TEXT NULL DEFAULT NULL,
	"province_id" BIGINT NULL DEFAULT NULL,
	"province" TEXT NULL DEFAULT NULL,
	"city_id" BIGINT NULL DEFAULT NULL,
	"city_name" TEXT NULL DEFAULT NULL,
	"address_detail" TEXT NULL DEFAULT NULL,
	"zip_code" TEXT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_orders_orders_address" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.orders_addresses: -1 rows
/*!40000 ALTER TABLE "orders_addresses" DISABLE KEYS */;
INSERT INTO "orders_addresses" ("id", "order_id", "name", "province_id", "province", "city_id", "city_name", "address_detail", "zip_code", "created_at", "updated_at", "deleted_at") VALUES
	(9, 11, '', 0, '', 0, '', '', '', '2023-05-26 02:04:18.063079+00', '2023-05-26 02:04:18.063079+00', NULL),
	(10, 12, '', 2, 'Jawa Barat', 4, 'Jakarta Utara', 'asdf', '123131', '2023-05-26 02:21:46.20765+00', '2023-05-26 02:21:46.20765+00', NULL);
/*!40000 ALTER TABLE "orders_addresses" ENABLE KEYS */;

-- Dumping structure for table public.orders_payments
CREATE TABLE IF NOT EXISTS "orders_payments" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''orders_payments_id_seq''::regclass)',
	"order_id" BIGINT NULL DEFAULT NULL,
	"bank_name" TEXT NULL DEFAULT NULL,
	"card_number" TEXT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_orders_orders_payment" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.orders_payments: -1 rows
/*!40000 ALTER TABLE "orders_payments" DISABLE KEYS */;
INSERT INTO "orders_payments" ("id", "order_id", "bank_name", "card_number", "created_at", "updated_at", "deleted_at") VALUES
	(9, 11, '', '', '2023-05-26 02:04:18.055455+00', '2023-05-26 02:04:18.055455+00', NULL),
	(10, 12, 'test', '1234', '2023-05-26 02:21:46.196753+00', '2023-05-26 02:21:46.196753+00', NULL);
/*!40000 ALTER TABLE "orders_payments" ENABLE KEYS */;

-- Dumping structure for table public.orders_products
CREATE TABLE IF NOT EXISTS "orders_products" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''orders_products_id_seq''::regclass)',
	"category_id" BIGINT NULL DEFAULT NULL,
	"order_id" BIGINT NULL DEFAULT NULL,
	"title" TEXT NULL DEFAULT NULL,
	"slug" TEXT NULL DEFAULT NULL,
	"description" TEXT NULL DEFAULT NULL,
	"thumbnail" TEXT NULL DEFAULT NULL,
	"price" BIGINT NULL DEFAULT NULL,
	"qty" BIGINT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_orders_orders_product" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.orders_products: -1 rows
/*!40000 ALTER TABLE "orders_products" DISABLE KEYS */;
INSERT INTO "orders_products" ("id", "category_id", "order_id", "title", "slug", "description", "thumbnail", "price", "qty", "created_at", "updated_at", "deleted_at") VALUES
	(9, 1, 11, 'testtest', 'testtest-xVgFiv7Z', 'testestset', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', 10000, 1, '2023-05-26 02:04:18.048481+00', '2023-05-26 02:04:18.048481+00', NULL),
	(10, 1, 12, 'testtest', 'testtest-xVgFiv7Z', 'testestset', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', 10000, 1, '2023-05-26 02:21:46.19176+00', '2023-05-26 02:21:46.19176+00', NULL);
/*!40000 ALTER TABLE "orders_products" ENABLE KEYS */;

-- Dumping structure for table public.payments
CREATE TABLE IF NOT EXISTS "payments" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''payments_id_seq''::regclass)',
	"user_id" BIGINT NULL DEFAULT NULL,
	"bank_name" TEXT NULL DEFAULT NULL,
	"card_number" TEXT NULL DEFAULT NULL,
	"is_default" BOOLEAN NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_users_payments" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.payments: -1 rows
/*!40000 ALTER TABLE "payments" DISABLE KEYS */;
INSERT INTO "payments" ("id", "user_id", "bank_name", "card_number", "is_default", "created_at", "updated_at", "deleted_at") VALUES
	(1, 1, 'test', '1234', 'true', '2023-05-26 01:21:48.93278+00', '2023-05-26 01:21:48.93278+00', NULL);
/*!40000 ALTER TABLE "payments" ENABLE KEYS */;

-- Dumping structure for table public.products
CREATE TABLE IF NOT EXISTS "products" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''products_id_seq''::regclass)',
	"category_id" BIGINT NULL DEFAULT NULL,
	"shop_id" BIGINT NULL DEFAULT NULL,
	"title" TEXT NULL DEFAULT NULL,
	"slug" TEXT NULL DEFAULT NULL,
	"description" TEXT NULL DEFAULT NULL,
	"thumbnail" TEXT NULL DEFAULT NULL,
	"stock" BIGINT NULL DEFAULT NULL,
	"price" BIGINT NULL DEFAULT NULL,
	"rating_avg" NUMERIC NULL DEFAULT NULL,
	"listing_status" BOOLEAN NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_categories_products" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "fk_shops_products" FOREIGN KEY ("shop_id") REFERENCES "shops" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.products: -1 rows
/*!40000 ALTER TABLE "products" DISABLE KEYS */;
INSERT INTO "products" ("id", "category_id", "shop_id", "title", "slug", "description", "thumbnail", "stock", "price", "rating_avg", "listing_status", "created_at", "updated_at", "deleted_at") VALUES
	(7, 1, 4, '111', '111-uMPcwbdW', '111', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', 1111111, 111, 0, 'false', '2023-05-26 01:04:19.990251+00', '2023-05-26 01:05:06.066654+00', '2023-05-26 01:07:22.447406+00'),
	(6, 1, 4, 'dddddd', 'dddddd-rq5ep90E', 'ddd', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', 10, 100000, 0, 'false', '2023-05-26 01:03:47.785264+00', '2023-05-26 01:03:47.785264+00', '2023-05-26 01:07:23.769965+00'),
	(5, 1, 4, 'ddd', 'ddd-3LhDfMJN', 'ddd', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', 10, 100000, 0, 'false', '2023-05-26 01:03:35.333189+00', '2023-05-26 01:03:35.333189+00', '2023-05-26 01:07:24.682981+00'),
	(4, 1, 4, 'ddd', 'ddd-7s0QBwtf', 'ddd', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', 110, 100000, 0, 'false', '2023-05-26 01:02:20.472284+00', '2023-05-26 01:07:29.628643+00', NULL),
	(3, 1, 4, 'testtest', 'testtest-xVgFiv7Z', 'testestset', 'https://w7.pngwing.com/pngs/812/374/png-transparent-windows-7-microsoft-windows-vista-operating-systems-microsoft-computer-logo-computer-wallpaper-thumbnail.png', 100011, 10000, 0, 'false', '2023-05-26 01:00:25.226353+00', '2023-05-26 01:07:10.368765+00', NULL);
/*!40000 ALTER TABLE "products" ENABLE KEYS */;

-- Dumping structure for table public.product_galleries
CREATE TABLE IF NOT EXISTS "product_galleries" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''product_galleries_id_seq''::regclass)',
	"product_id" BIGINT NULL DEFAULT NULL,
	"image" TEXT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_products_product_galleries" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.product_galleries: -1 rows
/*!40000 ALTER TABLE "product_galleries" DISABLE KEYS */;
/*!40000 ALTER TABLE "product_galleries" ENABLE KEYS */;

-- Dumping structure for table public.shops
CREATE TABLE IF NOT EXISTS "shops" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''shops_id_seq''::regclass)',
	"user_id" BIGINT NULL DEFAULT NULL,
	"name" TEXT NULL DEFAULT NULL,
	"username" TEXT NULL DEFAULT NULL,
	"total_product" BIGINT NULL DEFAULT NULL,
	"total_rating" BIGINT NULL DEFAULT NULL,
	"rating_avg" NUMERIC NULL DEFAULT NULL,
	"province_id" BIGINT NULL DEFAULT NULL,
	"prov_name" TEXT NULL DEFAULT NULL,
	"city_id" BIGINT NULL DEFAULT NULL,
	"city_name" TEXT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_users_shop" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.shops: -1 rows
/*!40000 ALTER TABLE "shops" DISABLE KEYS */;
INSERT INTO "shops" ("id", "user_id", "name", "username", "total_product", "total_rating", "rating_avg", "province_id", "prov_name", "city_id", "city_name", "created_at", "updated_at", "deleted_at") VALUES
	(4, 1, 'excel', 'excelcornelius', 0, 0, 0, 2, 'Jawa Barat', 3, 'Jakarta Timur', '2023-05-26 00:54:11.003305+00', '2023-05-26 00:54:11.003305+00', NULL);
/*!40000 ALTER TABLE "shops" ENABLE KEYS */;

-- Dumping structure for table public.users
CREATE TABLE IF NOT EXISTS "users" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''users_id_seq''::regclass)',
	"email" TEXT NULL DEFAULT NULL,
	"phone_no" TEXT NULL DEFAULT NULL,
	"fullname" TEXT NULL DEFAULT NULL,
	"password" TEXT NULL DEFAULT NULL,
	"role" BIGINT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.users: -1 rows
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
INSERT INTO "users" ("id", "email", "phone_no", "fullname", "password", "role", "created_at", "updated_at", "deleted_at") VALUES
	(1, 'user1@mail.com', '8123456789', 'excel', '$2a$10$KxTSuGwcFXPcTtOLnXCMrufaaSQCdfdH4WVt4AMGjrlt4Fo/jMoIi', 1, '2023-05-26 00:50:28.96462+00', '2023-05-26 00:54:10.998206+00', NULL);
/*!40000 ALTER TABLE "users" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
