package im.shs.web.action.admin;

import im.shs.web.Message;
import im.shs.web.entity.RoleEntity;
import im.shs.web.service.RoleService;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : RoleController
 * @description: 角色
 *
 * @author suhao
 * @date 2014年7月19日 下午10:38:33
 * @version 1.0
 */
@Controller("adminRoleController")
@RequestMapping("/admin/role")
public class RoleController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/role";

    /** 模板路径 */
    private static final String TEMPLATE_PATH = "/admin/role";

    @Resource(name = "roleServiceImpl")
    private RoleService roleService;

    /**
     * 列表
     */
    @RequestMapping(method = RequestMethod.GET)
    public String list(ModelMap model) {
        model.addAttribute("list", roleService.findAll());
        return TEMPLATE_PATH + "/list";
    }

    /**
     * 添加
     */
    @RequestMapping(value = "/new", method = RequestMethod.GET)
    public String add() {
        return TEMPLATE_PATH + "/add";
    }

    /**
     * 编辑
     */
    @RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
    public String edit(@PathVariable Long id, ModelMap model) {
        model.addAttribute("role", roleService.find(id));
        return TEMPLATE_PATH + "/edit";
    }

    /**
     * 保存
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String save(RoleEntity role, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(role)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new";
        }
        // 验证名称是否存在
        if (roleService.exists("name", role.getName(), true)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new";
        }

        role.setBuiltin(false);
        role.setAdmins(null);
        roleService.save(role);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public String update(@PathVariable Long id, RoleEntity role, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(role)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit";
        }
        // 验证角色是否存在、内置
        RoleEntity pRole = roleService.find(id);
        if (pRole == null || pRole.getBuiltin()) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit";
        }
        // 验证名称是否唯一
        if (!roleService.unique("name", pRole.getName(), role.getName(), true)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit";
        }

        roleService.update(role, "builtin", "admins");

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody
    Message delete(Long id) {
        RoleEntity pRole = roleService.find(id);
        if (pRole == null) {
            return ERROR_MESSAGE;
        }
        // 验证角色是否存在管理员
        if (pRole != null && (pRole.getBuiltin() || !pRole.getAdmins().isEmpty())) {
            return Message.error("删除失败，角色“" + pRole.getName() + "”存在管理员");
        }
        roleService.delete(pRole);
        return SUCCESS_MESSAGE;
    }

    /**
     * 检查名称
     */
    @RequestMapping(value = "/check_name", method = RequestMethod.POST)
    public @ResponseBody
    boolean checkName(String name, String previousName) {
        if (StringUtils.isBlank(name)) {
            return false;
        }
        // 验证名称是否唯一
        if (roleService.unique("name", previousName, name, true)) {
            return true;
        } else {
            return false;
        }
    }

}