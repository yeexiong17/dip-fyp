-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: dip-fyp
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(30) NOT NULL,
  `admin_email` char(30) NOT NULL,
  `admin_password` varchar(100) NOT NULL,
  `admin_phone` varchar(20) DEFAULT NULL,
  `admin_created_date` date NOT NULL,
  `admin_updated_date` date DEFAULT NULL,
  `admin_deleted_date` date DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `id_UNIQUE` (`admin_id`),
  UNIQUE KEY `password_UNIQUE` (`admin_password`),
  UNIQUE KEY `email_UNIQUE` (`admin_email`),
  UNIQUE KEY `admin_phone_UNIQUE` (`admin_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (8,'yxfewfw','efwfwefew','$2a$10$OkgS3kCo.IBC8tv3k5eDKOwdyJHWnRfUtK0IPKJQMCH4e2a8M4DsW',NULL,'2023-12-27','2024-02-21',NULL),(22,'yee xiong','wongyeexiong10@gmail.com','$2a$10$JxVevcK0q3YF.Wz3UoigZ.8ppN153C8w.vGJ1mr4ZIkNefYtb8Vk2',NULL,'2024-02-23',NULL,NULL),(23,'admin8','admin8@gmail.com','$2a$10$yOnC/BEJMVvyRk6UzWENBOfsE.usY5skKEU1chmotXNEERq5jW0Aq',NULL,'2024-02-26',NULL,NULL),(24,'testadmin','testadmin@testmail.com','$2a$10$E4JaZPnJtqu7JwMTVi3boe2a0O6BfKknE8fUSlGBZOGNA02brbUiq',NULL,'2024-04-16',NULL,NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-07 15:46:54
