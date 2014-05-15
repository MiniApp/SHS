package im.shs.action;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
  
@Controller("index")
@RequestMapping("/index")
public class IndexController {  
  
    @RequestMapping(value = "/index", method = RequestMethod.GET)  
    public String showMessage(  
            HttpServletRequest request, HttpServletResponse response) {  
        // TODO 处理请求  
    	System.out.println("hello world");
        return "/index"; // 设置返回页面，这里对应 /WEB-INF/view 目录下的 message.ftl 文件  
    }
}  