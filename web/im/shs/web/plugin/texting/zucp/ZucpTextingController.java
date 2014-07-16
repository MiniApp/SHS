/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.plugin.texting.zucp;

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
 * @class : ZucpTextingController
 * @description: 漫道短信
 *
 * @author suhao
 * @date 2014年7月16日 下午10:39:44
 * @version 1.0
 */
@Controller("adminZucpTextingController")
@RequestMapping("/admin/texting_plugin/zucp")
public class ZucpTextingController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/texting_plugin";

    @Resource(name = "zucpTextingPlugin")
    private ZucpTextingPlugin zucpTextingPlugin;

    @Resource(name = "pluginConfigServiceImpl")
    private PluginConfigService pluginConfigService;

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    public String setting(ModelMap model, RedirectAttributes redirectAttributes) {
        model.addAttribute("plugin", zucpTextingPlugin);
        return "/im/shs/web/plugin/texting/zucp/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(ZucpTextingBean zucpTextingBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(zucpTextingBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证漫道短信
        PluginConfigEntity pPluginConfig = zucpTextingPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        pPluginConfig.setAttribute(TextingPlugin.PARTNER_ATTR, zucpTextingBean.getPartner());
        pPluginConfig.setAttribute(TextingPlugin.KEY_ATTR, zucpTextingBean.getKey());
        pPluginConfig.setAttribute(TextingPlugin.DESCRIPTION_ATTR, zucpTextingBean.getDescription());
        pPluginConfig.setEnabled(zucpTextingBean.getEnabled());
        pPluginConfig.setOrder(zucpTextingBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!zucpTextingPlugin.getInstalled()) {
            PluginConfigEntity pPluginConfig = new PluginConfigEntity();
            pPluginConfig.setPlugin(zucpTextingPlugin.getId());
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
        if (zucpTextingPlugin.getInstalled()) {
            pluginConfigService.delete(zucpTextingPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}