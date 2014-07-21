package im.shs.web.action;

import im.shs.web.bean.User;
import im.shs.web.service.IndexService;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("index")
public class IndexController {
	@Autowired
	private IndexService indexService;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String showMessage(HttpServletRequest request,
			HttpServletResponse response) {
		/*System.out.println("hello world");
		Users p = new Users();
		p.setName("update before:" + new Random().nextInt());
		indexService.save(p);
		System.out.println("update before:" + p.getName());
		Users uy = indexService.find(p.getId());
		uy.setName("update after:Suhao" + new Random().nextInt());
		indexService.update(uy);
		System.out.println("update after:" + uy.getName());
		indexService.delete(indexService.find(uy.getId()-1));*/
		return "/index";
	}

	@RequestMapping(value = "/index/test", method = RequestMethod.POST)
	public String test(User user, ModelMap model) {
		/*List list = new ArrayList();
		for (int i = 0; i < 10; i++) {
			Users p = new Users();
			p.setName(DateUtils.getNowTime() + " : " + user.getName() + " "
					+ user.getAge() + " " + new Random().nextInt());
			list.add(p);
		}
		model.addAttribute("list", list);*/
		return "/test";
	}

	@RequestMapping(value = "/index/test2", method = RequestMethod.POST)
	public @ResponseBody
	String order(@RequestBody List<Map<String, Object>> orders) {
		System.out.println("orders size:" + orders.size());

		return "/test";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {

		return "login";
	}

	@RequestMapping("/hello1")
	public String hello1() {
		SecurityUtils.getSubject().checkRoles("admin", "user");
		return "success";
	}

	@RequiresRoles("admin")
	@RequestMapping("/hello2")
	public String hello2() {
		return "success";
	}

	@RequestMapping("/unauthorized")
	public String unauthorized() {

		return "unauthorized";
	}
}