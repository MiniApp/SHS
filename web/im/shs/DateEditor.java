package im.shs;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;

/**
 * @class : DateEditor
 * @description: 日期类型转换
 *
 * @author suhao
 * @date 2014年7月13日 上午12:15:56
 * @version 1.0
 */
public class DateEditor extends PropertyEditorSupport {

    /** 默认日期格式 */
    private static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

    /** 是否将空转换为null */
    private boolean emptyAsNull;

    /** 日期格式 */
    private String dateFormat = DEFAULT_DATE_FORMAT;

    /**
     * @param emptyAsNull
     *            是否将空转换为null
     */
    public DateEditor(boolean emptyAsNull) {
        this.emptyAsNull = emptyAsNull;
    }

    /**
     * @param emptyAsNull
     *            是否将空转换为null
     * @param dateFormat
     *            日期格式
     */
    public DateEditor(boolean emptyAsNull, String dateFormat) {
        this.emptyAsNull = emptyAsNull;
        this.dateFormat = dateFormat;
    }

    /**
     * 重写获取字符串
     * 
     * @return 日期
     */
    @Override
    public String getAsText() {
        Date value = (Date) getValue();
        return value != null ? new SimpleDateFormat(dateFormat).format(value) : "";
    }

    /**
     * 重写设置字符串
     * 
     * @param text
     *            日期字符串
     */
    @Override
    public void setAsText(String text) {
        if (text == null) {
            setValue(null);
        } else {
            if (emptyAsNull && StringUtils.isBlank(text)) {
                setValue(null);
            } else {
                try {
                    setValue(DateUtils.parseDate(text, CommonAttrs.DATE_PATTERNS));
                } catch (ParseException e) {
                    setValue(null);
                }
            }
        }
    }

}