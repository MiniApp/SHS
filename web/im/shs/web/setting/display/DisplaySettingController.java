package im.shs.web.setting.display;

import im.shs.web.Setting;
import im.shs.web.action.admin.BaseAdminController;
import im.shs.web.enums.FileTypeEnum;
import im.shs.web.enums.WatermarkPositionEnum;
import im.shs.web.service.CacheService;
import im.shs.web.service.FileService;
import im.shs.web.service.StaticService;
import im.shs.web.util.SettingUtils;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controller - 显示设置
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Controller("adminDisplaySettingController")
@RequestMapping("/admin/display_setting")
public class DisplaySettingController extends BaseAdminController {

	/** 索引重定向URL */
	private static final String INDEX_REDIRECT_URL = "redirect:/admin/display_setting";

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
		model.addAttribute("setting", SettingUtils.get().getDisplay());
		model.addAttribute("watermarkPositions", WatermarkPositionEnum.values());
		return "/com/iclnetwork/p2p/setting/display/setting";
	}

	/**
	 * 设置
	 */
	@RequestMapping(method = RequestMethod.POST)
	public String setting(DisplaySetting displaySetting,
			RedirectAttributes redirectAttributes) {

		// Bean Validation
		if (!verify(displaySetting)) {
			addFlashMessage(redirectAttributes, ERROR_MESSAGE);
			return INDEX_REDIRECT_URL;
		}

		// 获取设置
		Setting setting = SettingUtils.get();
		// 获取原显示设置
		DisplaySetting previousDisplaySetting = setting.getDisplay();

		// 选择图片（缩略）文件时
		if (displaySetting.getDefaultThumbnailImageFile() != null
				&& !displaySetting.getDefaultThumbnailImageFile().isEmpty()) {

			// 验证图片（缩略）文件类型
			if (!fileService.verify(FileTypeEnum.image,
					displaySetting.getDefaultThumbnailImageFile())) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 上传图片（缩略）文件
			String defaultThumbnailImageUploadPath = fileService.uploadLocal(
					FileTypeEnum.image,
					displaySetting.getDefaultThumbnailImageFile());
			if (StringUtils.isBlank(defaultThumbnailImageUploadPath)) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 删除原图片（缩略）文件
			if (StringUtils.isNotBlank(displaySetting
					.getDefaultThumbnailImage())) {
				fileService.deleteLocal(displaySetting
						.getDefaultThumbnailImage());
			}
			displaySetting
					.setDefaultThumbnailImage(defaultThumbnailImageUploadPath);
		}
		// 保留原图片（缩略）文件时
		else {
			displaySetting.setDefaultThumbnailImage(previousDisplaySetting
					.getDefaultThumbnailImage());
		}
		displaySetting.setDefaultThumbnailImageFile(null);

		// 选择图片（小）文件时
		if (displaySetting.getDefaultSmallImageFile() != null
				&& !displaySetting.getDefaultSmallImageFile().isEmpty()) {

			// 验证图片（小）文件类型
			if (!fileService.verify(FileTypeEnum.image,
					displaySetting.getDefaultSmallImageFile())) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 上传图片（小）文件
			String defaultSmallImageUploadPath = fileService.uploadLocal(
					FileTypeEnum.image,
					displaySetting.getDefaultSmallImageFile());
			if (StringUtils.isBlank(defaultSmallImageUploadPath)) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 删除原图片（小）文件
			if (StringUtils.isNotBlank(displaySetting.getDefaultSmallImage())) {
				fileService.deleteLocal(displaySetting.getDefaultSmallImage());
			}
			displaySetting.setDefaultSmallImage(defaultSmallImageUploadPath);
		}
		// 保留原图片（小）文件时
		else {
			displaySetting.setDefaultSmallImage(previousDisplaySetting
					.getDefaultSmallImage());
		}
		displaySetting.setDefaultSmallImageFile(null);

		// 选择图片（中）文件时
		if (displaySetting.getDefaultMediumImageFile() != null
				&& !displaySetting.getDefaultMediumImageFile().isEmpty()) {

			// 验证图片（中）文件类型
			if (!fileService.verify(FileTypeEnum.image,
					displaySetting.getDefaultMediumImageFile())) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 上传图片（中）文件
			String defaultMediumImageUploadPath = fileService.uploadLocal(
					FileTypeEnum.image,
					displaySetting.getDefaultMediumImageFile());
			if (StringUtils.isBlank(defaultMediumImageUploadPath)) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 删除原图片（中）文件
			if (StringUtils.isNotBlank(displaySetting.getDefaultMediumImage())) {
				fileService.deleteLocal(displaySetting.getDefaultMediumImage());
			}
			displaySetting.setDefaultMediumImage(defaultMediumImageUploadPath);
		}
		// 保留原图片（中）文件时
		else {
			displaySetting.setDefaultMediumImage(previousDisplaySetting
					.getDefaultMediumImage());
		}
		displaySetting.setDefaultMediumImageFile(null);

		// 选择图片（大）文件时
		if (displaySetting.getDefaultLargeImageFile() != null
				&& !displaySetting.getDefaultLargeImageFile().isEmpty()) {

			// 验证图片（大）文件类型
			if (!fileService.verify(FileTypeEnum.image,
					displaySetting.getDefaultLargeImageFile())) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 上传图片（大）文件
			String defaultLargeImageUploadPath = fileService.uploadLocal(
					FileTypeEnum.image,
					displaySetting.getDefaultLargeImageFile());
			if (StringUtils.isBlank(defaultLargeImageUploadPath)) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 删除原图片（大）文件
			if (StringUtils.isNotBlank(displaySetting.getDefaultLargeImage())) {
				fileService.deleteLocal(displaySetting.getDefaultLargeImage());
			}
			displaySetting.setDefaultLargeImage(defaultLargeImageUploadPath);
		}
		// 保留原图片（大）文件时
		else {
			displaySetting.setDefaultLargeImage(previousDisplaySetting
					.getDefaultLargeImage());
		}
		displaySetting.setDefaultLargeImageFile(null);

		// 选择水印图片文件时
		if (displaySetting.getWatermarkImageFile() != null
				&& !displaySetting.getWatermarkImageFile().isEmpty()) {

			// 验证水印图片文件类型
			if (!fileService.verify(FileTypeEnum.image,
					displaySetting.getWatermarkImageFile())) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 上传水印图片文件
			String watermarkImageUploadPath = fileService.uploadLocal(
					FileTypeEnum.image, displaySetting.getWatermarkImageFile());
			if (StringUtils.isBlank(watermarkImageUploadPath)) {
				addFlashMessage(redirectAttributes, ERROR_MESSAGE);
				return INDEX_REDIRECT_URL;
			}

			// 删除原水印图片文件
			if (StringUtils.isNotBlank(displaySetting.getWatermarkImage())) {
				fileService.deleteLocal(displaySetting.getWatermarkImage());
			}
			displaySetting.setWatermarkImage(watermarkImageUploadPath);
		}
		// 保留原水印图片文件时
		else {
			displaySetting.setWatermarkImage(previousDisplaySetting
					.getWatermarkImage());
		}
		displaySetting.setWatermarkImageFile(null);

		// 设置显示配置
		setting.setDisplay(displaySetting);
		SettingUtils.set(setting);

		cacheService.clear();
		staticService.buildAll();

		addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
		return INDEX_REDIRECT_URL;
	}

}