package im.shs.web.plugin.oss;

import im.shs.Message;
import im.shs.entity.PluginConfigEntity;
import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.plugin.StoragePlugin;
import im.shs.web.service.PluginConfigService;

import java.math.BigDecimal;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controller - 阿里云存储
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Controller("adminPluginOssController")
@RequestMapping("/admin/storage_plugin/oss")
public class OssController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/storage_plugin";

    @Resource(name = "ossPlugin")
    private OssPlugin ossPlugin;

    @Resource(name = "pluginConfigServiceImpl")
    private PluginConfigService pluginConfigService;

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    public String setting(ModelMap model, RedirectAttributes redirectAttributes) {

        // 验证阿里云存储
        PluginConfigEntity pPluginConfig = ossPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        model.addAttribute("plugin", pPluginConfig);
        return "/com/iclnetwork/p2p/plugin/oss/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.PUT)
    public String setting(OssBean ossBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(ossBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证阿里云存储
        PluginConfigEntity pPluginConfig = ossPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        pPluginConfig.setAttribute(StoragePlugin.STORAGE_NAME_ATTRIBUTE_NAME, ossBean.getStorageName());
        pPluginConfig.setAttribute("accessId", ossBean.getAccessId());
        pPluginConfig.setAttribute("accessKey", ossBean.getAccessKey());
        pPluginConfig.setAttribute("bucketName", ossBean.getBucketName());
        pPluginConfig.setAttribute(StoragePlugin.URLPREFIX_ATTRIBUTE_NAME,
                StringUtils.removeEnd(ossBean.getUrlPrefix(), "/"));
        pPluginConfig.setAttribute(StoragePlugin.DESCRIPTION_ATTRIBUTE_NAME, ossBean.getDescription());
        pPluginConfig.setEnabled(ossBean.getEnabled());
        pPluginConfig.setOrder(ossBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        String specificationVersion = System.getProperty("java.specification.version");
        if (StringUtils.isNotBlank(specificationVersion)) {
            BigDecimal version = new BigDecimal(specificationVersion);
            if (version.compareTo(new BigDecimal("1.6")) < 0) {
                addFlashMessage(redirectAttributes, Message.error("当前JDK版本不支持该插件"));
                return INDEX_REDIRECT_URL;
            }
        }
        if (!ossPlugin.getInstalled()) {
            PluginConfigEntity pluginConfig = new PluginConfigEntity();
            pluginConfig.setPlugin(ossPlugin.getId());
            pluginConfig.setEnabled(false);
            pluginConfigService.save(pluginConfig);
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 卸载
     */
    @RequestMapping(value = "/uninstall", method = RequestMethod.GET)
    public String uninstall(RedirectAttributes redirectAttributes) {
        if (ossPlugin.getInstalled()) {
            pluginConfigService.delete(ossPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}