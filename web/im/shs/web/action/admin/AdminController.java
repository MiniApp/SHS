package im.shs.web.action.admin;

import im.shs.web.Message;
import im.shs.web.entity.AdminEntity;
import im.shs.web.entity.BaseEntity.Save;
import im.shs.web.entity.RoleEntity;
import im.shs.web.service.AdminService;
import im.shs.web.service.RoleService;

import java.util.HashSet;

import javax.annotation.Resource;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : AdminController
 * @description: 管理员
 *
 * @author suhao
 * @date 2014年7月16日 下午10:28:28
 * @version 1.0
 */
@Controller("adminAdminController")
@RequestMapping("/admin/admin")
public class AdminController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/admin";

    /** 模板路径 */
    private static final String TEMPLATE_PATH = "/admin/admin";

    @Resource(name = "adminServiceImpl")
    private AdminService adminService;

    @Resource(name = "roleServiceImpl")
    private RoleService roleService;

    /**
     * 列表
     */
    @RequestMapping(method = RequestMethod.GET)
    public String list(ModelMap model) {
        model.addAttribute("list", adminService.findAll());
        return TEMPLATE_PATH + "/list";
    }

    /**
     * 添加
     */
    @RequestMapping(value = "/new", method = RequestMethod.GET)
    public String add(ModelMap model) {
        model.addAttribute("roles", roleService.findAll());
        return TEMPLATE_PATH + "/add";
    }

    /**
     * 编辑
     */
    @RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
    public String edit(@PathVariable Long id, ModelMap model) {
        model.addAttribute("admin", adminService.find(id));
        model.addAttribute("roles", roleService.findAll());
        return TEMPLATE_PATH + "/edit";
    }

    /**
     * 保存
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String save(AdminEntity admin, Long[] roleIds, RedirectAttributes redirectAttributes) {

        // 补充角色
        admin.setRoles(new HashSet<RoleEntity>(roleService.findList(roleIds)));

        // Bean Validation
        if (!verify(admin, Save.class)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/new";
        }
        // 验证用户名是否存在
        if (adminService.exists("username", admin.getUsername(), true)) {
            addFlashMessage(redirectAttributes, Message.error("用户名已经存在"));
            return INDEX_REDIRECT_URL + "/new";
        }
        // 验证邮箱地址是否存在
        if (adminService.exists("email", admin.getEmail(), true)) {
            addFlashMessage(redirectAttributes, Message.error("邮箱地址已经存在"));
            return INDEX_REDIRECT_URL + "/new";
        }

        admin.setUsername(StringUtils.lowerCase(admin.getUsername()));
        admin.setPassword(DigestUtils.md5Hex(admin.getPassword()));
        admin.setEmail(StringUtils.lowerCase(admin.getEmail()));
        admin.setLocked(false);
        admin.setLoginFailureCount(0);
        admin.setLockedDate(null);
        admin.setLoginIp(null);
        admin.setLoginDate(null);
        adminService.save(admin);

        // 添加瞬时消息
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public String update(@PathVariable Long id, AdminEntity admin, Long[] roleIds, RedirectAttributes redirectAttributes) {

        // 补充角色
        admin.setRoles(new HashSet<RoleEntity>(roleService.findList(roleIds)));

        // Bean Validation
        if (!verify(admin)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit";
        }
        // 验证管理员是否存在
        AdminEntity pAdmin = adminService.find(id);
        if (pAdmin == null) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL;
        }
        // 验证邮箱地址是否唯一
        if (!adminService.unique("email", pAdmin.getEmail(), admin.getEmail(), true)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{id}/edit";
        }

        // 修改密码时
        if (StringUtils.isNotBlank(admin.getPassword())) {
            // 设置新密码MD5加密
            admin.setPassword(DigestUtils.md5Hex(admin.getPassword()));
        }
        // 保持原密码时
        else {
            admin.setPassword(pAdmin.getPassword());
        }

        // 账户解锁时
        if (pAdmin.getLocked() && BooleanUtils.isFalse(admin.getLocked())) {
            admin.setLoginFailureCount(0);
            admin.setLockedDate(null);
        }
        // 保持原解锁/锁定状态时
        else {
            admin.setLocked(pAdmin.getLocked());
            admin.setLoginFailureCount(pAdmin.getLoginFailureCount());
            admin.setLockedDate(pAdmin.getLockedDate());
        }

        admin.setEmail(StringUtils.lowerCase(admin.getEmail()));
        adminService.update(admin, "username", "loginIp", "loginDate");

        // 添加瞬时消息
        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL;
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/batch_delete", method = RequestMethod.POST)
    public @ResponseBody
    Message delete(Long[] ids) {
        // 验证是否管理员全部删除
        if (ArrayUtils.getLength(ids) >= adminService.count()) {
            return Message.error("删除失败，必须至少保留一项");
        }
        adminService.deleteList(ids);
        return SUCCESS_MESSAGE;
    }

    /**
     * 检查用户名
     */
    @RequestMapping(value = "/check_username", method = RequestMethod.POST)
    public @ResponseBody
    boolean checkUsername(String username) {
        if (StringUtils.isBlank(username)) {
            return false;
        }
        // 验证用户名是否存在
        if (adminService.exists("username", username, true)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 检查邮箱地址
     */
    @RequestMapping(value = "/check_email", method = RequestMethod.POST)
    public @ResponseBody
    boolean checkEmail(String email, String previousEmail) {
        if (StringUtils.isBlank(email)) {
            return false;
        }
        // 验证邮箱地址是否唯一
        if (adminService.unique("email", previousEmail, email, true)) {
            return true;
        } else {
            return false;
        }
    }

}