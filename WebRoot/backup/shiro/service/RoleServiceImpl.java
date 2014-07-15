package im.shs.base.shiro.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import im.shs.base.BaseService;
import im.shs.base.shiro.entity.Role;
import im.shs.base.shiro.entity.RolePermssion;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-1-28
 * <p>Version: 1.0
 */
@Service("roleService")
public class RoleServiceImpl  extends BaseService implements RoleService {

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
