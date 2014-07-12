package im.shs.web.bean;

import java.util.ArrayList;
import java.util.List;

public class Club {
	private List<User> users = new ArrayList<User>();  
    
    public List<User> getUsers() {  
        return users;  
    }  
      
    public void setUsers(List<User> users) {  
        this.users = users;  
    }  
}
