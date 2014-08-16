package im.shs.web.action.admin;

import im.shs.web.action.BaseController;
import im.shs.web.service.AdminService;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller - 主页
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Controller("adminHomepageController")
@RequestMapping("/admin")
public class IndexController extends BaseController {

    @Resource(name = "adminServiceImpl")
    private AdminService adminService;

    /**
     * 主页
     */
    @RequestMapping
    public String homepage() {
        if (!adminService.authorized()) {
            return ERROR_VIEW;
        }
        return "/admin/menu/index";
    }

}