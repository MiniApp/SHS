package im.shs.base.security.po;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * UsersRoles entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "users_roles", catalog = "webims")
public class UsersRoles implements java.io.Serializable {

    // Fields    

    private Integer urId;

    private Integer uid;

    private Integer rid;

    // Constructors

    /** default constructor */
    public UsersRoles() {
    }

    /** full constructor */
    public UsersRoles(Integer uid, Integer rid) {
        this.uid = uid;
        this.rid = rid;
    }

    // Property accessors
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "urId", unique = true, nullable = false)
    public Integer getUrId() {
        return this.urId;
    }

    public void setUrId(Integer urId) {
        this.urId = urId;
    }

    @Column(name = "uid")
    public Integer getUid() {
        return this.uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    @Column(name = "rid")
    public Integer getRid() {
        return this.rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

}