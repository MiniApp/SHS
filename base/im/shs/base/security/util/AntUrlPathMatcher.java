/**    
 * Class Name：	
 *			AntUrlPathMatcher.java
 * Version：	1.1   
 * Date：	2014-4-4       
 * Copyright	
 */
package im.shs.base.security.util;


import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

//这个类是以前spring版本中的工具类，现在的spring版本中不存在，由于项目需要且使用方便，故加入到项目当中。
public class AntUrlPathMatcher implements UrlMatcher {
        private boolean requiresLowerCaseUrl;
        private PathMatcher pathMatcher;

        public AntUrlPathMatcher() {
                this(true);
        }

        public AntUrlPathMatcher(boolean requiresLowerCaseUrl) {
                this.requiresLowerCaseUrl = true;
                this.pathMatcher = new AntPathMatcher();

                this.requiresLowerCaseUrl = requiresLowerCaseUrl;
        }

        public Object compile(String path) {
                if (this.requiresLowerCaseUrl) {
                        return path.toLowerCase();
                }

                return path;
        }

        public void setRequiresLowerCaseUrl(boolean requiresLowerCaseUrl) {
                this.requiresLowerCaseUrl = requiresLowerCaseUrl;
        }

        public boolean pathMatchesUrl(Object path, String url) {
                if (("/**".equals(path)) || ("**".equals(path))) {
                        return true;
                }
                return this.pathMatcher.match((String) path, url);
        }

        public String getUniversalMatchPattern() {
                return "/**";
        }

        public boolean requiresLowerCaseUrl() {
                return this.requiresLowerCaseUrl;
        }

        public String toString() {
                return super.getClass().getName() + "[requiresLowerCase='" + this.requiresLowerCaseUrl + "']";
        }
}