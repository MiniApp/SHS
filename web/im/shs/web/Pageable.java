package im.shs.web;

import im.shs.web.enums.SequencerDirectionEnum;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

/**
 * @class : Pageable
 * @description: 分页信息
 * 
 * @author suhao
 * @date 2014年7月13日 上午12:18:48
 * @version 1.0
 */
public class Pageable implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = 7644417473278664774L;

    /** 默认页码 */
    private static final Integer DEFAULT_PAGE_NUMBER = 1;

    /** 默认每页记录数 */
    private static final Integer DEFAULT_PAGE_SIZE = 20;

    /** 最大每页记录数 */
    private static final Integer MAX_PAGE_SIZE = 1000;

    /** 页码 */
    private Integer pageNumber = DEFAULT_PAGE_NUMBER;

    /** 每页记录数 */
    private Integer pageSize = DEFAULT_PAGE_SIZE;

    /** 搜索属性 */
    private String searchProperty;

    /** 搜索值 */
    private String searchValue;

    /** 过滤器 */
    private List<Filter> filters = new ArrayList<Filter>();

    /** 排序属性 */
    private String sortProperty;

    /** 排序方向 */
    private SequencerDirectionEnum sortDirection;

    /** 定序器 */
    private List<Sequencer> sequencers = new ArrayList<Sequencer>();

    public Pageable() {
    }

    /**
     * @param pageSize
     *            每页记录数
     */
    public Pageable(Integer pageSize) {
        if (pageSize != null && pageSize > 0 && pageSize <= MAX_PAGE_SIZE) {
            this.pageSize = pageSize;
        }
    }

    /**
     * @param pageNumber
     *            页码
     * @param pageSize
     *            每页记录数
     */
    public Pageable(Integer pageNumber, Integer pageSize) {
        if (pageNumber != null && pageNumber > 0) {
            this.pageNumber = pageNumber;
        }
        if (pageSize != null && pageSize > 0 && pageSize <= MAX_PAGE_SIZE) {
            this.pageSize = pageSize;
        }
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        if (pageNumber == null || pageNumber < 1) {
            pageNumber = DEFAULT_PAGE_NUMBER;
        }
        this.pageNumber = pageNumber;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        if (pageSize == null || pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
            pageSize = DEFAULT_PAGE_SIZE;
        }
        this.pageSize = pageSize;
    }

    public String getSearchProperty() {
        return searchProperty;
    }

    public void setSearchProperty(String searchProperty) {
        this.searchProperty = searchProperty;
    }

    public String getSearchValue() {
        return searchValue;
    }

    public void setSearchValue(String searchValue) {
        this.searchValue = searchValue;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public String getSortProperty() {
        return sortProperty;
    }

    public void setSortProperty(String sortProperty) {
        this.sortProperty = sortProperty;
    }

    public SequencerDirectionEnum getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(SequencerDirectionEnum sortDirection) {
        this.sortDirection = sortDirection;
    }

    public List<Sequencer> getSequencers() {
        return sequencers;
    }

    public void setSequencers(List<Sequencer> sequencers) {
        this.sequencers = sequencers;
    }

    /**
     * 生成HashCode
     * 
     * @return HashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getPageNumber()).append(getPageSize()).append(getSearchProperty())
                .append(getSearchValue()).append(getFilters()).append(getSortProperty()).append(getSortDirection())
                .append(getSequencers()).toHashCode();
    }

    /**
     * 判断是否相等
     * 
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (isEmpty() || obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Pageable pageable = (Pageable) obj;
        if (pageable.isEmpty()) {
            return false;
        }
        return new EqualsBuilder().append(getPageNumber(), pageable.getPageNumber())
                .append(getPageSize(), pageable.getPageSize())
                .append(getSearchProperty(), pageable.getSearchProperty())
                .append(getSearchValue(), pageable.getSearchValue()).append(getFilters(), pageable.getFilters())
                .append(getSortProperty(), pageable.getSortProperty())
                .append(getSortDirection(), pageable.getSortDirection())
                .append(getSequencers(), pageable.getSequencers()).isEquals();
    }

    /**
     * 判断是否为空
     * 
     * @return 是否为空
     */
    public boolean isEmpty() {
        return getPageNumber() == null || getPageSize() == null;
    }

}