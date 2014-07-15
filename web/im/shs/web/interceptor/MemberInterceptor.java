package im.shs.web.interceptor;

import im.shs.web.Principal;
import im.shs.web.entity.MemberEntity;
import im.shs.web.util.WebUtils;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @class : MemberInterceptor
 * @description: 会员
 *
 * @author suhao
 * @date 2014年7月14日 下午9:45:21
 * @version 1.0
 */
public class MemberInterceptor extends HandlerInterceptorAdapter {

    /** "重定向URL"参数名称 */
    private static final String REDIRECT_URL_PARAMETER_NAME = "redirectUrl";

    /** 默认登录URL */
    private static final String DEFAULT_LOGIN_URL = "/login";

    @Value("${url_escaping_charset}")
    private String urlEscapingCharset;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();

        // 判断是否当前身份已登录
        Principal principal = (Principal) session.getAttribute(MemberEntity.PRINCIPAL_ATTR_NAME);
        if (principal != null) {
            return true;
        } else {
            // 注销Cookie
            WebUtils.removeCookie(request, response, MemberEntity.USERNAME_COOKIE_NAME);
            // 判断是否为AJAX请求（请求方式：AJAX异步请求）
            String requestType = request.getHeader("X-Requested-With");
            if (StringUtils.equalsIgnoreCase(requestType, "XMLHttpRequest")) {
                // 限制访问
                response.addHeader("loginStatus", "Access Denied");
                response.sendError(HttpServletResponse.SC_FORBIDDEN);
            } else {
                // 判断是否为GET方式请求
                String requestMethod = request.getMethod();
                if (StringUtils.equalsIgnoreCase(requestMethod, "GET")) {
                    // 设置重定向URL
                    String redirectUrl = request.getQueryString() != null ? request.getRequestURI() + "?"
                            + request.getQueryString() : request.getRequestURI();
                    response.sendRedirect(request.getContextPath() + DEFAULT_LOGIN_URL + "?"
                            + REDIRECT_URL_PARAMETER_NAME + "=" + URLEncoder.encode(redirectUrl, urlEscapingCharset));
                } else {
                    response.sendRedirect(request.getContextPath() + DEFAULT_LOGIN_URL);
                }
            }
            return false;
        }
    }

}