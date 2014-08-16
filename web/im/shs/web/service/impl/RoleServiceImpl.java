package im.shs.web.service.impl;

import im.shs.web.dao.RoleDao;
import im.shs.web.entity.RoleEntity;
import im.shs.web.service.RoleService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @class : RoleServiceImpl
 * @description: 角色
 *
 * @author suhao
 * @date 2014年7月16日 下午10:30:18
 * @version 1.0
 */
@Service("roleServiceImpl")
public class RoleServiceImpl extends BaseServiceImpl<RoleEntity, Long> implements RoleService {

    @Resource(name = "roleDaoImpl")
    public void setBaseDao(RoleDao roleDao) {
        super.setBaseDao(roleDao);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public RoleEntity save(RoleEntity role) {
        return super.save(role);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public RoleEntity update(RoleEntity role) {
        return super.update(role);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public RoleEntity update(RoleEntity role, String... ignoreProperties) {
        return super.update(role, ignoreProperties);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public void delete(Long id) {
        super.delete(id);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public void delete(RoleEntity role) {
        super.delete(role);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public void deleteList(Long... ids) {
        super.deleteList(ids);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public void deleteList(List<RoleEntity> roles) {
        super.deleteList(roles);
    }

}