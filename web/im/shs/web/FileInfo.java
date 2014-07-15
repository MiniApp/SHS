package im.shs.web;

import java.util.Date;

/**
 * @class : FileInfo
 * @description: 文件信息
 *
 * @author suhao
 * @date 2014年7月13日 上午12:17:19
 * @version 1.0
 */
public class FileInfo {

    /** 名称 */
    private String name;

    /** URL */
    private String url;

    /** 是否为目录 */
    private Boolean isDirectory;

    /** 大小 */
    private Long size;

    /** 最后修改日期 */
    private Date lastModified;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getIsDirectory() {
        return isDirectory;
    }

    public void setIsDirectory(Boolean isDirectory) {
        this.isDirectory = isDirectory;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

}