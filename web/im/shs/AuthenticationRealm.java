package im.shs;

import im.shs.entity.AdminEntity;
import im.shs.enums.AccountLockTypeEnum;
import im.shs.enums.CaptchaTypeEnum;
import im.shs.util.SettingUtils;
import im.shs.web.service.AdminService;
import im.shs.web.service.CaptchaService;
import im.shs.web.setting.security.SecuritySetting;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.pam.UnsupportedTokenException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 * 授权认证
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public class AuthenticationRealm extends AuthorizingRealm {

    @Resource(name = "captchaServiceImpl")
    private CaptchaService captchaService;

    @Resource(name = "adminServiceImpl")
    private AdminService adminService;

    /**
     * 获取认证信息
     * 
     * @param token
     *            令牌
     * @return 认证信息
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(org.apache.shiro.authc.AuthenticationToken token) {

        // 获取登录令牌
        AuthenticationToken authenticationToken = (AuthenticationToken) token;

        // 获取登录信息
        String username = authenticationToken.getUsername();
        String password = new String(authenticationToken.getPassword());
        String captchaId = authenticationToken.getCaptchaId();
        String captcha = authenticationToken.getCaptcha();
        String ip = authenticationToken.getHost();

        // 启用管理员登录验证码时，验证验证码
        if (!captchaService.verify(CaptchaTypeEnum.adminLogin, captchaId, captcha)) {
            // 异常：无效令牌
            throw new UnsupportedTokenException();
        }

        // 用户名、密码验证
        if (username != null && password != null) {

            // 根据用户名获取管理员（验证用户名）
            AdminEntity admin = adminService.find(Filter.eq("username", username, true));
            // 管理员不存在时
            if (admin == null) {
                // 异常：账户不存在
                throw new UnknownAccountException();
            }
            // 管理员未启用时
            if (!admin.getEnabled()) {
                // 异常：账户未启用
                throw new DisabledAccountException();
            }

            // 读取安全设置
            SecuritySetting setting = SettingUtils.get().getSecurity();

            // 管理员被锁定时
            if (admin.getLocked()) {
                // 账户锁定范围：管理员
                if (ArrayUtils.contains(setting.getAccountLockScopes(), AccountLockTypeEnum.admin)) {

                    // 获取自动解锁时间
                    int loginFailureLockTime = setting.getAccountLockTime();
                    // 自动解锁时间为0时永久锁定
                    if (loginFailureLockTime == 0) {
                        // 异常：账户被锁定
                        throw new LockedAccountException();
                    }

                    // 获取管理员锁定日期
                    Date lockedDate = admin.getLockedDate();
                    // 获取管理员解锁日期
                    Date unlockDate = DateUtils.addMinutes(lockedDate, loginFailureLockTime);

                    // 当前日期超出管理员解锁日期时
                    if (new Date().after(unlockDate)) {
                        // 解锁管理员
                        admin.setLoginFailureCount(0);
                        admin.setLocked(false);
                        admin.setLockedDate(null);
                        adminService.update(admin);
                    }
                    // 当前日期未超出管理员解锁日期时
                    else {
                        // 异常：账户被锁定
                        throw new LockedAccountException();
                    }

                }
                // 账户锁定类型：非管理员
                else {
                    // 解锁管理员
                    admin.setLoginFailureCount(0);
                    admin.setLocked(false);
                    admin.setLockedDate(null);
                    adminService.update(admin);
                }
            }

            // 密码错误时
            if (!StringUtils.equals(DigestUtils.md5Hex(password), admin.getPassword())) {

                // 计算登录失败次数
                int loginFailureCount = admin.getLoginFailureCount() + 1;
                // 登录失败次数 >= 账户锁定计数，时
                if (loginFailureCount >= setting.getAccountLockCount()) {
                    // 锁定管理员
                    admin.setLocked(true);
                    admin.setLockedDate(new Date());
                }
                admin.setLoginFailureCount(loginFailureCount);
                adminService.update(admin);

                // 异常：认证错误
                throw new IncorrectCredentialsException();
            }

            // 管理员登录
            admin.setLoginIp(ip);
            admin.setLoginDate(new Date());
            admin.setLoginFailureCount(0);
            adminService.update(admin);

            // 返回认证信息
            return new SimpleAuthenticationInfo(new Principal(admin.getId(), username), password, getName());
        }

        // 异常：账户不存在
        throw new UnknownAccountException();
    }

    /**
     * 获取授权信息
     * 
     * @param principals
     *            principals
     * @return 授权信息
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        // 获取身份信息
        Principal principal = (Principal) principals.fromRealm(getName()).iterator().next();
        if (principal != null) {
            // 获取管理员权限
            List<String> auths = adminService.findAuths(principal.getId());
            if (auths != null) {
                // 实例化并返回权限信息
                SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
                authorizationInfo.addStringPermissions(auths);
                return authorizationInfo;
            }
        }
        return null;
    }

}