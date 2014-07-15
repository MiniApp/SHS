/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.service.impl;

import im.shs.web.dao.CommentDao;
import im.shs.web.entity.CommentEntity;
import im.shs.web.service.CommentService;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

/**
 * Service - 评论
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Service("commentServiceImpl")
public class CommentServiceImpl extends BaseServiceImpl<CommentEntity, Long> implements CommentService {

    @Resource(name = "commentDaoImpl")
    public void setBaseDao(CommentDao commentDao) {
        super.setBaseDao(commentDao);
    }

}