/**    
 * Class Name：	
 *			ResourcesDao.java
 * Version：	1.1   
 * Date：	2014-4-9       
 * Copyright	
 */
package im.shs.base.security.dao.impl;

import im.shs.base.security.dao.IResourcesDao;
import im.shs.base.security.po.Resources;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

 
@SuppressWarnings("unchecked")  
@Component("resourcesDao")
public class ResourcesDao extends BaseDao implements IResourcesDao  
{     
    private static final long serialVersionUID = 6148885672512644854L;  
 
    @Override 
    @Transactional("transactionManager")
    public List<Resources> findAll() {  
        List list = getSessionFactory().getCurrentSession().createQuery("from Resources").list(); 
        return list;  
    }  
      
    @Override 
    public Resources findByUrl(String url) {  
        List list = null;  
        list = getSessionFactory().getCurrentSession().createQuery("from Resources where url=?").setParameter(0, url).list();  
        if (list.size() >0 ) {  
            return (Resources) list.get(0);  
        }  
        return null;  
    }  
      
 
}  