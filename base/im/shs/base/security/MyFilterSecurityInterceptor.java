/**    
 * Class Name：	
 *			MyFilterSecurityInterceptor.java
 * Version：	1.1   
 * Date：	2014-4-4       
 * Copyright	
 */
package im.shs.base.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

public class MyFilterSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {
    //与applicationContext-security.xml里的myFilter的属性securityMetadataSource对应，  
    //其他的两个组件，已经在AbstractSecurityInterceptor定义  
    private FilterInvocationSecurityMetadataSource securityMetadataSource;

    @Override
    public SecurityMetadataSource obtainSecurityMetadataSource() {
        return this.securityMetadataSource;
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        FilterInvocation fi = new FilterInvocation(request, response, chain);
        invoke(fi);
    }

    private void invoke(FilterInvocation fi) throws IOException, ServletException {
        // object为FilterInvocation对象  
        //super.beforeInvocation(fi);源码  
        //1.获取请求资源的权限  
        //执行Collection<ConfigAttribute> attributes = SecurityMetadataSource.getAttributes(object);  
        //2.是否拥有权限  
        //this.accessDecisionManager.decide(authenticated, object, attributes);  
        InterceptorStatusToken token = super.beforeInvocation(fi);
        try {
            fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
        } finally {
            super.afterInvocation(token, null);
        }
    }

    public FilterInvocationSecurityMetadataSource getSecurityMetadataSource() {
        return securityMetadataSource;
    }

    public void setSecurityMetadataSource(FilterInvocationSecurityMetadataSource securityMetadataSource) {
        this.securityMetadataSource = securityMetadataSource;
    }

    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub  
    }

    public void destroy() {
        // TODO Auto-generated method stub  

    }

    @Override
    public Class<? extends Object> getSecureObjectClass() {
        //下面的MyAccessDecisionManager的supports方面必须放回true,否则会提醒类型错误  
        return FilterInvocation.class;
    }
}
