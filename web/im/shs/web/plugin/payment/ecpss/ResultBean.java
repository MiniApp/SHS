package im.shs.web.plugin.payment.ecpss;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @class : ResultBean
 * @description: 结果
 *
 * @author suhao
 * @date 2014年7月15日 下午9:49:53
 * @version 1.0
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "root")
public class ResultBean {

    /** 商户号 */
    private String merCode;

    /** 商户交易时间 */
    private String beginTime;

    /** 商户交易时间 */
    private String endTime;

    /** 查询分页 */
    private Integer pageIndex;

    /** 查询结果总数 */
    private Integer resultCount;

    /** 每页显示记录数 */
    private Integer pageSize;

    /** 返回结果码 */
    private String resultCode;

    /** 订单 */
    @XmlElement(name = "list")
    private OrderBean order;

    public String getMerCode() {
        return merCode;
    }

    public void setMerCode(String merCode) {
        this.merCode = merCode;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getResultCount() {
        return resultCount;
    }

    public void setResultCount(Integer resultCount) {
        this.resultCount = resultCount;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public OrderBean getOrder() {
        return order;
    }

    public void setOrder(OrderBean order) {
        this.order = order;
    }

}