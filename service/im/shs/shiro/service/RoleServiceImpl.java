package im.shs.shiro.service;

import java.util.HashMap;
import java.util.Map;

import im.shs.base.AbstractService;
import im.shs.shiro.entity.Role;
import im.shs.shiro.entity.RolePermssion;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-1-28
 * <p>Version: 1.0
 */
public class RoleServiceImpl  extends AbstractService implements RoleService {

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
    	for (Long permissionId : permissionIds) {
    		RolePermssion rp = new RolePermssion();
    		rp.setRoleId(roleId);
    		rp.setPermissionId(permissionId);
    		this.getPersist().persist(rp);
    	}
    }

    /**
     * 移除角色-权限之间关系
     * @param roleId
     * @param permissionIds
     */
    public void uncorrelationPermissions(Long roleId, Long... permissionIds) {
    	for (Long permissionId : permissionIds) {
    		Map<String, Object> map = new HashMap<String, Object>();
    		map.put("role_id", roleId);
    		map.put("permission_id", permissionId);
    		RolePermssion rp = this.getPersist().findObjectByFields(RolePermssion.class, map);
    		this.getPersist().remove(rp);
    	}
    }

}
