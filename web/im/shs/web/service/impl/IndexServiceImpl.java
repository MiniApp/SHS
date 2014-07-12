package im.shs.web.service.impl;

import im.shs.base.BaseService;
import im.shs.entity.Users;
import im.shs.web.bean.User;
import im.shs.web.service.IndexService;

import org.springframework.stereotype.Service;

/**   
 * @ClassName  : IndexServiceImpl 
 * @Description:
 *          TODO
 * @Author	suhao
 * @Date	2014年7月12日 下午2:51:46    
 * @Version	1.0 
 */
@Service
public class IndexServiceImpl extends BaseService implements IndexService {

	@Override
	public void ex(Users users) {
		this.getPersist().persist(users);
		User u = new User();
		u.setAge(123);
		u.setName("apache");
		this.getPersist().remove(users);
		
		//this.getPersist().findListBySqlMap("user.insertUser", u);
	}

	@Override
	public void delete(Users users) {
		this.getPersist().remove(users);
	}

	@Override
	public Users find(Integer id) {
		
		return this.getPersist().find(Users.class, 268);
	}

	@Override
	public void update(Users users) {
		this.getPersist().merge(users);
	}

}
