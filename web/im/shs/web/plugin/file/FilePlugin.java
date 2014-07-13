package im.shs.web.plugin.file;

import im.shs.FileInfo;
import im.shs.enums.StorageMethodEnum;
import im.shs.util.SettingUtils;
import im.shs.web.plugin.StoragePlugin;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

/**
 * @class : FilePlugin
 * @description: 本地文件存储
 *
 * @author suhao
 * @date 2014年7月13日 上午2:52:43
 * @version 1.0
 */
@Component("filePlugin")
public class FilePlugin extends StoragePlugin implements ServletContextAware {

    /** servletContext */
    private ServletContext servletContext;

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Override
    public String getName() {
        return "本地文件存储";
    }

    @Override
    public StorageMethodEnum getStorageMethod() {
        return StorageMethodEnum.offline;
    }

    @Override
    public String getVersion() {
        return "3.0";
    }

    @Override
    public String getAuthor() {
        return "ICLNetwork";
    }

    @Override
    public String getSiteUrl() {
        return "http://www.icl-network.com";
    }

    @Override
    public String getInstallUrl() {
        return "file/install";
    }

    @Override
    public String getUninstallUrl() {
        return "file/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "file/setting";
    }

    @Override
    public void upload(String path, File file, String contentType) {
        try {
            File destFile = new File(servletContext.getRealPath(path));
            FileUtils.moveFile(file, destFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getUrl(String path) {
        String urlPrefix = getUrlPrefix();
        if (StringUtils.isNotBlank(urlPrefix)) {
            return urlPrefix + path;
        }
        return SettingUtils.get().getBasic().getSiteUrl() + path;
    }

    @Override
    public List<FileInfo> browser(String path) {
        List<FileInfo> fileInfos = new ArrayList<FileInfo>();
        File directory = new File(servletContext.getRealPath(path));
        if (directory.exists() && directory.isDirectory()) {
            for (File file : directory.listFiles()) {
                FileInfo fileInfo = new FileInfo();
                fileInfo.setName(file.getName());
                fileInfo.setUrl(SettingUtils.get().getBasic().getSiteUrl() + path + file.getName());
                fileInfo.setIsDirectory(file.isDirectory());
                fileInfo.setSize(file.length());
                fileInfo.setLastModified(new Date(file.lastModified()));
                fileInfos.add(fileInfo);
            }
        }
        return fileInfos;
    }

}