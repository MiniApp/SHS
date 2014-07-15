package im.shs.web.interceptor;

import im.shs.web.LogConfig;
import im.shs.web.entity.LogEntity;
import im.shs.web.service.AdminService;
import im.shs.web.service.LogConfigService;
import im.shs.web.service.LogService;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @class : LogInterceptor
 * @description: 日志
 *
 * @author suhao
 * @date 2014年7月14日 下午9:29:21
 * @version 1.0
 */
public class LogInterceptor extends HandlerInterceptorAdapter {

    /** 默认忽略参数 */
    private static final String[] DEFAULT_IGNORE_PARAMETERS = new String[] { "password", "rePassword",
            "currentPassword" };

    /** antPathMatcher */
    private static AntPathMatcher antPathMatcher = new AntPathMatcher();

    /** 忽略参数 */
    private String[] ignoreParameters = DEFAULT_IGNORE_PARAMETERS;

    @Resource(name = "logConfigServiceImpl")
    private LogConfigService logConfigService;

    @Resource(name = "logServiceImpl")
    private LogService logService;

    @Resource(name = "adminServiceImpl")
    private AdminService adminService;

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        List<LogConfig> logConfigs = logConfigService.getAll();
        if (logConfigs != null) {

            // 获取请求URL
            String path = request.getServletPath();

            for (LogConfig logConfig : logConfigs) {

                // 判断是否需要进行日志记录
                if (StringUtils.equalsIgnoreCase(request.getMethod(), logConfig.getMethodPattern())
                        && antPathMatcher.match(logConfig.getUrlPattern(), path)) {

                    // 日志参数
                    String username = adminService.getCurrentUsername();
                    String operation = logConfig.getOperation();
                    String operator = username;
                    String content = (String) request.getAttribute(LogEntity.CONT_ATTR_NAME);
                    String ip = request.getRemoteAddr();

                    // 移除请求中日志内容
                    request.removeAttribute(LogEntity.CONT_ATTR_NAME);

                    // 获取请求参数
                    StringBuffer parameter = new StringBuffer();
                    Map<String, String[]> parameterMap = request.getParameterMap();
                    if (parameterMap != null) {
                        for (Entry<String, String[]> entry : parameterMap.entrySet()) {
                            String parameterName = entry.getKey();
                            if (!ArrayUtils.contains(ignoreParameters, parameterName)) {
                                String[] parameterValues = entry.getValue();
                                if (parameterValues != null) {
                                    for (String parameterValue : parameterValues) {
                                        parameter.append(parameterName + " = " + parameterValue + "\n");
                                    }
                                }
                            }
                        }
                    }

                    // 保存日志
                    LogEntity log = new LogEntity();
                    log.setOperation(operation);
                    log.setOperator(operator);
                    log.setCont(content);
                    log.setParam(parameter.toString());
                    log.setIp(ip);
                    logService.save(log);

                    break;
                }
            }
        }
    }

    /**
     * 设置忽略参数
     * 
     * @return 忽略参数
     */
    public String[] getIgnoreParameters() {
        return ignoreParameters;
    }

    /**
     * 设置忽略参数
     * 
     * @param ignoreParameters
     *            忽略参数
     */
    public void setIgnoreParameters(String[] ignoreParameters) {
        this.ignoreParameters = ignoreParameters;
    }

}