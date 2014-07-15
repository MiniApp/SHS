package im.shs.web.plugin.storage.ftp;

import im.shs.web.FileInfo;
import im.shs.web.enums.StorageMethodEnum;
import im.shs.web.plugin.storage.StoragePlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.stereotype.Component;

/**
 * Plugin - FTP存储
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Component("ftpStoragePlugin")
public class FtpStoragePlugin extends StoragePlugin {

    /** “主机”属性名称 */
    public static final String HOST_ATTR = "host";

    /** “端口号”属性名称 */
    public static final String PORT_ATTR = "port";

    /** “用户名”属性名称 */
    public static final String USERNAME_ATTR = "username";

    /** “密码”属性名称 */
    public static final String PASSWORD_ATTR = "password";

    @Override
    public String getName() {
        return "FTP存储";
    }

    @Override
    public StorageMethodEnum getStorageMethod() {
        return StorageMethodEnum.online;
    }

    @Override
    public String getVersion() {
        return "1.0";
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
        return "ftp/install";
    }

    @Override
    public String getUninstallUrl() {
        return "ftp/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "ftp/setting";
    }

    /**
     * 获取主机
     * 
     * @return 主机
     */
    public String getHost() {
        return getAttribute(HOST_ATTR);
    }

    /**
     * 获取端口号
     * 
     * @return 端口号
     */
    public Integer getPort() {
        String port = getAttribute(PORT_ATTR);
        if (StringUtils.isBlank(port) || !StringUtils.isNumeric(port)) {
            return null;
        }
        return Integer.valueOf(port);
    }

    /**
     * 获取用户名
     * 
     * @return 用户名
     */
    public String getUsername() {
        return getAttribute(USERNAME_ATTR);
    }

    /**
     * 获取密码
     * 
     * @return 密码
     */
    public String getPassword() {
        return getAttribute(PASSWORD_ATTR);
    }

    @Override
    public String getUrl(String path) {
        String urlPrefix = getUrlPrefix();
        if (StringUtils.isNotBlank(urlPrefix)) {
            return urlPrefix + path;
        }
        return null;
    }

    @Override
    public List<FileInfo> browser(String path) {
        List<FileInfo> fileInfos = new ArrayList<FileInfo>();
        String host = getHost();
        Integer port = getPort();
        String username = getUsername();
        String password = getPassword();
        String urlPrefix = getUrlPrefix();
        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(host, port);
            ftpClient.login(username, password);
            ftpClient.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            ftpClient.enterLocalPassiveMode();
            if (FTPReply.isPositiveCompletion(ftpClient.getReplyCode()) && ftpClient.changeWorkingDirectory(path)) {
                for (FTPFile ftpFile : ftpClient.listFiles()) {
                    FileInfo fileInfo = new FileInfo();
                    fileInfo.setName(ftpFile.getName());
                    fileInfo.setUrl(urlPrefix + path + ftpFile.getName());
                    fileInfo.setIsDirectory(ftpFile.isDirectory());
                    fileInfo.setSize(ftpFile.getSize());
                    fileInfo.setLastModified(ftpFile.getTimestamp().getTime());
                    fileInfos.add(fileInfo);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                }
            }
        }
        return fileInfos;
    }

    @Override
    public void upload(String path, File file, String contentType) {
        String host = getHost();
        Integer port = getPort();
        String username = getUsername();
        String password = getPassword();
        FTPClient ftpClient = new FTPClient();
        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(file);
            ftpClient.connect(host, port);
            ftpClient.login(username, password);
            ftpClient.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            ftpClient.enterLocalPassiveMode();
            if (FTPReply.isPositiveCompletion(ftpClient.getReplyCode())) {
                String directory = StringUtils.substringBeforeLast(path, "/");
                String filename = StringUtils.substringAfterLast(path, "/");
                if (!ftpClient.changeWorkingDirectory(directory)) {
                    String[] paths = StringUtils.split(directory, "/");
                    String p = "/";
                    ftpClient.changeWorkingDirectory(p);
                    for (String s : paths) {
                        p += s + "/";
                        if (!ftpClient.changeWorkingDirectory(p)) {
                            ftpClient.makeDirectory(s);
                            ftpClient.changeWorkingDirectory(p);
                        }
                    }
                }
                ftpClient.storeFile(filename, inputStream);
                ftpClient.logout();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(inputStream);
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                }
            }
        }
    }

}