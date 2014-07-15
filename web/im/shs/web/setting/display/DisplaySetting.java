package im.shs.web.setting.display;

import im.shs.web.enums.WatermarkPositionEnum;

import java.io.Serializable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

/**
 * @class : DisplaySetting
 * @description: 显示设置
 * 
 * @author suhao
 * @date 2014年7月13日 上午12:52:47
 * @version 1.0
 */
public class DisplaySetting implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 2985522591045842541L;

	/** 图片（大）宽度 */
	private Integer largeImageWidth;

	/** 图片（大）高度 */
	private Integer largeImageHeight;

	/** 图片（中）宽度 */
	private Integer mediumImageWidth;

	/** 图片（中）高度 */
	private Integer mediumImageHeight;

	/** 图片（小）宽度 */
	private Integer smallImageWidth;

	/** 图片（小）高度 */
	private Integer smallImageHeight;

	/** 图片（缩略）宽度 */
	private Integer thumbnailImageWidth;

	/** 图片（缩略）高度 */
	private Integer thumbnailImageHeight;

	/** 默认图片（缩略） */
	private String defaultThumbnailImage;

	/** 默认图片（缩略）文件 */
	private MultipartFile defaultThumbnailImageFile;

	/** 默认图片（小） */
	private String defaultSmallImage;

	/** 默认图片（小）文件 */
	private MultipartFile defaultSmallImageFile;

	/** 默认图片（中） */
	private String defaultMediumImage;

	/** 默认图片（中）文件 */
	private MultipartFile defaultMediumImageFile;

	/** 默认图片（大） */
	private String defaultLargeImage;

	/** 默认图片（大）文件 */
	private MultipartFile defaultLargeImageFile;

	/** 水印图片 */
	private String watermarkImage;

	/** 水印图片文件 */
	private MultipartFile watermarkImageFile;

	/** 水印位置 */
	private WatermarkPositionEnum watermarkPosition;

	/** 水印透明度 */
	private Integer watermarkAlpha;

	@NotNull
	@Min(value = 1)
	public Integer getLargeImageWidth() {
		return largeImageWidth;
	}

	public void setLargeImageWidth(Integer largeImageWidth) {
		this.largeImageWidth = largeImageWidth;
	}

	@NotNull
	@Min(value = 1)
	public Integer getLargeImageHeight() {
		return largeImageHeight;
	}

	public void setLargeImageHeight(Integer largeImageHeight) {
		this.largeImageHeight = largeImageHeight;
	}

	@NotNull
	@Min(value = 1)
	public Integer getMediumImageWidth() {
		return mediumImageWidth;
	}

	public void setMediumImageWidth(Integer mediumImageWidth) {
		this.mediumImageWidth = mediumImageWidth;
	}

	@NotNull
	@Min(value = 1)
	public Integer getMediumImageHeight() {
		return mediumImageHeight;
	}

	public void setMediumImageHeight(Integer mediumImageHeight) {
		this.mediumImageHeight = mediumImageHeight;
	}

	@NotNull
	@Min(value = 1)
	public Integer getSmallImageWidth() {
		return smallImageWidth;
	}

	public void setSmallImageWidth(Integer smallImageWidth) {
		this.smallImageWidth = smallImageWidth;
	}

	@NotNull
	@Min(value = 1)
	public Integer getSmallImageHeight() {
		return smallImageHeight;
	}

	public void setSmallImageHeight(Integer smallImageHeight) {
		this.smallImageHeight = smallImageHeight;
	}

	@NotNull
	@Min(value = 1)
	public Integer getThumbnailImageWidth() {
		return thumbnailImageWidth;
	}

	public void setThumbnailImageWidth(Integer thumbnailImageWidth) {
		this.thumbnailImageWidth = thumbnailImageWidth;
	}

	@NotNull
	@Min(value = 1)
	public Integer getThumbnailImageHeight() {
		return thumbnailImageHeight;
	}

	public void setThumbnailImageHeight(Integer thumbnailImageHeight) {
		this.thumbnailImageHeight = thumbnailImageHeight;
	}

	public String getDefaultThumbnailImage() {
		return defaultThumbnailImage;
	}

	public void setDefaultThumbnailImage(String defaultThumbnailImage) {
		this.defaultThumbnailImage = defaultThumbnailImage;
	}

	public MultipartFile getDefaultThumbnailImageFile() {
		return defaultThumbnailImageFile;
	}

	public void setDefaultThumbnailImageFile(
			MultipartFile defaultThumbnailImageFile) {
		this.defaultThumbnailImageFile = defaultThumbnailImageFile;
	}

	public String getDefaultSmallImage() {
		return defaultSmallImage;
	}

	public void setDefaultSmallImage(String defaultSmallImage) {
		this.defaultSmallImage = defaultSmallImage;
	}

	public MultipartFile getDefaultSmallImageFile() {
		return defaultSmallImageFile;
	}

	public void setDefaultSmallImageFile(MultipartFile defaultSmallImageFile) {
		this.defaultSmallImageFile = defaultSmallImageFile;
	}

	public String getDefaultMediumImage() {
		return defaultMediumImage;
	}

	public void setDefaultMediumImage(String defaultMediumImage) {
		this.defaultMediumImage = defaultMediumImage;
	}

	public MultipartFile getDefaultMediumImageFile() {
		return defaultMediumImageFile;
	}

	public void setDefaultMediumImageFile(MultipartFile defaultMediumImageFile) {
		this.defaultMediumImageFile = defaultMediumImageFile;
	}

	public String getDefaultLargeImage() {
		return defaultLargeImage;
	}

	public void setDefaultLargeImage(String defaultLargeImage) {
		this.defaultLargeImage = defaultLargeImage;
	}

	public MultipartFile getDefaultLargeImageFile() {
		return defaultLargeImageFile;
	}

	public void setDefaultLargeImageFile(MultipartFile defaultLargeImageFile) {
		this.defaultLargeImageFile = defaultLargeImageFile;
	}

	public String getWatermarkImage() {
		return watermarkImage;
	}

	public void setWatermarkImage(String watermarkImage) {
		this.watermarkImage = watermarkImage;
	}

	public MultipartFile getWatermarkImageFile() {
		return watermarkImageFile;
	}

	public void setWatermarkImageFile(MultipartFile watermarkImageFile) {
		this.watermarkImageFile = watermarkImageFile;
	}

	@NotNull
	public WatermarkPositionEnum getWatermarkPosition() {
		return watermarkPosition;
	}

	public void setWatermarkPosition(WatermarkPositionEnum watermarkPosition) {
		this.watermarkPosition = watermarkPosition;
	}

	@NotNull
	@Min(value = 0)
	@Max(value = 100)
	public Integer getWatermarkAlpha() {
		return watermarkAlpha;
	}

	public void setWatermarkAlpha(Integer watermarkAlpha) {
		this.watermarkAlpha = watermarkAlpha;
	}

}