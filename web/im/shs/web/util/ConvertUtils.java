/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.util;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * Utils - 转换
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public final class ConvertUtils {

    /**
     * 不可实例化
     */
    private ConvertUtils() {
    }

    /**
     * 转换关键字
     * 
     * @param str
     *            需要转换的字符串
     * 
     * @return 关键字
     */
    public static String toKeyword(String str) {
        if (StringUtils.isBlank(str)) {
            return null;
        }
        return str.replaceAll("[,\\s]*,[,\\s]*", ",").replaceAll("^,|,$", "");
    }

    /**
     * 转换非空字符串
     * 
     * @param str
     *            需要转换的字符串
     * 
     * @return 非空字符串
     */
    public static String toNotEmpty(String str) {
        if (StringUtils.isBlank(str)) {
            return null;
        }
        return str.replaceAll("\\s*|\t|\r|\n", "");
    }

    /**
     * 转换目录路径
     * 
     * @param str
     *            需要转换的字符串
     * 
     * @return 目录路径
     */
    public static String toDirectoryPath(String str) {
        if (StringUtils.isBlank(str)) {
            return null;
        }
        if (!StringUtils.startsWith(str, "/")) {
            str = "/" + str;
        }
        if (!StringUtils.endsWith(str, "/")) {
            str += "/";
        }
        return str;
    }

    /**
     * 转换组合枚举
     * 
     * @param enums
     *            枚举数组
     * 
     * @return 目录路径
     */
    public static String toEnums(Enum<?>... enums) {
        if (enums == null) {
            return null;
        }
        StringBuffer str = new StringBuffer();
        for (int i = 0; i < enums.length; i++) {
            str.append("." + enums[i]);
        }
        str.deleteCharAt(0);
        return str.toString();
    }

    /**
     * 转换三目运算
     * 
     * @param bool
     *            布尔值
     * @param result1
     *            结果1
     * @param result2
     *            结果1
     * 
     * @return 三目运算结果
     */
    public static String toTernary(String bool, String result1, String result2) {
        return BooleanUtils.isTrue(BooleanUtils.toBoolean(bool)) ? result1 : result2;
    }

    /**
     * 转换数字字符串
     * 
     * @param str
     *            需要转换的字符串
     * 
     * @return 转换后的数字字符串
     */
    public static String toIntStr(String str) {
        if (StringUtils.isBlank(str)) {
            return null;
        }
        StringBuffer intStr = new StringBuffer();
        char strChar;
        for (int i = 0; i < str.length(); i++) {
            strChar = str.charAt(i);
            // 当字符是否为数字时
            if (strChar >= 48 && strChar <= 57) {
                intStr.append(strChar);
            }
        }
        return intStr.toString();
    }

    /**
     * 转换数字
     * 
     * @param str
     *            需要转换的字符串
     * 
     * @return 转换后的数字
     */
    public static Integer toInt(String str) {
        String intStr = toIntStr(str);
        return StringUtils.isNotBlank(intStr) ? Integer.valueOf(intStr) : null;
    }
    
}