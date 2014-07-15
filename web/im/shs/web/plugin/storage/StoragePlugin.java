package im.shs.web.plugin.storage;

import im.shs.web.FileInfo;
import im.shs.web.enums.StorageMethodEnum;
import im.shs.web.plugin.BasePlugin;

import java.io.File;
import java.util.List;

/**
 * @class : StoragePlugin
 * @description: 存储
 *
 * @author suhao
 * @date 2014年7月14日 下午10:52:08
 * @version 1.0
 */
public abstract class StoragePlugin extends BasePlugin {

    /** “存储方式名称”属性名称 */
    public static final String STORAGE_NAME_ATTR = "storageName";

    /** “URL前缀”属性名称 */
    public static final String URLPREFIX_ATTR = "urlPrefix";

    /** “描述”属性名称 */
    public static final String DESCRIPTION_ATTR = "description";

    /**
     * 获取存储方式
     * 
     * @return 存储方式
     */
    public abstract StorageMethodEnum getStorageMethod();

    /**
     * 获取存储方式名称
     * 
     * @return 存储方式名称
     */
    public String getStorageName() {
        return getAttribute(STORAGE_NAME_ATTR);
    }

    /**
     * 获取URL前缀
     * 
     * @return URL前缀
     */
    public String getUrlPrefix() {
        return getAttribute(URLPREFIX_ATTR);
    }

    /**
     * 获取描述
     * 
     * @return 描述
     */
    public String getDescription() {
        return getAttribute(DESCRIPTION_ATTR);
    }

    /**
     * 获取URL
     * 
     * @param path
     *            上传路径
     * @return URL
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

}