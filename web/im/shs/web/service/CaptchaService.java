package im.shs.web.service;

import im.shs.web.enums.CaptchaTypeEnum;

import java.awt.image.BufferedImage;

/**
 * @class : CaptchaService
 * @description: 验证码
 *
 * @author suhao
 * @date 2014年7月13日 上午1:38:43
 * @version 1.0
 */
public interface CaptchaService {

    /**
     * 生成验证码图片
     * 
     * @param captchaId
     *            验证ID
     * @return 验证码图片
     */
    BufferedImage buildImage(String captchaId);

    /**
     * 验证码验证
     * 
     * @param captchaType
     *            验证码类型
     * @param captchaId
     *            验证ID
     * @param captcha
     *            验证码（忽略大小写）
     * @return 验证码验证是否通过
     */
    boolean verify(CaptchaTypeEnum captchaType, String captchaId, String captcha);

    /**
     * 验证码验证
     * 
     * @param captchaId
     *            验证ID
     * @param captcha
     *            验证码（忽略大小写）
     * @return 验证码验证是否通过
     */
    boolean verify(String captchaId, String captcha);

}