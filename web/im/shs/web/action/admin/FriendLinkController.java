package im.shs.web.action.admin;

import im.shs.web.Message;
import im.shs.web.entity.FriendLinkEntity;
import im.shs.web.enums.FileTypeEnum;
import im.shs.web.enums.FriendLinkTypeEnum;
import im.shs.web.service.FileService;
import im.shs.web.service.FriendLinkService;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : FriendLinkController
 * @description: 友情链接
 *
 * @author suhao
 * @date 2014年7月19日 下午10:28:41
 * @version 1.0
 */
@Controller("adminFriendLinkController")
@RequestMapping("/admin/friend_link")
public class FriendLinkController extends BaseAdminController {

    /** 索引重定向URL */
    private static final String INDEX_REDIRECT_URL = "redirect:/admin/friend_link";

    /** 模板路径 */
    private static final String TEMPLATE_PATH = "/admin/friend_link";

    @Resource(name = "friendLinkServiceImpl")
    private FriendLinkService friendLinkService;

    @Resource(name = "fileServiceImpl")
    private FileService fileService;

    /**
     * 列表
     */
    @RequestMapping(value = "/{friendLinkType}", method = RequestMethod.GET)
    public String list(@PathVariable FriendLinkTypeEnum friendLinkType, ModelMap model) {
        model.addAttribute("list", friendLinkService.findListByType(friendLinkType));
        return TEMPLATE_PATH + "/list";
    }

    /**
     * 添加
     */
    @RequestMapping(value = "/{friendLinkType}/new", method = RequestMethod.GET)
    public String add(@PathVariable FriendLinkTypeEnum friendLinkType) {
        return TEMPLATE_PATH + "/add";
    }

    /**
     * 编辑
     */
    @RequestMapping(value = "/{friendLinkType}/{id}/edit", method = RequestMethod.GET)
    public String edit(@PathVariable FriendLinkTypeEnum friendLinkType, @PathVariable Long id, ModelMap model,
            RedirectAttributes redirectAttributes) {

        // 验证友情链接类型
        FriendLinkEntity pFriendLink = friendLinkService.find(id);
        if (pFriendLink.getType() != friendLinkType) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{friendLinkType}";
        }

        model.addAttribute("friendLink", pFriendLink);
        return TEMPLATE_PATH + "/edit";
    }

    /**
     * 保存
     */
    @RequestMapping(value = "/{friendLinkType}/create", method = RequestMethod.POST)
    public String save(@PathVariable FriendLinkTypeEnum friendLinkType, FriendLinkEntity friendLink,
            MultipartFile logoFile, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(friendLink)) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
        }
        // 验证名称是否存在
        if (friendLinkService.nameExists(friendLinkType, friendLink.getName())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
        }

        if (friendLinkType == FriendLinkTypeEnum.text) {
            friendLink.setLogo(null);
        } else if (friendLinkType == FriendLinkTypeEnum.image) {
            if (logoFile != null && !logoFile.isEmpty()) {
                // 验证LOGO图片文件类型
                if (!fileService.verify(FileTypeEnum.image, logoFile)) {
                    addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                    return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
                }
                // 上传LOGO图片文件
                String fileUploadPath = fileService.uploadLocal(FileTypeEnum.image, logoFile);
                if (StringUtils.isBlank(fileUploadPath)) {
                    addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                    return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
                }
                friendLink.setLogo(fileUploadPath);
            }
        }

        friendLink.setType(friendLinkType);
        friendLinkService.save(friendLink);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL + "/{friendLinkType}";
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/{friendLinkType}/{id}", method = RequestMethod.POST)
    public String update(@PathVariable FriendLinkTypeEnum friendLinkType, @PathVariable Long id,
            FriendLinkEntity friendLink, MultipartFile logoFile, RedirectAttributes redirectAttributes) {

        // Bean Validation
        if (!verify(friendLink)) {
            return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
        }
        // 验证友情链接是否存在
        FriendLinkEntity pFriendLink = friendLinkService.find(id);
        if (pFriendLink == null || pFriendLink.getType() != friendLinkType) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{friendLinkType}";
        }
        // 验证名称是否唯一
        if (!friendLinkService.nameUnique(friendLinkType, pFriendLink.getName(), friendLink.getName())) {
            addFlashMessage(redirectAttributes, ERROR_MESSAGE);
            return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
        }

        if (friendLinkType == FriendLinkTypeEnum.text) {

            // 删除原LOGO图片
            if (StringUtils.isNotBlank(pFriendLink.getLogo())) {
                fileService.deleteLocal(pFriendLink.getLogo());
            }
            friendLink.setLogo(null);

        } else if (friendLinkType == FriendLinkTypeEnum.image) {
            // 选择LOGO图片文件时
            if (logoFile != null && !logoFile.isEmpty()) {
                // 验证LOGO图片文件类型
                if (!fileService.verify(FileTypeEnum.image, logoFile)) {
                    addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                    return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
                }
                // 上传LOGO图片文件
                String fileUploadPath = fileService.uploadLocal(FileTypeEnum.image, logoFile);
                if (StringUtils.isBlank(fileUploadPath)) {
                    addFlashMessage(redirectAttributes, ERROR_MESSAGE);
                    return INDEX_REDIRECT_URL + "/{friendLinkType}/new";
                }
                // 删除原LOGO图片
                if (StringUtils.isNotBlank(pFriendLink.getLogo())) {
                    fileService.deleteLocal(pFriendLink.getLogo());
                }
                friendLink.setLogo(fileUploadPath);
            } else {
                friendLink.setLogo(pFriendLink.getLogo());
            }
        }

        friendLink.setType(friendLinkType);
        friendLinkService.update(friendLink);

        addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
        return INDEX_REDIRECT_URL + "/{friendLinkType}";
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/{friendLinkType}/batch_delete", method = RequestMethod.POST)
    public @ResponseBody
    Message delete(@PathVariable FriendLinkTypeEnum friendLinkType, Long[] ids) {
        friendLinkService.delete(friendLinkType, ids);
        return SUCCESS_MESSAGE;
    }

    /**
     * 检查名称
     */
    @RequestMapping(value = "/{friendLinkType}/check_name", method = RequestMethod.POST)
    public @ResponseBody
    boolean checkName(@PathVariable FriendLinkTypeEnum friendLinkType, String name, String previousName) {
        if (StringUtils.isBlank(name)) {
            return false;
        }
        // 验证名称是否唯一
        if (friendLinkService.nameUnique(friendLinkType, previousName, name)) {
            return true;
        } else {
            return false;
        }
    }

}