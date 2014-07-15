package im.shs.web.service;

import im.shs.web.entity.LogEntity;

/**
 * Service - 日志
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public interface LogService extends BaseService<LogEntity, Long> {

    /**
     * 清空日志
     */
    void clear();

}