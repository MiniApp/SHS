/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.dao.impl;

import im.shs.web.dao.CommentDao;
import im.shs.web.entity.CommentEntity;

import org.springframework.stereotype.Repository;

/**
 * Dao - 评论
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Repository("commentDaoImpl")
public class CommentDaoImpl extends BaseDaoImpl<CommentEntity, Long> implements CommentDao {

}
