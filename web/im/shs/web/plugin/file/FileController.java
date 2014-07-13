package im.shs.web.plugin.file;

import im.shs.entity.PluginConfigEntity;
import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.plugin.StoragePlugin;
import im.shs.web.service.PluginConfigService;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : FileController
 * @description: 本地文件存储
 *
 * @author suhao
 * @date 2014年7月13日 上午2:52:16
 * @version 1.0
 */
@Controller("adminPluginFileController")
@RequestMapping("/admin/storage_plugin/file")
public class FileController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/storage_plugin";

    @Resource(name = "filePlugin")
    private FilePlugin filePlugin;

    @Resource(name = "pluginConfigServiceImpl")
    private PluginConfigService pluginConfigService;

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    public String setting(ModelMap model, RedirectAttributes redirectAttributes) {

        // 验证本地文件存储
        PluginConfigEntity pPluginConfig = filePlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        model.addAttribute("plugin", pPluginConfig);
        return "/com/iclnetwork/p2p/plugin/file/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.PUT)
    public String setting(FileBean fileBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(fileBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证本地文件存储
        PluginConfigEntity pPluginConfig = filePlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        pPluginConfig.setAttribute(StoragePlugin.STORAGE_NAME_ATTRIBUTE_NAME, fileBean.getStorageName());
        pPluginConfig.setAttribute(StoragePlugin.URLPREFIX_ATTRIBUTE_NAME,
                StringUtils.removeEnd(fileBean.getUrlPrefix(), "/"));
        pPluginConfig.setAttribute(StoragePlugin.DESCRIPTION_ATTRIBUTE_NAME, fileBean.getDescription());
        pPluginConfig.setEnabled(fileBean.getEnabled());
        pPluginConfig.setOrder(fileBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!filePlugin.getInstalled()) {
            PluginConfigEntity pPluginConfig = new PluginConfigEntity();
            pPluginConfig.setPlugin(filePlugin.getId());
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
        if (filePlugin.getInstalled()) {
            pluginConfigService.delete(filePlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}