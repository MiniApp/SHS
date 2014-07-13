package im.shs.util;

import im.shs.web.setting.basic.BasicSetting;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Assert;

/**
 * @class : WebUtils
 * @description: Web
 *
 * @author suhao
 * @date 2014年7月13日 上午1:28:56
 * @version 1.0
 */
public final class WebUtils {

    /**
     * 不可实例化
     */
    private WebUtils() {
    }

    /**
     * 添加Cookie
     * 
     * @param request
     *            HttpServletRequest
     * @param response
     *            HttpServletResponse
     * @param name
     *            Cookie名称
     * @param value
     *            Cookie值
     * @param maxAge
     *            有效期(单位：秒)
     * @param path
     *            路径
     * @param domain
     *            域
     * @param secure
     *            是否启用加密
     */
    public static void addCookie(HttpServletRequest request, HttpServletResponse response, String name, String value,
            Integer maxAge, String path, String domain, Boolean secure) {

        Assert.notNull(request);
        Assert.notNull(response);
        Assert.hasText(name);

        try {
            name = URLEncoder.encode(name, "UTF-8");
            value = URLEncoder.encode(value, "UTF-8");
            Cookie cookie = new Cookie(name, value);
            if (maxAge != null) {
                cookie.setMaxAge(maxAge);
            }
            if (StringUtils.isNotBlank(path)) {
                cookie.setPath(path);
            }
            if (StringUtils.isNotBlank(domain)) {
                cookie.setDomain(domain);
            }
            if (secure != null) {
                cookie.setSecure(secure);
            }
            response.addCookie(cookie);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 添加Cookie
     * 
     * @param request
     *            HttpServletRequest
     * @param response
     *            HttpServletResponse
     * @param name
     *            Cookie名称
     * @param value
     *            Cookie值
     * @param maxAge
     *            有效期(单位：秒)
     */
    public static void addCookie(HttpServletRequest request, HttpServletResponse response, String name, String value,
            Integer maxAge) {
        BasicSetting setting = SettingUtils.get().getBasic();
        addCookie(request, response, name, value, maxAge, setting.getCookiePath(), setting.getCookieDomain(), null);
    }

    /**
     * 添加Cookie
     * 
     * @param request
     *            HttpServletRequest
     * @param response
     *            HttpServletResponse
     * @param name
     *            Cookie名称
     * @param value
     *            Cookie值
     */
    public static void addCookie(HttpServletRequest request, HttpServletResponse response, String name, String value) {
        BasicSetting setting = SettingUtils.get().getBasic();
        addCookie(request, response, name, value, null, setting.getCookiePath(), setting.getCookieDomain(), null);
    }

    /**
     * 获取Cookie
     * 
     * @param request
     *            HttpServletRequest
     * @param name
     *            Cookie名称
     * @return 不存在时返回NULL
     */
    public static String getCookie(HttpServletRequest request, String name) {

        Assert.notNull(request);
        Assert.hasText(name);

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            try {
                name = URLEncoder.encode(name, "UTF-8");
                for (Cookie cookie : cookies) {
                    if (name.equals(cookie.getName())) {
                        return URLDecoder.decode(cookie.getValue(), "UTF-8");
                    }
                }
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * 移除Cookie
     * 
     * @param request
     *            HttpServletRequest
     * @param response
     *            HttpServletResponse
     * @param name
     *            Cookie名称
     * @param path
     *            路径
     * @param domain
     *            域
     */
    public static void removeCookie(HttpServletRequest request, HttpServletResponse response, String name, String path,
            String domain) {

        Assert.notNull(request);
        Assert.notNull(response);
        Assert.hasText(name);

        try {
            name = URLEncoder.encode(name, "UTF-8");
            Cookie cookie = new Cookie(name, null);
            cookie.setMaxAge(0);
            if (StringUtils.isNotBlank(path)) {
                cookie.setPath(path);
            }
            if (StringUtils.isNotBlank(domain)) {
                cookie.setDomain(domain);
            }
            response.addCookie(cookie);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 移除Cookie
     * 
     * @param request
     *            HttpServletRequest
     * @param response
     *            HttpServletResponse
     * @param name
     *            Cookie名称
     */
    public static void removeCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        BasicSetting setting = SettingUtils.get().getBasic();
        removeCookie(request, response, name, setting.getCookiePath(), setting.getCookieDomain());
    }

    /**
     * 重构Session（防止Session Fixation攻击）
     * 
     * @param request
     *            HttpServletRequest
     * @param session
     *            HttpSession
     */
    public static void refactorSession(HttpServletRequest request) {

        // 销毁Session
        HttpSession session = request.getSession();
        Map<String, Object> attributes = new HashMap<String, Object>();
        Enumeration<?> keys = session.getAttributeNames();
        while (keys.hasMoreElements()) {
            String key = (String) keys.nextElement();
            attributes.put(key, session.getAttribute(key));
        }
        session.invalidate();

        // 重造Session
        session = request.getSession();
        for (Entry<String, Object> entry : attributes.entrySet()) {
            session.setAttribute(entry.getKey(), entry.getValue());
        }
    }

    /**
     * 获取参数
     * 
     * @param queryString
     *            查询字符串
     * @param encoding
     *            编码格式
     * @param name
     *            参数名称
     * @return 参数
     */
    public static String getParameter(String queryString, String encoding, String name) {
        String[] parameterValues = getParameterMap(queryString, encoding).get(name);
        return parameterValues != null && parameterValues.length > 0 ? parameterValues[0] : null;
    }

    /**
     * 获取参数
     * 
     * @param queryString
     *            查询字符串
     * @param encoding
     *            编码格式
     * @param name
     *            参数名称
     * @return 参数
     */
    public static String[] getParameterValues(String queryString, String encoding, String name) {
        return getParameterMap(queryString, encoding).get(name);
    }

    /**
     * 获取参数
     * 
     * @param queryString
     *            查询字符串
     * @param encoding
     *            编码格式
     * @return 参数
     */
    public static Map<String, String[]> getParameterMap(String queryString, String encoding) {
        Map<String, String[]> parameterMap = new HashMap<String, String[]>();
        Charset charset = Charset.forName(encoding);
        if (StringUtils.isNotBlank(queryString)) {
            byte[] bytes = queryString.getBytes(charset);
            if (bytes != null && bytes.length > 0) {
                int ix = 0;
                int ox = 0;
                String key = null;
                String value = null;
                while (ix < bytes.length) {
                    byte c = bytes[ix++];
                    switch ((char) c) {
                        case '&':
                            value = new String(bytes, 0, ox, charset);
                            if (key != null) {
                                putMapEntry(parameterMap, key, value);
                                key = null;
                            }
                            ox = 0;
                            break;
                        case '=':
                            if (key == null) {
                                key = new String(bytes, 0, ox, charset);
                                ox = 0;
                            } else {
                                bytes[ox++] = c;
                            }
                            break;
                        case '+':
                            bytes[ox++] = (byte) ' ';
                            break;
                        case '%':
                            bytes[ox++] = (byte) ((convertHexDigit(bytes[ix++]) << 4) + convertHexDigit(bytes[ix++]));
                            break;
                        default:
                            bytes[ox++] = c;
                    }
                }
                if (key != null) {
                    value = new String(bytes, 0, ox, charset);
                    putMapEntry(parameterMap, key, value);
                }
            }
        }
        return parameterMap;
    }

    /**
     * 根据Map获取name键得到值，将值对应字符串数组最后添加一个组件
     * 
     * @param map
     *            Map集合
     * @param name
     *            name键
     * @param value
     *            需要添加的组件（字符串）
     */
    private static void putMapEntry(Map<String, String[]> map, String name, String value) {
        String[] newValues = null;
        String[] oldValues = map.get(name);
        if (oldValues == null) {
            newValues = new String[] { value };
        } else {
            newValues = new String[oldValues.length + 1];
            // 从指定源数组中复制一个数组，复制从指定的位置开始，到目标数组的指定位置结束。
            System.arraycopy(oldValues, 0, newValues, 0, oldValues.length);
            newValues[oldValues.length] = value;
        }
        map.put(name, newValues);
    }

    /**
     * 转换为十六进制
     * 
     * @param b
     *            需要转换的字节
     * @return 转换后的字节
     */
    private static byte convertHexDigit(byte b) {
        if ((b >= '0') && (b <= '9')) {
            return (byte) (b - '0');
        }
        if ((b >= 'a') && (b <= 'f')) {
            return (byte) (b - 'a' + 10);
        }
        if ((b >= 'A') && (b <= 'F')) {
            return (byte) (b - 'A' + 10);
        }
        throw new IllegalArgumentException();
    }

}