package im.shs.web;

import org.apache.shiro.authc.AuthenticationException;

/**
 * @class : AccountSuccessException
 * @description: 帐号登录成功异常
 *
 * @author suhao
 * @date 2014年7月12日 下午10:48:00
 * @version 1.0
 */
public class AccountSuccessException extends AuthenticationException {

    /** serialVersionUID */
    private static final long serialVersionUID = 2508581648635356160L;

    /** 登录成功URL */
    public static final String successUrl = "successUrl";

}