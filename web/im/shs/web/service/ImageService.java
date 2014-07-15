package im.shs.web.service;

import im.shs.web.elem.ImageElem;

/**
 * Service - 图片
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public interface ImageService {

    /**
     * 生成图片
     * 
     * @param image
     *            图片
     */
    void build(ImageElem image);

}