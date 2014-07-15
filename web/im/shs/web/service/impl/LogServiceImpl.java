package im.shs.web.service.impl;

import im.shs.web.dao.LogDao;
import im.shs.web.entity.LogEntity;
import im.shs.web.service.LogService;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service - 日志
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Service("logServiceImpl")
public class LogServiceImpl extends BaseServiceImpl<LogEntity, Long> implements LogService {

    @Resource(name = "logDaoImpl")
    private LogDao logDao;

    @Resource(name = "logDaoImpl")
    public void setBaseDao(LogDao logDao) {
        super.setBaseDao(logDao);
    }

    @Override
    @Transactional
    public void clear() {
        logDao.removeAll();
    }

}