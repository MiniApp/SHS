package im.shs.web.plugin.payment.yeepay;

import im.shs.web.entity.PaymentEntity;
import im.shs.web.enums.PaymentMethodEnum;
import im.shs.web.enums.PaymentNotifyMethodEnum;
import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.payment.PaymentPlugin;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * @class : YeepayPlugin
 * @description: 易宝支付
 *
 * @author suhao
 * @date 2014年7月15日 下午9:54:24
 * @version 1.0
 */
@Component("yeepayPlugin")
public class YeepayPlugin extends PaymentPlugin {

    @Override
    public String getName() {
        return "易宝支付";
    }

    @Override
    public PaymentMethodEnum getPaymentMethod() {
        return PaymentMethodEnum.online;
    }

    @Override
    public String getVersion() {
        return "3.1";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.yeepay.com";
    }

    @Override
    public String getInstallUrl() {
        return "yeepay/install";
    }

    @Override
    public String getUninstallUrl() {
        return "yeepay/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "yeepay/setting";
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
        return "https://www.yeepay.com/app-merchant-proxy/node";
    }

    @Override
    public Map<String, Object> getParameterMap(String sn, String description, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);
        LinkedHashMap<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("p0_Cmd", "Buy");
        parameterMap.put("p1_MerId", getAttribute("partner"));
        parameterMap.put("p2_Order", sn);
        parameterMap.put("p3_Amt", pPayment.getAmount());
        parameterMap.put("p4_Cur", "CNY");
        parameterMap.put("p5_Pid",
                StringUtils.abbreviate(description.replaceAll("[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("p6_Pcat",
                StringUtils.abbreviate(description.replaceAll("[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("p7_Pdesc",
                StringUtils.abbreviate(description.replaceAll("[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("p8_Url", getNotifyUrl(sn, PaymentNotifyMethodEnum.general));
        parameterMap.put("p9_SAF", "0");
        parameterMap.put("pa_MP", "ICLNetwork");
        parameterMap.put("pd_FrpId", "");
        parameterMap.put("pr_NeedResponse", "1");
        parameterMap.put("hmac", generateSign(parameterMap));
        return parameterMap;
    }

    @Override
    public boolean verifyPayment(String sn) {
        return false;
    }

    @Override
    public boolean verifyNotify(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);

        String r1_Code = request.getParameter("r1_Code");
        String p1_MerId = request.getParameter("p1_MerId");
        String p2_Order = request.getParameter("p2_Order");
        String p3_Amt = request.getParameter("p3_Amt");

        Map<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("p1_MerId", p1_MerId);
        parameterMap.put("r0_Cmd", request.getParameter("r0_Cmd"));
        parameterMap.put("r1_Code", r1_Code);
        parameterMap.put("r2_TrxId", request.getParameter("r2_TrxId"));
        parameterMap.put("r3_Amt", request.getParameter("r3_Amt"));
        parameterMap.put("r4_Cur", request.getParameter("r4_Cur"));
        parameterMap.put("r5_Pid", request.getParameter("r5_Pid"));
        parameterMap.put("r6_Order", request.getParameter("r6_Order"));
        parameterMap.put("r7_Uid", request.getParameter("r7_Uid"));
        parameterMap.put("r8_MP", request.getParameter("r8_MP"));
        parameterMap.put("r9_BType", request.getParameter("r9_BType"));

        if (StringUtils.equals("1", r1_Code) && StringUtils.equals(p1_MerId, getAttribute("partner"))
                && StringUtils.equals(sn, p2_Order) && pPayment.verifyAmount(p3_Amt)
                && verifySign(request.getParameter("hmac"), parameterMap)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String getNotifyMessage(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        if (StringUtils.equals("1", request.getParameter("r1_Code"))
                && StringUtils.equals("2", request.getParameter("r9_BType"))) {
            return "success";
        }
        return null;
    }

    @Override
    public Integer getTimeout() {
        return 21600;
    }

    @Override
    protected String generateSign(Map<String, Object> parameterMap) {
        return hmacDigest(joinValue(parameterMap, null, null, null, false), getAttribute("key"));
    }

    @Override
    protected boolean verifySign(String sign, Map<String, Object> parameterMap) {
        return StringUtils.equals(sign,
                hmacDigest(joinValue(parameterMap, null, null, null, false), getAttribute("key")));
    }

    /**
     * Hmac加密
     * 
     * @param value
     *            值
     * @param key
     *            密钥
     * @return 密文
     */
    public String hmacDigest(String aValue, String aKey) {
        byte[] k_ipad = new byte[64];
        byte[] k_opad = new byte[64];
        byte[] keyb = aKey.getBytes();
        byte[] value = aValue.getBytes();

        Arrays.fill(k_ipad, keyb.length, 64, (byte) 54);
        Arrays.fill(k_opad, keyb.length, 64, (byte) 92);
        for (int i = 0; i < keyb.length; i++) {
            k_ipad[i] = (byte) (keyb[i] ^ 0x36);
            k_opad[i] = (byte) (keyb[i] ^ 0x5c);
        }

        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            return null;
        }

        md.update(k_ipad);
        md.update(value);
        byte dg[] = md.digest();
        md.reset();
        md.update(k_opad);
        md.update(dg, 0, 16);
        dg = md.digest();

        StringBuffer output = new StringBuffer(dg.length * 2);
        for (int i = 0; i < dg.length; i++) {
            int current = dg[i] & 0xff;
            if (current < 16) {
                output.append("0");
            }
            output.append(Integer.toString(current, 16));
        }

        return output.toString();
    }

}