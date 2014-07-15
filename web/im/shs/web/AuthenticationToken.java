package im.shs.web;

import org.apache.shiro.authc.UsernamePasswordToken;

/**
 * @class : AuthenticationToken
 * @description: 授权令牌
 * 
 * @author suhao
 * @date 2014年7月12日 下午10:35:30
 * @version 1.0
 */
public class AuthenticationToken extends UsernamePasswordToken {

	/** serialVersionUID */
	private static final long serialVersionUID = 7368760471388159436L;

	/** 验证码ID */
	private String captchaId;

	/** 验证码 */
	private String captcha;

	/**
	 * 构造函数
	 * 
	 * @param username
	 *            用户名
	 * @param password
	 *            密码
	 * @param captchaId
	 *            验证码ID
	 * @param captcha
	 *            验证码
	 * @param rememberMe
	 *            记住我
	 * @param host
	 *            IP
	 */
	public AuthenticationToken(String username, String password,
			String captchaId, String captcha, boolean rememberMe, String host) {
		super(username, password, rememberMe);
		this.captchaId = captchaId;
		this.captcha = captcha;
	}

	public String getCaptchaId() {
		return captchaId;
	}

	public void setCaptchaId(String captchaId) {
		this.captchaId = captchaId;
	}

	public String getCaptcha() {
		return captcha;
	}

	public void setCaptcha(String captcha) {
		this.captcha = captcha;
	}

}