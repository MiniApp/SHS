package im.shs.web.bean.admin;

import javax.validation.constraints.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @class : ProfileSettingBean
 * @description: 账户设置
 *
 * @author suhao
 * @date 2014年7月13日 上午1:42:19
 * @version 1.0
 */
public class ProfileSettingBean {

    /** 当前密码 */
    private String currentPassword;

    /** 密码 */
    private String password;

    /** 邮箱地址 */
    private String email;

    @NotBlank
    @Pattern(regexp = "^[^\\s&\"<>]+$")
    @Length(min = 4, max = 20)
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    @Pattern(regexp = "^[^\\s&\"<>]+$")
    @Length(min = 4, max = 20)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Length(max = 200)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = StringUtils.lowerCase(email);
    }

}