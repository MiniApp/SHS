package im.shs.web.plugin.storage.ftp;

import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.entity.PluginConfigEntity;
import im.shs.web.plugin.storage.StoragePlugin;
import im.shs.web.service.PluginConfigService;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controller - FTP存储
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Controller("adminFtpStorageController")
@RequestMapping("/admin/storage_plugin/ftp")
public class FtpStorageController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/storage_plugin";

    @Resource(name = "ftpStoragePlugin")
    private FtpStoragePlugin ftpStoragePlugin;

    @Resource(name = "pluginConfigServiceImpl")
    private PluginConfigService pluginConfigService;

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    public String setting(ModelMap model, RedirectAttributes redirectAttributes) {
        model.addAttribute("plugin", ftpStoragePlugin);
        return "/im/shs/web/plugin/storage/ftp/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(FtpStorageBean ftpBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(ftpBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证FTP存储
        PluginConfigEntity pPluginConfig = ftpStoragePlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        pPluginConfig.setAttribute(StoragePlugin.STORAGE_NAME_ATTR, ftpBean.getStorageName());
        pPluginConfig.setAttribute(FtpStoragePlugin.HOST_ATTR, ftpBean.getHost());
        pPluginConfig.setAttribute(FtpStoragePlugin.PORT_ATTR, ftpBean.getPort().toString());
        pPluginConfig.setAttribute(FtpStoragePlugin.USERNAME_ATTR, ftpBean.getUsername());
        pPluginConfig.setAttribute(FtpStoragePlugin.PASSWORD_ATTR, ftpBean.getPassword());
        pPluginConfig.setAttribute(StoragePlugin.URLPREFIX_ATTR, ftpBean.getUrlPrefix());
        pPluginConfig.setAttribute(StoragePlugin.DESCRIPTION_ATTR, ftpBean.getDescription());
        pPluginConfig.setEnabled(ftpBean.getEnabled());
        pPluginConfig.setOrder(ftpBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!ftpStoragePlugin.getInstalled()) {
            PluginConfigEntity pPluginConfig = new PluginConfigEntity();
            pPluginConfig.setPlugin(ftpStoragePlugin.getId());
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
        if (ftpStoragePlugin.getInstalled()) {
            pluginConfigService.delete(ftpStoragePlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}