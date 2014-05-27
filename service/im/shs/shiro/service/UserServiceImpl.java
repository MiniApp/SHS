package im.shs.shiro.service;

import im.shs.base.AbstractService;
import im.shs.shiro.entity.User;
import im.shs.shiro.entity.UserRole;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * User: Zhang Kaitao
 * <p>
 * Date: 14-1-28
 * <p>
 * Version: 1.0
 */
@Service("userService")
public class UserServiceImpl extends AbstractService implements UserService {

	@Autowired
	private PasswordHelper passwordHelper;

	public void setPasswordHelper(PasswordHelper passwordHelper) {
		this.passwordHelper = passwordHelper;
	}

	/**
	 * 创建用户
	 * 
	 * @param user
	 */
	public User createUser(User user) {
		// 加密密码
		passwordHelper.encryptPassword(user);
		this.getPersist().persist(user);
		user = this.getPersist().find(User.class, user.getId());
		return user;
	}

	/**
	 * 修改密码
	 * 
	 * @param userId
	 * @param newPassword
	 */
	public void changePassword(Long userId, String newPassword) {
		User user = this.getPersist().find(User.class, userId);
		user.setPassword(newPassword);
		passwordHelper.encryptPassword(user);
		this.getPersist().merge(user);
	}

	/**
	 * 添加用户-角色关系
	 * 
	 * @param userId
	 * @param roleIds
	 */
	public void correlationRoles(Long userId, Long... roleIds) {
		ArrayList<UserRole> list = new ArrayList<UserRole>();
		for (Long roleId : roleIds) {
			UserRole ur = new UserRole();
			ur.setRoleId(roleId);
			ur.setUserId(userId);
			list.add(ur);
			this.getPersist().persist(ur);
		}
		// this.getPersist().batchPersist(list);
	}

	/**
	 * 移除用户-角色关系
	 * 
	 * @param userId
	 * @param roleIds
	 */
	public void uncorrelationRoles(Long userId, Long... roleIds) {
		ArrayList<UserRole> list = new ArrayList<UserRole>();
		for (Long roleId : roleIds) {
			Map<String, Long> map = new HashMap<String, Long>();
			map.put("userId", userId);
			map.put("roleId", roleId);
			list.add(this.getPersist().findObjectByFields(UserRole.class, map));
		}
		this.getPersist().batchRemove(list);
	}

	/**
	 * 根据用户名查找用户
	 * 
	 * @param username
	 * @return
	 */
	public User findByUsername(String username) {
		return this.getPersist().findObjectByField(User.class, "username",
				username);
	}

	/**
	 * 根据用户名查找其角色
	 * 
	 * @param username
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Set<String> findRoles(String username) {
		String sql = "select role from user u, role r,user_role ur where u.username=:username and u.id=ur.user_id and r.id=ur.role_id";

		Map<String, String> map = new LinkedHashMap<String, String>();
		map.put("username", username);
		List list = this.getPersist().findByNativeQueryAndNamedParams(sql, map);
		Set<String> set = new HashSet<String>(list);
		return set;
	}

	/**
	 * 根据用户名查找其权限
	 * 
	 * @param username
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Set<String> findPermissions(String username) {
		String sql = "select p.permission from permission p "
				+ " join role_permssion rp " + " on rp.permission_id = p.id "
				+ " join role r " + " on r.id = rp.role_id " + " join user_role ur "
				+ " on ur.role_id = r.id" + " join user u "
				+ " on u.id = ur.user_id " + " where u.username=:username";
		Map<String, String> map = new LinkedHashMap<String, String>();
		map.put("username", username);
		List list = this.getPersist().findByNativeQueryAndNamedParams(sql, map);
		Set<String> set = new HashSet<String>(list);
		return set;
	}

}
