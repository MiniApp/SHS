/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.entity;

import im.shs.web.elem.SEOElem;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;

/**
 * Entity - 文章
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Entity
@Table(name = "p2p_article")
@SequenceGenerator(name = "sequenceGenerator", sequenceName = "p2p_article_sequence")
public class ArticleEntity extends BaseOrderEntity {

    /** serialVersionUID */
    private static final long serialVersionUID = 251166382061154078L;

    /** 内容分页长度 */
    private static final int PAGE_CONTENT_LENGTH = 800;

    /** 内容分页符 */
    private static final String PAGE_BREAK_SEPARATOR = "<hr class=\"pageBreak\" />";

    /** 段落分隔符配比 */
    private static final Pattern PARAGRAPH_SEPARATOR_PATTERN = Pattern.compile("[,;\\.!?，；。！？]");

    /** 别名 */
    private String alias;

    /** 标题 */
    private String title;

    /** 作者 */
    private String author;

    /** 内容 */
    private String cont;

    /** 是否发布 */
    private Boolean published;

    /** 是否置顶 */
    private Boolean top;

    /** 点击数 */
    private Long hits;

    /** SEO */
    private SEOElem seo;

    /** 分类 */
    private ArticleCategoryEntity category;

    /** 页码 */
    private Integer pageNumber;

    @NotBlank
    @javax.validation.constraints.Pattern(regexp = "^\\w+$")
    @Length(max = 100)
    @Column(nullable = false, length = 100)
    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    @NotBlank
    @Length(max = 200)
    @Column(nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Length(max = 200)
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Lob
    public String getCont() {
        return cont;
    }

    public void setCont(String cont) {
        this.cont = cont;
    }

    @NotNull
    @Column(nullable = false)
    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    @NotNull
    @Column(nullable = false)
    public Boolean getTop() {
        return top;
    }

    public void setTop(Boolean top) {
        this.top = top;
    }

    @Column(nullable = false)
    public Long getHits() {
        return hits;
    }

    public void setHits(Long hits) {
        this.hits = hits;
    }

    @Enumerated
    public SEOElem getSeo() {
        return seo;
    }

    public void setSeo(SEOElem seo) {
        this.seo = seo;
    }

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    public ArticleCategoryEntity getCategory() {
        return category;
    }

    public void setCategory(ArticleCategoryEntity category) {
        this.category = category;
    }

    @Transient
    public Integer getPageNumber() {
        return pageNumber;
    }

    @Transient
    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    /**
     * 获取路径
     * 
     * @param categoryAlias
     *            分类别名
     * @return 路径
     */
    @Transient
    public String getPath(String categoryAlias) {
        return categoryAlias + "/" + getAlias() + "/" + getPageNumber();
    }

    /**
     * 获取文本内容
     * 
     * @return 文本内容
     */
    @Transient
    public String getText() {
        if (StringUtils.isNotBlank(getCont())) {
            return Jsoup.parse(getCont()).text();
        }
        return null;
    }

    /**
     * 获取分页内容
     * 
     * @return 分页内容
     */
    @Transient
    public String getPageCont() {
        if (pageNumber != null) {
            String[] pageConts = getPageConts();
            if (pageNumber < 1) {
                pageNumber = 1;
            }
            if (pageNumber > pageConts.length) {
                pageNumber = pageConts.length;
            }
            return pageConts[pageNumber - 1];
        } else {
            return cont;
        }
    }

    /**
     * 获取分页内容
     * 
     * @return 分页内容
     */
    @Transient
    public String[] getPageConts() {

        // 无内容时
        if (StringUtils.isBlank(getCont())) {
            return new String[] { "" };
        }

        // 内容包含分页符时，强制分页
        if (StringUtils.contains(getCont(), PAGE_BREAK_SEPARATOR)) {
            return StringUtils.split(getCont(), PAGE_BREAK_SEPARATOR);
        }
        // 内容未包含分页符时，自动分页
        else {
            List<String> pageConts = new ArrayList<String>();

            // 解析内容并创建HTML文档
            Document document = Jsoup.parse(getCont());
            List<Node> children = document.body().childNodes();
            if (children != null) {

                // 文本长度
                int textLength = 0;
                StringBuffer html = new StringBuffer();

                // 遍历HTML文档节点
                for (Node node : children) {

                    // 节点为元素时
                    if (node instanceof Element) {
                        Element element = (Element) node;
                        html.append(element.outerHtml());

                        // 计算内容长度，自动分页
                        textLength += StringUtils.length(element.text());
                        if (textLength >= PAGE_CONTENT_LENGTH) {
                            pageConts.add(html.toString());
                            textLength = 0;
                            html.setLength(0);
                        }
                    }
                    // 节点为文本节点时
                    else if (node instanceof TextNode) {

                        TextNode textNode = (TextNode) node;
                        String text = textNode.text();
                        String[] contents = PARAGRAPH_SEPARATOR_PATTERN.split(text);
                        Matcher matcher = PARAGRAPH_SEPARATOR_PATTERN.matcher(text);
                        for (String content : contents) {
                            if (matcher.find()) {
                                content += matcher.group();
                            }
                            html.append(content);

                            // 计算内容长度，自动分页
                            textLength += StringUtils.length(content);
                            if (textLength >= PAGE_CONTENT_LENGTH) {
                                pageConts.add(html.toString());
                                textLength = 0;
                                html.setLength(0);
                            }
                        }
                    }
                }

                // 补充尾页内容
                String pageContent = html.toString();
                if (StringUtils.isNotBlank(pageContent)) {
                    pageConts.add(pageContent);
                }

            }
            return pageConts.toArray(new String[pageConts.size()]);
        }
    }

    /**
     * 获取总页数
     * 
     * @return 总页数
     */
    @Transient
    public int getTotalPages() {
        return getPageConts().length;
    }

    /**
     * 重写toString方法
     * 
     * @return 标题
     */
    @Override
    public String toString() {
        return getTitle();
    }

    /**
     * 验证分类
     * 
     * @param categoryId
     *            分类ID
     * @return 验证是否通过
     */
    @Transient
    public boolean verifyCategory(Long categoryId) {
        return categoryId == null || getCategory() == null || getCategory().getId().equals(categoryId);
    }

}