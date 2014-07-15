package im.shs.web.plugin.payment.remittance;

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
 * @class : RemittancePaymentController
 * @description: 线下汇款支付
 *
 * @author suhao
 * @date 2014年7月15日 下午9:53:44
 * @version 1.0
 */
@Controller("adminRemittancePaymentController")
@RequestMapping("/admin/payment_plugin/remittance")
public class RemittancePaymentController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/payment_plugin";

    @Resource(name = "remittancePaymentPlugin")
    private RemittancePaymentPlugin remittancePaymentPlugin;

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
        model.addAttribute("plugin", remittancePaymentPlugin);
        return "/im/shs/web/plugin/payment/remittance/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(RemittancePaymentBean remittanceBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(remittanceBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证额度
        if (remittanceBean.getMinimum() != null && remittanceBean.getMaximum() != null
                && remittanceBean.getMinimum().compareTo(remittanceBean.getMaximum()) > 0) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证线下汇款支付
        PluginConfigEntity pPluginConfig = remittancePaymentPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 选择LOGO图片文件时
        String logo = pPluginConfig.getAttribute(PaymentPlugin.LOGO_ATTR);
        if (remittanceBean.getLogoFile() != null && !remittanceBean.getLogoFile().isEmpty()) {

            // 验证LOGO图片文件类型
            if (!fileService.verify(FileTypeEnum.image, remittanceBean.getLogoFile())) {
                addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                return INDEX_REDIRECT_URL;
            }

            // 上传LOGO图片文件
            String siteLogoUploadPath = fileService.uploadLocal(FileTypeEnum.image, remittanceBean.getLogoFile());
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

        pPluginConfig.setAttribute(PaymentPlugin.PAYMENT_NAME_ATTR, remittanceBean.getPaymentName());
        pPluginConfig.setAttribute(PaymentPlugin.LOGO_ATTR, logo);
        pPluginConfig.setAttribute(RemittancePaymentPlugin.BANK_NAME_ATTR, remittanceBean.getBankName());
        pPluginConfig.setAttribute(RemittancePaymentPlugin.BANK_BRANCH_NAME_ATTR, remittanceBean.getBankBranchName());
        pPluginConfig.setAttribute(RemittancePaymentPlugin.BANK_CARD_NO_ATTR, remittanceBean.getBankCardNo());
        pPluginConfig.setAttribute(RemittancePaymentPlugin.BANK_CARD_HOLDER_NAME_ATTR,
                remittanceBean.getBankCardHolderName());
        pPluginConfig.setAttribute(PaymentPlugin.MINIMUM_ATTR, remittanceBean.getMinimum() != null ? remittanceBean
                .getMinimum().toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.MAXIMUM_ATTR, remittanceBean.getMaximum() != null ? remittanceBean
                .getMaximum().toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.FEE_TYPE_ATTR, remittanceBean.getFeeType().toString());
        pPluginConfig.setAttribute(PaymentPlugin.FEE_ATTR, remittanceBean.getFee().toString());
        pPluginConfig.setAttribute(RemittancePaymentPlugin.HANDLE_TIME_ATTR, remittanceBean.getHandleTime());
        pPluginConfig.setAttribute(PaymentPlugin.DESCRIPTION_ATTR, remittanceBean.getDescription());
        pPluginConfig.setEnabled(remittanceBean.getEnabled());
        pPluginConfig.setOrder(remittanceBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!remittancePaymentPlugin.getInstalled()) {
            PluginConfigEntity pluginConfig = new PluginConfigEntity();
            pluginConfig.setPlugin(remittancePaymentPlugin.getId());
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
        if (remittancePaymentPlugin.getInstalled()) {
            pluginConfigService.delete(remittancePaymentPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}