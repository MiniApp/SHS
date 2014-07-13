package im.shs.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * @class : AccessDeniedFilter
 * @description: 限制访问
 * 
 * @author suhao
 * @date 2014年7月12日 下午10:33:17
 * @version 1.0
 */
public class AccessDeniedFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest servletRequest,
			ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		response.addHeader("PoweredBy", "HoDoz.com");
		response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
	}

	@Override
	public void destroy() {
	}

}