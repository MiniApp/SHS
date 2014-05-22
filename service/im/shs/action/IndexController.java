package im.shs.action;
import im.shs.base.AbstractService;
import im.shs.shiro.entity.User;
import im.shs.shiro.entity.Users;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
  
@Controller("index")
public class IndexController extends AbstractService {  
  
    @RequestMapping(value = "/index", method = RequestMethod.GET)  
    @Transactional
    public String showMessage(  
            HttpServletRequest request, HttpServletResponse response) {  
        // TODO 处理请求  
    	System.out.println("hello world");
    	Users p = new Users();
    	p.setName("rew");
    	System.out.println("d:"+p.getName());
        return "/index"; // 设置返回页面，这里对应 /WEB-INF/view 目录下的 message.ftl 文件  
    }
}  