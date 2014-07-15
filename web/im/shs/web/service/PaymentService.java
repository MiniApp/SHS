package im.shs.web.service;

import im.shs.web.entity.PaymentEntity;


/**
 * @class : PaymentService
 * @description: 支付
 *
 * @author suhao
 * @date 2014年7月14日 下午11:34:46
 * @version 1.0
 */
public interface PaymentService extends BaseService<PaymentEntity, Long> {

    /**
     * 根据编号查找支付（忽略大小写）
     * 
     * @param sn
     *            编号
     * @return 支付，若不存在则返回null
     */
    PaymentEntity findBySn(String sn);

}