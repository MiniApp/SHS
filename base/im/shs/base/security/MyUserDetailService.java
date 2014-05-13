/**    
 * Class Name：	
 *			MyUserDetailService.java
 * Version：	1.1   
 * Date：	2014-4-4       
 * Copyright	
 */
package im.shs.base.security;

import im.shs.base.security.dao.IUsersDao;
import im.shs.base.security.po.Resources;
import im.shs.base.security.po.Roles;
import im.shs.base.security.po.Users;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@SuppressWarnings("deprecation")
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    private IUsersDao usersDao;
    public IUsersDao getUsersDao() {
        return usersDao;
    }

    public void setUsersDao(IUsersDao usersDao) {
        this.usersDao = usersDao;
    }
    
    //登录验证
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("username is " + username);
        //这里应该可以不用再查了
        Users users = this.usersDao.findByName(username);
        
        Collection<GrantedAuthority> grantedAuths = obtionGrantedAuthorities(users);
        
        boolean enables = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;
        //封装成spring security的user
        User userdetail = new User(users.getAccount(), users.getPassword(), enables, accountNonExpired, credentialsNonExpired, accountNonLocked, grantedAuths);
        return userdetail;
    }
    
    //取得用户的权限
    private Set<GrantedAuthority> obtionGrantedAuthorities(Users user) {
        Set<GrantedAuthority> authSet = new HashSet<GrantedAuthority>();
        List<Resources> resources = new ArrayList<Resources>();
        /*Set<Roles> roles = user.getRoles();
        
        for(Roles role : roles) {
            Set<Resources> tempRes = role.getResources();
            for(Resources res : tempRes) {
                resources.add(res);
            }
        }*/
        for(Resources res : resources) {
            authSet.add(new GrantedAuthorityImpl(res.getName()));
        }
        return authSet;
    }
}
