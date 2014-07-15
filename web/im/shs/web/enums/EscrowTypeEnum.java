package im.shs.web.enums;
/**
 * Enum - 托管类型
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public enum EscrowTypeEnum {

    /** 注册 */
    regist,

    /** 登录 */
    login,

    /** 个人资料 */
    profile,

    /** 绑定银行卡 */
    bind_bank_card,

    /** 充值 */
    recharge,

    /** 提现 */
    withdrawal,

    /** 审核提现 */
    audit_withdrawal,

    /** 投资申请 */
    investment_apply,
    
    /** 投资审核*/
    investment_audit,

    /** 借款 */
    borrowing,

    /** 还款 */
    repayment,

    /** 冻结 */
    frozen,

    /** 解冻 */
    unfrozen,
    
    /** 余额查询 */
    balance_inquiry,
    
    /** 获取银行列表 */
    get_bank_list,
    
    /** 账户信息 */
    account_info,
    
    /** 交易查询 */
    trade_query
}
