/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.action.admin;

import im.shs.AuthenticationMessage;
import im.shs.Message;
import im.shs.enums.AccountLockTypeEnum;
import im.shs.filter.AuthenticationFilter;
import im.shs.util.SettingUtils;
import im.shs.web.service.RSAService;
import im.shs.web.setting.security.SecuritySetting;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller - 登录
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Controller("adminLoginController")
@RequestMapping("/admin/login")
public class LoginController {


    @Resource(name = "rsaServiceImpl")
    private RSAService rsaService;

	/**
	 * @description: 登录
	 * 
	 * @author suhao
	 * @since 2014年7月12日下午9:08:26
	 */
    @RequestMapping(method = RequestMethod.GET)
    public String login(HttpServletRequest request, ModelMap model) {

        return "/admin/login/index";
    }
    
    /**
     * 登录
     */
    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    Message login(HttpServletRequest request) {

        // 登录成功
        String successUrl = (String) request.getAttribute(AuthenticationFilter.SUCCESS_URL);
        if (StringUtils.isNotBlank(successUrl)) {
            return AuthenticationMessage.success("登录成功", successUrl);
        }

        // 登陆失败
        String loginFailureKey = (String) request
                .getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
        if (StringUtils.isNotBlank(loginFailureKey)) {
            if (StringUtils.equals(loginFailureKey, "org.apache.shiro.authc.pam.UnsupportedTokenException")) {
                return AuthenticationMessage.error("验证码错误", rsaService.generateKey(request));
            } else if (StringUtils.equals(loginFailureKey, "org.apache.shiro.authc.UnknownAccountException")) {
                return AuthenticationMessage.error("账户或密码错误", rsaService.generateKey(request));
            } else if (StringUtils.equals(loginFailureKey, "org.apache.shiro.authc.DisabledAccountException")) {
                return AuthenticationMessage.error("账户已被禁用", rsaService.generateKey(request));
            } else if (StringUtils.equals(loginFailureKey, "org.apache.shiro.authc.LockedAccountException")) {
                return AuthenticationMessage.error("账户已被锁定", rsaService.generateKey(request));
            } else if (StringUtils.equals(loginFailureKey, "org.apache.shiro.authc.IncorrectCredentialsException")) {
                SecuritySetting setting = SettingUtils.get().getSecurity();
                if (ArrayUtils.contains(setting.getAccountLockScopes(), AccountLockTypeEnum.admin)) {
                    return AuthenticationMessage.error("账户或密码错误，若连续" + setting.getAccountLockCount() + "次错误此账户将被锁定",
                            rsaService.generateKey(request));
                } else {
                    return AuthenticationMessage.error("账户或密码错误", rsaService.generateKey(request));
                }
            } else if (StringUtils.equals(loginFailureKey, "org.apache.shiro.authc.AuthenticationException")) {
                return AuthenticationMessage.error("账户或密码错误", rsaService.generateKey(request));
            }
        }
        return AuthenticationMessage.error("登录失败", rsaService.generateKey(request));
    }

}