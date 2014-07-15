package im.shs.web.service;

import im.shs.web.FileInfo;
import im.shs.web.enums.FileOrderMethodEnum;
import im.shs.web.enums.FileTypeEnum;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

/**
 * @class : FileService
 * @description: 文件
 *
 * @author suhao
 * @date 2014年7月13日 上午1:21:04
 * @version 1.0
 */
public interface FileService {

    /**
     * 文件验证
     * 
     * @param fileType
     *            文件类型
     * @param multipartFile
     *            上传文件
     * @return 文件验证是否通过
     */
    boolean verify(FileTypeEnum fileType, MultipartFile multipartFile);

    /**
     * 文件上传
     * 
     * @param fileType
     *            文件类型
     * @param multipartFile
     *            上传文件
     * @param async
     *            是否异步
     * @return 访问URL
     */
    String upload(FileTypeEnum fileType, MultipartFile multipartFile, boolean async);

    /**
     * 文件上传（异步）
     * 
     * @param fileType
     *            文件类型
     * @param multipartFile
     *            上传文件
     * @return 访问URL
     */
    String upload(FileTypeEnum fileType, MultipartFile multipartFile);

    /**
     * 文件上传至本地
     * 
     * @param fileType
     *            文件类型
     * @param multipartFile
     *            上传文件
     * @return 路径
     */
    String uploadLocal(FileTypeEnum fileType, MultipartFile multipartFile);

    /**
     * 文件浏览
     * 
     * @param path
     *            浏览路径
     * @param fileType
     *            文件类型
     * @param orderMethod
     *            排序方式
     * @return 文件信息
     */
    List<FileInfo> browser(String path, FileTypeEnum fileType, FileOrderMethodEnum orderMethod);

    /**
     * 删除本地文件
     * 
     * @param filePath
     *            文件路径
     * @return 删除状态
     */
    boolean deleteLocal(String filePath);

}