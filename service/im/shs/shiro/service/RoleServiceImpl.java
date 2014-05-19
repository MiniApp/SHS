package im.shs.shiro.service;

import im.shs.base.AbstractService;
import im.shs.shiro.dao.RoleDao;
import im.shs.shiro.entity.Permission;
import im.shs.shiro.entity.Role;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-1-28
 * <p>Version: 1.0
 */
public class RoleServiceImpl  extends AbstractService implements RoleService {

    private RoleDao roleDao;

    public RoleDao getRoleDao() {
        return roleDao;
    }

    public void setRoleDao(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    public Role createRole(Role role) {
    	this.getPersist().persist(role);
    	role = this.getPersist().find(Role.class, role.getId());
        return role;
    }

    public void deleteRole(Long roleId) {
    	Role po = this.getPersist().find(Role.class, roleId);
    	this.getPersist().remove(po);
    }

    /**
     * 添加角色-权限之间关系
     * @param roleId
     * @param permissionIds
     */
    public void correlationPermissions(Long roleId, Long... permissionIds) {
    	for (Long id : permissionIds) {
    		this.getPersist().persist(id);
    	}
    }

    /**
     * 移除角色-权限之间关系
     * @param roleId
     * @param permissionIds
     */
    public void uncorrelationPermissions(Long roleId, Long... permissionIds) {
        roleDao.uncorrelationPermissions(roleId, permissionIds);
    }

}
