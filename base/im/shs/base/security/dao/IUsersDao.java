/**    
 * Class Name：	
 *			IUsersDao.java
 * Version：	1.1   
 * Date：	2014-4-9       
 * Copyright	
 */
package im.shs.base.security.dao;

import im.shs.base.security.po.Users;

import java.util.List;
 
 
/**  
 *   
 * Users DAO Interface  
 *   
 * @author  
 * @version [1.0.0, 2012-8-28]  
 *   
 */ 
public interface IUsersDao extends IBaseDao  
{  
    public List<Users> findAll();  
      
    public Users findByName(String name);  
}  