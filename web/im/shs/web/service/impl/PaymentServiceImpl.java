/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.service.impl;

import im.shs.web.dao.PaymentDao;
import im.shs.web.entity.PaymentEntity;
import im.shs.web.service.PaymentService;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service - 支付
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Service("paymentServiceImpl")
public class PaymentServiceImpl extends BaseServiceImpl<PaymentEntity, Long> implements PaymentService {

    @Resource(name = "paymentDaoImpl")
    private PaymentDao paymentDao;

    @Resource(name = "paymentDaoImpl")
    public void setBaseDao(PaymentDao paymentDao) {
        super.setBaseDao(paymentDao);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentEntity findBySn(String sn) {
        return paymentDao.findBySn(sn);
    }

}