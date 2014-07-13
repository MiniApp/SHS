package im.shs;

import im.shs.enums.TemplateTypeEnum;

import java.io.Serializable;

/**
 * @class : Template
 * @description: 模板
 * 
 * @author suhao
 * @date 2014年7月13日 上午12:19:46
 * @version 1.0
 */
public class Template implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 4847252847631960466L;

	/** template.xml文件路径 */
	public static final String XML_PATH = "/template.xml";

	/** ID */
	private String id;

	/** 类型 */
	private TemplateTypeEnum type;

	/** 名称 */
	private String name;

	/** 模板文件路径 */
	private String templatePath;

	/** 静态文件路径 */
	private String staticPath;

	/** 描述 */
	private String description;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public TemplateTypeEnum getType() {
		return type;
	}

	public void setType(TemplateTypeEnum type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTemplatePath() {
		return templatePath;
	}

	public void setTemplatePath(String templatePath) {
		this.templatePath = templatePath;
	}

	public String getStaticPath() {
		return staticPath;
	}

	public void setStaticPath(String staticPath) {
		this.staticPath = staticPath;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 重写toString方法
	 * 
	 * @return 名称
	 */
	@Override
	public String toString() {
		return getName();
	}

}