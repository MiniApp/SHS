package im.shs.web.dao.impl;

import im.shs.entity.PluginConfigEntity;
import im.shs.web.dao.PluginConfigDao;

import javax.persistence.FlushModeType;
import javax.persistence.NoResultException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

/**
 * @class : PluginConfigDaoImpl
 * @description: 插件配置
 *
 * @author suhao
 * @date 2014年7月13日 上午2:46:43
 * @version 1.0
 */
@Repository("pluginConfigDaoImpl")
public class PluginConfigDaoImpl extends BaseDaoImpl<PluginConfigEntity, Long> implements PluginConfigDao {

    @Override
    public boolean pluginExists(String plugin) {
        if (StringUtils.isBlank(plugin)) {
            return false;
        }
        String jpql = "select count(*) from PluginConfigEntity pluginConfigs where pluginConfigs.plugin = :plugin";
        Long count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                .setParameter("plugin", plugin).getSingleResult();
        return count > 0;
    }

    @Override
    public PluginConfigEntity findByPlugin(String plugin) {
        if (StringUtils.isBlank(plugin)) {
            return null;
        }
        try {
            String jpql = "select pluginConfigs from PluginConfigEntity pluginConfigs where pluginConfigs.plugin = :plugin";
            return entityManager.createQuery(jpql, PluginConfigEntity.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("plugin", plugin).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}