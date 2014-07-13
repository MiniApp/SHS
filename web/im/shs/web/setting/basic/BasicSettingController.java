package im.shs.web.setting.basic;

import im.shs.Setting;
import im.shs.enums.FileTypeEnum;
import im.shs.util.SettingUtils;
import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.service.CacheService;
import im.shs.web.service.FileService;
import im.shs.web.service.StaticService;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : BasicSettingController
 * @description: 基本设置
 *
 * @author suhao
 * @date 2014年7月13日 上午1:23:11
 * @version 1.0
 */
@Controller("adminBasicSettingController")
@RequestMapping("/admin/basic_setting")
public class BasicSettingController extends BaseAdminController {

	/** 索引重定向URL */
	private static final String INDEX_REDIRECT_URL = "redirect:/admin/basic_setting";

	@Resource(name = "fileServiceImpl")
	private FileService fileService;

	@Resource(name = "cacheServiceImpl")
	private CacheService cacheService;

	@Resource(name = "staticServiceImpl")
	private StaticService staticService;

	/**
	 * 设置
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String setting(ModelMap model) {
		model.addAttribute("setting", SettingUtils.get().getBasic());
		return "/com/iclnetwork/p2p/setting/basic/setting";
	}

	/**
	 * 设置
	 */
	@RequestMapping(method = RequestMethod.POST)
	public String setting(BasicSetting basicSetting,
			RedirectAttributes redirectAttributes) {

		// Bean Validation
		if (!verify(basicSetting)) {
			addFlashMessage(redirectAttributes, ERROR_MESSAGE);
			return INDEX_REDIRECT_URL;
		}

		// 获取设置
		Setting setting = SettingUtils.get();
		// 获取原基本设置
		BasicSetting previousBasicSetting = setting.getBasic();

		// 选择网站LOGO图片文件时
		if (basicSetting.getSiteLogoFile() != null
				&& !basicSetting.getSiteLogoFile().isEmpty()) {

			// 验证网站LOGO图片文件类型
			if (!fileService.verify(FileTypeEnum.image,
					basicSetting.getSiteLogoFile())) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 上传网站LOGO图片文件
			String siteLogoUploadPath = fileService.uploadLocal(
					FileTypeEnum.image, basicSetting.getSiteLogoFile());
			if (StringUtils.isBlank(siteLogoUploadPath)) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 删除原网站LOGO图片文件
			if (StringUtils.isNotBlank(basicSetting.getSiteLogo())) {
				fileService.deleteLocal(basicSetting.getSiteLogo());
			}
			basicSetting.setSiteLogo(siteLogoUploadPath);
		}
		// 保留原网站LOGO图片文件时
		else {
			basicSetting.setSiteLogo(previousBasicSetting.getSiteLogo());
		}
		basicSetting.setSiteLogoFile(null);

		// 设置基本配置
		setting.setBasic(basicSetting);
		SettingUtils.set(setting);

		cacheService.clear();
		staticService.buildAll();

		addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
		return INDEX_REDIRECT_URL;
	}

}