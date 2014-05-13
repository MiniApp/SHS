package im.shs.base.security.po;

import java.io.Serializable;  
import java.util.HashSet;  
import java.util.Set;  
 
import javax.persistence.CascadeType;  
import javax.persistence.Column;  
import javax.persistence.Entity;  
import javax.persistence.FetchType;  
import javax.persistence.Id;  
import javax.persistence.JoinTable;  
import javax.persistence.JoinColumn;  
import javax.persistence.ManyToMany;  
import javax.persistence.Table;  
 
/**  
 *   
 * User Entity  
 *   
 * @author Administrator  
 * @since 25 Mar 2012  
 * @version 1.0.0  
 *  
 */ 
@Entity 
@Table(name="users")  
public class Users implements Serializable  
{     
      
    private static final long serialVersionUID = 1L;  
    private int id;  
    private int enable;  
    private String account;  
    private String password;  
    private Set<Roles> roles = new HashSet<Roles>(0);  
      
    public Users() {  
          
    }  
      
    public void setId(int id) {  
        this.id = id;  
    }  
      
    @Id 
    @Column(name="ID", unique = true, nullable = false)  
    public int getId() {  
        return id;  
    }  
 
    public void setAccount(String account) {  
        this.account = account;  
    }  
      
    @Column(name="ACCOUNT", length = 50)  
    public String getAccount() {  
        return account;  
    }  
 
    public void setPassword(String password) {  
        this.password = password;  
    }     
      
    @Column(name="PASSWORD", length = 50)  
    public String getPassword() {  
        return password;  
    }  
      
    public void setEnable(int enable) {  
        this.enable = enable;  
    }  
      
    @Column(name="ENABLE", length = 1)  
    public int getEnable() {  
        return enable;  
    }  
      
    public void setRoles(Set<Roles> roles) {  
        this.roles = roles;  
    }  
      
    @ManyToMany(cascade=CascadeType.ALL, fetch = FetchType.LAZY)  
    @JoinTable(name="users_roles", joinColumns=@JoinColumn(name="uid"), inverseJoinColumns=@JoinColumn(name="rid"))  
    public Set<Roles> getRoles() {  
        return roles;  
    }  
      
}  