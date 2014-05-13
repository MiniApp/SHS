package im.shs.base.security.po;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * RolesResources entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "roles_resources", catalog = "webims")
public class RolesResources implements java.io.Serializable {

    // Fields    

    private Integer rrId;

    private Integer rsid;

    private Integer rid;

    // Constructors

    /** default constructor */
    public RolesResources() {
    }

    /** full constructor */
    public RolesResources(Integer rsid, Integer rid) {
        this.rsid = rsid;
        this.rid = rid;
    }

    // Property accessors
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "rrId", unique = true, nullable = false)
    public Integer getRrId() {
        return this.rrId;
    }

    public void setRrId(Integer rrId) {
        this.rrId = rrId;
    }

    @Column(name = "rsid")
    public Integer getRsid() {
        return this.rsid;
    }

    public void setRsid(Integer rsid) {
        this.rsid = rsid;
    }

    @Column(name = "rid")
    public Integer getRid() {
        return this.rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

}