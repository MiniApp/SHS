package im.shs.web.plugin.payment.baofoo;

import im.shs.web.entity.PaymentEntity;
import im.shs.web.enums.PaymentMethodEnum;
import im.shs.web.enums.PaymentNotifyMethodEnum;
import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.payment.PaymentPlugin;
import im.shs.web.util.DateTimeUtil;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * Plugin - 宝付支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Component("baofooPaymentPlugin")
public class BaofooPaymentPlugin extends PaymentPlugin {

    /** “商户终端号”属性名称 */
    public static final String TERMINAL_ATTR = "terminal";

    @Override
    public String getName() {
        return "宝付支付";
    }

    @Override
    public PaymentMethodEnum getPaymentMethod() {
        return PaymentMethodEnum.online;
    }

    @Override
    public String getVersion() {
        return "4.0";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.baofoo.com";
    }

    @Override
    public String getInstallUrl() {
        return "baofoo/install";
    }

    @Override
    public String getUninstallUrl() {
        return "baofoo/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "baofoo/setting";
    }

    /**
     * 获取商户终端号
     * 
     * @return 商户终端号
     */
    public String getTerminal() {
        return getAttribute(TERMINAL_ATTR);
    }

    @Override
    public RequestMethodEnum getRequestMethod() {
        return RequestMethodEnum.post;
    }

    @Override
    public String getRequestCharset() {
        return "UTF-8";
    }

    @Override
    public String getRequestUrl() {
        return "http://tgw.baofoo.com/payindex";
    }

    @Override
    public Map<String, Object> getParameterMap(String sn, String description, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);
        Map<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("MemberID", getAttribute("partner"));
        parameterMap.put("TerminalID", getAttribute("terminal"));
        parameterMap.put("InterfaceVersion", getVersion());
        parameterMap.put("KeyType", "1");
        parameterMap.put("TradeDate", DateTimeUtil.formatDateTimetoString(pPayment.getCreateDate(), "yyyyMMddHHmmss"));
        parameterMap.put("TransID", "0" + getAttribute("partner") + sn);
        parameterMap.put("OrderMoney",
                pPayment.getAmount().multiply(BigDecimal.TEN).multiply(BigDecimal.TEN).setScale(0).toString());
        parameterMap.put("ProductName", "");
        parameterMap.put("Amount", "1");
        parameterMap.put("Username", pPayment.getMember().getUsername());
        parameterMap.put("AdditionalInfo",
                StringUtils.abbreviate(StringUtils.replaceChars(description, "[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("PageUrl", getNotifyUrl(sn, PaymentNotifyMethodEnum.general));
        parameterMap.put("ReturnUrl", getNotifyUrl(sn, PaymentNotifyMethodEnum.general));
        parameterMap.put("NoticeType", "1");
        parameterMap.put("Signature", generateSign(parameterMap));
        return parameterMap;
    }

    @Override
    public boolean verifyPayment(String sn) {
        return false;
    }

    @Override
    public boolean verifyNotify(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);

        String Result = request.getParameter("Result");
        String MemberID = request.getParameter("MemberID");
        String TransID = request.getParameter("TransID");
        String FactMoney = request.getParameter("FactMoney");

        Map<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("MemberID", MemberID);
        parameterMap.put("TerminalID", request.getParameter("TerminalID"));
        parameterMap.put("TransID", TransID);
        parameterMap.put("Result", Result);
        parameterMap.put("ResultDesc", request.getParameter("ResultDesc"));
        parameterMap.put("FactMoney", FactMoney);
        parameterMap.put("AdditionalInfo", request.getParameter("AdditionalInfo"));
        parameterMap.put("SuccTime", request.getParameter("SuccTime"));

        if (StringUtils.equals("1", Result) && StringUtils.equals(MemberID, getAttribute("partner"))
                && StringUtils.equals("0" + getAttribute("partner") + sn, TransID) && pPayment.verifyAmount(FactMoney)
                && verifySign(request.getParameter("Md5Sign"), parameterMap)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String getNotifyMessage(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        if (StringUtils.equals("1", request.getParameter("Result"))) {
            return "OK";
        }
        return null;
    }

    @Override
    public Integer getTimeout() {
        return 21600;
    }

    @Override
    protected String generateSign(Map<String, Object> parameterMap) {
        return DigestUtils.md5Hex(joinValue(parameterMap, null, "|" + getAttribute("key"), "|", false, "TerminalID",
                "InterfaceVersion", "KeyType", "ProductName", "Amount", "Username", "AdditionalInfo"));
    }

    @Override
    protected boolean verifySign(String sign, Map<String, Object> parameterMap) {
        return StringUtils
                .equals(sign, DigestUtils.md5Hex(joinKeyValue(parameterMap, null, "~|~Md5Sign=" + getAttribute("key"),
                        "~|~", false)));
    }

}