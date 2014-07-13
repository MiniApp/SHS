package im.shs.web.service;

/**
 * @class : CacheService
 * @description: 缓存
 *
 * @author suhao
 * @date 2014年7月13日 上午12:31:59
 * @version 1.0
 */
public interface CacheService {

    /**
     * 获取缓存存储路径
     * 
     * @return 缓存存储路径
     */
    String getDiskStorePath();

    /**
     * 获取缓存数
     * 
     * @return 缓存数
     */
    int getCacheSize();

    /**
     * 清除缓存
     */
    void clear();

}