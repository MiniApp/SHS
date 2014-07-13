package im.shs.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * @class : AdminEntity
 * @description: 管理员
 *
 * @author suhao
 * @date 2014年7月13日 上午1:39:56
 * @version 1.0
 */
@Entity
@Table(name = "shs_admin")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_admin_sequence")
public class AdminEntity extends BaseEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 6061703023088115650L;

    /** 用户名 */
    private String username;

    /** 密码 */
    private String password;

    /** 邮箱地址 */
    private String email;

    /** 部门 */
    private String department;

    /** 姓名 */
    private String name;

    /** 是否启用 */
    private Boolean enabled;

    /** 是否锁定 */
    private Boolean locked;

    /** 连续登录失败次数 */
    private Integer loginFailureCount;

    /** 锁定日期 */
    private Date lockedDate;

    /** 最后登录IP */
    private String loginIp;

    /** 最后登录日期 */
    private Date loginDate;

    /** 角色 */
    private Set<RoleEntity> roles = new HashSet<RoleEntity>();

    @NotBlank(groups = Save.class)
    @Pattern(regexp = "^[0-9a-z_A-Z\\u4e00-\\u9fa5]+$")
    @Length(min = 2, max = 20)
    @Column(nullable = false, updatable = false, unique = true)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @NotBlank(groups = Save.class)
    @Pattern(regexp = "^[^\\s&\"<>]+$")
    @Length(min = 4, max = 20)
    @Column(nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotBlank
    @Email
    @Length(max = 200)
    @Column(nullable = false, unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Length(max = 200)
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Length(max = 200)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(nullable = false)
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Column(nullable = false)
    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    @Column(nullable = false)
    public Integer getLoginFailureCount() {
        return loginFailureCount;
    }

    public void setLoginFailureCount(Integer loginFailureCount) {
        this.loginFailureCount = loginFailureCount;
    }

    public Date getLockedDate() {
        return lockedDate;
    }

    public void setLockedDate(Date lockedDate) {
        this.lockedDate = lockedDate;
    }

    @Length(max = 200)
    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public Date getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }

    @NotEmpty
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "shs_admins_roles")
    public Set<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleEntity> roles) {
        this.roles = roles;
    }

    /**
     * 重写toString方法
     * 
     * @return 全称
     */
    @Override
    public String toString() {
        return getUsername();
    }

}