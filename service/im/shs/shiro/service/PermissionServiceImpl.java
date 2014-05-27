package im.shs.shiro.service;

import org.springframework.stereotype.Service;

import im.shs.base.AbstractService;
import im.shs.shiro.entity.Permission;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-1-28
 * <p>Version: 1.0
 */
@Service("permissionService")
public class PermissionServiceImpl extends AbstractService implements PermissionService {

    public Permission createPermission(Permission permission) {
    	this.getPersist().persist(permission);
    	permission= this.getPersist().find(Permission.class, permission.getId());
        return permission;
    }

    public void deletePermission(Long permissionId) {
    	Permission po = this.getPersist().find(Permission.class, permissionId);
    	this.getPersist().remove(po);
    }
}
