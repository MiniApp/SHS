package im.shs.web.entity;

import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Entity - 数据库
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_database")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_database_sequence")
public class DatabaseEntity extends BaseEntity{
    
    /** serialVersionUID */
    private static final long serialVersionUID = 7971341267938170752L;

    /** 路径 */
    private String path;
    
    /** 操作员 */
    private String operator;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}