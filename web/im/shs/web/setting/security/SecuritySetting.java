package im.shs.web.setting.security;

import im.shs.web.enums.AccountLockTypeEnum;
import im.shs.web.enums.CaptchaTypeEnum;
import im.shs.web.enums.LoginTypeEnum;
import im.shs.web.enums.RandomStringTypeEnum;
import im.shs.web.enums.RoundingModeEnum;
import im.shs.web.util.ConvertUtils;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * @class : SecuritySetting
 * @description: 安全设置
 *
 * @author suhao
 * @date 2014年7月13日 上午12:45:32
 * @version 1.0
 */
public class SecuritySetting implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = 8104427705861504419L;

    /** 分隔符 */
    private static final String SEPARATOR = ",";

    /** 注册是否开放 */
    private Boolean registEnabled;

    /** 用户名最小长度 */
    private Integer usernameMinLength;

    /** 用户名最大长度 */
    private Integer usernameMaxLength;

    /** 密码最小长度 */
    private Integer passwordMinLength;

    /** 密码最大长度 */
    private Integer passwordMaxLength;

    /** 登录方式 */
    private LoginTypeEnum[] loginMethods;

    /** 验证码范围 */
    private CaptchaTypeEnum[] captchaScopes;

    /** 账户锁定范围 */
    private AccountLockTypeEnum[] accountLockScopes;

    /** 账户锁定计数 */
    private Integer accountLockCount;

    /** 账户锁定时间 */
    private Integer accountLockTime;

    /** 令牌类型 */
    private RandomStringTypeEnum tokenType;

    /** 令牌长度 */
    private Integer tokenCodeLength;

    /** 令牌到期时间 */
    private Integer tokenExpiryTime;

    /** 令牌重发时间 */
    private Integer tokenRetryTime;

    /** 货币符号 */
    private String currencySign;

    /** 货币单位 */
    private String currencyUnit;

    /** 金额精确位数 */
    private Integer amountScale;

    /** 金额精确方式 */
    private RoundingModeEnum amountRoundMethod;

    /** 上传文件限制 */
    private Integer uploadMaxSize;

    /** 上传图片类型 */
    private String uploadImageExtension;

    /** 上传Flash类型 */
    private String uploadFlashExtension;

    /** 上传媒体类型 */
    private String uploadMediaExtension;

    /** 上传文件类型 */
    private String uploadFileExtension;

    /** 上传图片路径 */
    private String imageUploadPath;

    /** 上传Flash路径 */
    private String flashUploadPath;

    /** 上传媒体路径 */
    private String mediaUploadPath;

    /** 上传文件路径 */
    private String fileUploadPath;

    @NotNull
    public Boolean getRegistEnabled() {
        return registEnabled;
    }

    public void setRegistEnabled(Boolean registEnabled) {
        this.registEnabled = registEnabled;
    }

    @NotNull
    @Min(value = 1)
    @Max(value = 117)
    public Integer getUsernameMinLength() {
        return usernameMinLength;
    }

    public void setUsernameMinLength(Integer usernameMinLength) {
        this.usernameMinLength = usernameMinLength;
    }

    @NotNull
    @Min(value = 1)
    @Max(value = 117)
    public Integer getUsernameMaxLength() {
        return usernameMaxLength;
    }

    public void setUsernameMaxLength(Integer usernameMaxLength) {
        this.usernameMaxLength = usernameMaxLength;
    }

    @NotNull
    @Min(value = 1)
    @Max(value = 117)
    public Integer getPasswordMinLength() {
        return passwordMinLength;
    }

    public void setPasswordMinLength(Integer passwordMinLength) {
        this.passwordMinLength = passwordMinLength;
    }

    @NotNull
    @Min(value = 1)
    @Max(value = 117)
    public Integer getPasswordMaxLength() {
        return passwordMaxLength;
    }

    public void setPasswordMaxLength(Integer passwordMaxLength) {
        this.passwordMaxLength = passwordMaxLength;
    }

    public LoginTypeEnum[] getLoginMethods() {
        return loginMethods;
    }

    public void setLoginMethods(LoginTypeEnum[] loginMethods) {
        this.loginMethods = loginMethods;
    }

    public CaptchaTypeEnum[] getCaptchaScopes() {
        return captchaScopes;
    }

    public void setCaptchaScopes(CaptchaTypeEnum[] captchaScopes) {
        this.captchaScopes = captchaScopes;
    }

    public AccountLockTypeEnum[] getAccountLockScopes() {
        return accountLockScopes;
    }

    public void setAccountLockScopes(AccountLockTypeEnum[] accountLockScopes) {
        this.accountLockScopes = accountLockScopes;
    }

    @NotNull
    @Min(value = 1)
    public Integer getAccountLockCount() {
        return accountLockCount;
    }

    public void setAccountLockCount(Integer accountLockCount) {
        this.accountLockCount = accountLockCount;
    }

    @NotNull
    @Min(value = 0)
    public Integer getAccountLockTime() {
        return accountLockTime;
    }

    public void setAccountLockTime(Integer accountLockTime) {
        this.accountLockTime = accountLockTime;
    }

    @NotNull
    public RandomStringTypeEnum getTokenType() {
        return tokenType;
    }

    public void setTokenType(RandomStringTypeEnum tokenType) {
        this.tokenType = tokenType;
    }

    @NotNull
    @Min(value = 0)
    public Integer getTokenCodeLength() {
        return tokenCodeLength;
    }

    public void setTokenCodeLength(Integer tokenCodeLength) {
        this.tokenCodeLength = tokenCodeLength;
    }

    @NotNull
    @Min(value = 0)
    public Integer getTokenExpiryTime() {
        return tokenExpiryTime;
    }

    public void setTokenExpiryTime(Integer tokenExpiryTime) {
        this.tokenExpiryTime = tokenExpiryTime;
    }

    @NotNull
    @Min(value = 0)
    public Integer getTokenRetryTime() {
        return tokenRetryTime;
    }

    public void setTokenRetryTime(Integer tokenRetryTime) {
        this.tokenRetryTime = tokenRetryTime;
    }

    @NotEmpty
    @Length(max = 200)
    public String getCurrencySign() {
        return currencySign;
    }

    public void setCurrencySign(String currencySign) {
        this.currencySign = currencySign;
    }

    @NotEmpty
    @Length(max = 200)
    public String getCurrencyUnit() {
        return currencyUnit;
    }

    public void setCurrencyUnit(String currencyUnit) {
        this.currencyUnit = currencyUnit;
    }

    @NotNull
    @Min(0)
    @Max(3)
    public Integer getAmountScale() {
        return amountScale;
    }

    public void setAmountScale(Integer amountScale) {
        this.amountScale = amountScale;
    }

    @NotNull
    public RoundingModeEnum getAmountRoundMethod() {
        return amountRoundMethod;
    }

    public void setAmountRoundMethod(RoundingModeEnum amountRoundMethod) {
        this.amountRoundMethod = amountRoundMethod;
    }

    @NotNull
    @Min(value = 0)
    public Integer getUploadMaxSize() {
        return uploadMaxSize;
    }

    public void setUploadMaxSize(Integer uploadMaxSize) {
        this.uploadMaxSize = uploadMaxSize;
    }

    @Length(max = 200)
    public String getUploadImageExtension() {
        return uploadImageExtension;
    }

    public void setUploadImageExtension(String uploadImageExtension) {
        this.uploadImageExtension = ConvertUtils.toKeyword(uploadImageExtension);
    }

    @Length(max = 200)
    public String getUploadFlashExtension() {
        return uploadFlashExtension;
    }

    public void setUploadFlashExtension(String uploadFlashExtension) {
        this.uploadFlashExtension = ConvertUtils.toKeyword(uploadFlashExtension);
    }

    @Length(max = 200)
    public String getUploadMediaExtension() {
        return uploadMediaExtension;
    }

    public void setUploadMediaExtension(String uploadMediaExtension) {
        this.uploadMediaExtension = ConvertUtils.toKeyword(uploadMediaExtension);
    }

    @Length(max = 200)
    public String getUploadFileExtension() {
        return uploadFileExtension;
    }

    public void setUploadFileExtension(String uploadFileExtension) {
        this.uploadFileExtension = ConvertUtils.toKeyword(uploadFileExtension);
    }

    @NotBlank
    @Length(max = 200)
    public String getImageUploadPath() {
        return imageUploadPath;
    }

    public void setImageUploadPath(String imageUploadPath) {
        this.imageUploadPath = ConvertUtils.toDirectoryPath(imageUploadPath);
    }

    @NotBlank
    @Length(max = 200)
    public String getFlashUploadPath() {
        return flashUploadPath;
    }

    public void setFlashUploadPath(String flashUploadPath) {
        this.flashUploadPath = ConvertUtils.toDirectoryPath(flashUploadPath);
    }

    @NotBlank
    @Length(max = 200)
    public String getMediaUploadPath() {
        return mediaUploadPath;
    }

    public void setMediaUploadPath(String mediaUploadPath) {
        this.mediaUploadPath = ConvertUtils.toDirectoryPath(mediaUploadPath);
    }

    @NotBlank
    @Length(max = 200)
    public String getFileUploadPath() {
        return fileUploadPath;
    }

    public void setFileUploadPath(String fileUploadPath) {
        this.fileUploadPath = ConvertUtils.toDirectoryPath(fileUploadPath);
    }

    /**
     * 验证用户名长度
     * 
     * @param username
     *            用户名
     * @return 验证是否通过
     */
    public boolean verifyUsernameLength(String username) {
        return !(StringUtils.length(username) < getUsernameMinLength() || StringUtils.length(username) > getUsernameMaxLength());
    }

    /**
     * 验证密码长度
     * 
     * @param password
     *            密码
     * @return 验证是否通过
     */
    public boolean verifyPasswordLength(String password) {
        return !(StringUtils.length(password) < getPasswordMinLength() || StringUtils.length(password) > getPasswordMaxLength());
    }

    /**
     * 判断是否开放登录
     * 
     * @return 是否开放登录
     */
    public boolean getLoginEnabled() {
        return ArrayUtils.isNotEmpty(getLoginMethods());
    }

    /**
     * 验证登录方式
     * 
     * @param loginType
     *            登录类型
     * @return 验证是否通过
     */
    public boolean verifyLoginMethod(LoginTypeEnum loginType) {
        return ArrayUtils.contains(getLoginMethods(), loginType);
    }

    /**
     * 验证账户锁定范围
     * 
     * @param accountLockType
     *            账户锁定类型
     * @return 验证是否通过
     */
    public boolean verifyAccountLockScope(AccountLockTypeEnum accountLockType) {
        return ArrayUtils.contains(getAccountLockScopes(), accountLockType);
    }

    /**
     * 获取账户解锁日期
     * 
     * @param lockedDate
     *            锁定日期
     * @return 账户解锁日期
     */
    public Date getAccountUnlockDate(Date lockedDate) {
        return DateUtils.addMinutes(lockedDate, getAccountLockTime());
    }

    /**
     * 判断是否解锁账户
     * 
     * @param lockedDate
     *            锁定日期
     * @return 是否解锁账户
     */
    public boolean getAccountUnlocked(Date lockedDate) {
        return new Date().after(getAccountUnlockDate(lockedDate));
    }

    /**
     * 验证账户锁定
     * 
     * @param accountLockType
     *            账户锁定类型
     * @param count
     *            计数
     * @return 验证是否通过
     */
    public boolean verifyAccountLock(AccountLockTypeEnum accountLockType, int count) {
        return verifyAccountLockScope(accountLockType) && count >= getAccountLockCount();
    }

    /**
     * 获取令牌代码
     * 
     * @return 令牌代码
     */
    public String getTokenCode() {
        switch (getTokenType()) {
            case numeric: {
                return RandomStringUtils.randomNumeric(getTokenCodeLength());
            }
            case alphabetic: {
                return RandomStringUtils.randomAlphabetic(getTokenCodeLength());
            }
            case alpha_numeric: {
                return RandomStringUtils.randomAlphanumeric(getTokenCodeLength());
            }
            case ASCII: {
                return RandomStringUtils.randomAscii(getTokenCodeLength());
            }
            default: {
                return null;
            }
        }
    }

    /**
     * 获取令牌到期时间
     * 
     * @return 令牌到期时间
     */
    public Date getTokenExpiry() {
        return (getTokenExpiryTime() != null && getTokenExpiryTime() > 0) ? DateUtils.addMinutes(new Date(),
                getTokenExpiryTime()) : null;
    }

    /**
     * 获取令牌重发时间
     * 
     * @return 令牌重发时间
     */
    public Date getTokenRetry() {
        return (getTokenRetryTime() != null && getTokenRetryTime() > 0) ? DateUtils.addSeconds(new Date(),
                getTokenRetryTime()) : null;
    }

    /**
     * 获取允许上传图片扩展名
     * 
     * @return 允许上传图片扩展名
     */
    public String[] getUploadImageExtensions() {
        return StringUtils.split(uploadImageExtension, SEPARATOR);
    }

    /**
     * 获取允许上传Flash扩展名
     * 
     * @return 允许上传Flash扩展名
     */
    public String[] getUploadFlashExtensions() {
        return StringUtils.split(uploadFlashExtension, SEPARATOR);
    }

    /**
     * 获取允许上传媒体扩展名
     * 
     * @return 允许上传媒体扩展名
     */
    public String[] getUploadMediaExtensions() {
        return StringUtils.split(uploadMediaExtension, SEPARATOR);
    }

    /**
     * 获取允许上传文件扩展名
     * 
     * @return 允许上传文件扩展名
     */
    public String[] getUploadFileExtensions() {
        return StringUtils.split(uploadFileExtension, SEPARATOR);
    }

    /**
     * 设置金额精度
     * 
     * @param amount
     *            金额
     * @return 金额
     */
    public BigDecimal setScale(BigDecimal amount) {
        if (amount == null) {
            return null;
        }
        if (getAmountRoundMethod() == RoundingModeEnum.roundUp) {
            return amount.setScale(getAmountScale(), BigDecimal.ROUND_UP);
        } else if (getAmountRoundMethod() == RoundingModeEnum.roundDown) {
            return amount.setScale(getAmountScale(), BigDecimal.ROUND_DOWN);
        } else if (getAmountRoundMethod() == RoundingModeEnum.roundHalfUp) {
            return amount.setScale(getAmountScale(), BigDecimal.ROUND_HALF_UP);
        } else {
            return amount.setScale(getAmountScale());
        }
    }

}