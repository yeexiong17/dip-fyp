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
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(20) NOT NULL,
  `menu_image` varchar(400) NOT NULL,
  `menu_is_deleted` varchar(10) NOT NULL,
  `menu_created_date` date NOT NULL,
  `menu_updated_date` date DEFAULT NULL,
  `menu_deleted_date` date DEFAULT NULL,
  PRIMARY KEY (`menu_id`),
  UNIQUE KEY `menu_name_UNIQUE` (`menu_name`),
  UNIQUE KEY `menu_id_UNIQUE` (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (2,'Power Failure','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Fpower_failure.pnged3ea8f1-9902-4c25-a94f-41df03763092?alt=media&token=85b05c70-fd91-484d-b9f4-7f3870775be2','false','2024-01-04',NULL,NULL),(3,'Aircond Service','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Faircond_service.png7c1959cc-6b7c-42c0-92a0-574198b0921b?alt=media&token=d6a69545-d418-442b-b82f-24f9d4e95020','false','2024-01-04',NULL,NULL),(4,'Cleaning','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Fcleaning.pngf1036fc2-262a-482b-9240-e8838e3396aa?alt=media&token=e7c909ec-db53-48a5-bb41-edafe7c7d668','false','2024-01-04',NULL,NULL),(5,'Building','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Fbuilding.png6fcdbab0-0876-467f-b5fc-8e8f75b771ab?alt=media&token=e5004ab7-1c52-4a23-a756-88b005a62476','false','2024-01-04',NULL,NULL),(6,'Outdoor','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Foutdoor.png58502cec-a409-4efb-ac0b-c8c4b8745b84?alt=media&token=8fc1ae07-82c4-40d6-b126-a2909284a22a','false','2024-01-04',NULL,NULL),(7,'Facilities','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Ffacilities.png6c148ad4-5ac5-44af-b5b2-cadfcee37e59?alt=media&token=0f0b30ea-7a86-43f9-92ae-fbf5216827b8','false','2024-01-04',NULL,NULL),(8,'Pest Control','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Fpest_control.png46e67b0a-a0c6-4dd7-af3c-2380464e6329?alt=media&token=eb492941-2c6f-4001-9b0b-474357090526','false','2024-01-04',NULL,NULL),(11,'Water Failure','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Fwater-failure.png8273cd4f-3c5f-471d-a323-15577b88fa72?alt=media&token=18193a0d-d494-4409-ac86-1ab62b189e7e','false','2024-02-23',NULL,NULL),(12,'Air Quality','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/category%2Fimage%2Fair-quality.pngc33793c3-52ed-4632-816c-9c858153990f?alt=media&token=0093234e-80c9-4f71-9f20-a855350d531b','false','2024-04-16',NULL,NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
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
