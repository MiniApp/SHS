package im.shs.web.service;

import im.shs.entity.Users;

/**
 * @class : IndexService
 * @description: TODO
 *
 * @author suhao
 * @date 2014年7月13日 上午1:21:31
 * @version 1.0
 */
public interface IndexService {
	public Users find(Integer id);
	public void save(Users users);
	public void delete(Users users);
	public void update(Users users);
}
