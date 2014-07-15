package im.shs.web.dao.impl;

import im.shs.web.dao.PaymentDao;
import im.shs.web.entity.PaymentEntity;

import javax.persistence.FlushModeType;
import javax.persistence.NoResultException;

import org.springframework.stereotype.Repository;

/**
 * Dao - 支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Repository("paymentDaoImpl")
public class PaymentDaoImpl extends BaseDaoImpl<PaymentEntity, Long> implements PaymentDao {

    @Override
    public PaymentEntity findBySn(String sn) {
        if (sn == null) {
            return null;
        }
        String jpql = "select payments from PaymentEntity payments where lower(payments.sn) = lower(:sn)";
        try {
            return entityManager.createQuery(jpql, PaymentEntity.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("sn", sn).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}