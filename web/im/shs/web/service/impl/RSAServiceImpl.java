package im.shs.web.service.impl;

import im.shs.util.RSAUtils;
import im.shs.web.service.RSAService;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

/**
 * @ClassName : RSAServiceImpl
 * @Description: RSA安全
 * @Author suhao
 * @Date 2014年7月12日 下午8:47:47
 * @Version 1.0
 */
@Service("rsaServiceImpl")
public class RSAServiceImpl implements RSAService {

	/** "私钥"参数名称 */
    private static final String PRIVATE_KEY_ATTRIBUTE_NAME = "privateKey";

    @Override
    @Transactional(readOnly = true)
    public RSAPublicKey generateKey(HttpServletRequest request) {
        Assert.notNull(request);
        KeyPair keyPair = RSAUtils.generateKeyPair();
        // 公开/加密密匙（PK）
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        // 秘密/解密密匙（SK）
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        HttpSession session = request.getSession();
        session.setAttribute(PRIVATE_KEY_ATTRIBUTE_NAME, privateKey);
        return publicKey;
    }

    @Override
    @Transactional(readOnly = true)
    public void removePrivateKey(HttpServletRequest request) {
        Assert.notNull(request);
        HttpSession session = request.getSession();
        session.removeAttribute(PRIVATE_KEY_ATTRIBUTE_NAME);
    }

    @Override
    @Transactional(readOnly = true)
    public String decryptParameter(String name, HttpServletRequest request) {
        Assert.notNull(request);
        if (name != null) {
            HttpSession session = request.getSession();
            // 秘密/解密密匙（SK）
            RSAPrivateKey privateKey = (RSAPrivateKey) session.getAttribute(PRIVATE_KEY_ATTRIBUTE_NAME);
            String parameter = request.getParameter(name);
            if (privateKey != null && StringUtils.isNotBlank(parameter)) {
                return RSAUtils.decrypt(privateKey, parameter);
            }
        }
        return null;
    }

}