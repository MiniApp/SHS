/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50519
Source Host           : localhost:3306
Source Database       : shs-2_0-youxindai-140417

Target Server Type    : MYSQL
Target Server Version : 50519
File Encoding         : 65001

Date: 2014-04-21 22:05:27
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `shs_sn`
-- ----------------------------
DROP TABLE IF EXISTS `shs_sn`;
CREATE TABLE `shs_sn` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `last_value` bigint(20) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_sn
-- ----------------------------
INSERT INTO shs_sn VALUES ('1', '2013-10-22 00:59:51', '2014-04-21 18:52:27', '24', '0');
INSERT INTO shs_sn VALUES ('2', '2014-04-13 18:17:39', '2014-04-13 21:24:41', '3', '1');
