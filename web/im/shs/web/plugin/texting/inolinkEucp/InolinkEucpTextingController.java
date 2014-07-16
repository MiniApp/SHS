package im.shs.web.plugin.texting.inolinkEucp;

import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.entity.PluginConfigEntity;
import im.shs.web.plugin.texting.TextingPlugin;
import im.shs.web.service.PluginConfigService;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : InolinkEucpTextingController
 * @description: 凌凯Eucp短信
 *
 * @author suhao
 * @date 2014年7月16日 下午10:36:04
 * @version 1.0
 */
@Controller("adminInolinkEucpTextingController")
@RequestMapping("/admin/texting_plugin/inolink_eucp")
public class InolinkEucpTextingController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/texting_plugin";

    @Resource(name = "inolinkEucpTextingPlugin")
    private InolinkEucpTextingPlugin inolinkEucpTextingPlugin;

    @Resource(name = "pluginConfigServiceImpl")
    private PluginConfigService pluginConfigService;

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    public String setting(ModelMap model, RedirectAttributes redirectAttributes) {
        model.addAttribute("plugin", inolinkEucpTextingPlugin);
        return "/im/shs/web/plugin/texting/inolinkEucp/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(InolinkEucpTextingBean inolinkTextingBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(inolinkTextingBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证凌凯Eucp短信
        PluginConfigEntity pPluginConfig = inolinkEucpTextingPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        pPluginConfig.setAttribute(TextingPlugin.PARTNER_ATTR, inolinkTextingBean.getPartner());
        pPluginConfig.setAttribute(TextingPlugin.KEY_ATTR, inolinkTextingBean.getKey());
        pPluginConfig.setAttribute(TextingPlugin.DESCRIPTION_ATTR, inolinkTextingBean.getDescription());
        pPluginConfig.setEnabled(inolinkTextingBean.getEnabled());
        pPluginConfig.setOrder(inolinkTextingBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!inolinkEucpTextingPlugin.getInstalled()) {
            PluginConfigEntity pPluginConfig = new PluginConfigEntity();
            pPluginConfig.setPlugin(inolinkEucpTextingPlugin.getId());
            pPluginConfig.setEnabled(false);
            pluginConfigService.save(pPluginConfig);
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 卸载
     */
    @RequestMapping(value = "/uninstall", method = RequestMethod.GET)
    public String uninstall(RedirectAttributes redirectAttributes) {
        if (inolinkEucpTextingPlugin.getInstalled()) {
            pluginConfigService.delete(inolinkEucpTextingPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}