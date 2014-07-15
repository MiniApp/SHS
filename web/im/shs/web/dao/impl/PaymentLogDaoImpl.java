package im.shs.web.dao.impl;

import im.shs.web.dao.PaymentLogDao;
import im.shs.web.entity.PaymentLogEntity;

import org.springframework.stereotype.Repository;

/**
 * Dao - 支付日志
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Repository("paymentLogDaoImpl")
public class PaymentLogDaoImpl extends BaseDaoImpl<PaymentLogEntity, Long> implements PaymentLogDao {

}
