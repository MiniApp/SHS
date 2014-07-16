/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50519
Source Host           : localhost:3306
Source Database       : shs-2_0-youxindai-140417

Target Server Type    : MYSQL
Target Server Version : 50519
File Encoding         : 65001

Date: 2014-04-21 22:03:30
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `shs_bank`
-- ----------------------------
DROP TABLE IF EXISTS `shs_bank`;
CREATE TABLE `shs_bank` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `orders` int(11) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `payable` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_bank
-- ----------------------------
INSERT INTO shs_bank VALUES ('1', '2014-04-03 18:39:15', '2014-04-21 10:51:51', '6', 'ICBC', '工商银行', '/upload/image/201404/f1c9a7c5-849d-401b-bd3e-05059dc26224.jpg', '工商银行', '');
INSERT INTO shs_bank VALUES ('2', '2014-04-03 18:44:24', '2014-04-21 10:46:23', '2', 'ABC', '农业银行', '/upload/image/201404/5d52f1da-2547-4c4e-b008-a665102f1533.jpg', '农业银行', '');
INSERT INTO shs_bank VALUES ('3', '2014-04-03 18:44:47', '2014-04-21 10:46:37', '3', 'BOCSH', '中国银行', '/upload/image/201404/cd094e63-3a0a-46ee-a7e7-6fb810c4e35d.jpg', '中国银行', '');
INSERT INTO shs_bank VALUES ('4', '2014-04-03 18:45:03', '2014-04-21 10:51:09', '4', 'CCB', '建设银行', '/upload/image/201404/052b2c74-3f22-4c6b-8957-b7252465a4b3.jpg', '建设银行', '');
INSERT INTO shs_bank VALUES ('5', '2014-04-03 18:45:18', '2014-04-21 10:51:32', '5', 'CMB', '招商银行', '/upload/image/201404/6bb38fd0-3cae-488a-b132-7b0d60174e19.jpg', '招商银行', '');
INSERT INTO shs_bank VALUES ('6', '2014-04-03 18:45:34', '2014-04-21 10:46:15', '1', 'SPDB', '浦发银行', '/upload/image/201404/a46a747f-10a2-4b91-8b71-bbba0c00968d.jpg', '浦发银行', '');
INSERT INTO shs_bank VALUES ('7', '2014-04-03 18:45:54', '2014-04-21 10:52:00', '7', 'GDB', '广发银行', '/upload/image/201404/a289f407-65ef-4a44-a13f-27a3c7d53ea1.jpg', '广发银行', '');
INSERT INTO shs_bank VALUES ('8', '2014-04-03 18:46:10', '2014-04-21 10:52:08', '8', 'BOCOM', '交通银行', '/upload/image/201404/9526bb8f-dfe7-4132-a004-9cc6912a33cd.jpg', '交通银行', '');
INSERT INTO shs_bank VALUES ('9', '2014-04-03 18:46:31', '2014-04-21 10:56:46', '18', 'PSBC', '邮政储蓄银行', '/upload/image/201404/2915adf9-b76a-41ac-b3d1-57adf569a021.jpg', '邮政储蓄银行', '');
INSERT INTO shs_bank VALUES ('10', '2014-04-03 18:46:47', '2014-04-21 10:52:33', '10', 'CNCB', '中信银行', '/upload/image/201404/0f7a749f-dbfe-4344-a2fc-b89688bc822e.jpg', '中信银行', '');
INSERT INTO shs_bank VALUES ('11', '2014-04-03 18:47:07', '2014-04-21 10:52:51', '11', 'CMBC', '民生银行', '/upload/image/201404/3739821d-e184-4aca-9eda-78e9265f4d66.jpg', '民生银行', '');
INSERT INTO shs_bank VALUES ('12', '2014-04-03 18:47:21', '2014-04-21 10:53:01', '12', 'CEB', '光大银行', '/upload/image/201404/1e30be7c-c358-4461-b1b3-3e1da7281065.jpg', '光大银行', '');
INSERT INTO shs_bank VALUES ('13', '2014-04-03 18:47:33', '2014-04-21 10:53:22', '13', 'HXB', '华夏银行', '/upload/image/201404/a79dffb9-732b-4097-996b-155ff58a4137.jpg', '华夏银行', '');
INSERT INTO shs_bank VALUES ('14', '2014-04-03 18:47:49', '2014-04-21 10:53:37', '14', 'CIB', '兴业银行', '/upload/image/201404/9a1f4f82-d769-4be7-87fa-1608c4c005d6.jpg', '兴业银行', '');
INSERT INTO shs_bank VALUES ('15', '2014-04-03 18:48:05', '2014-04-21 10:56:00', '15', 'BOS', '上海银行', '/upload/image/201404/38a38e5e-943d-4b0c-b355-7972027dd7b4.jpg', '上海银行', '');
INSERT INTO shs_bank VALUES ('16', '2014-04-03 18:48:22', '2014-04-21 10:57:21', '17', 'SRCB', '上海农商银行', '/upload/image/201404/a377eecc-e1a2-4b00-b15b-47cc222c692e.jpg', '上海农商银行', '');
INSERT INTO shs_bank VALUES ('17', '2014-04-03 18:48:35', '2014-04-21 10:52:19', '9', 'PAB', '平安银行', '/upload/image/201404/30801529-569a-4a38-98a5-0fbdec080408.jpg', '平安银行', '');
INSERT INTO shs_bank VALUES ('18', '2014-04-03 18:48:53', '2014-04-21 10:57:12', '16', 'BCCB', '北京银行', '/upload/image/201404/baf142f9-eb29-4001-8b15-96e509c65a3d.jpg', '北京银行', '');

-- ----------------------------
-- Table structure for `shs_bank_branch`
-- ----------------------------
DROP TABLE IF EXISTS `shs_bank_branch`;
CREATE TABLE `shs_bank_branch` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `orders` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `bank` bigint(20) NOT NULL,
  `locality` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKA093F5345BA0F9F9` (`locality`),
  KEY `FKA093F534BE29F941` (`bank`),
  CONSTRAINT `FKA093F5345BA0F9F9` FOREIGN KEY (`locality`) REFERENCES `shs_area` (`id`),
  CONSTRAINT `FKA093F534BE29F941` FOREIGN KEY (`bank`) REFERENCES `shs_bank` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_bank_branch
-- ----------------------------
