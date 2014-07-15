package im.shs.web.plugin.payment.remittance;

import im.shs.web.enums.PaymentMethodEnum;
import im.shs.web.enums.PaymentNotifyMethodEnum;
import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.payment.PaymentPlugin;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

/**
 * @class : RemittancePaymentPlugin
 * @description:  线下汇款支付
 *
 * @author suhao
 * @date 2014年7月15日 下午9:53:56
 * @version 1.0
 */
@Component("remittancePaymentPlugin")
public class RemittancePaymentPlugin extends PaymentPlugin {

    /** “银行”属性名称 */
    public static final String BANK_NAME_ATTR = "bankName";

    /** “银行支行”属性名称 */
    public static final String BANK_BRANCH_NAME_ATTR = "bankBranchName";

    /** “银行卡号”属性名称 */
    public static final String BANK_CARD_NO_ATTR = "bankCardNo";

    /** “银行卡持有人”属性名称 */
    public static final String BANK_CARD_HOLDER_NAME_ATTR = "bankCardHolderName";

    /** “处理时间”属性名称 */
    public static final String HANDLE_TIME_ATTR = "handleTime";

    @Override
    public String getName() {
        return "线下汇款支付";
    }

    @Override
    public PaymentMethodEnum getPaymentMethod() {
        return PaymentMethodEnum.offline;
    }

    @Override
    public String getVersion() {
        return "3.0";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.icl-network.com";
    }

    @Override
    public String getInstallUrl() {
        return "remittance/install";
    }

    @Override
    public String getUninstallUrl() {
        return "remittance/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "remittance/setting";
    }

    /**
     * 获取银行
     * 
     * @return 银行
     */
    public String getBankName() {
        return getAttribute(BANK_NAME_ATTR);
    }

    /**
     * 获取银行支行
     * 
     * @return 银行支行
     */
    public String getBankBranchName() {
        return getAttribute(BANK_BRANCH_NAME_ATTR);
    }

    /**
     * 获取银行卡号
     * 
     * @return 银行卡号
     */
    public String getBankCardNo() {
        return getAttribute(BANK_CARD_NO_ATTR);
    }

    /**
     * 获取银行卡持有人
     * 
     * @return 银行卡持有人
     */
    public String getBankCardHolderName() {
        return getAttribute(BANK_CARD_HOLDER_NAME_ATTR);
    }

    /**
     * 获取处理时间
     * 
     * @return 处理时间
     */
    public String getHandleTime() {
        return getAttribute(HANDLE_TIME_ATTR);
    }

    @Override
    public RequestMethodEnum getRequestMethod() {
        return null;
    }

    @Override
    public String getRequestCharset() {
        return null;
    }

    @Override
    public String getRequestUrl() {
        return null;
    }

    @Override
    public Map<String, Object> getParameterMap(String sn, String description, HttpServletRequest request) {
        return null;
    }

    @Override
    public boolean verifyPayment(String sn) {
        return false;
    }

    @Override
    public boolean verifyNotify(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        return false;
    }

    @Override
    public String getNotifyMessage(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        return null;
    }

    @Override
    public Integer getTimeout() {
        return null;
    }

    @Override
    protected String generateSign(Map<String, Object> parameterMap) {
        return null;
    }

    @Override
    protected boolean verifySign(String sign, Map<String, Object> parameterMap) {
        return false;
    }

}