package im.shs.web.plugin.payment.gopay;

import im.shs.web.entity.MemberEntity;
import im.shs.web.entity.PaymentEntity;
import im.shs.web.enums.PaymentMethodEnum;
import im.shs.web.enums.PaymentNotifyMethodEnum;
import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.payment.PaymentPlugin;
import im.shs.web.util.DateTimeUtil;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * Plugin - 国付宝支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Component("gopayPaymentPlugin")
public class GopayPaymentPlugin extends PaymentPlugin {

    /** “国付宝转入账户”属性名称 */
    public static final String VIR_CARD_NO_IN_ATTR = "virCardNoIn";

    @Override
    public String getName() {
        return "国付宝支付";
    }

    @Override
    public PaymentMethodEnum getPaymentMethod() {
        return PaymentMethodEnum.online;
    }

    @Override
    public String getVersion() {
        return "2.1";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.gopay.com.cn";
    }

    @Override
    public String getInstallUrl() {
        return "gopay/install";
    }

    @Override
    public String getUninstallUrl() {
        return "gopay/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "gopay/setting";
    }

    /**
     * 获取国付宝转入账户
     * 
     * @return 国付宝转入账户
     */
    public String getVirCardNoIn() {
        return getAttribute(VIR_CARD_NO_IN_ATTR);
    }

    @Override
    public RequestMethodEnum getRequestMethod() {
        return RequestMethodEnum.post;
    }

    @Override
    public String getRequestCharset() {
        return "GBK";
    }

    @Override
    public String getRequestUrl() {
        return "https://www.gopay.com.cn/PGServer/Trans/WebClientAction.do";
    }

    @Override
    public Map<String, Object> getParameterMap(String sn, String description, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);
        MemberEntity pMember = pPayment.getMember();

        Map<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("version", getVersion());
        parameterMap.put("charset", "1");
        parameterMap.put("language", "1");
        parameterMap.put("signType", "1");
        parameterMap.put("tranCode", "8888");
        parameterMap.put("merchantID", getAttribute("partner"));
        parameterMap.put("merOrderNum", sn);
        parameterMap.put("tranAmt", pPayment.getAmount().toString());
        parameterMap.put("feeAmt", pPayment.getFee().toString());
        parameterMap.put("tranDateTime",
                DateTimeUtil.formatDateTimetoString(pPayment.getCreateDate(), "yyyyMMddHHmmss"));
        parameterMap.put("currencyType", "156");
        parameterMap.put("frontMerUrl", getNotifyUrl(sn, PaymentNotifyMethodEnum.general));
        parameterMap.put("backgroundMerUrl", getNotifyUrl(sn, PaymentNotifyMethodEnum.general));
        parameterMap.put("orderId", "");
        parameterMap.put("gopayOutOrderId", "");
        parameterMap.put("virCardNoIn", getAttribute("virCardNoIn"));
        parameterMap.put("tranIP", request.getRemoteAddr());
        parameterMap.put("isRepeatSubmit", "0");
        parameterMap.put("goodsName",
                StringUtils.abbreviate(StringUtils.replaceChars(description, "[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("goodsDetail",
                StringUtils.abbreviate(StringUtils.replaceChars(description, "[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("buyerName", pMember.getUsername());
        parameterMap.put("buyerContact", pMember.getMobile());
        parameterMap.put("merRemark1",
                StringUtils.abbreviate(StringUtils.replaceChars(description, "[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("merRemark2",
                StringUtils.abbreviate(StringUtils.replaceChars(description, "[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("bankCode", "");
        parameterMap.put("userType", "1");
        parameterMap.put("respCode", "");
        parameterMap.put("gopayServerTime", get("https://www.gopay.com.cn/PGServer/time", null));
        parameterMap.put("VerficationCode", getAttribute("key"));
        parameterMap.put("signValue", generateSign(parameterMap));

        return parameterMap;
    }

    @Override
    public boolean verifyPayment(String sn) {
        return false;
    }

    @Override
    public boolean verifyNotify(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);

        String respCode = request.getParameter("respCode");
        String merchantID = request.getParameter("merchantID");
        String merOrderNum = request.getParameter("merOrderNum");
        String tranAmt = request.getParameter("tranAmt");

        Map<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("version", request.getParameter("version"));
        parameterMap.put("tranCode", request.getParameter("tranCode"));
        parameterMap.put("merchantID", merchantID);
        parameterMap.put("merOrderNum", merOrderNum);
        parameterMap.put("tranAmt", tranAmt);
        parameterMap.put("feeAmt", request.getParameter("feeAmt"));
        parameterMap.put("tranDateTime", request.getParameter("tranDateTime"));
        parameterMap.put("frontMerUrl", request.getParameter("frontMerUrl"));
        parameterMap.put("backgroundMerUrl", request.getParameter("backgroundMerUrl"));
        parameterMap.put("orderId", request.getParameter("orderId"));
        parameterMap.put("gopayOutOrderId", request.getParameter("gopayOutOrderId"));
        parameterMap.put("tranIP", request.getParameter("tranIP"));
        parameterMap.put("respCode", respCode);
        parameterMap.put("gopayServerTime", "");
        parameterMap.put("VerficationCode", getAttribute("key"));

        if (StringUtils.equals("0000", respCode) && StringUtils.equals(merchantID, getAttribute("partner"))
                && StringUtils.equals(sn, merOrderNum) && pPayment.verifyAmount(tranAmt)
                && verifySign(request.getParameter("signValue"), parameterMap)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String getNotifyMessage(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        return null;
    }

    @Override
    public Integer getTimeout() {
        return 21600;
    }

    @Override
    protected String generateSign(Map<String, Object> parameterMap) {
        return DigestUtils.md5Hex(joinKeyValue(parameterMap, null, null, null, "=", "[", "]", false, "charset",
                "language", "signType", "currencyType", "virCardNoIn", "isRepeatSubmit", "goodsName", "goodsDetail",
                "buyerName", "buyerContact", "merRemark1", "merRemark2", "bankCode", "userType").getBytes());
    }

    @Override
    protected boolean verifySign(String sign, Map<String, Object> parameterMap) {
        return StringUtils.equals(sign,
                DigestUtils.md5Hex(joinKeyValue(parameterMap, null, null, null, "=", "[", "]", false).getBytes()));
    }

}