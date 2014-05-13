/**    
 * Class Name：	
 *			LoginBean.java
 * Version：	1.1   
 * Date：	2014-4-9       
 * Copyright	
 */
package im.shs.base.security.bean;

import java.io.IOException;  

import javax.faces.bean.ManagedBean;  
import javax.faces.bean.RequestScoped;  
import javax.faces.context.ExternalContext;  
import javax.faces.context.FacesContext;  
 
import javax.servlet.RequestDispatcher;  
import javax.servlet.ServletException;  
import javax.servlet.ServletRequest;  
import javax.servlet.ServletResponse;  
 
/**  
 * LoginBean  
 *   
 * @author Administrator  
 * @version [1.0.0, 2012-8-6]  
 *   
 */ 
@ManagedBean(name = "loginBean")  
@RequestScoped 
public class LoginBean  
{  
    //将请求转发到/j_spring_security_check进行用户登录认证  
    public String doLogin() throws IOException, ServletException {  
        ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();  
 
        RequestDispatcher dispatcher = ((ServletRequest) context.getRequest())  
            .getRequestDispatcher("/j_spring_security_check_test");  
 
        dispatcher.forward((ServletRequest) context.getRequest(),  
            (ServletResponse) context.getResponse());  
 
        FacesContext.getCurrentInstance().responseComplete();  
 
        // It's OK to return null here because Faces is just going to exit.  
        return null;  
    }
 
}  