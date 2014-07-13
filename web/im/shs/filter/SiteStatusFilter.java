package im.shs.filter;

import im.shs.util.SettingUtils;
import im.shs.web.setting.basic.BasicSetting;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * @class : SiteStatusFilter
 * @description: 网站状态
 * 
 * @author suhao
 * @date 2014年7月12日 下午10:36:11
 * @version 1.0
 */
@Component("siteStatusFilter")
public class SiteStatusFilter extends OncePerRequestFilter {

	/** 默认忽略URL */
	private static final String[] DEFAULT_IGNORE_URL_PATTERNS = new String[] { "/admin/**" };

	/** 默认重定向URL */
	private static final String DEFAULT_REDIRECT_URL = "/common/site_close";

	/** antPathMatcher */
	private static AntPathMatcher antPathMatcher = new AntPathMatcher();

	/** 忽略URL */
	private String[] ignoreUrlPatterns = DEFAULT_IGNORE_URL_PATTERNS;

	/** 重定向URL */
	private String redirectUrl = DEFAULT_REDIRECT_URL;

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// 判断是否开启网站
		BasicSetting setting = SettingUtils.get().getBasic();
		if (setting.getSiteEnabled()) {
			filterChain.doFilter(request, response);
		} else {
			// 判断是否请求路径为默认重定向URL
			String path = request.getServletPath();
			if (StringUtils.equals(path, redirectUrl)) {
				filterChain.doFilter(request, response);
			} else {
				if (ignoreUrlPatterns != null) {
					for (String ignoreUrlPattern : ignoreUrlPatterns) {
						if (antPathMatcher.match(ignoreUrlPattern, path)) {
							filterChain.doFilter(request, response);
							return;
						}
					}
				}
				response.sendRedirect(request.getContextPath() + redirectUrl);
			}
		}
	}

	public String[] getIgnoreUrlPatterns() {
		return ignoreUrlPatterns;
	}

	public void setIgnoreUrlPatterns(String[] ignoreUrlPatterns) {
		this.ignoreUrlPatterns = ignoreUrlPatterns;
	}

	public String getRedirectUrl() {
		return redirectUrl;
	}

	public void setRedirectUrl(String redirectUrl) {
		this.redirectUrl = redirectUrl;
	}

}