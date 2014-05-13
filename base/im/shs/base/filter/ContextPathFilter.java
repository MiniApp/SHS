package im.shs.base.filter;

import im.shs.base.Constants;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**    
 *         
 * Class Name：
 *			ContextPathFilter    
 * Description：    
 *			用户设置当前web环境上下文，方便如JSP页面使用
 * @Author：	suhao
 * @Date：	2013-8-28 下午7:59:45    
 * @version	
 *     
 */
public class ContextPathFilter implements Filter {

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		String contextPath = ((HttpServletRequest) request).getContextPath();
		request.setAttribute(Constants.CONTEXT_PATH, contextPath);
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
