package im.shs.web.dao.impl;

import im.shs.web.dao.LogDao;
import im.shs.web.entity.LogEntity;

import javax.persistence.FlushModeType;

import org.springframework.stereotype.Repository;

/**
 * @class : LogDaoImpl
 * @description: 日志
 *
 * @author suhao
 * @date 2014年7月14日 下午9:36:18
 * @version 1.0
 */
@Repository("logDaoImpl")
public class LogDaoImpl extends BaseDaoImpl<LogEntity, Long> implements LogDao {

    @Override
    public void removeAll() {
        String jpql = "delete from LogEntity logs";
        entityManager.createQuery(jpql).setFlushMode(FlushModeType.COMMIT).executeUpdate();
    }

}