package im.shs.web.plugin;

import im.shs.FileInfo;
import im.shs.entity.PluginConfigEntity;
import im.shs.enums.StorageMethodEnum;
import im.shs.web.service.PluginConfigService;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.builder.CompareToBuilder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.springframework.stereotype.Component;

/**
 * @class : StoragePlugin
 * @description: 存储插件
 *
 * @author suhao
 * @date 2014年7月13日 上午2:39:07
 * @version 1.0
 */
public abstract class StoragePlugin implements Comparable<StoragePlugin> {

    /** “存储方式名称”属性名称 */
    public static final String STORAGE_NAME_ATTRIBUTE_NAME = "storageName";

    /** “URL前缀”属性名称 */
    public static final String URLPREFIX_ATTRIBUTE_NAME = "urlPrefix";

    /** “描述”属性名称 */
    public static final String DESCRIPTION_ATTRIBUTE_NAME = "description";

    @Resource(name = "pluginConfigServiceImpl")
    private PluginConfigService pluginConfigService;

    /**
     * 获取ID
     * 
     * @return ID
     */
    public final String getId() {
        return getClass().getAnnotation(Component.class).value();
    }

    /**
     * 获取名称
     * 
     * @return 名称
     */
    public abstract String getName();

    /**
     * 获取存储方式
     * 
     * @return 存储方式
     */
    public abstract StorageMethodEnum getStorageMethod();

    /**
     * 获取版本
     * 
     * @return 版本
     */
    public abstract String getVersion();

    /**
     * 获取作者
     * 
     * @return 作者
     */
    public abstract String getAuthor();

    /**
     * 获取网址
     * 
     * @return 网址
     */
    public abstract String getSiteUrl();

    /**
     * 获取安装URL
     * 
     * @return 安装URL
     */
    public abstract String getInstallUrl();

    /**
     * 获取卸载URL
     * 
     * @return 卸载URL
     */
    public abstract String getUninstallUrl();

    /**
     * 获取设置URL
     * 
     * @return 设置URL
     */
    public abstract String getSettingUrl();

    /**
     * 获取插件配置
     * 
     * @return 插件配置
     */
    public PluginConfigEntity getPluginConfig() {
        return pluginConfigService.findByPlugin(getId());
    }

    /**
     * 获取属性值
     * 
     * @param name
     *            属性名称
     * @return 属性值
     */
    public String getAttribute(String name) {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        return pPluginConfig != null ? pPluginConfig.getAttribute(name) : null;
    }

    /**
     * 判断是否已安装
     * 
     * @return 是否已安装
     */
    public boolean getInstalled() {
        return pluginConfigService.pluginExists(getId());
    }

    /**
     * 判断是否已启用
     * 
     * @return 是否已启用
     */
    public boolean getEnabled() {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        return pPluginConfig != null ? pPluginConfig.getEnabled() : false;
    }

    /**
     * 获取存储方式名称
     * 
     * @return 存储方式名称
     */
    public String getStorageName() {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        return pPluginConfig != null ? pPluginConfig.getAttribute(STORAGE_NAME_ATTRIBUTE_NAME) : null;
    }

    /**
     * 获取URL前缀
     * 
     * @return URL前缀
     */
    public String getUrlPrefix() {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        return pPluginConfig != null ? pPluginConfig.getAttribute(URLPREFIX_ATTRIBUTE_NAME) : null;
    }

    /**
     * 获取描述
     * 
     * @return 描述
     */
    public String getDescription() {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        return pPluginConfig != null ? pPluginConfig.getAttribute(DESCRIPTION_ATTRIBUTE_NAME) : null;
    }

    /**
     * 获取排序
     * 
     * @return 排序
     */
    public Integer getOrder() {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        return pPluginConfig != null ? pPluginConfig.getOrder() : null;
    }

    /**
     * 文件上传
     * 
     * @param path
     *            上传路径
     * @param file
     *            上传文件
     * @param contentType
     *            文件类型
     */
    public abstract void upload(String path, File file, String contentType);

    /**
     * 获取访问URL
     * 
     * @param path
     *            上传路径
     * @return 访问URL
     */
    public abstract String getUrl(String path);

    /**
     * 文件浏览
     * 
     * @param path
     *            浏览路径
     * @return 文件信息
     */
    public abstract List<FileInfo> browser(String path);

    /**
     * 重写equals方法
     * 
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        StoragePlugin other = (StoragePlugin) obj;
        return new EqualsBuilder().append(getId(), other.getId()).isEquals();
    }

    /**
     * 重写compareTo方法
     * 
     * @param storagePlugin
     *            存储插件
     * @return 比较结果
     */
    @Override
    public int compareTo(StoragePlugin storagePlugin) {
        return new CompareToBuilder().append(getOrder(), storagePlugin.getOrder())
                .append(getId(), storagePlugin.getId()).toComparison();
    }

    /**
     * 重写hashCode方法
     * 
     * @return hashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getId()).toHashCode();
    }

}