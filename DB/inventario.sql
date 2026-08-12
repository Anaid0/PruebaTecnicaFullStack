/*
 Navicat Premium Dump SQL

 Source Server         : LocalHost
 Source Server Type    : MySQL
 Source Server Version : 80403 (8.4.3)
 Source Host           : localhost:3306
 Source Schema         : inventario

 Target Server Type    : MySQL
 Target Server Version : 80403 (8.4.3)
 File Encoding         : 65001

 Date: 12/08/2026 14:54:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int NOT NULL COMMENT 'Identificador',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Nombre de la categoria',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Descripcion opcional de la categoria',
  `created_at` date NOT NULL COMMENT 'Fecha de creación de la categoria',
  `updated_at` datetime NULL DEFAULT NULL COMMENT 'Fecha de la última actualización de la categoria',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------

-- ----------------------------
-- Table structure for inventory_movements
-- ----------------------------
DROP TABLE IF EXISTS `inventory_movements`;
CREATE TABLE `inventory_movements`  (
  `id` int NOT NULL COMMENT 'Identificador',
  `product_id` int NULL DEFAULT NULL COMMENT 'Referencia a tabla productos',
  `user_id` int NULL DEFAULT NULL COMMENT 'Referencia a tabla de usuarios',
  `type` enum('Entrada','Salida') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Entrada o salida',
  `quantity` int NULL DEFAULT NULL COMMENT 'Cantidad movida',
  `previous_stock` int NULL DEFAULT NULL COMMENT 'Stock antes del movimiento',
  `new_stock` int NULL DEFAULT NULL COMMENT 'Stock después del movimiento',
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Observación',
  `created_at` timestamp NOT NULL COMMENT 'Fecha del movimiento',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of inventory_movements
-- ----------------------------

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int NOT NULL COMMENT 'Identificador',
  `category_id` int NOT NULL COMMENT 'Rerefencia a la tabla de categories',
  `sku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Código del producto',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Nombre del producto',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Descripción del producto',
  `price` decimal(12, 2) NOT NULL COMMENT 'Precio de venta del producto',
  `stock` int NOT NULL COMMENT 'Existencia actual del producto',
  `min_stock` int NOT NULL COMMENT 'Stock mínimo de alerta',
  `is_active` tinyint(1) NOT NULL COMMENT 'Estado del producto',
  `created_at` datetime NOT NULL COMMENT 'Fecha de creación del producto',
  `updated_at` datetime NULL DEFAULT NULL COMMENT 'Fecha de la última actualización del producto',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id` ASC) USING BTREE,
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL COMMENT 'Identificador',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Nombre completo del usuario',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Correo de acceso',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Hash de la contraseña',
  `created_at` datetime NOT NULL COMMENT 'Fecha de creación del usuario',
  `updated_at` datetime NULL DEFAULT NULL COMMENT 'Fecha de última actualización del usuario',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
