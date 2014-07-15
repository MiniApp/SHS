package im.shs.web.plugin.payment.baofoo;

import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.entity.PluginConfigEntity;
import im.shs.web.enums.FileTypeEnum;
import im.shs.web.enums.PaymentFeeTypeEnum;
import im.shs.web.plugin.payment.PaymentPlugin;
import im.shs.web.service.FileService;
import im.shs.web.service.PluginConfigService;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controller - 宝付支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Controller("adminBaofooPaymentController")
@RequestMapping("/admin/payment_plugin/baofoo")
public class BaofooPaymentController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/payment_plugin";

    @Resource(name = "baofooPaymentPlugin")
    private BaofooPaymentPlugin baofooPaymentPlugin;

    @Resource(name = "pluginConfigServiceImpl")
    private PluginConfigService pluginConfigService;

    @Resource(name = "fileServiceImpl")
    private FileService fileService;

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    public String setting(ModelMap model, RedirectAttributes redirectAttributes) {
        model.addAttribute("feeTypes", PaymentFeeTypeEnum.values());
        model.addAttribute("plugin", baofooPaymentPlugin);
        return "/im/shs/web/plugin/payment/baofoo/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(BaofooPaymentBean baofooBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(baofooBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证额度
        if (baofooBean.getMinimum() != null && baofooBean.getMaximum() != null
                && baofooBean.getMinimum().compareTo(baofooBean.getMaximum()) > 0) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证宝付支付
        PluginConfigEntity pPluginConfig = baofooPaymentPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 选择LOGO图片文件时
        String logo = pPluginConfig.getAttribute(PaymentPlugin.LOGO_ATTR);
        if (baofooBean.getLogoFile() != null && !baofooBean.getLogoFile().isEmpty()) {

            // 验证LOGO图片文件类型
            if (!fileService.verify(FileTypeEnum.image, baofooBean.getLogoFile())) {
                addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                return INDEX_REDIRECT_URL;
            }

            // 上传LOGO图片文件
            String siteLogoUploadPath = fileService.uploadLocal(FileTypeEnum.image, baofooBean.getLogoFile());
            if (StringUtils.isBlank(siteLogoUploadPath)) {
                addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                return INDEX_REDIRECT_URL;
            }

            // 删除原LOGO图片文件
            if (StringUtils.isNotBlank(logo)) {
                fileService.deleteLocal(logo);
            }
            logo = siteLogoUploadPath;
        }

        pPluginConfig.setAttribute(PaymentPlugin.PAYMENT_NAME_ATTR, baofooBean.getPaymentName());
        pPluginConfig.setAttribute(PaymentPlugin.LOGO_ATTR, logo);
        pPluginConfig.setAttribute(PaymentPlugin.PARTNER_ATTR, baofooBean.getPartner());
        pPluginConfig.setAttribute(BaofooPaymentPlugin.TERMINAL_ATTR, baofooBean.getTerminal());
        pPluginConfig.setAttribute(PaymentPlugin.KEY_ATTR, baofooBean.getKey());
        pPluginConfig.setAttribute(PaymentPlugin.MINIMUM_ATTR, baofooBean.getMinimum() != null ? baofooBean
                .getMinimum().toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.MAXIMUM_ATTR, baofooBean.getMaximum() != null ? baofooBean
                .getMaximum().toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.FEE_TYPE_ATTR, baofooBean.getFeeType().toString());
        pPluginConfig.setAttribute(PaymentPlugin.FEE_ATTR, baofooBean.getFee().toString());
        pPluginConfig.setAttribute(PaymentPlugin.DESCRIPTION_ATTR, baofooBean.getDescription());
        pPluginConfig.setEnabled(baofooBean.getEnabled());
        pPluginConfig.setOrder(baofooBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!baofooPaymentPlugin.getInstalled()) {
            PluginConfigEntity pluginConfig = new PluginConfigEntity();
            pluginConfig.setPlugin(baofooPaymentPlugin.getId());
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
        if (baofooPaymentPlugin.getInstalled()) {
            pluginConfigService.delete(baofooPaymentPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}