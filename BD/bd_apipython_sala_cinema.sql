CREATE DATABASE  IF NOT EXISTS `bd_apipython` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_apipython`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_apipython
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `sala_cinema`
--

DROP TABLE IF EXISTS `sala_cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala_cinema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `situacao_sala` int DEFAULT NULL,
  `cadeira` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=605 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala_cinema`
--

LOCK TABLES `sala_cinema` WRITE;
/*!40000 ALTER TABLE `sala_cinema` DISABLE KEYS */;
INSERT INTO `sala_cinema` VALUES (1,1,'A1'),(2,0,'A2'),(3,0,'A3'),(4,0,'A4'),(5,0,'A5'),(6,0,'A6'),(7,0,'A7'),(8,0,'A8'),(9,0,'A9'),(10,0,'A10'),(11,0,'A11'),(12,0,'A12'),(13,0,'A13'),(14,0,'A14'),(15,0,'A15'),(16,0,'B1'),(17,0,'B2'),(18,0,'B3'),(19,0,'B4'),(20,0,'B5'),(21,0,'B6'),(22,0,'B7'),(23,0,'B8'),(24,0,'B9'),(25,0,'B10'),(26,0,'B11'),(27,0,'B12'),(28,0,'B13'),(29,0,'B14'),(30,0,'B15'),(31,0,'C1'),(32,0,'C2'),(33,0,'C3'),(34,0,'C4'),(35,0,'C5'),(36,0,'C6'),(37,0,'C7'),(38,0,'C8'),(39,0,'C9'),(40,0,'C10'),(41,0,'C11'),(42,0,'C12'),(43,0,'C13'),(44,0,'C14'),(45,0,'C15'),(46,0,'D1'),(47,0,'D2'),(48,0,'D3'),(49,0,'D4'),(50,0,'D5'),(51,0,'D6'),(52,0,'D7'),(53,0,'D8'),(54,0,'D9'),(55,0,'D10'),(56,0,'D11'),(57,0,'D12'),(58,0,'D13'),(59,0,'D14'),(60,0,'D15'),(61,0,'E1'),(62,0,'E2'),(63,0,'E3'),(64,0,'E4'),(65,0,'E5'),(66,0,'E6'),(67,0,'E7'),(68,0,'E8'),(69,0,'E9'),(70,0,'E10'),(71,0,'E11'),(72,0,'E12'),(73,0,'E13'),(74,0,'E14'),(75,0,'E15'),(76,0,'F1'),(77,0,'F2'),(78,0,'F3'),(79,0,'F4'),(80,0,'F5'),(81,0,'F6'),(82,0,'F7'),(83,0,'F8'),(84,0,'F9'),(85,0,'F10'),(86,0,'F11'),(87,0,'F12'),(88,0,'F13'),(89,0,'F14'),(90,0,'F15'),(91,0,'G1'),(92,0,'G2'),(93,0,'G3'),(94,0,'G4'),(95,0,'G5'),(96,0,'G6'),(97,0,'G7'),(98,0,'G8'),(99,0,'G9'),(100,0,'G10'),(101,0,'G11'),(102,0,'G12'),(103,0,'G13'),(104,0,'G14'),(105,0,'G15'),(106,0,'H1'),(107,0,'H2'),(108,0,'H3'),(109,0,'H4'),(110,0,'H5'),(111,0,'H6'),(112,0,'H7'),(113,0,'H8'),(114,0,'H9'),(115,0,'H10'),(116,0,'H11'),(117,0,'H12'),(118,0,'H13'),(119,0,'H14'),(120,0,'H15'),(121,0,'I1'),(122,0,'I2'),(123,0,'I3'),(124,0,'I4'),(125,0,'I5'),(126,0,'I6'),(127,0,'I7'),(128,0,'I8'),(129,0,'I9'),(130,0,'I10'),(131,0,'I11'),(132,0,'I12'),(133,0,'I13'),(134,0,'I14'),(135,0,'I15'),(136,0,'J1'),(137,0,'J2'),(138,0,'J3'),(139,0,'J4'),(140,0,'J5'),(141,0,'J6'),(142,0,'J7'),(143,0,'J8'),(144,0,'J9'),(145,0,'J10'),(146,0,'J11'),(147,0,'J12'),(148,0,'J13'),(149,0,'J14'),(150,0,'J15');
/*!40000 ALTER TABLE `sala_cinema` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 23:34:07
