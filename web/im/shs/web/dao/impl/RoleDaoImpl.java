package im.shs.web.dao.impl;

import im.shs.web.dao.RoleDao;
import im.shs.web.entity.RoleEntity;

import org.springframework.stereotype.Repository;

/**
 * @class : RoleDaoImpl
 * @description: 角色
 *
 * @author suhao
 * @date 2014年7月16日 下午10:31:48
 * @version 1.0
 */
@Repository("roleDaoImpl")
public class RoleDaoImpl extends BaseDaoImpl<RoleEntity, Long> implements RoleDao {

}