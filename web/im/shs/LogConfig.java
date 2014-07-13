package im.shs;

import java.io.Serializable;

/**
 * @class : LogConfig
 * @description: 日志配置
 *
 * @author suhao
 * @date 2014年7月13日 上午12:17:53
 * @version 1.0
 */
public class LogConfig implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = 3468202390981367725L;

    /** logConfig.xml文件路径 */
    public static final String XML_PATH = "/logConfig.xml";

    /** 操作名称 */
    private String operation;

    /** 请求URL */
    private String urlPattern;

    /** 请求Method */
    private String methodPattern;

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getUrlPattern() {
        return urlPattern;
    }

    public void setUrlPattern(String urlPattern) {
        this.urlPattern = urlPattern;
    }

    public String getMethodPattern() {
        return methodPattern;
    }

    public void setMethodPattern(String methodPattern) {
        this.methodPattern = methodPattern;
    }

    /**
     * 重写toString方法
     * 
     * @return 操作名称
     */
    @Override
    public String toString() {
        return getOperation();
    }

}