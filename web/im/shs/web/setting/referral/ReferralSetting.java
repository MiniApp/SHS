package im.shs.web.setting.referral;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import org.apache.commons.lang3.time.DateUtils;

import com.sun.istack.NotNull;

/**
 * @class : ReferralSetting
 * @description: 推荐设置
 *
 * @author suhao
 * @date 2014年7月13日 上午1:25:40
 * @version 1.0
 */
public class ReferralSetting implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -8278041146472674448L;

    /** 提成是否启用 */
    private Boolean enabled;

    /** 提成费率 */
    private BigDecimal feeRate;

    /** 提成结算时间 */
    private Integer paymentTime;

    /** 提成有效时间 */
    private Integer expiryTime;

    @NotNull
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @NotNull
    @Min(0)
    @Max(100)
    @Digits(integer = 2, fraction = 2)
    public BigDecimal getFeeRate() {
        return feeRate;
    }

    public void setFeeRate(BigDecimal feeRate) {
        this.feeRate = feeRate;
    }

    @NotNull
    @Min(0)
    public Integer getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(Integer paymentTime) {
        this.paymentTime = paymentTime;
    }

    @NotNull
    @Min(0)
    public Integer getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Integer expiryTime) {
        this.expiryTime = expiryTime;
    }

    /**
     * 计算提成结算日期
     * 
     * @return 提成结算日期
     */
    public Date computePaymentDate() {
        return DateUtils.addDays(new Date(), getPaymentTime());
    }

    /**
     * 验证提成有效日期
     * 
     * @param date
     *            日期
     * @return 验证是否通过
     */
    public boolean verifyExpiryDate(Date date) {
        return getExpiryTime() != 0 && DateUtils.addDays(date, getExpiryTime()).after(new Date());
    }

}