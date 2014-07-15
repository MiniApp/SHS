package im.shs.web;

import im.shs.web.enums.SequencerDirectionEnum;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

/**
 * @class : Sequencer
 * @description: 定序器
 *
 * @author suhao
 * @date 2014年7月14日 下午9:40:39
 * @version 1.0
 */
public class Sequencer implements Serializable {

    /** serialVersionUID */
    private static final long serialVersionUID = -3145438130165445234L;

    /** 属性 */
    private String property;

    /** 方向 */
    private SequencerDirectionEnum direction;

    /**
     * @param property
     *            属性
     * @param direction
     *            方向
     */
    public Sequencer(String property, SequencerDirectionEnum direction) {
        this.property = property;
        this.direction = direction;
    }

    /**
     * 生成递增定序器
     * 
     * @param property
     *            属性
     * @return 递增定序器
     */
    public static Sequencer asc(String property) {
        return new Sequencer(property, SequencerDirectionEnum.asc);
    }

    /**
     * 生成递减定序器
     * 
     * @param property
     *            属性
     * @return 递减定序器
     */
    public static Sequencer desc(String property) {
        return new Sequencer(property, SequencerDirectionEnum.desc);
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public SequencerDirectionEnum getDirection() {
        return direction;
    }

    public void setDirection(SequencerDirectionEnum direction) {
        this.direction = direction;
    }

    /**
     * 生成HashCode
     * 
     * @return HashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getProperty()).append(getDirection()).toHashCode();
    }

    /**
     * 判断是否相等
     * 
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (isEmpty() || obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Sequencer sequencer = (Sequencer) obj;
        if (sequencer.isEmpty()) {
            return false;
        }
        return new EqualsBuilder().append(getProperty(), sequencer.getProperty())
                .append(getDirection(), sequencer.getDirection()).isEquals();
    }

    /**
     * 判断是否为空
     * 
     * @return 是否为空
     */
    public boolean isEmpty() {
        return StringUtils.isBlank(getProperty()) || getDirection() == null;
    }

}