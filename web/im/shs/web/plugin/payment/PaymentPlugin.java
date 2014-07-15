package im.shs.web.plugin.payment;

import im.shs.web.entity.PaymentEntity;
import im.shs.web.enums.PaymentFeeTypeEnum;
import im.shs.web.enums.PaymentMethodEnum;
import im.shs.web.enums.PaymentNotifyMethodEnum;
import im.shs.web.enums.RequestMethodEnum;
import im.shs.web.plugin.BasePlugin;
import im.shs.web.service.PaymentService;
import im.shs.web.setting.basic.BasicSetting;
import im.shs.web.util.SettingUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

/**
 * @class : PaymentPlugin
 * @description: 支付
 *
 * @author suhao
 * @date 2014年7月14日 下午10:56:14
 * @version 1.0
 */
public abstract class PaymentPlugin extends BasePlugin {

    /** “支付方式名称”属性名称 */
    public static final String PAYMENT_NAME_ATTR = "paymentName";

    /** “LOGO”属性名称 */
    public static final String LOGO_ATTR = "logo";

    /** “合作编号”属性 */
    public static final String PARTNER_ATTR = "partner";

    /** “密匙”属性 */
    public static final String KEY_ATTR = "key";

    /** “最低额度”属性名称 */
    public static final String MINIMUM_ATTR = "minimum";

    /** “最高额度”属性名称 */
    public static final String MAXIMUM_ATTR = "maximum";

    /** “服务费类型”属性名称 */
    public static final String FEE_TYPE_ATTR = "feeType";

    /** “服务费”属性名称 */
    public static final String FEE_ATTR = "fee";

    /** “描述”属性名称 */
    public static final String DESCRIPTION_ATTR = "description";

    @Resource(name = "paymentServiceImpl")
    private PaymentService paymentService;

    /**
     * 获取支付方式
     * 
     * @return 支付方式
     */
    public abstract PaymentMethodEnum getPaymentMethod();

    /**
     * 查找支付
     * 
     * @param sn
     *            编号
     * @return 支付，若不存在则返回null
     */
    protected PaymentEntity getPayment(String sn) {
        return paymentService.findBySn(sn);
    }

    /**
     * 获取支付方式名称
     * 
     * @return 支付方式名称
     */
    public String getPaymentName() {
        return getAttribute(PAYMENT_NAME_ATTR);
    }

    /**
     * 获取LOGO
     * 
     * @return LOGO
     */
    public String getLogo() {
        return getAttribute(LOGO_ATTR);
    }

    /**
     * 获取合作编号
     * 
     * @return 合作编号
     */
    public String getPartner() {
        return getAttribute(PARTNER_ATTR);
    }

    /**
     * 获取密匙
     * 
     * @return 密匙
     */
    public String getKey() {
        return getAttribute(KEY_ATTR);
    }

    /**
     * 获取最低额度
     * 
     * @return 最低额度
     */
    public BigDecimal getMinimum() {
        String maximum = getAttribute(MINIMUM_ATTR);
        if (StringUtils.isBlank(maximum)) {
            return null;
        }
        return new BigDecimal(maximum);
    }

    /**
     * 获取最高额度
     * 
     * @return 最高额度
     */
    public BigDecimal getMaximum() {
        String maximum = getAttribute(MAXIMUM_ATTR);
        if (StringUtils.isBlank(maximum)) {
            return null;
        }
        return new BigDecimal(maximum);
    }

    /**
     * 获取服务费类型
     * 
     * @return 服务费类型
     */
    public PaymentFeeTypeEnum getFeeType() {
        String feeType = getAttribute(FEE_TYPE_ATTR);
        if (StringUtils.isBlank(feeType)) {
            return null;
        }
        return PaymentFeeTypeEnum.valueOf(feeType);
    }

    /**
     * 获取服务费
     * 
     * @return 服务费
     */
    public BigDecimal getFee() {
        String fee = getAttribute(FEE_ATTR);
        if (StringUtils.isBlank(fee)) {
            return null;
        }
        return new BigDecimal(fee);
    }

    /**
     * 获取描述
     * 
     * @return 描述
     */
    public String getDescription() {
        return getAttribute(DESCRIPTION_ATTR);
    }

    /**
     * 验证额度
     * 
     * @param amount
     *            额度
     * @return 验证是否通过
     */
    public boolean verifyAmount(BigDecimal amount) {
        BigDecimal minimum = getMinimum();
        BigDecimal maximum = getMaximum();
        return (minimum == null || !(minimum.compareTo(amount) > 0))
                && (maximum == null || !(maximum.compareTo(amount) < 0));
    }

    /**
     * 获取验证额度消息
     * 
     * @param amount
     *            额度
     * @return 验证消息，若验证通过则返回NULL
     */
    public String getVerifyAmountMessage(BigDecimal amount) {
        BigDecimal minimum = getMinimum();
        BigDecimal maximum = getMaximum();
        if ((minimum != null && minimum.compareTo(amount) > 0) || (maximum != null && maximum.compareTo(amount) < 0)) {
            if (minimum != null && maximum != null) {
                if (minimum.compareTo(maximum) == 0) {
                    return "必须为" + minimum;
                } else {
                    return "必须在" + minimum + "-" + maximum + "之间";
                }
            } else if (minimum != null) {
                return "必须大于" + minimum;
            } else {
                return "必须小于" + maximum;
            }
        }
        return null;
    }

    /**
     * 计算服务费
     * 
     * @param amount
     *            金额
     * @return 服务费
     */
    public BigDecimal calculateFee(BigDecimal amount) {
        if (getFeeType() == PaymentFeeTypeEnum.scale) {
            return setScale(amount.multiply(getFee()));
        } else {
            return setScale(getFee());
        }
    }

    /**
     * 计算支付金额
     * 
     * @param amount
     *            金额
     * @return 支付金额
     */
    public BigDecimal calculateAmount(BigDecimal amount) {
        return setScale(amount.add(calculateFee(amount)));
    }

    /**
     * 获取请求方式
     * 
     * @return 请求方式
     */
    public abstract RequestMethodEnum getRequestMethod();

    /**
     * 获取请求字符编码
     * 
     * @return 请求字符编码
     */
    public abstract String getRequestCharset();

    /**
     * 获取请求URL
     * 
     * @return 请求URL
     */
    public abstract String getRequestUrl();

    /**
     * 获取通知URL
     * 
     * @param sn
     *            编号
     * @param notifyMethod
     *            通知方法
     * @return 通知URL
     */
    protected String getNotifyUrl(String sn, PaymentNotifyMethodEnum notifyMethod) {
        BasicSetting setting = SettingUtils.get().getBasic();
        if (notifyMethod == null) {
            return setting.getSiteUrl() + "/payment/" + PaymentNotifyMethodEnum.general + "/" + sn;
        }
        return setting.getSiteUrl() + "/payment/" + notifyMethod + "/" + sn;
    }

    /**
     * 获取请求参数
     * 
     * @param sn
     *            编号
     * @param description
     *            描述
     * @param request
     *            httpServletRequest
     * @return 请求参数
     */
    public abstract Map<String, Object> getParameterMap(String sn, String description, HttpServletRequest request);

    /**
     * 验证支付
     * 
     * @param sn
     *            编号
     * @return 验证是否通过
     */
    public abstract boolean verifyPayment(String sn);

    /**
     * 验证通知是否合法
     * 
     * @param sn
     *            编号
     * @param notifyMethod
     *            通知方法
     * @param request
     *            httpServletRequest
     * @return 通知是否合法
     */
    public abstract boolean verifyNotify(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request);

    /**
     * 获取通知返回消息
     * 
     * @param sn
     *            编号
     * @param notifyMethod
     *            通知方法
     * @param request
     *            httpServletRequest
     * @return 通知返回消息
     */
    public abstract String getNotifyMessage(String sn, PaymentNotifyMethodEnum notifyMethod, HttpServletRequest request);

    /**
     * 获取超时时间
     * 
     * @return 超时时间
     */
    public abstract Integer getTimeout();

    /**
     * 生成签名
     * 
     * @param parameterMap
     *            参数
     * @return 签名
     */
    protected abstract String generateSign(Map<String, Object> parameterMap);

    /**
     * 验证签名
     * 
     * @param sign
     *            签名
     * @param parameterMap
     *            参数
     * @return 验证是否通过
     */
    protected abstract boolean verifySign(String sign, Map<String, Object> parameterMap);

    /**
     * 设置金额精度
     * 
     * @param amount
     *            金额
     * @return 金额
     */
    protected BigDecimal setScale(BigDecimal amount) {
        if (amount == null) {
            return null;
        }
        return amount.setScale(2, RoundingMode.UP);
    }

}