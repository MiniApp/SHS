package im.shs.web.plugin.payment.yeepay;

import im.shs.web.enums.PaymentFeeTypeEnum;

import java.math.BigDecimal;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

/**
 * Bean - 易宝支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public class YeepayBean {

    /** 支付方式名称 */
    private String paymentName;

    /** Logo文件 */
    private MultipartFile logoFile;

    /** 商户编号 */
    private String partner;

    /** 商户密匙 */
    private String key;

    /** 最低额度 */
    private BigDecimal minimum;

    /** 最高额度 */
    private BigDecimal maximum;

    /** 手续费类型 */
    private PaymentFeeTypeEnum feeType;

    /** 手续费 */
    private BigDecimal fee;

    /** 描述 */
    private String description;

    /** 排序 */
    private Integer order;

    /** 是否启用 */
    private Boolean enabled;

    @NotBlank
    @Length(max = 200)
    public String getPaymentName() {
        return paymentName;
    }

    public void setPaymentName(String paymentName) {
        this.paymentName = paymentName;
    }

    public MultipartFile getLogoFile() {
        return logoFile;
    }

    public void setLogoFile(MultipartFile logoFile) {
        this.logoFile = logoFile;
    }

    @NotBlank
    @Length(max = 200)
    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    @NotBlank
    @Length(max = 200)
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Min(0)
    @Digits(integer = 19, fraction = 2)
    public BigDecimal getMinimum() {
        return minimum;
    }

    public void setMinimum(BigDecimal minimum) {
        this.minimum = minimum;
    }

    @Min(0)
    @Digits(integer = 19, fraction = 2)
    public BigDecimal getMaximum() {
        return maximum;
    }

    public void setMaximum(BigDecimal maximum) {
        this.maximum = maximum;
    }

    @NotNull
    public PaymentFeeTypeEnum getFeeType() {
        return feeType;
    }

    public void setFeeType(PaymentFeeTypeEnum feeType) {
        this.feeType = feeType;
    }

    @Min(0)
    @Digits(integer = 19, fraction = 3)
    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    @Length(max = 200)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Min(0)
    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    @NotNull
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

}