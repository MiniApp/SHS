package im.shs.web.setting.comm;

import im.shs.web.Setting;
import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.util.SettingUtils;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : CommSettingController
 * @description: 通信设置
 *
 * @author suhao
 * @date 2014年7月13日 上午1:25:08
 * @version 1.0
 */
@Controller("adminCommSettingController")
@RequestMapping("/admin/comm_setting")
public class CommSettingController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/comm_setting";

    /**
     * 设置
     */
    @RequestMapping(method = RequestMethod.GET)
    public String setting(ModelMap model) {
        model.addAttribute("setting", SettingUtils.get().getComm());
        return "/com/iclnetwork/p2p/setting/comm/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(method = RequestMethod.PUT)
    public String setting(CommSetting commSetting, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(commSetting)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 获取设置
        Setting setting = SettingUtils.get();

        // 设置通信设置
        setting.setComm(commSetting);
        SettingUtils.set(setting);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}