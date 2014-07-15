package im.shs.web.plugin.payment.remittance;

import im.shs.web.enums.PaymentFeeTypeEnum;

import java.math.BigDecimal;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

/**
 * @class : RemittancePaymentBean
 * @description: 线下汇款支付
 *
 * @author suhao
 * @date 2014年7月15日 下午9:53:30
 * @version 1.0
 */
public class RemittancePaymentBean {

    /** 支付方式名称 */
    private String paymentName;

    /** Logo文件 */
    private MultipartFile logoFile;

    /** 银行 */
    private String bankName;

    /** 银行支行 */
    private String bankBranchName;

    /** 银行卡号 */
    private String bankCardNo;

    /** 银行卡持有人 */
    private String bankCardHolderName;

    /** 最低额度 */
    private BigDecimal minimum;

    /** 最高额度 */
    private BigDecimal maximum;

    /** 服务费类型 */
    private PaymentFeeTypeEnum feeType;

    /** 服务费 */
    private BigDecimal fee;

    /** 处理时间 */
    private String handleTime;

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
    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    @NotBlank
    @Length(max = 200)
    public String getBankBranchName() {
        return bankBranchName;
    }

    public void setBankBranchName(String bankBranchName) {
        this.bankBranchName = bankBranchName;
    }

    @NotBlank
    @Length(min = 12, max = 19)
    public String getBankCardNo() {
        return bankCardNo;
    }

    public void setBankCardNo(String bankCardNo) {
        this.bankCardNo = bankCardNo;
    }

    @NotBlank
    @Length(max = 200)
    public String getBankCardHolderName() {
        return bankCardHolderName;
    }

    public void setBankCardHolderName(String bankCardHolderName) {
        this.bankCardHolderName = bankCardHolderName;
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

    @NotBlank
    @Length(max = 200)
    public String getHandleTime() {
        return handleTime;
    }

    public void setHandleTime(String handleTime) {
        this.handleTime = handleTime;
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