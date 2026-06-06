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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_username` varchar(30) NOT NULL,
  `user_email` char(30) NOT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_profile_picture` varchar(400) DEFAULT NULL,
  `user_created_date` date NOT NULL,
  `user_updated_date` date DEFAULT NULL,
  `user_deleted_date` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`user_email`),
  UNIQUE KEY `password_UNIQUE` (`user_password`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_phone_UNIQUE` (`user_phone`),
  UNIQUE KEY `user_profile_picture_UNIQUE` (`user_profile_picture`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (15,'wyx','wyx@gmail.com',NULL,'$2a$10$zFQ3xNsYlbCcvRTKJnUie.F9Teb1qFqLW6dFkNx2Ba/KsqmhmnuCu',NULL,'2023-12-22','2023-12-26',NULL),(16,'wefwef','ff@gmail.com','+60123456789','$2a$10$R4QgGFW0JmBkvWL3m.iuJO8Q48elh0ch8DmPf.ILajMpr6idjFwIy',NULL,'2023-12-25','2024-02-20',NULL),(17,'test 1','test1@gmail.com',NULL,'$2a$10$htge3ho8idIlWJ8zRQaVOeTfCR4iczzt3hCcMpw1RrPrd6gvRGSoG',NULL,'2024-01-04',NULL,NULL),(18,'test asdf','y@gmail.com',NULL,'$2a$10$GthbJr46JXwz0AvUGjYkK.g2iM0j.xYWTih0GOi.xU6bjyCx9bpni',NULL,'2024-01-09',NULL,NULL),(19,'New User','newuser@gmail.com',NULL,'$2a$10$Fnhx.87L2KC4JKoznOq4W.lZsflK.uzJn7JSF7V6tcy3DC0jgjIR2',NULL,'2024-02-08',NULL,NULL),(20,'test name','test@gmail.com',NULL,'$2a$10$R8JZew.86G.zyVZRdxksAe7yH1S/eetW6w8dkWWRrrs5A1FHKSVKC',NULL,'2024-02-20',NULL,NULL),(21,'fef','effe','+012987654321','$2a$10$nRojFZspt2g1kOXIFi3yve9qgseE9JvRQvKuxxDXNInih6mtXf35m',NULL,'2024-02-21','2024-02-21',NULL),(22,'yee xiong','wyeexiong17@gmail.com','+0123456987','$2a$10$lH850kJQuElIPb87invaSeAACvTYwO9IvYhIwV388WmSOJVWq17nK','https://firebasestorage.googleapis.com/v0/b/dip-fyp.appspot.com/o/user%2Fprofile%2FMy%20Picture.jpg694bdae4-230b-4581-b2e2-f748d5372d9c?alt=media&token=9b1da1c1-86c7-4716-93da-bf086b5e4dc8','2024-02-21','2024-02-21',NULL),(23,'test user','testemail@gmail.com',NULL,'$2a$10$rZyU.QMLtEV9r0H/KrbbZ.ZklxBg66dWVmO9GDIlVoG6sp6W/7R1K',NULL,'2024-02-21',NULL,NULL),(24,'Wong Yee Xiong','wongyeexiong10@gmail.com',NULL,'$2a$10$B4TJxaDF1pFAyQwR.wnYZeISqS.xoc/bs8b64/ym8oinLXmkxD60K',NULL,'2024-02-23',NULL,NULL),(25,'Wong Yee Xiong','test123@gmail.com',NULL,'$2a$10$JkaUZnMPpbY8DOwsLEYjq.TY8FBUbC9Fxkzsdt4Zo4KBnNeuq7jQS',NULL,'2024-02-23',NULL,NULL),(26,'test 6','test6@gmail.com',NULL,'$2a$10$hB8jE2XM3E2o1tCJgoHHpOYlYKY9OYtI/z8tE5Ac3SyuyKCJaGbM2',NULL,'2024-02-26',NULL,NULL),(27,'test user','testuser1@testmail.com',NULL,'$2a$10$5naUNKsO8TQtAOdevMZ/Res1tH67iX3YciID99TrwyEZwi/l9yRwO',NULL,'2024-04-16','2024-04-16',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
