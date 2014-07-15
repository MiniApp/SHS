package im.shs.web.dao;

import im.shs.web.entity.PaymentEntity;

/**
 * Dao - 支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public interface PaymentDao extends BaseDao<PaymentEntity, Long> {

    /**
     * 查找支付（忽略大小写）
     * 
     * @param sn
     *            编号
     * @return 支付，若不存在则返回null
     */
    PaymentEntity findBySn(String sn);

}