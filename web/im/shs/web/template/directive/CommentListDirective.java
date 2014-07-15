/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.template.directive;

import im.shs.web.Filter;
import im.shs.web.Sequencer;
import im.shs.web.entity.CommentEntity;
import im.shs.web.service.CommentService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * 模板指令 - 评论列表
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Component("commentListDirective")
public class CommentListDirective extends BaseDirective {

    /** 变量名称 */
    private static final String VARIABLE_NAME = "comments";

    @Resource(name = "commentServiceImpl")
    private CommentService commentService;

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
            throws TemplateException, IOException {
        Integer count = getCount(params);
        List<Filter> filters = getFilters(params, CommentEntity.class);
        List<Sequencer> sequencers = getSequencers(params);
        List<CommentEntity> comments = commentService.findList(count, filters, sequencers);
        setLocalVariable(VARIABLE_NAME, comments, env, body);
    }

}