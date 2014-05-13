/**    
 * Class Name：	
 *			IResourcesDao.java
 * Version：	1.1   
 * Date：	2014-4-9       
 * Copyright	
 */
package im.shs.base.security.dao;

import im.shs.base.security.po.Resources;

import java.util.List;

 
/**  
 *   
 * Resources DAO Interface  
 *   
 * @author  
 * @version [1.0.0, 2012-8-28]  
 *   
 */ 
public interface IResourcesDao extends IBaseDao  
{     
    public List<Resources> findAll();  
      
    public Resources findByUrl(String url);  
}  
