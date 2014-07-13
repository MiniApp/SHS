package im.shs.web.setting.security;

import im.shs.Setting;
import im.shs.enums.AccountLockTypeEnum;
import im.shs.enums.CaptchaTypeEnum;
import im.shs.enums.LoginTypeEnum;
import im.shs.enums.RandomStringTypeEnum;
import im.shs.enums.RoundingModeEnum;
import im.shs.util.SettingUtils;
import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.service.CacheService;
import im.shs.web.service.StaticService;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : SecuritySettingController
 * @description: 安全设置
 *
 * @author suhao
 * @date 2014年7月13日 上午1:14:42
 * @version 1.0
 */
@Controller("adminSecuritySettingController")
@RequestMapping("/admin/security_setting")
public class SecuritySettingController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/security_setting";
    
    @Resource(name = "cacheServiceImpl")
    private CacheService cacheService;
    
    @Resource(name = "staticServiceImpl")
    private StaticService staticService;

    /**
     * 设置
     */
    @RequestMapping(method = RequestMethod.GET)
    public String setting(ModelMap model) {
        model.addAttribute("setting", SettingUtils.get().getSecurity());
        model.addAttribute("loginTypes", LoginTypeEnum.values());
        model.addAttribute("captchaTypes", CaptchaTypeEnum.values());
        model.addAttribute("accountLockTypes", AccountLockTypeEnum.values());
        model.addAttribute("tokenTypes", RandomStringTypeEnum.values());
        model.addAttribute("amountRoundMethods", RoundingModeEnum.values());
        return "/com/iclnetwork/p2p/setting/security/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(method = RequestMethod.PUT)
    public String setting(SecuritySetting securitySetting, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(securitySetting)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证用户名长度、密码长度
        if (securitySetting.getUsernameMinLength() > securitySetting.getUsernameMaxLength()
                || securitySetting.getPasswordMinLength() > securitySetting.getPasswordMinLength()) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 获取设置
        Setting setting = SettingUtils.get();

        // 设置安全配置
        setting.setSecurity(securitySetting);
        SettingUtils.set(setting);

        cacheService.clear();
        staticService.buildAll();

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}