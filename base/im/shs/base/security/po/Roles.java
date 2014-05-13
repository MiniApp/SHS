package im.shs.base.security.po;

import java.io.Serializable;  
import java.util.HashSet;  
import java.util.Set;  
 
import javax.persistence.Column;  
import javax.persistence.Entity;  
import javax.persistence.Id;  
import javax.persistence.ManyToMany;  
import javax.persistence.Table;  
 
/**  
 *   
 * Roles Entity  
 *   
 * @author administrator  
 * @since 2012.7.23  
 * @version 1.0.0  
 *   
 */ 
@Entity 
@Table(name="roles")  
public class Roles implements Serializable  
{        
      
    private static final long serialVersionUID = 1L;  
    private int id;  
    private int enable;  
    private String name;  
    private Set<Users> users = new HashSet<Users>(0);  
    private Set<Resources> resources = new HashSet<Resources>(0);  
      
    public Roles() {  
          
    }  
      
    public void setId(int id) {  
        this.id = id;  
    }  
      
    @Id 
    @Column(name="ID", unique = true, nullable = false)  
    public int getId() {  
        return id;  
    }  
      
    public void setEnable(int enable) {  
        this.enable = enable;  
    }  
      
    @Column(name="ENABLE", length = 1)  
    public int getEnable() {  
        return enable;  
    }  
      
    public void setName(String name) {  
        this.name = name;  
    }  
      
    @Column(name="NAME", length = 50)  
    public String getName() {  
        return name;  
    }  
 
    public void setUsers(Set<Users> users) {  
        this.users = users;  
    }  
      
    @ManyToMany(mappedBy="roles")  
    public Set<Users> getUsers() {  
        return users;  
    }  
      
    public void setResources(Set<Resources> resources) {  
        this.resources = resources;  
    }  
      
    @ManyToMany(mappedBy="roles")  
    public Set<Resources> getResources() {  
        return resources;  
    }  
      
}  