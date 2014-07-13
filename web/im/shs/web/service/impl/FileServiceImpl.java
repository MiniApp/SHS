package im.shs.web.service.impl;

import im.shs.FileInfo;
import im.shs.enums.FileOrderMethodEnum;
import im.shs.enums.FileTypeEnum;
import im.shs.util.FreemarkerUtils;
import im.shs.util.SettingUtils;
import im.shs.web.plugin.StoragePlugin;
import im.shs.web.plugin.oss.OssPlugin;
import im.shs.web.service.FileService;
import im.shs.web.service.PluginService;
import im.shs.web.setting.security.SecuritySetting;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

/**
 * @class : FileServiceImpl
 * @description: 文件
 *
 * @author suhao
 * @date 2014年7月13日 上午2:08:32
 * @version 1.0
 */
@Service("fileServiceImpl")
public class FileServiceImpl implements FileService, ServletContextAware {

    /** servletContext */
    private ServletContext servletContext;

    @Resource(name = "taskExecutor")
    private TaskExecutor taskExecutor;

    @Resource(name = "pluginServiceImpl")
    private PluginService pluginService;

    @Resource(name = "ossPlugin")
    private OssPlugin ossPlugin;

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean verify(FileTypeEnum fileType, MultipartFile multipartFile) {
        if (multipartFile == null) {
            return false;
        }
        SecuritySetting setting = SettingUtils.get().getSecurity();
        if (setting.getUploadMaxSize() != null && setting.getUploadMaxSize() != 0
                && multipartFile.getSize() > setting.getUploadMaxSize() * 1024L * 1024L) {
            return false;
        }
        String[] uploadExtensions;
        if (fileType == FileTypeEnum.flash) {
            uploadExtensions = setting.getUploadFlashExtensions();
        } else if (fileType == FileTypeEnum.media) {
            uploadExtensions = setting.getUploadMediaExtensions();
        } else if (fileType == FileTypeEnum.file) {
            uploadExtensions = setting.getUploadFileExtensions();
        } else {
            uploadExtensions = setting.getUploadImageExtensions();
        }
        if (ArrayUtils.isNotEmpty(uploadExtensions)) {
            return FilenameUtils.isExtension(multipartFile.getOriginalFilename(), uploadExtensions);
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public String upload(FileTypeEnum fileType, MultipartFile multipartFile, boolean async) {
        if (multipartFile == null) {
            return null;
        }
        SecuritySetting setting = SettingUtils.get().getSecurity();
        String uploadPath;
        if (fileType == FileTypeEnum.flash) {
            uploadPath = setting.getFlashUploadPath();
        } else if (fileType == FileTypeEnum.media) {
            uploadPath = setting.getMediaUploadPath();
        } else if (fileType == FileTypeEnum.file) {
            uploadPath = setting.getFileUploadPath();
        } else {
            uploadPath = setting.getImageUploadPath();
        }
        try {
            Map<String, Object> model = new HashMap<String, Object>();
            model.put("uuid", UUID.randomUUID().toString());
            String path = FreemarkerUtils.process(uploadPath, model);
            String destPath = path + UUID.randomUUID() + "."
                    + FilenameUtils.getExtension(multipartFile.getOriginalFilename());

            for (StoragePlugin storagePlugin : pluginService.getStoragePlugins(true)) {
                File tempFile = new File(System.getProperty("java.io.tmpdir") + "/upload_" + UUID.randomUUID() + ".tmp");
                if (!tempFile.getParentFile().exists()) {
                    tempFile.getParentFile().mkdirs();
                }
                multipartFile.transferTo(tempFile);
                if (async) {
                    addTask(storagePlugin, destPath, tempFile, multipartFile.getContentType());
                } else {
                    try {
                        storagePlugin.upload(destPath, tempFile, multipartFile.getContentType());
                    } finally {
                        FileUtils.deleteQuietly(tempFile);
                    }
                }
                return storagePlugin.getUrl(destPath);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public String upload(FileTypeEnum fileType, MultipartFile multipartFile) {
        return upload(fileType, multipartFile, false);
    }

    @Override
    @Transactional(readOnly = true)
    public String uploadLocal(FileTypeEnum fileType, MultipartFile multipartFile) {
        if (multipartFile == null) {
            return null;
        }
        SecuritySetting setting = SettingUtils.get().getSecurity();
        String uploadPath;
        if (fileType == FileTypeEnum.flash) {
            uploadPath = setting.getFlashUploadPath();
        } else if (fileType == FileTypeEnum.media) {
            uploadPath = setting.getMediaUploadPath();
        } else if (fileType == FileTypeEnum.file) {
            uploadPath = setting.getFileUploadPath();
        } else {
            uploadPath = setting.getImageUploadPath();
        }
        try {
            Map<String, Object> model = new HashMap<String, Object>();
            model.put("uuid", UUID.randomUUID().toString());
            String path = FreemarkerUtils.process(uploadPath, model);
            String destPath = path + UUID.randomUUID() + "."
                    + FilenameUtils.getExtension(multipartFile.getOriginalFilename());
            File destFile = new File(servletContext.getRealPath(destPath));
            if (!destFile.getParentFile().exists()) {
                destFile.getParentFile().mkdirs();
            }
            multipartFile.transferTo(destFile);
            
            // OSS
            if(ossPlugin.getEnabled()) {
                ossPlugin.upload(destPath, destFile, multipartFile.getContentType());
            }
            
            return destPath;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<FileInfo> browser(String path, FileTypeEnum fileType, FileOrderMethodEnum orderMethod) {
        if (path != null) {
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            if (!path.endsWith("/")) {
                path += "/";
            }
        } else {
            path = "/";
        }
        SecuritySetting setting = SettingUtils.get().getSecurity();
        String uploadPath;
        if (fileType == FileTypeEnum.flash) {
            uploadPath = setting.getFlashUploadPath();
        } else if (fileType == FileTypeEnum.media) {
            uploadPath = setting.getMediaUploadPath();
        } else if (fileType == FileTypeEnum.file) {
            uploadPath = setting.getFileUploadPath();
        } else {
            uploadPath = setting.getImageUploadPath();
        }
        String browsePath = StringUtils.substringBefore(uploadPath, "${");
        browsePath = StringUtils.substringBeforeLast(browsePath, "/") + path;

        List<FileInfo> fileInfos = new ArrayList<FileInfo>();
        if (browsePath.indexOf("..") >= 0) {
            return fileInfos;
        }
        for (StoragePlugin storagePlugin : pluginService.getStoragePlugins(true)) {
            fileInfos = storagePlugin.browser(browsePath);
            break;
        }
        if (orderMethod == FileOrderMethodEnum.size) {
            Collections.sort(fileInfos, new SizeComparator());
        } else if (orderMethod == FileOrderMethodEnum.type) {
            Collections.sort(fileInfos, new TypeComparator());
        } else {
            Collections.sort(fileInfos, new NameComparator());
        }
        return fileInfos;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean deleteLocal(String filePath) {
        Assert.hasText(filePath);

        File staticFile = new File(servletContext.getRealPath(filePath));
        if (staticFile.exists()) {
            staticFile.delete();
            return true;
        }

        return false;
    }

    /**
     * 名称转换器
     */
    private class NameComparator implements Comparator<FileInfo> {
        public int compare(FileInfo fileInfos1, FileInfo fileInfos2) {
            return new CompareToBuilder().append(!fileInfos1.getIsDirectory(), !fileInfos2.getIsDirectory())
                    .append(fileInfos1.getName(), fileInfos2.getName()).toComparison();
        }
    }

    /**
     * 大小转换器
     */
    private class SizeComparator implements Comparator<FileInfo> {
        public int compare(FileInfo fileInfos1, FileInfo fileInfos2) {
            return new CompareToBuilder().append(!fileInfos1.getIsDirectory(), !fileInfos2.getIsDirectory())
                    .append(fileInfos1.getSize(), fileInfos2.getSize()).toComparison();
        }
    }

    /**
     * 类型转换器
     */
    private class TypeComparator implements Comparator<FileInfo> {
        public int compare(FileInfo fileInfos1, FileInfo fileInfos2) {
            return new CompareToBuilder()
                    .append(!fileInfos1.getIsDirectory(), !fileInfos2.getIsDirectory())
                    .append(FilenameUtils.getExtension(fileInfos1.getName()),
                            FilenameUtils.getExtension(fileInfos2.getName())).toComparison();
        }
    }

    /**
     * 添加上传任务
     * 
     * @param storagePlugin
     *            存储插件
     * @param path
     *            上传路径
     * @param tempFile
     *            临时文件
     * @param contentType
     *            文件类型
     */
    private void addTask(final StoragePlugin storagePlugin, final String path, final File tempFile,
            final String contentType) {
        taskExecutor.execute(new Runnable() {
            public void run() {
                try {
                    storagePlugin.upload(path, tempFile, contentType);
                } finally {
                    FileUtils.deleteQuietly(tempFile);
                }
            }
        });
    }

}