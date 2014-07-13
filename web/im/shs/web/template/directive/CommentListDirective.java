///*
// * Copyright 2010-2013 icl-network.com. All rights reserved.
// * Support: http://www.icl-network.com
// */
//package com.iclnetwork.p2p.template.directive;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Map;
//
//import javax.annotation.Resource;
//
//import org.springframework.stereotype.Component;
//
//import com.iclnetwork.p2p.entity.Comment;
//import com.iclnetwork.p2p.entity.User;
//import com.iclnetwork.p2p.service.ReviewService;
//import com.iclnetwork.p2p.service.UserService;
//import com.iclnetwork.p2p.util.FreemarkerUtils;
//
//import freemarker.core.Environment;
//import freemarker.template.TemplateDirectiveBody;
//import freemarker.template.TemplateException;
//import freemarker.template.TemplateModel;
//
///**
// * 模板指令 - 评论
// * 
// * @author ICLNetwork Team
// * @version 3.0
// */
//@Component("reviewListDirective")
//public class CommentListDirective extends BaseDirective {
//
//    /** "用户ID"参数名称 */
//    private static final String USER_ID_PARAMETER_NAME = "userId";
//
//    /** "商品ID"参数名称 */
//    private static final String PRODUCT_ID_PARAMETER_NAME = "productId";
//
//    /** "类型"参数名称 */
//    private static final String TYPE_PARAMETER_NAME = "type";
//
//    /** 变量名称 */
//    private static final String VARIABLE_NAME = "reviews";
//
//    @Resource(name = "reviewServiceImpl")
//    private ReviewService reviewService;
//
//    @Resource(name = "userServiceImpl")
//    private UserService userService;
//
//    @SuppressWarnings({ "unchecked", "rawtypes" })
//    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
//            throws TemplateException, IOException {
//        Long userId = FreemarkerUtils.getParameter(USER_ID_PARAMETER_NAME, Long.class, params);
//        Long productId = FreemarkerUtils.getParameter(PRODUCT_ID_PARAMETER_NAME, Long.class, params);
////        Type type = FreemarkerUtils.getParameter(TYPE_PARAMETER_NAME, Type.class, params);
//
//        User user = userService.find(userId);
//        // Product product = productService.find(productId);
//        //
//        List<Comment> reviews = null;
//        // if ((userId != null && user == null) || (productId != null && product
//        // == null)) {
//        // reviews = new ArrayList<Review>();
//        // } else {
//        // boolean useCache = useCache(env, params);
//        // String cacheRegion = getCacheRegion(env, params);
//        // Integer count = getCount(params);
//        // List<Filter> filters = getFilters(params, Review.class);
//        // List<Order> orders = getOrders(params);
//        // if (useCache) {
//        // reviews = reviewService.findList(user, product, type, true, count,
//        // filters, orders, cacheRegion);
//        // } else {
//        // reviews = reviewService.findList(user, product, type, true, count,
//        // filters, orders);
//        // }
//        // }
//        setLocalVariable(VARIABLE_NAME, reviews, env, body);
//    }
//
//}