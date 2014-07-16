/*
Navicat MySQL Data Transfer

Source Server         : Mysql_Localhost_3306
Source Server Version : 50091
Source Host           : localhost:3306
Source Database       : shs-2_1-yuxinchuangtou

Target Server Type    : MYSQL
Target Server Version : 50091
File Encoding         : 65001

Date: 2014-07-07 19:02:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `shs_admin`
-- ----------------------------
DROP TABLE IF EXISTS `shs_admin`;
CREATE TABLE `shs_admin` (
  `id` bigint(20) NOT NULL auto_increment,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `department` varchar(255) default NULL,
  `email` varchar(255) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `locked` bit(1) NOT NULL,
  `locked_date` datetime default NULL,
  `login_date` datetime default NULL,
  `login_failure_count` int(11) NOT NULL,
  `login_ip` varchar(255) default NULL,
  `name` varchar(255) default NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_admin
-- ----------------------------
INSERT INTO `shs_admin` VALUES ('3', '2014-04-20 19:11:05', '2014-07-07 16:55:39', '产品部', 'feleon@icl-network.com', '', '', null, '2014-07-07 16:55:39', '0', '127.0.0.1', '部门经理', '6b59ef7488792487853ebada7331807c', 'feleon');

-- ----------------------------
-- Table structure for `shs_admins_roles`
-- ----------------------------
DROP TABLE IF EXISTS `shs_admins_roles`;
CREATE TABLE `shs_admins_roles` (
  `admins` bigint(20) NOT NULL,
  `roles` bigint(20) NOT NULL,
  PRIMARY KEY  (`admins`,`roles`),
  KEY `FK8614777317A3E87C` (`roles`),
  KEY `FK86147773C346C210` (`admins`),
  CONSTRAINT `FK8614777317A3E87C` FOREIGN KEY (`roles`) REFERENCES `shs_role` (`id`),
  CONSTRAINT `FK86147773C346C210` FOREIGN KEY (`admins`) REFERENCES `shs_admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_admins_roles
-- ----------------------------
INSERT INTO `shs_admins_roles` VALUES ('3', '1');

-- ----------------------------
-- Table structure for `shs_role`
-- ----------------------------
DROP TABLE IF EXISTS `shs_role`;
CREATE TABLE `shs_role` (
  `id` bigint(20) NOT NULL auto_increment,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `builtin` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(3000) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_role
-- ----------------------------
INSERT INTO `shs_role` VALUES ('1', '2014-04-20 18:43:21', '2014-07-03 21:36:28', '', '开发者权限', '开发者权限');
INSERT INTO `shs_role` VALUES ('3', '2014-04-20 19:10:16', '2014-04-20 19:10:16', '', '超级管理员权限', '超级管理员权限');

-- ----------------------------
-- Table structure for `shs_roles_auths`
-- ----------------------------
DROP TABLE IF EXISTS `shs_roles_auths`;
CREATE TABLE `shs_roles_auths` (
  `role_entity` bigint(20) NOT NULL,
  `auths` varchar(255) default NULL,
  KEY `FKCF0B1BF8279C698B` (`role_entity`),
  CONSTRAINT `FKCF0B1BF8279C698B` FOREIGN KEY (`role_entity`) REFERENCES `shs_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_roles_auths
-- ----------------------------
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:basic_setting');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:security_setting');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:display_setting');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:comm_setting');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:payment_plugin');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:storage_plugin');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:texting_plugin');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:admin');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:role');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:area');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:bank');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:dict');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:template_page');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:template_mail');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:template_texting');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:template_print');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:template_js');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:template_css');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:cache');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:log');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:token');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:article_category');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:article');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:ad_position');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:ad');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:friend_link_text');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:friend_link_image');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:capital');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:account');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:account_charge');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:account_recharge');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:recharge');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:recharge_modif');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:recharge_audit');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:recharge_transfer');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:recharge_cancel');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:recharge_remedy');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:withdrawal');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:withdrawal_modif');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:withdrawal_audit');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:withdrawal_transfer');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:withdrawal_cancel');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:withdrawal_remedy');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:bank_card');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:bank_card_modif');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:bank_card_audit');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:bank_card_invalid');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:bank_card_remedy');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:member');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:member_regist');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:member_modif');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:pers');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:pers_regist');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:corp');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_apply');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_inquiry');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_confirm');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_investing');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_invest_expired');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_lend');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_repaying');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_repay');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_finished');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_inquiry_failure');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_confirm_failure');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_invest_failure');
INSERT INTO `shs_roles_auths` VALUES ('3', 'admin:borrowing_lend_failure');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:basic_setting');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:security_setting');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:display_setting');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:comm_setting');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:payment_plugin');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:storage_plugin');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:texting_plugin');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:admin');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:role');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:area');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:bank');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:dict');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:template_page');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:template_mail');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:template_texting');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:template_print');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:template_js');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:template_css');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:cache');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:log');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:token');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:article_category');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:article');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:ad_position');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:ad');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:friend_link_text');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:friend_link_image');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:capital');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:account');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:account_charge');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:account_recharge');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:recharge');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:recharge_modif');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:recharge_audit');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:recharge_transfer');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:recharge_cancel');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:recharge_remedy');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:withdrawal');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:withdrawal_modif');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:withdrawal_audit');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:withdrawal_transfer');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:withdrawal_cancel');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:withdrawal_remedy');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:bank_card');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:bank_card_modif');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:bank_card_audit');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:bank_card_invalid');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:bank_card_remedy');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:member');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:member_regist');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:member_modif');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:pers');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:pers_regist');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:corp');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_apply');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_inquiry');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_confirm');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_investing');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_invest_expired');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_lend');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_repaying');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_repay');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_finished');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_inquiry_failure');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_confirm_failure');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_invest_failure');
INSERT INTO `shs_roles_auths` VALUES ('1', 'admin:borrowing_lend_failure');
