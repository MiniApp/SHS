package im.shs.web.entity;

import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Entity - 待催记录
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "shs_Dcjl")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_adtest_sequence")
public class DcjlEntity extends BaseEntity {

	/** serialVersionUID */
	private static final long serialVersionUID = 6061703023088115651L;

	/** 项目编号 */
	private String xmid;

	/** 催款人 */
	private String jbr;

	/** 催缴方式 */
	private String cjfs;

	/** 催缴标题 */
	private String cjbt;

	/** 催缴日志 */
	private String cjrz;

	/** 催缴时间 */
	private String cjsj;

	/** 审核标志 */

	private String shbz;

	/** 审核人 */
	private String shr;

	/** 现场催缴补充日志 */
	private String xcms;
	
	/** 法律催缴补充日志 */
	private String flms;
	
	/** 法律文件路径 */
    private String path;
	
	
	public String getXmid() {
		return xmid;
	}

	public void setXmid(String xmid) {
		this.xmid = xmid;
	}

	public String getJbr() {
		return jbr;
	}

	public void setJbr(String jbr) {
		this.jbr = jbr;
	}

	public String getCjfs() {
		return cjfs;
	}

	public void setCjfs(String cjfs) {
		this.cjfs = cjfs;
	}

	public String getCjbt() {
		return cjbt;
	}

	public void setCjbt(String cjbt) {
		this.cjbt = cjbt;
	}

	public String getCjrz() {
		return cjrz;
	}

	public void setCjrz(String cjrz) {
		this.cjrz = cjrz;
	}

	public String getCjsj() {
		return cjsj;
	}

	public void setCjsj(String cjsj) {
		this.cjsj = cjsj;
	}

	public String getShbz() {
		return shbz;
	}

	public void setShbz(String shbz) {
		this.shbz = shbz;
	}

	public String getShr() {
		return shr;
	}

	public void setShr(String shr) {
		this.shr = shr;
	}

	public String getXcms() {
		return xcms;
	}

	public void setXcms(String xcms) {
		this.xcms = xcms;
	}

	public String getFlms() {
		return flms;
	}

	public void setFlms(String flms) {
		this.flms = flms;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	

}