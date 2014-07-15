package im.shs.web.enums;

/**
 * Enum - 借款意见类型
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum BorrowingOpinionTypeEnum {

    /** 申请 */
    apply,
    
    /** 撤销申请 */
    rescind_apply,

    /** 调查 */
    inquiry,
    
    /** 撤销调查 */
    rescind_inquiry,

    /** 确认 */
    confirm,
    
    /** 撤销确认 */
    rescind_confirm,
    
    /** 投资 */
    invest,
    
    /** 撤销投资 */
    rescind_invest,
    
    /** 出借 */
    lend,

    /** 还款 */
    repay
}
