package im.shs.web.util;

import org.apache.commons.lang3.StringUtils;

/**
 * Utils - 保密格式化
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public final class SecrecyUtils {

    /** 邮箱地址“@”字符 */
    private static final String EMAIL_AT_CHAR = "@";

    /** 默认“替换字符” */
    private static final String DEFAULT_REPLACE_CHAR = "*";

    /** “替换字符”分隔符 */
    private static final String REPLACE_CHAR_SEPARATOR = " ";

    /**
     * 不可实例化
     */
    private SecrecyUtils() {
    }

    /**
     * 格式化用户名
     * 
     * @param username
     *            用户名
     * @param replaceChar
     *            替换字符
     * @param replaceChar
     *            替换字符
     * @return 格式化后的用户名
     */
    public static String toUsername(String username, String replaceChar) {

        // 验证参数
        if (StringUtils.isBlank(username)) {
            return null;
        }

        // 获取并验证用户名长度
        int usernameLength = StringUtils.length(username);
        if (usernameLength < 2) {
            return StringUtils.left(username, 1) + DEFAULT_REPLACE_CHAR;
        }

        // 创建格式化字符串
        // 获取并添加用户名第一个字符
        StringBuffer format = new StringBuffer(StringUtils.left(username, 1));
        // 添加替换字符
        format.append(REPLACE_CHAR_SEPARATOR);
        format.append(StringUtils.isBlank(replaceChar) ? StringUtils.rightPad(DEFAULT_REPLACE_CHAR, usernameLength - 2,
                DEFAULT_REPLACE_CHAR) : replaceChar);
        format.append(REPLACE_CHAR_SEPARATOR);
        // 获取并添加用户名最后个字符
        format.append(StringUtils.substring(username, usernameLength - 1, usernameLength));

        return format.toString();
    }

    /**
     * 格式化姓名
     * 
     * @param name
     *            姓名
     * @param replaceChar
     *            替换字符
     * @return 格式化后的姓名
     */
    public static String toName(String name, String replaceChar) {

        // 验证参数
        if (StringUtils.isBlank(name)) {
            return null;
        }

        // 获取并验证姓名长度
        int nameLength = StringUtils.length(name);
        if (nameLength < 2) {
            return null;
        }

        // 创建格式化字符串
        // 获取并添加姓名第一个字符
        StringBuffer format = new StringBuffer(StringUtils.left(name, 1));
        // 添加替换字符
        format.append(REPLACE_CHAR_SEPARATOR);
        format.append(StringUtils.isBlank(replaceChar) ? StringUtils.rightPad(DEFAULT_REPLACE_CHAR, nameLength - 1,
                DEFAULT_REPLACE_CHAR) : replaceChar);

        return format.toString();
    }

    /**
     * 格式化姓名
     * 
     * @param surname
     *            姓氏
     * @param firstname
     *            名字
     * @param replaceChar
     *            替换字符
     * @return 格式化后的姓名
     */
    public static String toName(String surname, String firstname, String replaceChar) {

        // 验证参数
        if (StringUtils.isBlank(surname) || StringUtils.isBlank(firstname)) {
            return null;
        }

        // 获取名字长度
        int firstnameLength = StringUtils.length(firstname);

        // 创建格式化字符串
        // 添加姓氏
        StringBuffer format = new StringBuffer(surname);
        // 添加替换字符
        format.append(REPLACE_CHAR_SEPARATOR);
        format.append(StringUtils.isBlank(replaceChar) ? StringUtils.rightPad(DEFAULT_REPLACE_CHAR, firstnameLength,
                DEFAULT_REPLACE_CHAR) : replaceChar);

        return format.toString();
    }

    /**
     * 格式化邮箱地址
     * 
     * @param email
     *            邮箱地址
     * @param replaceChar
     *            替换字符
     * @return 格式化后的邮箱地址
     */
    public static String toEmail(String email, String replaceChar) {

        // 验证参数
        if (StringUtils.isBlank(email)) {
            return null;
        }

        // 获取并验证阿特索引位置
        int atIndex = StringUtils.indexOf(email, EMAIL_AT_CHAR);
        if (atIndex == -1) {
            return null;
        }

        // 获取邮箱地址长度
        int emailLength = StringUtils.length(email);
        // 获取邮箱用户名
        String emailUserName = StringUtils.left(email, atIndex);
        // 获取邮箱用户名长度
        int emailUserNameLength = StringUtils.length(emailUserName);

        // 创建格式化字符串
        // 获取并添加邮箱用户名第一个字符
        StringBuffer format = new StringBuffer(StringUtils.left(emailUserName, 1));
        // 添加替换字符
        format.append(REPLACE_CHAR_SEPARATOR);
        format.append(StringUtils.isBlank(replaceChar) ? StringUtils.rightPad(DEFAULT_REPLACE_CHAR,
                emailUserNameLength - 1, DEFAULT_REPLACE_CHAR) : replaceChar);
        format.append(REPLACE_CHAR_SEPARATOR);
        // 获取并添加邮箱用户名以后的邮箱地址字符
        format.append(StringUtils.substring(email, atIndex, emailLength));

        return format.toString();
    }

    /**
     * 格式化手机号码
     * 
     * @param mobile
     *            手机号码
     * @param replaceChar
     *            替换字符
     * @return 格式化后的手机号码
     */
    public static String toMobile(String mobile, String replaceChar) {

        // 验证参数
        if (StringUtils.isBlank(mobile) || StringUtils.length(mobile) != 11) {
            return null;
        }

        // 创建格式化字符串
        // 获取并添加手机号码前3位字符
        StringBuffer format = new StringBuffer(StringUtils.left(mobile, 3));
        // 添加替换字符
        format.append(REPLACE_CHAR_SEPARATOR);
        format.append(StringUtils.isBlank(replaceChar) ? StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 4,
                DEFAULT_REPLACE_CHAR) : replaceChar);
        format.append(REPLACE_CHAR_SEPARATOR);
        // 获取并添加手机号码后4位字符
        format.append(StringUtils.substring(mobile, 7, 11));

        return format.toString();
    }

    /**
     * 格式化身份证号码
     * 
     * @param identity
     *            身份证号码
     * @param replaceChar
     *            替换字符
     * @return 格式化后的身份证号码
     */
    public static String toIdNo(String identity, String replaceChar) {

        // 验证参数
        if (StringUtils.isBlank(identity)) {
            return null;
        }

        // 获取并验证身份证号码长度
        int identityLength = StringUtils.length(identity);
        if (identityLength != 15 && identityLength != 18) {
            return null;
        }

        // 创建格式化字符串
        // 获取并添加身份证号码前2位字符
        StringBuffer format = new StringBuffer(StringUtils.left(identity, 2));
        // 添加替换字符
        if (StringUtils.isBlank(replaceChar)) {
            // 15位身份证号码
            if (identityLength == 15) {
                format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 4, DEFAULT_REPLACE_CHAR));
                format.append(REPLACE_CHAR_SEPARATOR);
                format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 6, DEFAULT_REPLACE_CHAR));
                format.append(REPLACE_CHAR_SEPARATOR);
                format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 3, DEFAULT_REPLACE_CHAR));
            }
            // 18位身份账号
            else {
                format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 4, DEFAULT_REPLACE_CHAR));
                format.append(REPLACE_CHAR_SEPARATOR);
                format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 4, DEFAULT_REPLACE_CHAR));
                format.append(REPLACE_CHAR_SEPARATOR);
                format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 4, DEFAULT_REPLACE_CHAR));
            }
        } else {
            format.append(replaceChar);
        }

        return format.toString();
    }

    /**
     * 格式化银行卡号
     * 
     * @param backcard
     *            银行卡号
     * @param replaceChar
     *            替换字符
     * @return 格式化后的银行卡号
     */
    public static String toBackCard(String backcard, String replaceChar) {

        // 验证参数
        if (StringUtils.isBlank(backcard)) {
            return null;
        }

        // 获取并验证银行卡号长度
        int identityLength = StringUtils.length(backcard);
        if (identityLength < 12 || identityLength > 19) {
            return null;
        }

        // 创建格式化字符串
        // 获取并添加银行卡号前4位字符
        StringBuffer format = new StringBuffer(StringUtils.right(backcard, 4));
        // 添加替换字符
        if (StringUtils.isBlank(replaceChar)) {
            format.append(REPLACE_CHAR_SEPARATOR);
            format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 4, DEFAULT_REPLACE_CHAR));
            format.append(REPLACE_CHAR_SEPARATOR);
            format.append(StringUtils.rightPad(DEFAULT_REPLACE_CHAR, 4, DEFAULT_REPLACE_CHAR));
            format.append(REPLACE_CHAR_SEPARATOR);
        } else {
            format.append(replaceChar);
        }
        // 获取并添加银行卡号后4位字符
        format.append(StringUtils.right(backcard, 4));

        return format.toString();
    }

}