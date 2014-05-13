package im.shs.base.security.po;

import java.io.Serializable;  
import java.util.HashSet;  
import java.util.Set;  
 
import javax.persistence.CascadeType;  
import javax.persistence.Column;  
import javax.persistence.Entity;  
import javax.persistence.FetchType;  
import javax.persistence.Id;  
import javax.persistence.JoinColumn;  
import javax.persistence.JoinTable;  
import javax.persistence.ManyToMany;  
import javax.persistence.Table;  
 
/**  
 *   
 * Resources Entity  
 *   
 * @author administrator  
 * @since 2012.7.23  
 * @version 1.0.0  
 *   
 */ 
@Entity 
@Table(name="resources")  
public class Resources implements Serializable  
{  
      
    private static final long serialVersionUID = 1L;  
    private String id;  
    private String url;  
    private int priority;  
    private String type;  
    private String name;  
    private String memo;  
    private Set<Roles> roles = new HashSet<Roles>(0);  
      
    public Resources() {  
          
    }  
      
    public void setId(String id) {  
        this.id = id;  
    }  
      
    @Id 
    @Column(name="ID", unique = true, nullable = false)  
    public String getId() {  
        return id;  
    }  
    
    public void setName(String name) {  
        this.name = name;  
    }  
      
    @Column(name="NAME", length = 50)  
    public String getName() {  
        return name;  
    }  
 
    public void setType(String type) {  
        this.type = type;  
    }  
      
    @Column(name="TYPE", length = 1)  
    public String getType() {  
        return type;  
    }  
 
    public void setUrl(String url) {  
        this.url = url;  
    }  
      
    @Column(name="URL", length = 500)  
    public String getUrl() {  
        return url;  
    }  
 
    public void setPriority(int priority) {  
        this.priority = priority;  
    }  
      
    @Column(name="PRIORITY", length = 50)  
    public int getPriority() {  
        return priority;  
    }  
 
    public void setMemo(String memo) {  
        this.memo = memo;  
    }  
      
    @Column(name="MEMO", length = 500)  
    public String getMemo() {  
        return memo;  
    }  
      
    public void setRoles(Set<Roles> roles) {  
        this.roles = roles;  
    }  
      
    @ManyToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)  
    @JoinTable(name="roles_resources", joinColumns=@JoinColumn(name="rsid"), inverseJoinColumns=@JoinColumn(name="rid"))  
    public Set<Roles> getRoles() {  
        return roles;  
    }  
      
}  