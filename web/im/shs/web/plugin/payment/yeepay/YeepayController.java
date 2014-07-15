package im.shs.web.plugin.payment.yeepay;

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
 * @class : YeepayController
 * @description: 易宝支付
 *
 * @author suhao
 * @date 2014年7月15日 下午9:55:21
 * @version 1.0
 */
@Controller("adminYeepayController")
@RequestMapping("/admin/payment_plugin/yeepay")
public class YeepayController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/payment_plugin";

    @Resource(name = "yeepayPlugin")
    private YeepayPlugin yeepayPlugin;

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
        model.addAttribute("plugin", yeepayPlugin);
        return "/im/shs/web/plugin/payment/yeepay/setting";
    }

    /**
     * 设置
     */
    @RequestMapping(value = "/setting", method = RequestMethod.POST)
    public String setting(YeepayBean yeepayBean, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(yeepayBean)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证额度
        if (yeepayBean.getMinimum() != null && yeepayBean.getMaximum() != null
                && yeepayBean.getMinimum().compareTo(yeepayBean.getMaximum()) > 0) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 验证易宝支付
        PluginConfigEntity pPluginConfig = yeepayPlugin.getPluginConfig();
        if (pPluginConfig == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }

        // 选择LOGO图片文件时
        String logo = pPluginConfig.getAttribute(PaymentPlugin.LOGO_ATTR);
        if (yeepayBean.getLogoFile() != null && !yeepayBean.getLogoFile().isEmpty()) {

            // 验证LOGO图片文件类型
            if (!fileService.verify(FileTypeEnum.image, yeepayBean.getLogoFile())) {
                addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                return INDEX_REDIRECT_URL;
            }

            // 上传LOGO图片文件
            String siteLogoUploadPath = fileService.uploadLocal(FileTypeEnum.image, yeepayBean.getLogoFile());
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

        pPluginConfig.setAttribute(PaymentPlugin.PAYMENT_NAME_ATTR, yeepayBean.getPaymentName());
        pPluginConfig.setAttribute(PaymentPlugin.LOGO_ATTR, logo);
        pPluginConfig.setAttribute(PaymentPlugin.PARTNER_ATTR, yeepayBean.getPartner());
        pPluginConfig.setAttribute(PaymentPlugin.KEY_ATTR, yeepayBean.getKey());
        pPluginConfig.setAttribute(PaymentPlugin.MINIMUM_ATTR, yeepayBean.getMinimum() != null ? yeepayBean
                .getMinimum().toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.MAXIMUM_ATTR, yeepayBean.getMaximum() != null ? yeepayBean
                .getMaximum().toString() : null);
        pPluginConfig.setAttribute(PaymentPlugin.FEE_TYPE_ATTR, yeepayBean.getFeeType().toString());
        pPluginConfig.setAttribute(PaymentPlugin.FEE_ATTR, yeepayBean.getFee().toString());
        pPluginConfig.setAttribute(PaymentPlugin.DESCRIPTION_ATTR, yeepayBean.getDescription());
        pPluginConfig.setEnabled(yeepayBean.getEnabled());
        pPluginConfig.setOrder(yeepayBean.getOrder());
        pluginConfigService.update(pPluginConfig);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 安装
     */
    @RequestMapping(value = "/install", method = RequestMethod.GET)
    public String install(RedirectAttributes redirectAttributes) {
        if (!yeepayPlugin.getInstalled()) {
            PluginConfigEntity pluginConfig = new PluginConfigEntity();
            pluginConfig.setPlugin(yeepayPlugin.getId());
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
        if (yeepayPlugin.getInstalled()) {
            pluginConfigService.delete(yeepayPlugin.getPluginConfig());
        }
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

}