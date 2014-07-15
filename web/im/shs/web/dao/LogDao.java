package im.shs.web.dao;

import im.shs.web.entity.LogEntity;

/**
 * @class : LogDao
 * @description: 日志
 *
 * @author suhao
 * @date 2014年7月14日 下午9:35:56
 * @version 1.0
 */
public interface LogDao extends BaseDao<LogEntity, Long> {

    /**
     * 删除所有日志
     */
    void removeAll();

}