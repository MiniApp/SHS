package im.shs.web.template.directive;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import im.shs.web.Filter;
import im.shs.web.Sequencer;
import im.shs.web.entity.FriendLinkEntity;
import im.shs.web.service.FriendLinkService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

/**
 * @class : FriendLinkListDirective
 * @description: 模板指令 - 友情链接列表
 *
 * @author suhao
 * @date 2014年7月13日 上午1:32:14
 * @version 1.0
 */
@Component("friendLinkListDirective")
public class FriendLinkListDirective extends BaseDirective {

    /** 变量名称 */
    private static final String VARIABLE_NAME = "friendLinks";

    @Resource(name = "friendLinkServiceImpl")
    private FriendLinkService friendLinkService;

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
            throws TemplateException, IOException {

        boolean useCache = useCache(env, params);
        String cacheRegion = getCacheRegion(env, params);
        Integer count = getCount(params);
        List<Filter> filters = getFilters(params, FriendLinkEntity.class);
        List<Sequencer> sequencers = getSequencers(params);

        List<FriendLinkEntity> friendLinks;
        if (useCache) {
            friendLinks = friendLinkService.findList(count, filters, sequencers, cacheRegion);
        } else {
            friendLinks = friendLinkService.findList(count, filters, sequencers);
        }

        setLocalVariable(VARIABLE_NAME, friendLinks, env, body);
    }

}