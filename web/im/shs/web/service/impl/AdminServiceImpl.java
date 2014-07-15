package im.shs.web.service.impl;

import im.shs.web.Principal;
import im.shs.web.bean.admin.ProfileSettingBean;
import im.shs.web.dao.AdminDao;
import im.shs.web.entity.AdminEntity;
import im.shs.web.entity.RoleEntity;
import im.shs.web.service.AdminService;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.LockModeType;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @class : AdminServiceImpl
 * @description: 管理员
 *
 * @author suhao
 * @date 2014年7月16日 上午6:25:37
 * @version 1.0
 */
@Service("adminServiceImpl")
public class AdminServiceImpl extends BaseServiceImpl<AdminEntity, Long> implements AdminService {

    @Resource(name = "adminDaoImpl")
    private AdminDao adminDao;

    @Resource(name = "adminDaoImpl")
    public void setBaseDao(AdminDao adminDao) {
        super.setBaseDao(adminDao);
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> findAuths(Long id) {
        return findAuths(adminDao.find(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> findAuths(AdminEntity admin) {
        List<String> auths = new ArrayList<String>();
        if (admin != null) {
            for (RoleEntity role : admin.getRoles()) {
                auths.addAll(role.getAuths());
            }
        }
        return auths;
    }

    @Override
    @Transactional
    public void set(ProfileSettingBean profileSettingBean, AdminEntity admin) throws Exception {
        adminDao.lock(admin, LockModeType.PESSIMISTIC_WRITE);
        if (StringUtils.isNotBlank(profileSettingBean.getPassword())) {
            admin.setPassword(profileSettingBean.getPassword());
        }
        admin.setEmail(profileSettingBean.getEmail());
        adminDao.merge(admin);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean authorized() {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null) {
            return subject.isAuthenticated();
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public AdminEntity getCurrent() {
        Long currentId = getCurrentId();
        if (currentId != null) {
            return adminDao.find(currentId);
        }
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public Principal getCurrentPrincipal() {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null) {
            return (Principal) subject.getPrincipal();
        }
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public Long getCurrentId() {
        Principal currentPrincipal = getCurrentPrincipal();
        if (currentPrincipal != null) {
            return currentPrincipal.getId();
        }
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public String getCurrentUsername() {
        Principal currentPrincipal = getCurrentPrincipal();
        if (currentPrincipal != null) {
            return currentPrincipal.getUsername();
        }
        return null;
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public AdminEntity save(AdminEntity admin) {
        return super.save(admin);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public AdminEntity update(AdminEntity admin) {
        return super.update(admin);
    }

    @Override
    @Transactional
    @CacheEvict(value = "authorization", allEntries = true)
    public AdminEntity update(AdminEntity admin, String... ignoreProperties) {
        return super.update(admin, ignoreProperties);
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
    public void delete(AdminEntity admin) {
        super.delete(admin);
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
    public void deleteList(List<AdminEntity> admins) {
        super.deleteList(admins);
    }

}