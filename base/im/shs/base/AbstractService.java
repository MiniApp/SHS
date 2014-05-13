package im.shs.base;

import im.shs.base.persist.PersistService;

import javax.annotation.Resource;

/**    
 *         
 * 类名称：AbstractService    
 * 类描述：抽象服务类,提供公用服务注入   
 * 创建人：suhao    
 * 创建时间：2013-7-24 下午7:51:41    
 * 修改人：suhao    
 * 修改时间：2013-7-24 下午7:51:41    
 * 修改备注：    
 * @version     
 *     
 */
public class AbstractService {
	@Resource(name = "persist")
	private PersistService persist;// 持久服务

	public PersistService getPersist() {
		return persist;
	}

	public void setPersist(PersistService persist) {
		this.persist = persist;
	}
}
