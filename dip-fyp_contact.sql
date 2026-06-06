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
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `contact_us_id` int NOT NULL AUTO_INCREMENT,
  `contact_us_name` varchar(30) NOT NULL,
  `contact_us_email` varchar(30) NOT NULL,
  `contact_us_phone` varchar(20) NOT NULL,
  `contact_us_message` varchar(400) NOT NULL,
  `contact_us_delete` varchar(10) DEFAULT NULL,
  `contact_us_created_date` date NOT NULL,
  `contact_us_updated_date` date DEFAULT NULL,
  `contact_us_deleted_date` date DEFAULT NULL,
  PRIMARY KEY (`contact_us_id`),
  UNIQUE KEY `contact_us_id_UNIQUE` (`contact_us_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'User1','wongyeexiong10@gmail.com','012-23-123','I do not know what to say here, so I just typed a random sentence for example.','true','2024-02-07',NULL,'2024-02-21'),(2,'User2','wongyeexiong10@gmail.com','012-23-123','how can i change my password','true','2024-02-07',NULL,'2024-02-17'),(3,'User3','wongyeexiong10@gmail.com','012-23-123','Must i make a review for the report','true','2024-02-07',NULL,'2024-02-17'),(4,'User4','wongyeexiong10@gmail.com','012-23-123','I cannot track my report','true','2024-02-07',NULL,'2024-04-16'),(5,'User5','wongyeexiong10@gmail.com','012-23-123','how can i change my password','false','2024-02-07',NULL,NULL),(6,'User6','wongyeexiong10@gmail.com','012345678','how can i check my previous report','false','2024-02-20',NULL,NULL),(7,'yh','yh@gmail.com','0123456789','false','hi','2024-02-21',NULL,NULL),(8,'yong hao','wongyeexiong10@gmail.com','0123456789','false','hi','2024-02-21',NULL,NULL),(9,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(10,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(11,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(12,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(13,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(14,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(15,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(16,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(17,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(18,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(19,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(20,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','false','2024-04-16',NULL,NULL),(21,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','true','2024-04-16',NULL,'2024-04-16'),(22,'testcontact','testcontact@testmail.com','123456789','hello, i am testing','true','2024-04-16',NULL,'2024-04-16');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
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
