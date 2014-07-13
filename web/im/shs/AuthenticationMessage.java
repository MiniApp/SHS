package im.shs;

import java.security.interfaces.RSAPublicKey;

import org.apache.commons.codec.binary.Base64;

import im.shs.enums.MessageTypeEnum;

/**
 * @class : AuthenticationMessage
 * @description: 授权消息
 * 
 * @author suhao
 * @date 2014年7月12日 下午10:31:10
 * @version 1.0
 */
public class AuthenticationMessage extends Message {

	/** 验证码ID */
	private String captchaId;

	/** 系数 */
	private String modulus;

	/** 指数 */
	private String exponent;

	/** 登录成功URL */
	private String successUrl;

	public String getCaptchaId() {
		return captchaId;
	}

	public void setCaptchaId(String captchaId) {
		this.captchaId = captchaId;
	}

	public String getModulus() {
		return modulus;
	}

	public void setModulus(String modulus) {
		this.modulus = modulus;
	}

	public String getExponent() {
		return exponent;
	}

	public void setExponent(String exponent) {
		this.exponent = exponent;
	}

	public String getSuccessUrl() {
		return successUrl;
	}

	public void setSuccessUrl(String successUrl) {
		this.successUrl = successUrl;
	}

	/**
	 * @param type
	 *            类型
	 * @param cont
	 *            内容
	 * @param captchaId
	 *            验证码ID
	 * @param modulus
	 *            系数
	 * @param exponent
	 *            指数
	 * @param successUrl
	 *            登录成功URL
	 */
	public AuthenticationMessage(MessageTypeEnum type, String cont,
			String captchaId, String modulus, String exponent, String successUrl) {
		this.type = type;
		this.cont = cont;
		this.captchaId = captchaId;
		this.modulus = modulus;
		this.exponent = exponent;
		this.successUrl = successUrl;
	}

	/**
	 * 返回成功消息
	 * 
	 * @param content
	 *            内容
	 * @param successUrl
	 *            登录成功URL
	 * @return 成功消息
	 */
	public static AuthenticationMessage success(String content,
			String successUrl) {
		return new AuthenticationMessage(MessageTypeEnum.success, content,
				null, null, null, successUrl);
	}

	/**
	 * 返回错误消息
	 * 
	 * @param content
	 *            内容
	 * @param publicKey
	 *            密钥
	 * @return 错误消息
	 */
	public static AuthenticationMessage error(String content,
			RSAPublicKey publicKey) {
		return new AuthenticationMessage(
				MessageTypeEnum.error,
				content,
				null,
				Base64.encodeBase64String(publicKey.getModulus().toByteArray()),
				Base64.encodeBase64String(publicKey.getPublicExponent()
						.toByteArray()), null);
	}

	/**
	 * 返回错误消息
	 * 
	 * @param content
	 *            内容
	 * @param modulus
	 *            系数
	 * @param exponent
	 *            指数
	 * @return 错误消息
	 */
	public static AuthenticationMessage error(String content, String modulus,
			String exponent) {
		return new AuthenticationMessage(MessageTypeEnum.error, content, null,
				modulus, exponent, null);
	}

}