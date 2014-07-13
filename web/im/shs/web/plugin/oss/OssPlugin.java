package im.shs.web.plugin.oss;

import im.shs.FileInfo;
import im.shs.entity.PluginConfigEntity;
import im.shs.enums.StorageMethodEnum;
import im.shs.web.plugin.StoragePlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.aliyun.openservices.oss.OSSClient;
import com.aliyun.openservices.oss.model.ListObjectsRequest;
import com.aliyun.openservices.oss.model.OSSObjectSummary;
import com.aliyun.openservices.oss.model.ObjectListing;
import com.aliyun.openservices.oss.model.ObjectMetadata;

/**
 * @class : OssPlugin
 * @description: 阿里云存储
 *
 * @author suhao
 * @date 2014年7月13日 上午2:50:22
 * @version 1.0
 */
@Component("ossPlugin")
public class OssPlugin extends StoragePlugin {

    @Override
    public String getName() {
        return "阿里云存储";
    }

    @Override
    public StorageMethodEnum getStorageMethod() {
        return StorageMethodEnum.online;
    }

    @Override
    public String getVersion() {
        return "1.0.12";
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
        return "oss/install";
    }

    @Override
    public String getUninstallUrl() {
        return "oss/uninstall";
    }

    @Override
    public String getSettingUrl() {
        return "oss/setting";
    }

    @Override
    public void upload(String path, File file, String contentType) {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        if (pPluginConfig != null) {
            String accessId = pPluginConfig.getAttribute("accessId");
            String accessKey = pPluginConfig.getAttribute("accessKey");
            String bucketName = pPluginConfig.getAttribute("bucketName");
            InputStream inputStream = null;
            try {
                inputStream = new FileInputStream(file);
                OSSClient ossClient = new OSSClient(accessId, accessKey);
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentType(contentType);
                objectMetadata.setContentLength(file.length());
                ossClient.putObject(bucketName, StringUtils.removeStart(path, "/"), inputStream, objectMetadata);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                IOUtils.closeQuietly(inputStream);
            }
        }
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
        PluginConfigEntity pPluginConfig = getPluginConfig();
        if (pPluginConfig != null) {
            String accessId = pPluginConfig.getAttribute("accessId");
            String accessKey = pPluginConfig.getAttribute("accessKey");
            String bucketName = pPluginConfig.getAttribute("bucketName");
            String urlPrefix = getUrlPrefix();
            try {
                OSSClient ossClient = new OSSClient(accessId, accessKey);
                ListObjectsRequest listObjectsRequest = new ListObjectsRequest(bucketName);
                listObjectsRequest.setPrefix(StringUtils.removeStart(path, "/"));
                listObjectsRequest.setDelimiter("/");
                ObjectListing objectListing = ossClient.listObjects(listObjectsRequest);
                for (String commonPrefix : objectListing.getCommonPrefixes()) {
                    FileInfo fileInfo = new FileInfo();
                    fileInfo.setName(StringUtils.substringAfterLast(StringUtils.removeEnd(commonPrefix, "/"), "/"));
                    fileInfo.setUrl(urlPrefix + "/" + commonPrefix);
                    fileInfo.setIsDirectory(true);
                    fileInfo.setSize(0L);
                    fileInfos.add(fileInfo);
                }
                for (OSSObjectSummary ossObjectSummary : objectListing.getObjectSummaries()) {
                    if (ossObjectSummary.getKey().endsWith("/")) {
                        continue;
                    }
                    FileInfo fileInfo = new FileInfo();
                    fileInfo.setName(StringUtils.substringAfterLast(ossObjectSummary.getKey(), "/"));
                    fileInfo.setUrl(urlPrefix + "/" + ossObjectSummary.getKey());
                    fileInfo.setIsDirectory(false);
                    fileInfo.setSize(ossObjectSummary.getSize());
                    fileInfo.setLastModified(ossObjectSummary.getLastModified());
                    fileInfos.add(fileInfo);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return fileInfos;
    }

}