/**    
 * Class Name：	
 *			UsersDao.java
 * Version：	1.1   
 * Date：	2014-4-9       
 * Copyright	
 */
package im.shs.base.security.dao.impl;

import im.shs.base.security.dao.IUsersDao;
import im.shs.base.security.po.Users;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

 
@SuppressWarnings("unchecked")  
@Component("usersDao")
public class UsersDao extends BaseDao implements IUsersDao  
{  
    private static final long serialVersionUID = 1063153442423626296L;  
 
    @Override 
    @Transactional("transactionManager")
    public List<Users> findAll() {  
        List list = getSessionFactory().getCurrentSession().createQuery("from Users").list();  
        return list;  
    }  
      
    @Override 
    public Users findByName(String name) {  
        List list = null;  
        list = getSessionFactory().getCurrentSession().createQuery("from Users where account=?").setParameter(0, name).list();  
        if (list.size() >0 ) {  
            return (Users) list.get(0);  
        }  
        return null;  
    }  
 
}  