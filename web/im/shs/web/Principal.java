package im.shs.web;

import java.io.Serializable;

/**
 * @class : Principal
 * @description: 身份信息
 *
 * @author suhao
 * @date 2014年7月13日 上午12:19:08
 * @version 1.0
 */
public class Principal implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -7622090196647015781L;

    /** ID */
    private Long id;

    /** 用户名 */
    private String username;

    public Principal(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * 重写toString方法
     * 
     * @return 用户名
     */
    @Override
    public String toString() {
        return getUsername();
    }

}