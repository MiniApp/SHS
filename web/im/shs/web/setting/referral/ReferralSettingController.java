package im.shs.web.setting.referral;

import im.shs.web.Setting;
import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.util.SettingUtils;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : ReferralSettingController
 * @description: 提成设置
 *
 * @author suhao
 * @date 2014年7月13日 上午1:26:24
 * @version 1.0
 */
@Controller("adminReferralSettingController")
@RequestMapping("/admin/referral_setting")
public class ReferralSettingController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/referral_setting";

    /**
     * 设置
     */
    @RequestMapping(method = RequestMethod.GET)
    public String setting(ModelMap model) {
        model.addAttribute("setting", SettingUtils.get().getReferral());
        return "/com/iclnetwork/p2p/setting/referral/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(method = RequestMethod.PUT)
    public String setting(ReferralSetting referralSetting, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(referralSetting)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 获取设置
        Setting setting = SettingUtils.get();

        // 设置提成设置
        setting.setReferral(referralSetting);
        SettingUtils.set(setting);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}