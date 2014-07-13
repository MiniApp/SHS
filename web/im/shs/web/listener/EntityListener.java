package im.shs.web.listener;

import im.shs.entity.BaseEntity;

import java.util.Date;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

/**
 * @class : EntityListener
 * @description: 创建日期、修改日期处理
 *
 * @author suhao
 * @date 2014年7月13日 上午10:45:28
 * @version 1.0
 */
public class EntityListener {

    /**
     * 保存前处理
     * 
     * @param entity
     *            基类
     */
    @PrePersist
    public void prePersist(BaseEntity entity) {
        entity.setCreateDate(new Date());
        entity.setModifyDate(new Date());
    }

    /**
     * 更新前处理
     * 
     * @param entity
     *            基类
     */
    @PreUpdate
    public void preUpdate(BaseEntity entity) {
        entity.setModifyDate(new Date());
    }

}