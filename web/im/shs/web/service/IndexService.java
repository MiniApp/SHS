package im.shs.web.service;

import im.shs.entity.Users;

/**   
 * @ClassName  : IndexService 
 * @Description:
 *          TODO
 * @Author	suhao
 * @Date	2014年7月12日 下午2:49:39    
 * @Version	1.0 
 */
public interface IndexService {
	public Users find(Integer id);
	public void ex(Users users);
	public void delete(Users users);
	public void update(Users users);
}
