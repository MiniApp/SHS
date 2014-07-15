package im.shs.web.plugin.payment.gopay;

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
 * @class : GopayPaymentController
 * @description: 国付宝支付
 *
 * @author suhao
 * @date 2014年7月15日 下午9:51:04
 * @version 1.0
 */
@Controller("adminGopayPaymentController")
@RequestMapping("/admin/payment_plugin/gopay")
public class GopayPaymentController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/payment_plugin";

    @Resource(name = "gopayPaymentPlugin")
    private GopayPaymentPlugin gopayPaymentPlugin;

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
        model.addAttribute("plugin", gopayPaymentPlugin);
        return "/im/shs/web/plugin/payment/gopay/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(GopayPaymentBean gopayBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(gopayBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证额度
        if (gopayBean.getMinimum() != null && gopayBean.getMaximum() != null
                && gopayBean.getMinimum().compareTo(gopayBean.getMaximum()) > 0) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证国付宝支付
        PluginConfigEntity pPluginConfig = gopayPaymentPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 选择LOGO图片文件时
        String logo = pPluginConfig.getAttribute(PaymentPlugin.LOGO_ATTR);
        if (gopayBean.getLogoFile() != null && !gopayBean.getLogoFile().isEmpty()) {

            // 验证LOGO图片文件类型
            if (!fileService.verify(FileTypeEnum.image, gopayBean.getLogoFile())) {
                addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                return INDEX_REDIRECT_URL;
            }

            // 上传LOGO图片文件
            String siteLogoUploadPath = fileService.uploadLocal(FileTypeEnum.image, gopayBean.getLogoFile());
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

        pPluginConfig.setAttribute(PaymentPlugin.PAYMENT_NAME_ATTR, gopayBean.getPaymentName());
        pPluginConfig.setAttribute(PaymentPlugin.LOGO_ATTR, logo);
        pPluginConfig.setAttribute(PaymentPlugin.PARTNER_ATTR, gopayBean.getPartner());
        pPluginConfig.setAttribute(GopayPaymentPlugin.VIR_CARD_NO_IN_ATTR, gopayBean.getVirCardNoIn());
        pPluginConfig.setAttribute(PaymentPlugin.KEY_ATTR, gopayBean.getKey());
        pPluginConfig.setAttribute(PaymentPlugin.MINIMUM_ATTR, gopayBean.getMinimum() != null ? gopayBean.getMinimum()
                .toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.MAXIMUM_ATTR, gopayBean.getMaximum() != null ? gopayBean.getMaximum()
                .toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.FEE_TYPE_ATTR, gopayBean.getFeeType().toString());
        pPluginConfig.setAttribute(PaymentPlugin.FEE_ATTR, gopayBean.getFee().toString());
        pPluginConfig.setAttribute(PaymentPlugin.DESCRIPTION_ATTR, gopayBean.getDescription());
        pPluginConfig.setEnabled(gopayBean.getEnabled());
        pPluginConfig.setOrder(gopayBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!gopayPaymentPlugin.getInstalled()) {
            PluginConfigEntity pluginConfig = new PluginConfigEntity();
            pluginConfig.setPlugin(gopayPaymentPlugin.getId());
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
        if (gopayPaymentPlugin.getInstalled()) {
            pluginConfigService.delete(gopayPaymentPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}