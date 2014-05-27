package im.shs.action;
import java.util.Random;

import im.shs.base.AbstractService;
import im.shs.shiro.entity.Users;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
  
@Controller("index")
public class IndexController extends AbstractService {  
  
    @RequestMapping(value = "/index", method = RequestMethod.GET)  
    public String showMessage(  
            HttpServletRequest request, HttpServletResponse response) {  
        // TODO 处理请求  
    	System.out.println("hello world");
    	Users p = new Users();
    	p.setName("rew" + new Random().nextInt());
    	this.getPersist().persist(p);
    	Users uy = this.getPersist().find(Users.class, p.getId());
    	System.out.println("uy:"+uy.getName());
    	uy.setName("Suhao");
    	this.getPersist().merge(uy);
        return "/index"; // 设置返回页面，这里对应 /WEB-INF/view 目录下的 message.ftl 文件  
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)  
    public String login(){
    	
    	return "login";
    }
    
    @RequestMapping("/hello1")
    public String hello1() {
        SecurityUtils.getSubject().checkRoles("admin","user");
        return "success";
    }

    @RequiresRoles("admin")
    @RequestMapping("/hello2")
    public String hello2() {
        return "success";
    }
    
    @RequestMapping("/unauthorized")
    public String unauthorized(){
    	
    	return "unauthorized";
    }
}  