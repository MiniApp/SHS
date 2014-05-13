/**    
 * Class Name：	
 *			BaseDao.java
 * Version：	1.1   
 * Date：	2014-4-9       
 * Copyright	
 */
package im.shs.base.security.dao.impl;

import im.shs.base.security.dao.IBaseDao;

import java.io.Serializable;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;
 
 
/**  
 *   
 * BaseDao implements  
 *   
 * @author administrator  
 * @since   
 * @version 1.0.0  
 *  
 */ 
public class BaseDao implements IBaseDao, Serializable  
{     
    private static final long serialVersionUID = -2207456613819809706L;  
      
    /**   
    * HiberNate Session 工厂   
    */ 
    private SessionFactory sessionFactory;  
      
    @Resource
    public void setSessionFactory(SessionFactory sessionFactory) {  
        this.sessionFactory = sessionFactory;  
    }  
      
    @Transactional("transactionManager")
    public SessionFactory getSessionFactory() {  
        return sessionFactory;  
    }  
      
    @Override 
    public void save(Object entity) {  
        getSessionFactory().getCurrentSession().save(entity);  
    }  
 
    @Override 
    public void update(Object entity) {  
        getSessionFactory().getCurrentSession().update(entity);  
    }  
      
    @Override 
    public void delete(Object entity) {  
        getSessionFactory().getCurrentSession().delete(entity);  
    }  
 
}  