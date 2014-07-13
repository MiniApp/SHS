package im.shs.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @class : ArticleCategoryEntity
 * @description: 文章分类
 *
 * @author suhao
 * @date 2014年7月13日 上午1:17:08
 * @version 1.0
 */
@Entity
@Table(name = "shs_article_category")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "shs_article_category_sequence")
public class ArticleCategoryEntity extends OrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 5287758329966388245L;

    /** 树路径分隔符 */
    public static final String TREE_PATH_SEPARATOR = ",";

    /** 名称 */
    private String name;

    /** 别名 */
    private String alias;

    /** 模板 */
    private String template;

    /** 是否内置 */
    private Boolean builtin;

    /** 描述 */
    private String description;

    /** 树路径 */
    private String treePath;

    /** 层级 */
    private Integer grade;

    /** 上级 */
    private ArticleCategoryEntity parent;

    /** 下级 */
    private Set<ArticleCategoryEntity> children = new HashSet<ArticleCategoryEntity>();

    /** 文章 */
    private Set<ArticleEntity> articles = new HashSet<ArticleEntity>();

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotBlank
    @Pattern(regexp = "^\\w+$")
    @Length(max = 100)
    @Column(nullable = false, length = 100)
    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    @NotBlank
    @Length(max = 100)
    @Column(nullable = false)
    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    @Column(nullable = false, updatable = false)
    public Boolean getBuiltin() {
        return builtin;
    }

    public void setBuiltin(Boolean builtin) {
        this.builtin = builtin;
    }

    @Length(max = 200)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(nullable = false, updatable = false)
    public String getTreePath() {
        return treePath;
    }

    public void setTreePath(String treePath) {
        this.treePath = treePath;
    }

    @Column(nullable = false, updatable = false)
    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public ArticleCategoryEntity getParent() {
        return parent;
    }

    public void setParent(ArticleCategoryEntity parent) {
        this.parent = parent;
    }

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy("order asc")
    public Set<ArticleCategoryEntity> getChildren() {
        return children;
    }

    public void setChildren(Set<ArticleCategoryEntity> children) {
        this.children = children;
    }

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @OrderBy("order asc")
    public Set<ArticleEntity> getArticles() {
        return articles;
    }

    public void setArticles(Set<ArticleEntity> articles) {
        this.articles = articles;
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        ArticleCategoryEntity parent = getParent();
        if (parent != null) {
            setTreePath(parent.getTreePath() + parent.getId() + TREE_PATH_SEPARATOR);
        } else {
            setTreePath(TREE_PATH_SEPARATOR);
        }
        setGrade(StringUtils.split(getTreePath(), TREE_PATH_SEPARATOR).length);
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