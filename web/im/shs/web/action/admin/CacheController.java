package im.shs.web.action.admin;

import im.shs.web.service.CacheService;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : CacheController
 * @description: 缓存
 *
 * @author suhao
 * @date 2014年7月20日 上午9:04:58
 * @version 1.0
 */
@Controller("adminCacheController")
@RequestMapping("/admin/cache")
public class CacheController extends BaseAdminController {

    @Resource(name = "cacheServiceImpl")
    private CacheService cacheService;

    /**
     * 查看
     */
    @RequestMapping(method = RequestMethod.GET)
    public String view(ModelMap model) {
        Long totalMemory = null;
        Long maxMemory = null;
        Long freeMemory = null;
        try {
            totalMemory = Runtime.getRuntime().totalMemory() / 1024 / 1024;
            maxMemory = Runtime.getRuntime().maxMemory() / 1024 / 1024;
            freeMemory = Runtime.getRuntime().freeMemory() / 1024 / 1024;
        } catch (Exception e) {
        }
        model.addAttribute("totalMemory", totalMemory);
        model.addAttribute("maxMemory", maxMemory);
        model.addAttribute("freeMemory", freeMemory);
        model.addAttribute("cacheSize", cacheService.getCacheSize());
        model.addAttribute("diskStorePath", cacheService.getDiskStorePath());
        return "/admin/cache/index";
    }

    /**
     * 清除
     */
    @RequestMapping(value = "/clear", method = RequestMethod.GET)
    public String clear(RedirectAttributes redirectAttributes) {
        cacheService.clear();
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return "redirect:/admin/cache";
    }

}