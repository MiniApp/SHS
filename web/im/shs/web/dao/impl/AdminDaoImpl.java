package im.shs.web.dao.impl;

import im.shs.web.dao.AdminDao;
import im.shs.web.entity.AdminEntity;

import org.springframework.stereotype.Repository;

/**
 * Dao - 管理员
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Repository("adminDaoImpl")
public class AdminDaoImpl extends BaseDaoImpl<AdminEntity, Long> implements AdminDao {

}