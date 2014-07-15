package im.shs.web.plugin.payment.ecpss;

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
 * @class : EcpssPaymentController
 * @description: 汇潮支付
 *
 * @author suhao
 * @date 2014年7月15日 下午9:48:06
 * @version 1.0
 */
@Controller("adminEcpssPaymentController")
@RequestMapping("/admin/payment_plugin/ecpss")
public class EcpssPaymentController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/payment_plugin";

    @Resource(name = "ecpssPaymentPlugin")
    private EcpssPaymentPlugin ecpssPaymentPlugin;

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
        model.addAttribute("plugin", ecpssPaymentPlugin);
        return "/im/shs/web/plugin/payment/ecpss/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(EcpssPaymentBean ecpssBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(ecpssBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证额度
        if (ecpssBean.getMinimum() != null && ecpssBean.getMaximum() != null
                && ecpssBean.getMinimum().compareTo(ecpssBean.getMaximum()) > 0) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证汇潮支付
        PluginConfigEntity pPluginConfig = ecpssPaymentPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 选择LOGO图片文件时
        String logo = pPluginConfig.getAttribute(PaymentPlugin.LOGO_ATTR);
        if (ecpssBean.getLogoFile() != null && !ecpssBean.getLogoFile().isEmpty()) {

            // 验证LOGO图片文件类型
            if (!fileService.verify(FileTypeEnum.image, ecpssBean.getLogoFile())) {
                addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                return INDEX_REDIRECT_URL;
            }

            // 上传LOGO图片文件
            String siteLogoUploadPath = fileService.uploadLocal(FileTypeEnum.image, ecpssBean.getLogoFile());
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

        pPluginConfig.setAttribute(PaymentPlugin.PAYMENT_NAME_ATTR, ecpssBean.getPaymentName());
        pPluginConfig.setAttribute(PaymentPlugin.LOGO_ATTR, logo);
        pPluginConfig.setAttribute(PaymentPlugin.PARTNER_ATTR, ecpssBean.getPartner());
        pPluginConfig.setAttribute(PaymentPlugin.KEY_ATTR, ecpssBean.getKey());
        pPluginConfig.setAttribute(PaymentPlugin.MINIMUM_ATTR, ecpssBean.getMinimum() != null ? ecpssBean.getMinimum()
                .toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.MAXIMUM_ATTR, ecpssBean.getMaximum() != null ? ecpssBean.getMaximum()
                .toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.FEE_TYPE_ATTR, ecpssBean.getFeeType().toString());
        pPluginConfig.setAttribute(PaymentPlugin.FEE_ATTR, ecpssBean.getFee().toString());
        pPluginConfig.setAttribute(PaymentPlugin.DESCRIPTION_ATTR, ecpssBean.getDescription());
        pPluginConfig.setEnabled(ecpssBean.getEnabled());
        pPluginConfig.setOrder(ecpssBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!ecpssPaymentPlugin.getInstalled()) {
            PluginConfigEntity pluginConfig = new PluginConfigEntity();
            pluginConfig.setPlugin(ecpssPaymentPlugin.getId());
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
        if (ecpssPaymentPlugin.getInstalled()) {
            pluginConfigService.delete(ecpssPaymentPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}