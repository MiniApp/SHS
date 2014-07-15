package im.shs.web;

import im.shs.web.setting.basic.BasicSetting;
import im.shs.web.setting.comm.CommSetting;
import im.shs.web.setting.display.DisplaySetting;
import im.shs.web.setting.referral.ReferralSetting;
import im.shs.web.setting.security.SecuritySetting;

import java.io.Serializable;

/**
 * @class : Setting
 * @description: 设置
 *
 * @author suhao
 * @date 2014年7月13日 上午12:19:24
 * @version 1.0
 */
public class Setting implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -3857611783379169867L;

    /** XML文件路径 */
    public static final String XML_PATH = "setting.xml";

    /** 缓存名称 */
    public static final String CACHE_NAME = "setting";

    /** 缓存Key */
    public static final Integer CACHE_KEY = 0;

    /** 基础 */
    private BasicSetting basic;

    /** 安全 */
    private SecuritySetting security;

    /** 显示 */
    private DisplaySetting display;

    /** 消息 */
    private CommSetting comm;

    /** 推荐 */
    private ReferralSetting referral;

    public Setting() {
        this.basic = new BasicSetting();
        this.security = new SecuritySetting();
        this.display = new DisplaySetting();
        this.comm = new CommSetting();
        this.referral = new ReferralSetting();
    }

    public BasicSetting getBasic() {
        return basic;
    }

    public void setBasic(BasicSetting basic) {
        this.basic = basic;
    }

    public SecuritySetting getSecurity() {
        return security;
    }

    public void setSecurity(SecuritySetting security) {
        this.security = security;
    }

    public DisplaySetting getDisplay() {
        return display;
    }

    public void setDisplay(DisplaySetting display) {
        this.display = display;
    }

    public CommSetting getComm() {
        return comm;
    }

    public void setComm(CommSetting comm) {
        this.comm = comm;
    }

    public ReferralSetting getReferral() {
        return referral;
    }

    public void setReferral(ReferralSetting referral) {
        this.referral = referral;
    }

}