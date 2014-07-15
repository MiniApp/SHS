package im.shs.web.service.impl;

import im.shs.web.elem.ImageElem;
import im.shs.web.plugin.storage.StoragePlugin;
import im.shs.web.service.ImageService;
import im.shs.web.service.PluginService;
import im.shs.web.setting.display.DisplaySetting;
import im.shs.web.setting.security.SecuritySetting;
import im.shs.web.util.FreemarkerUtils;
import im.shs.web.util.ImageUtils;
import im.shs.web.util.SettingUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service - 图片
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Service("imageServiceImpl")
public class ImageServiceImpl implements ImageService, ServletContextAware {

    /** 目标扩展名 */
    private static final String DEST_EXTENSION = "jpg";

    /** 目标文件类型 */
    private static final String DEST_CONTENT_TYPE = "image/jpeg";

    /** servletContext */
    private ServletContext servletContext;

    @Resource(name = "taskExecutor")
    private TaskExecutor taskExecutor;

    @Resource(name = "pluginServiceImpl")
    private PluginService pluginService;

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Override
    public void build(ImageElem image) {
        MultipartFile multipartFile = image.getFile();
        if (multipartFile != null && !multipartFile.isEmpty()) {
            try {
                SecuritySetting setting = SettingUtils.get().getSecurity();
                Map<String, Object> model = new HashMap<String, Object>();
                model.put("uuid", UUID.randomUUID().toString());
                String uploadPath = FreemarkerUtils.process(setting.getImageUploadPath(), model);
                String uuid = UUID.randomUUID().toString();
                String sourcePath = uploadPath + uuid + "-source."
                        + FilenameUtils.getExtension(multipartFile.getOriginalFilename());
                String largePath = uploadPath + uuid + "-large." + DEST_EXTENSION;
                String mediumPath = uploadPath + uuid + "-medium." + DEST_EXTENSION;
                String thumbnailPath = uploadPath + uuid + "-thumbnail." + DEST_EXTENSION;

                for (StoragePlugin storagePlugin : pluginService.getStoragePlugins(true)) {
                    File tempFile = new File(System.getProperty("java.io.tmpdir") + "/upload_" + UUID.randomUUID()
                            + ".tmp");
                    if (!tempFile.getParentFile().exists()) {
                        tempFile.getParentFile().mkdirs();
                    }
                    multipartFile.transferTo(tempFile);
                    addTask(sourcePath, largePath, mediumPath, thumbnailPath, tempFile, multipartFile.getContentType());
                    image.setSource(storagePlugin.getUrl(sourcePath));
                    image.setLarge(storagePlugin.getUrl(largePath));
                    image.setMedium(storagePlugin.getUrl(mediumPath));
                    image.setThumbnail(storagePlugin.getUrl(thumbnailPath));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 添加图片处理任务
     * 
     * @param sourcePath
     *            原图片上传路径
     * @param largePath
     *            图片文件(大)上传路径
     * @param mediumPath
     *            图片文件(小)上传路径
     * @param thumbnailPath
     *            图片文件(缩略)上传路径
     * @param tempFile
     *            原临时文件
     * @param contentType
     *            原文件类型
     */
    private void addTask(final String sourcePath, final String largePath, final String mediumPath,
            final String thumbnailPath, final File tempFile, final String contentType) {
        try {
            taskExecutor.execute(new Runnable() {
                public void run() {
                    for (StoragePlugin storagePlugin : pluginService.getStoragePlugins(true)) {
                        DisplaySetting setting = SettingUtils.get().getDisplay();
                        String tempPath = System.getProperty("java.io.tmpdir");
                        File watermarkFile = new File(servletContext.getRealPath(setting.getWatermarkImage()));
                        File largeTempFile = new File(tempPath + "/upload_" + UUID.randomUUID() + "." + DEST_EXTENSION);
                        File mediumTempFile = new File(tempPath + "/upload_" + UUID.randomUUID() + "." + DEST_EXTENSION);
                        File thumbnailTempFile = new File(tempPath + "/upload_" + UUID.randomUUID() + "."
                                + DEST_EXTENSION);
                        try {
                            ImageUtils.zoom(tempFile, largeTempFile, setting.getLargeImageWidth(),
                                    setting.getLargeImageHeight());
                            ImageUtils.addWatermark(largeTempFile, largeTempFile, watermarkFile,
                                    setting.getWatermarkPosition(), setting.getWatermarkAlpha());
                            ImageUtils.zoom(tempFile, mediumTempFile, setting.getMediumImageWidth(),
                                    setting.getMediumImageHeight());
                            ImageUtils.addWatermark(mediumTempFile, mediumTempFile, watermarkFile,
                                    setting.getWatermarkPosition(), setting.getWatermarkAlpha());
                            ImageUtils.zoom(tempFile, thumbnailTempFile, setting.getThumbnailImageWidth(),
                                    setting.getThumbnailImageHeight());

                            storagePlugin.upload(sourcePath, tempFile, contentType);
                            storagePlugin.upload(largePath, largeTempFile, DEST_CONTENT_TYPE);
                            storagePlugin.upload(mediumPath, mediumTempFile, DEST_CONTENT_TYPE);
                            storagePlugin.upload(thumbnailPath, thumbnailTempFile, DEST_CONTENT_TYPE);
                        } finally {
                            FileUtils.deleteQuietly(tempFile);
                            FileUtils.deleteQuietly(largeTempFile);
                            FileUtils.deleteQuietly(mediumTempFile);
                            FileUtils.deleteQuietly(thumbnailTempFile);
                        }
                        break;
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}