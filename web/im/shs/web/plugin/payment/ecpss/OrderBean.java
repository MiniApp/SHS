package im.shs.web.plugin.payment.ecpss;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

/**
 * @class : OrderBean
 * @description: 订单
 *
 * @author suhao
 * @date 2014年7月15日 下午9:50:08
 * @version 1.0
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class OrderBean {

    /** 编号 */
    @XmlElement(name = "orderNumber")
    private String no;

    /** 时间 */
    @XmlElement(name = "orderDate")
    private String date;

    /** 金额 */
    @XmlElement(name = "orderAmount")
    private String amount;

    /** 状态 */
    @XmlElement(name = "orderStatus")
    private String status;

    /** 勾兑状态 */
    private String gouduiStatus;

    /** 退款状态 */
    private String refundStatus;

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGouduiStatus() {
        return gouduiStatus;
    }

    public void setGouduiStatus(String gouduiStatus) {
        this.gouduiStatus = gouduiStatus;
    }

    public String getRefundStatus() {
        return refundStatus;
    }

    public void setRefundStatus(String refundStatus) {
        this.refundStatus = refundStatus;
    }

}