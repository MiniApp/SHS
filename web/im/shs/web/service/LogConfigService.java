package im.shs.web.service;

import im.shs.web.LogConfig;

import java.util.List;

/**
 * Service - 日志配置
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public interface LogConfigService {

    /**
     * 获取所有日志配置
     * 
     * @return 所有日志配置
     */
    List<LogConfig> getAll();

}