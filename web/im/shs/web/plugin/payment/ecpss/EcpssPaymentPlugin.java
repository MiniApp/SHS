package im.shs.web.plugin.payment.ecpss;

import im.shs.web.entity.PaymentEntity;
import im.shs.web.enums.PaymentMethodEnum;
import im.shs.web.enums.PaymentNotifyMethodEnum;
import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.payment.PaymentPlugin;
import im.shs.web.service.StaticService;
import im.shs.web.util.DateTimeUtil;
import im.shs.web.util.XmlUtils;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * Plugin - 汇潮支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Component("ecpssPaymentPlugin")
public class EcpssPaymentPlugin extends PaymentPlugin {

    @Resource(name = "staticServiceImpl")
    private StaticService staticService;

    @Override
    public String getName() {
        return "汇潮支付";
    }

    @Override
    public PaymentMethodEnum getPaymentMethod() {
        return PaymentMethodEnum.online;
    }

    @Override
    public String getVersion() {
        return "1.9.1";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.ecpss.com";
    }

    @Override
    public String getInstallUrl() {
        return "ecpss/install";
    }

    @Override
    public String getUninstallUrl() {
        return "ecpss/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "ecpss/setting";
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
        return "https://pay.ecpss.cn/sslpayment";
    }

    @Override
    public Map<String, Object> getParameterMap(String sn, String description, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);
        Map<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("MerNo", getAttribute("partner"));
        parameterMap.put("BillNo", sn);
        parameterMap.put("Amount", pPayment.getAmount().toString());
        parameterMap.put("ReturnURL", getNotifyUrl(sn, PaymentNotifyMethodEnum.general));
        parameterMap.put("AdviceURL", getNotifyUrl(sn, PaymentNotifyMethodEnum.general));
        parameterMap.put("SignInfo", generateSign(parameterMap));
        parameterMap.put("orderTime", DateTimeUtil.formatDateTimetoString(pPayment.getCreateDate(), "YYYYMMDDHHMMSS"));
        String bank = request.getParameter("bank");
        if (StringUtils.isNotBlank(bank)) {
            parameterMap.put("defaultBankNumber", bank);
        }
        parameterMap.put("Remark",
                StringUtils.abbreviate(StringUtils.replaceChars(description, "[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        parameterMap.put("products",
                StringUtils.abbreviate(StringUtils.replaceChars(description, "[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", ""), 20));
        return parameterMap;
    }

    @Override
    public boolean verifyPayment(String sn) {
        PaymentEntity pPayment = getPayment(sn);

        SearchBean searchBean = new SearchBean();
        searchBean.setTx("1001");
        searchBean.setMerCode(getAttribute("partner"));
        searchBean.setOrderNumber(sn);
        searchBean.setBeginTime(DateTimeUtil.formatDateTimetoString(pPayment.getCreateDate(), "YYYYMMDDHHMMSS"));
        searchBean.setEndTime(DateTimeUtil.formatDateTimetoString(pPayment.getCreateDate(), "YYYYMMDDHHMMSS"));
        searchBean.setPageIndex(1);
        searchBean.setSign(StringUtils.upperCase(DigestUtils.md5Hex(getAttribute("partner") + getAttribute("key"))));
        String searchXML = XmlUtils.convertString(searchBean);

        Map<String, Object> parameterMap = new HashMap<String, Object>();
        parameterMap.put("requestDomain", Base64.encodeBase64String(searchXML.getBytes()));
        String response = post("https://merchant.ecpss.cn/merchantBatchQueryAPI", parameterMap);
        ResultBean resultBean = XmlUtils.convertObject(response, ResultBean.class);

        OrderBean order = resultBean.getOrder();
        if (StringUtils.equals(resultBean.getResultCode(), "00")
                && StringUtils.equals(resultBean.getMerCode(), getAttribute("partner"))
                && StringUtils.equals(sn, order.getNo()) && pPayment.verifyAmount(order.getAmount())
                && StringUtils.equals(order.getStatus(), "1")) {
            return true;
        }
        return false;
    }

    @Override
    public boolean verifyNotify(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        PaymentEntity pPayment = getPayment(sn);

        String BillNo = request.getParameter("BillNo");
        String Amount = request.getParameter("Amount");
        String Succeed = request.getParameter("Succeed");

        Map<String, Object> parameterMap = new LinkedHashMap<String, Object>();
        parameterMap.put("BillNo", BillNo);
        parameterMap.put("Amount", Amount);
        parameterMap.put("Succeed", Succeed);

        if (StringUtils.equals("88", Succeed) && StringUtils.equals(sn, BillNo) && pPayment.verifyAmount(Amount)
                && verifySign(request.getParameter("SignMD5info"), parameterMap)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String getNotifyMessage(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request) {
        if (StringUtils.equals("88", request.getParameter("Succeed"))) {
            return "ok";
        }
        return "fail";
    }

    @Override
    public Integer getTimeout() {
        return 21600;
    }

    @Override
    protected String generateSign(Map<String, Object> parameterMap) {
        return StringUtils.upperCase(DigestUtils.md5Hex(joinValue(parameterMap, null, "&" + getAttribute("key"), "&",
                true, "AdviceURL")));
    }

    @Override
    protected boolean verifySign(String sign, Map<String, Object> parameterMap) {
        return StringUtils.equals(sign, StringUtils.upperCase(DigestUtils.md5Hex(joinValue(parameterMap, null, "&"
                + getAttribute("key"), "&", true))));
    }

}