package im.shs.web.interceptor;

import im.shs.web.util.WebUtils;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @class : TokenInterceptor
 * @description: 令牌
 *
 * @author suhao
 * @date 2014年7月14日 下午9:30:12
 * @version 1.0
 */
public class TokenInterceptor extends HandlerInterceptorAdapter {

    /** "令牌"属性名称 */
    private static final String TOKEN_ATTRIBUTE_NAME = "token";

    /** "令牌"Cookie名称 */
    private static final String TOKEN_COOKIE_NAME = "token";

    /** "令牌"参数名称 */
    private static final String TOKEN_PARAMETER_NAME = "token";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 令牌Cookie
        String token = WebUtils.getCookie(request, TOKEN_COOKIE_NAME);

        // 判断是否为GET方式请求
        String requestMethod = request.getMethod();
        if (StringUtils.equalsIgnoreCase(requestMethod, "GET")) {
            // 绑定令牌Cookie
            if (token == null) {
                token = UUID.randomUUID().toString();
                WebUtils.addCookie(request, response, TOKEN_COOKIE_NAME, token);
            }
            request.setAttribute(TOKEN_ATTRIBUTE_NAME, token);
            return true;
        } else {
            // 判断是否为AJAX请求（请求方式：AJAX异步请求）
            String requestType = request.getHeader("X-Requested-With");
            if (StringUtils.equalsIgnoreCase(requestType, "XMLHttpRequest")) {
                // 验证是否为正确令牌
                if (StringUtils.equals(token, request.getHeader(TOKEN_PARAMETER_NAME))) {
                    return true;
                }
                // 限制访问
                response.addHeader("tokenStatus", "Access Denied");
            } else {
                // 验证是否为正确令牌
                if (StringUtils.equals(token, request.getParameter(TOKEN_PARAMETER_NAME))) {
                    return true;
                }
            }
            // 绑定令牌Cookie
            if (token == null) {
                WebUtils.addCookie(request, response, TOKEN_COOKIE_NAME, UUID.randomUUID().toString());
            }
            // 限制访问
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Bad Or Missing Token");
            return false;
        }
    }

}