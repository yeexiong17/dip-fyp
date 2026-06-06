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
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_category` varchar(20) NOT NULL,
  `report_venue` varchar(20) NOT NULL,
  `report_level` int NOT NULL,
  `report_room` varchar(30) NOT NULL,
  `report_description` varchar(400) NOT NULL,
  `report_image` varchar(400) DEFAULT NULL,
  `report_completed_image` varchar(400) DEFAULT NULL,
  `report_status` varchar(15) NOT NULL,
  `report_has_reviewed` varchar(10) NOT NULL,
  `report_created_date` date NOT NULL,
  `report_updated_date` date DEFAULT NULL,
  `report_deleted_date` date DEFAULT NULL,
  `user_id` int NOT NULL,
  `review_id` int DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  UNIQUE KEY `id_UNIQUE` (`report_id`),
  UNIQUE KEY `review_id_UNIQUE` (`review_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `review_id` FOREIGN KEY (`review_id`) REFERENCES `review` (`review_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (36,'Power Failure','FCI',1,'Classroom','Classroom C012 lights is flicking','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2FScreenshot%202023-07-20%20000007.png6ddda559-becf-45a5-8335-dd2a730a2719?alt=media&token=a5533ea3-aa5a-4686-b29a-42be8dcca110','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2F1%20Logic%20Gate%20Summary.pnge342cf21-064e-402e-9c18-c280975683f4?alt=media&token=5d68d6eb-6fd3-4a1c-b0c6-2e745d8b9be1','Completed','1','2023-12-26','2024-01-05',NULL,15,9),(39,'Aircond Service','FCI',2,'Classroom','Aircond is not cold','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2F1%20Logic%20Gate%20Summary.png761dd958-18c7-4a77-9edb-021a5c747031?alt=media&token=3e419b5a-de2a-4f2d-8b5b-f4185929c830','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2Faircond-repaired.jpg4dc8dd5a-c921-4c7c-9175-3cf758e5da72?alt=media&token=22ee2991-470f-409d-b4c6-ab00bb5bada2','Completed','1','2024-01-09','2024-02-21',NULL,16,NULL),(41,'Aircond Service','FCI',2,'Classroom','Aircond remote for this classroom is not available','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2FMarking%20Grade.pnge15bc8cd-7fd3-4b25-b9b7-92c71f63c9d5?alt=media&token=b38be149-d6e6-4e39-903c-af0db1c0aa34','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2FMarking%20Grade.png32823d18-54f1-4474-8392-3141c18becd1?alt=media&token=250e72fa-1026-45ab-805e-ddc6a3069f23','Completed','1','2024-01-22','2024-01-22',NULL,16,NULL),(43,'Aircond Service','MMU',1,'Lab','aircond rosak','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2Faircond-leak.jpgbaf0b676-ac66-44c5-8e95-dbc988dd2a3d?alt=media&token=957f8dd7-a2f4-46e2-a1b0-5b21ef7c18a7','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2Faircond-repaired.jpg407a3024-81a0-4e95-a730-48006f8e644b?alt=media&token=a534d7ff-5f0f-4d96-bfd2-aecaa6d938dd','Completed','1','2024-02-21','2024-02-21',NULL,22,NULL),(44,'Aircond Service','MMU',3,'Office','Aircond leaking','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2Faircond-leak.jpg885f4513-147b-44e3-9080-f15c80721673?alt=media&token=2e9397ad-9ea1-4a32-8293-136ef9780b42','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2Faircond-repaired.jpg7a5cad6a-9fb6-40f6-b141-cc8ecb637c3c?alt=media&token=c3c4ec9a-f9db-4f00-b988-89ab15de7045','Completed','1','2024-02-21','2024-02-21',NULL,23,NULL),(45,'Aircond Service','MMU',2,'Lab','Lab aircond is not working','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2Faircond-leak.jpg2ec83a1d-8bc7-4b7c-ae17-4a944933b760?alt=media&token=99ab8129-7979-48ba-9f2a-2701d9c5b1d3','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2Faircond-repaired.jpgdd8b1dda-7f71-4645-89c6-078edccdfe7c?alt=media&token=b42aead5-d8a1-4606-93c7-213247fac072','Completed','1','2024-02-23','2024-02-23',NULL,24,26),(46,'Aircond Service','University',20,'Lab','Aircond is leaking water','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2Faircond-leak.jpg542cb58e-391c-49b1-be0b-012cfa15f1e9?alt=media&token=c551a76e-c15d-4c30-9ed7-fab60ecf9d5a','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2Faircond-repaired.jpgd3c9c469-a029-40ce-9c3d-4e681e4d6f3a?alt=media&token=7e0bcb64-feb8-4ee3-805d-8afce000e489','Completed','1','2024-02-23','2024-02-23',NULL,25,27),(47,'Aircond Service','MMU',3,'Classroom','aircond leak','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2Faircond-leak.jpgaa491965-cd53-44b9-801c-9d1da1e5393e?alt=media&token=6d1d43b1-d977-4ff6-939f-d98c85df9579','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2Faircond-repaired.jpg6640ba93-a470-494a-89c2-f3dcc4968f69?alt=media&token=b05336bb-a2d1-4513-a4f7-d34e55955ea6','Completed','1','2024-02-26','2024-02-26',NULL,26,28),(48,'Aircond Service','FCI',2,'Lab','Lab aircond is leaking water.','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2Faircond-leak.jpgd0071523-2769-4914-a529-b2bd78521cf0?alt=media&token=48e2980a-782a-4e84-9e13-a19a2102f876','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fcompleted%2Faircond-repaired.jpgbdeb8538-7707-48b9-8134-703e26141a35?alt=media&token=c4ade522-092f-4718-ab44-8f2d5dd988ef','Completed','1','2024-04-16','2024-04-16',NULL,27,29),(49,'Air Quality','FOE',2,'Lab','Test report','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/report%2Fmake%2Fair-quality.pngf853dde8-06ba-4121-814a-cfb4aa501e08?alt=media&token=07ee2ca1-8d81-4172-b248-1c952e8bd692',NULL,'Incoming','0','2024-04-22',NULL,NULL,24,NULL);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-07 15:46:55
