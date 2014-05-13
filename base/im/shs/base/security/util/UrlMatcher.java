/**    
 * Class Name：	
 *			UrlMatcher.java
 * Version：	1.1   
 * Date：	2014-4-4       
 * Copyright	
 */
package im.shs.base.security.util;

/**    
 *         
 * Class Name：
 *			UrlMatcher    
 * Description：    
 *			描述
 * @Author	suhao
 * @Date	2014-4-4 下午1:46:58    
 * @Version	
 *     
 */
public abstract interface UrlMatcher {
    public abstract Object compile(String paramString);

    public abstract boolean pathMatchesUrl(Object paramObject, String paramString);

    public abstract String getUniversalMatchPattern();

    public abstract boolean requiresLowerCaseUrl();
}
