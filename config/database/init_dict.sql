/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50519
Source Host           : localhost:3306
Source Database       : shs-2_0-youxindai-140417

Target Server Type    : MYSQL
Target Server Version : 50519
File Encoding         : 65001

Date: 2014-04-21 22:03:46
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `shs_dict`
-- ----------------------------
DROP TABLE IF EXISTS `shs_dict`;
CREATE TABLE `shs_dict` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `orders` int(11) DEFAULT NULL,
  `builtin` bit(1) NOT NULL,
  `descr` varchar(255) DEFAULT NULL,
  `ident` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ident` (`ident`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_dict
-- ----------------------------
INSERT INTO shs_dict VALUES ('1', '2014-03-11 23:04:40', '2014-03-11 23:04:40', '1', '', '学历', 'EDUC', '学历', null);
INSERT INTO shs_dict VALUES ('2', '2014-03-12 01:15:08', '2014-03-12 01:15:08', '2', '', '职业状态', 'OCCUP', '职业状态', null);
INSERT INTO shs_dict VALUES ('3', '2014-03-12 01:21:57', '2014-03-12 01:24:31', '3', '', '工作年限', 'WORK_PERIOD', '工作年限', null);
INSERT INTO shs_dict VALUES ('4', '2014-03-12 01:25:02', '2014-03-12 01:25:02', '4', '', '月收入', 'MONTHLY_INCOME', '月收入', null);
INSERT INTO shs_dict VALUES ('5', '2014-03-12 01:33:11', '2014-03-12 01:33:17', '5', '', '公司类别', 'CORP_TYPE', '公司类别', null);
INSERT INTO shs_dict VALUES ('6', '2014-03-12 01:39:01', '2014-03-12 01:39:01', '6', '', '公司行业', 'CORP_DOMAIN', '公司行业', null);
INSERT INTO shs_dict VALUES ('7', '2014-03-12 01:39:30', '2014-03-12 01:39:30', '7', '', '公司人员规模', 'CORP_STAFF_SIZE', '公司人员规模', null);
INSERT INTO shs_dict VALUES ('8', '2014-03-12 01:40:54', '2014-03-12 01:40:54', '8', '', '公司上年度经营额', 'CORP_PREV_YEAR_OPERATED_REVENUE', '公司上年度经营额', null);
INSERT INTO shs_dict VALUES ('9', '2014-03-12 01:46:52', '2014-03-12 01:46:52', '9', '', '公司资产规模', 'CORP_ASSET_SIZE', '公司资产规模', null);
INSERT INTO shs_dict VALUES ('10', '2014-03-12 01:47:20', '2014-03-12 01:47:20', '10', '', '公司注册资金', 'CORP_REGISTERED_CAPITAL', '公司注册资金', null);
INSERT INTO shs_dict VALUES ('11', '2014-03-12 02:01:59', '2014-03-12 02:01:59', '11', '', '每月信用卡账单', 'MONTHLY_CREDIT_CARD_STATEMENT', '每月信用卡账单', null);

-- ----------------------------
-- Table structure for `shs_dict_word`
-- ----------------------------
DROP TABLE IF EXISTS `shs_dict_word`;
CREATE TABLE `shs_dict_word` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `orders` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `param` varchar(255) NOT NULL,
  `dict` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6BD8A9E2AE4C80B5` (`dict`),
  CONSTRAINT `FK6BD8A9E2AE4C80B5` FOREIGN KEY (`dict`) REFERENCES `shs_dict` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shs_dict_word
-- ----------------------------
INSERT INTO shs_dict_word VALUES ('1', '2014-03-12 16:21:22', '2014-03-12 16:21:22', '1', '小学', '小学', '1');
INSERT INTO shs_dict_word VALUES ('2', '2014-03-12 16:21:40', '2014-03-12 16:21:40', '2', '初中', '初中', '1');
INSERT INTO shs_dict_word VALUES ('3', '2014-03-12 16:21:54', '2014-03-12 16:21:54', '3', '高中', '高中', '1');
INSERT INTO shs_dict_word VALUES ('4', '2014-03-12 16:22:12', '2014-03-12 16:22:12', '4', '大学', '大学', '1');
INSERT INTO shs_dict_word VALUES ('5', '2014-03-12 16:22:42', '2014-03-12 16:22:42', '5', '研究生', '研究生', '1');
INSERT INTO shs_dict_word VALUES ('6', '2014-03-12 16:23:14', '2014-03-12 16:23:14', '6', '博士及以上', '博士及以上', '1');
INSERT INTO shs_dict_word VALUES ('7', '2014-03-12 16:25:36', '2014-03-12 16:25:36', '1', '工薪阶层', '工薪阶层', '2');
INSERT INTO shs_dict_word VALUES ('8', '2014-03-12 16:25:59', '2014-03-12 16:25:59', '2', '个体工商户', '个体工商户', '2');
INSERT INTO shs_dict_word VALUES ('9', '2014-03-12 16:26:17', '2014-03-12 16:26:17', '3', '网络商家', '网络商家', '2');
INSERT INTO shs_dict_word VALUES ('10', '2014-03-12 16:26:54', '2014-03-12 16:26:54', '4', '自由工作者', '自由工作者', '2');
INSERT INTO shs_dict_word VALUES ('11', '2014-03-12 16:29:42', '2014-03-12 16:29:42', '5', '其他', '其他', '2');
INSERT INTO shs_dict_word VALUES ('12', '2014-03-12 16:31:12', '2014-03-12 16:31:12', '1', '1年（含1年）以下', '1年（含1年）以下', '3');
INSERT INTO shs_dict_word VALUES ('13', '2014-03-12 16:31:54', '2014-03-12 16:31:54', '2', '1-3年（含3年）', '1-3年（含3年）', '3');
INSERT INTO shs_dict_word VALUES ('14', '2014-03-12 16:32:20', '2014-03-12 16:32:20', '3', '3-5年（含5年）', '3-5年（含5年）', '3');
INSERT INTO shs_dict_word VALUES ('15', '2014-03-12 16:32:39', '2014-03-12 16:32:39', '4', '5年以上', '5年以上', '3');
INSERT INTO shs_dict_word VALUES ('16', '2014-03-12 16:33:54', '2014-03-12 16:34:38', '1', '1000元以下', '1000元以下', '4');
INSERT INTO shs_dict_word VALUES ('17', '2014-03-12 16:34:24', '2014-03-12 16:34:24', '2', '1000-2000元', '1000-2000元', '4');
INSERT INTO shs_dict_word VALUES ('18', '2014-03-12 16:35:15', '2014-03-12 16:35:15', '3', '2000-5000元', '2000-5000元', '4');
INSERT INTO shs_dict_word VALUES ('19', '2014-03-12 16:35:52', '2014-03-12 16:35:52', '4', '5000-10000元', '5000-10000元', '4');
INSERT INTO shs_dict_word VALUES ('20', '2014-03-12 16:36:15', '2014-03-12 16:36:15', '5', '10000-20000元', '10000-20000元', '4');
INSERT INTO shs_dict_word VALUES ('21', '2014-03-12 16:36:40', '2014-03-12 16:36:40', '6', '20000元以上', '20000元以上', '4');
INSERT INTO shs_dict_word VALUES ('22', '2014-03-12 16:37:25', '2014-03-12 16:37:25', '1', '国家机关', '国家机关', '5');
INSERT INTO shs_dict_word VALUES ('23', '2014-03-12 16:37:42', '2014-03-12 16:37:42', '2', '事业单位', '事业单位', '5');
INSERT INTO shs_dict_word VALUES ('24', '2014-03-12 16:38:11', '2014-03-12 16:38:11', '3', '央企（包括下级单位）', '央企（包括下级单位）', '5');
INSERT INTO shs_dict_word VALUES ('25', '2014-03-12 16:38:40', '2014-03-12 16:38:40', '4', '地方国资委直属企业', '地方国资委直属企业', '5');
INSERT INTO shs_dict_word VALUES ('26', '2014-03-12 16:39:18', '2014-03-12 16:39:18', '5', '世界500强（包括合资企业及下级单位）', '世界500强（包括合资企业及下级单位）', '5');
INSERT INTO shs_dict_word VALUES ('27', '2014-03-12 16:39:53', '2014-03-12 16:39:53', '6', '外资企业（包括合资企业）', '外资企业（包括合资企业）', '5');
INSERT INTO shs_dict_word VALUES ('28', '2014-03-12 16:40:12', '2014-03-12 16:40:12', '7', '一般上市公司（包括国外上市）', '一般上市公司（包括国外上市）', '5');
INSERT INTO shs_dict_word VALUES ('29', '2014-03-12 16:40:31', '2014-03-12 16:40:31', '8', '一般民营企业', '一般民营企业', '5');
INSERT INTO shs_dict_word VALUES ('30', '2014-03-12 16:40:45', '2014-03-12 16:40:45', '9', '个体经营者', '个体经营者', '5');
INSERT INTO shs_dict_word VALUES ('31', '2014-03-12 16:40:58', '2014-03-12 16:40:58', '10', '其他', '其他', '5');
INSERT INTO shs_dict_word VALUES ('32', '2014-03-12 16:41:59', '2014-03-12 16:41:59', '1', 'IT业', 'IT业', '6');
INSERT INTO shs_dict_word VALUES ('33', '2014-03-12 16:42:15', '2014-03-12 16:42:15', '2', '政府机关', '政府机关', '6');
INSERT INTO shs_dict_word VALUES ('34', '2014-03-12 16:42:28', '2014-03-12 16:42:28', '3', '媒体/广告', '媒体/广告', '6');
INSERT INTO shs_dict_word VALUES ('35', '2014-03-12 16:42:40', '2014-03-12 16:42:40', '4', '零售/批发', '零售/批发', '6');
INSERT INTO shs_dict_word VALUES ('36', '2014-03-12 16:42:52', '2014-03-12 16:42:52', '5', '教育/培训', '教育/培训', '6');
INSERT INTO shs_dict_word VALUES ('37', '2014-03-12 16:43:08', '2014-03-12 16:43:08', '6', '公共事业', '公共事业', '6');
INSERT INTO shs_dict_word VALUES ('38', '2014-03-12 16:43:20', '2014-03-12 16:43:20', '7', '交通运输业', '交通运输业', '6');
INSERT INTO shs_dict_word VALUES ('39', '2014-03-12 16:43:32', '2014-03-12 16:43:32', '8', '房地产业', '房地产业', '6');
INSERT INTO shs_dict_word VALUES ('40', '2014-03-12 16:43:46', '2014-03-12 16:43:46', '9', '能源业', '能源业', '6');
INSERT INTO shs_dict_word VALUES ('41', '2014-03-12 16:44:06', '2014-03-12 16:44:06', '10', '金融/法律', '金融/法律', '6');
INSERT INTO shs_dict_word VALUES ('42', '2014-03-12 16:44:22', '2014-03-12 16:44:22', '11', '餐饮/旅馆业', '餐饮/旅馆业', '6');
INSERT INTO shs_dict_word VALUES ('43', '2014-03-12 16:44:37', '2014-03-12 16:44:37', '12', '医疗/卫生/保健', '医疗/卫生/保健', '6');
INSERT INTO shs_dict_word VALUES ('44', '2014-03-12 16:44:53', '2014-03-12 16:44:53', '13', '建筑工程', '建筑工程', '6');
INSERT INTO shs_dict_word VALUES ('45', '2014-03-12 16:45:07', '2014-03-12 16:45:07', '14', '农业', '农业', '6');
INSERT INTO shs_dict_word VALUES ('46', '2014-03-12 16:45:22', '2014-03-12 16:45:22', '15', '娱乐服务业', '娱乐服务业', '6');
INSERT INTO shs_dict_word VALUES ('47', '2014-03-12 16:45:35', '2014-03-12 16:45:35', '16', '体育/艺术', '体育/艺术', '6');
INSERT INTO shs_dict_word VALUES ('48', '2014-03-12 16:45:57', '2014-03-12 16:45:57', '17', '公益组织', '公益组织', '6');
INSERT INTO shs_dict_word VALUES ('49', '2014-03-12 16:46:10', '2014-03-12 16:46:10', '18', '其它', '其它', '6');
INSERT INTO shs_dict_word VALUES ('50', '2014-03-12 16:47:44', '2014-03-12 16:47:44', '1', '10人以下', '10人以下', '7');
INSERT INTO shs_dict_word VALUES ('51', '2014-03-12 16:47:59', '2014-03-12 16:47:59', '2', '10-100人', '10-100人', '7');
INSERT INTO shs_dict_word VALUES ('52', '2014-03-12 16:48:19', '2014-03-12 16:48:19', '3', '100-500人', '100-500人', '7');
INSERT INTO shs_dict_word VALUES ('53', '2014-03-12 16:48:34', '2014-03-12 16:48:34', '4', '500人以上', '500人以上', '7');
INSERT INTO shs_dict_word VALUES ('65', '2014-03-12 17:03:06', '2014-03-12 17:04:26', '1', '100万元以下', '100万元以下', '9');
INSERT INTO shs_dict_word VALUES ('66', '2014-03-12 17:04:04', '2014-03-12 17:04:04', '2', '100万-500万元', '100万-500万元', '9');
INSERT INTO shs_dict_word VALUES ('67', '2014-03-12 17:04:54', '2014-03-12 17:04:54', '3', '500万-1000万元', '500万-1000万元', '9');
INSERT INTO shs_dict_word VALUES ('68', '2014-03-12 17:05:17', '2014-03-12 17:05:17', '4', '1000万元以上', '1000万元以上', '9');
INSERT INTO shs_dict_word VALUES ('69', '2014-03-12 17:06:00', '2014-04-18 18:25:54', '3', '100万元以下', '100万元以下', '10');
INSERT INTO shs_dict_word VALUES ('70', '2014-03-12 17:06:29', '2014-04-18 18:26:08', '4', '100万-500万元', '100万-500万元', '10');
INSERT INTO shs_dict_word VALUES ('71', '2014-03-12 17:06:55', '2014-04-18 18:26:21', '5', '500万-1000万元', '500万-1000万元', '10');
INSERT INTO shs_dict_word VALUES ('72', '2014-03-12 17:07:21', '2014-04-18 18:26:29', '6', '1000万元以上', '1000万元以上', '10');
INSERT INTO shs_dict_word VALUES ('85', '2014-03-13 16:32:02', '2014-03-13 16:32:02', '1', '50万元以下', '50万元以下', '8');
INSERT INTO shs_dict_word VALUES ('86', '2014-03-13 16:32:22', '2014-03-13 16:32:22', '2', '50万-100万元', '50万-100万元', '8');
INSERT INTO shs_dict_word VALUES ('87', '2014-03-13 16:32:49', '2014-03-13 16:32:49', '3', '100万-500万元', '100万-500万元', '8');
INSERT INTO shs_dict_word VALUES ('88', '2014-03-13 16:33:09', '2014-03-13 16:33:19', '4', '500万-1000万元', '500万-1000万元', '8');
INSERT INTO shs_dict_word VALUES ('89', '2014-03-13 16:33:38', '2014-03-13 16:33:38', '5', '1000万元以上', '1000万元以上', '8');
INSERT INTO shs_dict_word VALUES ('90', '2014-03-13 18:59:54', '2014-03-13 18:59:54', '3', '2000-5000元', '2000-5000元', '11');
INSERT INTO shs_dict_word VALUES ('91', '2014-03-13 19:00:24', '2014-03-13 19:00:24', '4', '5000元以上', '5000元以上', '11');
