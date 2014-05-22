package im.shs.test;

import im.shs.base.AbstractService;
import im.shs.shiro.entity.User;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:im/shs/config/spring/test-beans.xml", "classpath:im/shs/config/spring/test-shiro.xml"})
@TransactionConfiguration(defaultRollback = false)
public class ShiroTest extends AbstractService {


    @Test
    public void test() {
    	User u = new User ();
    	//u.setId(new Long(2));
    	u.setUsername("aa");
    	
    	this.getPersist().persist(u);
    	
    	System.out.println("hello world");
    	/*User p = this.getPersist().find(User.class,new Long(1));
    	System.out.println("d:"+p.getUsername());*/
    }

}
