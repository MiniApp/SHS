package im.shs.web.action.admin;

import im.shs.web.action.BaseController;
import im.shs.web.entity.LogEntity;
import im.shs.web.enums.RedirectTypeEnum;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

/**
 * @class : BaseAdminController
 * @description: 管理基类
 *
 * @author suhao
 * @date 2014年7月13日 上午12:54:18
 * @version 1.0
 */
public class BaseAdminController extends BaseController {

    /** 主页重定向URL */
    protected static final String HOMEPAGE_REDIRECT_URL = "redirect:/admin";

    /** 错误模板路径 */
    protected static final String ERROR_TEMPLATE_PATH = "/admin/error";

    /**
     * 添加日志
     * 
     * @param content
     *            内容
     */
    protected void addLog(String content) {
        if (content != null) {
            RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
            requestAttributes.setAttribute(LogEntity.CONT_ATTR_NAME, content, RequestAttributes.SCOPE_REQUEST);
        }
    }

    /**
     * 获取URL参数
     * 
     * @param param
     *            参数名
     * @param value
     *            值
     * @return URL参数
     */
    protected String getUrlParam(String param, String value) {
        return StringUtils.isNotBlank(value) ? "?" + param + "=" + value : "";
    }

    /**
     * 获取上级URL参数
     * 
     * @param parentId
     *            上级ID
     * @return 上级URL参数
     */
    protected String getParentUrlParam(Long parentId) {
        return getUrlParam("parentId", parentId != null ? parentId.toString() : null);
    }

    /**
     * 获取分类URL参数
     * 
     * @param categoryId
     *            分类ID
     * @return 分类URL参数
     */
    protected String getCategoryUrlParam(Long categoryId) {
        return getUrlParam("categoryId", categoryId != null ? categoryId.toString() : null);
    }

    /**
     * 获取重定向URL参数
     * 
     * @param redirectType
     *            重定向类型
     * @return 重定向URL参数
     */
    protected String getRedirectUrlParam(RedirectTypeEnum redirectType) {
        return getUrlParam("redirectType", redirectType != null ? redirectType.toString() : null);
    }

}