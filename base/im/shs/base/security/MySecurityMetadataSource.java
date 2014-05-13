/**    
 * Class Name：	
 *			MySecurityMetadataSource.java
 * Version：	1.1   
 * Date：	2014-4-4       
 * Copyright	
 */
package im.shs.base.security;

import im.shs.base.security.dao.IResourcesDao;
import im.shs.base.security.dao.impl.ResourcesDao;
import im.shs.base.security.po.Resources;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;

/**    
 *         
 * Class Name：
 *			MySecurityMetadataSource    
 * Description：    
 *			描述
 * @Author	suhao
 * @Date	2014-4-4 下午2:37:26    
 * @Version	
 *     
 */
public class MySecurityMetadataSource {
    //由spring调用  
    public MySecurityMetadataSource(IResourcesDao resourcesDao) {
        this.resourcesDao = resourcesDao;
        loadResourceDefine();
    }

    private IResourcesDao resourcesDao;

    private static Map<String, Collection<ConfigAttribute>> resourceMap = null;

    public IResourcesDao getResourcesDao() {
        return resourcesDao;
    }

    public void setResourcesDao(ResourcesDao resourcesDao) {
        this.resourcesDao = resourcesDao;
    }

    public Collection<ConfigAttribute> getAllConfigAttributes() {
        // TODO Auto-generated method stub  
        return null;
    }

    public boolean supports(Class<?> clazz) {
        // TODO Auto-generated method stub  
        return true;
    }

    //加载所有资源与权限的关系  
    private void loadResourceDefine() {
        if (resourceMap == null) {
            resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
            List<Resources> resources = this.resourcesDao.findAll();
            for (Resources resource : resources) {
                Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
                //以权限名封装为Spring的security Object  
                ConfigAttribute configAttribute = new SecurityConfig(resource.getName());
                configAttributes.add(configAttribute);
                resourceMap.put(resource.getUrl(), configAttributes);
            }
        }

        Set<Entry<String, Collection<ConfigAttribute>>> resourceSet = resourceMap.entrySet();
        Iterator<Entry<String, Collection<ConfigAttribute>>> iterator = resourceSet.iterator();

    }

    //返回所请求资源所需要的权限  
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {

        String requestUrl = ((FilterInvocation) object).getRequestUrl();
        System.out.println("requestUrl is " + requestUrl);
        if (resourceMap == null) {
            loadResourceDefine();
        }
        return resourceMap.get(requestUrl);
    }
}
