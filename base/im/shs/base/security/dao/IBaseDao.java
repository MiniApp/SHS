/**    
 * Class Name：	
 *			IBaseDao.java
 * Version：	1.1   
 * Date：	2014-4-9       
 * Copyright	
 */
package im.shs.base.security.dao;

import im.shs.base.security.exception.ApplyException;

/**  
 *   
 * BaseDao Interface  
 *   
 * @author administrator  
 * @version [1.0.0, 2012-8-28]  
 *  
 */
public interface IBaseDao {

    /**  
     * save  
     *   
     * @param  entity  
     */
    public void save(Object entity) throws ApplyException;

    /**  
     * update  
     *   
     * @param  entity  
     */
    public void update(Object entity) throws ApplyException;

    /**  
     * delete  
     *   
     * @param  entity  
     */
    public void delete(Object entity) throws ApplyException;

}