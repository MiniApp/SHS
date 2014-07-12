package im.shs.web.service.impl;

import im.shs.base.BaseService;
import im.shs.entity.Users;
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
	public void save(Users users) {
		this.getPersist().persist(users);
	}

	@Override
	public void delete(Users users) {
		this.getPersist().remove(users);
	}

	@Override
	public Users find(Integer id) {
		
		return this.getPersist().find(Users.class, id);
	}

	@Override
	public void update(Users users) {
		this.getPersist().merge(users);
	}

}
