package im.shs.base.util;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.Assert;

/**    
 *         
 * Class Name：
 *			DateUtil    
 * Description：    
 *			日期处理工具类
 * @Author：	Administrator    
 * @Date：	2013-8-28 下午1:52:28    
 * @version	
 *     
 */
public class DateUtil {
    /* 日期范围--日 */
    public static final int DAY = 1129 + 2;

    /* 日期范围--周 */
    public static final int WEEK = 1129 + 3;

    /* 日期范围--月份 */
    public static final int MONTH = 1129 + 4;

    /* 日期范围--季度 */
    public static final int SEASON = 1129 + 5;

    /* 日期范围--年份 */
    public static final int YEAR = 1129 + 6;

    /* 日期范围--返回MAP的KEY--起始日期 */
    public static final String BEGIN = "begin";

    /* 日期范围--返回MAP的KEY--结束日期 */
    public static final String END = "end";

    /* 日志记录器 */
    protected static final Log logger = LogFactory.getLog(DateUtil.class);

    /**
     * 获取当前日期
     * 
     * @return Date
     */
    public static Date getNow() {
        Date currentTime = new Date();
        return currentTime;
    }

    /**
     * 获取上月末时间
     * 
     * @return Date
     */
    public static Date getLastMonthEndDate() {
        // 取得系统当前时间
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        // 取得系统当前时间所在月第一天时间对象
        cal.set(Calendar.DAY_OF_MONTH, 1);
        // 日期减一,取得上月最后一天时间对象
        cal.add(Calendar.DAY_OF_MONTH, -1);
        return cal.getTime();
    }

    /**
     * 获取年初时间
     * 
     * @return Date
     */
    public static Date getYearBeginDate() {
        // 取得系统当前时间
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        return strToDate(cal.get(Calendar.YEAR) + "-01-01", "yyyy-MM-dd");
    }

    /**
     * 获得基于给定的基准日期上的日期范围. 范围可以包括:当日,当周,当月,当季度或者当年
     * 
     * @param ref
     *            : 日期实例,the benchmark of the range.
     * @param range
     *            : 在作用于ref给定日期的范围,取值有: DAY, WEEK, MONTH, SEASON 或 YEAR.
     * 
     * @return 返回一个MAP对象,包括两个日期类型的值, (即:给定范围的起始/结束日期): 以 BEGIN 以及 END 为KEY.
     */
    @SuppressWarnings({ "rawtypes", "unchecked", "unused" })
    public static Map getDateRange(Date ref, int range) {
        Map m = new HashMap();
        Calendar cal = Calendar.getInstance();
        cal.setTime(ref);

        // this day
        if (range == DAY) {
            m.put(BEGIN, cal.getTime());
            m.put(END, cal.getTime());

            // this week
        } else if (range == WEEK) {
            int cnt = 0;
            for (; cal.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY; cnt++) {
                cal.add(Calendar.DATE, -1);
            }
            m.put(BEGIN, cal.getTime());
            cal.add(Calendar.DATE, cnt);
            while (cal.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY) {
                cal.add(Calendar.DATE, 1);
            }
            m.put(END, cal.getTime());

            // this month
        } else if (range == MONTH) {
            cal.set(Calendar.DATE, 1);
            m.put(BEGIN, cal.getTime());

            int month = cal.get(Calendar.MONTH) + 1;
            switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                cal.set(Calendar.DATE, 31);
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                cal.set(Calendar.DATE, 30);
                break;
            case 2:
                int year = cal.get(Calendar.YEAR);
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                    cal.set(Calendar.DATE, 29);
                } else {
                    cal.set(Calendar.DATE, 28);
                }
                break;
            }
            m.put(END, cal.getTime());

            // this season
        } else if (range == SEASON) {
            int year = cal.get(Calendar.YEAR);
            int month = cal.get(Calendar.MONTH);
            switch (month / 3) {
            case 0: // 01-01 to 03-31
                cal.set(Calendar.MONTH, 0);
                cal.set(Calendar.DATE, 1);
                m.put(BEGIN, cal.getTime());
                cal.set(Calendar.MONTH, 2);
                cal.set(Calendar.DATE, 31);
                m.put(END, cal.getTime());
                break;
            case 1: // 04-01 to 06-30
                cal.set(Calendar.MONTH, 3);
                cal.set(Calendar.DATE, 1);
                m.put(BEGIN, cal.getTime());
                cal.set(Calendar.MONTH, 5);
                cal.set(Calendar.DATE, 30);
                m.put(END, cal.getTime());

                break;
            case 2: // 07-01 to 09-30
                cal.set(Calendar.MONTH, 6);
                cal.set(Calendar.DATE, 1);
                m.put(BEGIN, cal.getTime());
                cal.set(Calendar.MONTH, 8);
                cal.set(Calendar.DATE, 30);
                m.put(END, cal.getTime());
                break;
            case 3: // 10-01 to 12-31
                cal.set(Calendar.MONTH, 9);
                cal.set(Calendar.DATE, 1);
                m.put(BEGIN, cal.getTime());
                cal.set(Calendar.MONTH, 11);
                cal.set(Calendar.DATE, 31);
                m.put(END, cal.getTime());
                break;
            }

            // this year
        } else if (range == YEAR) {
            cal.set(Calendar.MONTH, 0);
            cal.set(Calendar.DATE, 1);
            m.put(BEGIN, cal.getTime());
            cal.set(Calendar.MONTH, 11);
            cal.set(Calendar.DATE, 31);
            m.put(END, cal.getTime());

            // default is DAY
        } else {
            m.put(BEGIN, cal.getTime());
            m.put(END, cal.getTime());
        }

        setTime(m); // optional
        return m;
    }

    /**
     * 获得基于给定的基准日期上的日期范围. 范围可以包括:当日,当周,当月,当季度或者当年
     * 
     * @param ref
     *            "yyyy-mm-dd"格式的日期字符串,the benchmark of the range.
     * 
     * @param range
     *            在作用于ref给定日期的范围,取值有: DAY, WEEK, MONTH, SEASON 或 YEAR.
     * 
     * @return 返回一个MAP对象,包括两个日期类型的值, (即:给定范围的起始/结束日期): 以 BEGIN 以及 END 为KEY.
     *         日期字符串如果不匹配"yyyy?MM?dd"格式,则返回null.("?"代表任意单个字符)
     */
    @SuppressWarnings("rawtypes")
    public static Map getDateRange(String ref, int range) {

        int year = Integer.parseInt(ref.substring(0, 4));
        int month = Integer.parseInt(ref.substring(5, 7));
        int day = Integer.parseInt(ref.substring(8, 10));

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month - 1);
        cal.set(Calendar.DATE, day);
        Date d = cal.getTime();
        return getDateRange(d, range);
    }

    /**
     * convert a Date type variable to String type, applying the specified
     * format.
     * 
     * @param date
     * @param format
     *            : 指定的转换格式,e.g."yyyy-MM-dd"
     * @return
     */
    public static String dateToStr(Date date, String format) {
        if (date == null)
            return "";
        SimpleDateFormat df = new SimpleDateFormat(format);
        return df.format(date);
    }

    /**
     * convert a Date type variable to String, applying the "yyyy-MM-dd" format.
     * 
     * @param date
     * @return
     */
    public static String dateToStr(java.util.Date date) {
        return dateToStr(date, "yyyy-MM-dd");
    }

    /**
     * convert a Date type variable to String, applying the "yyyy-MM-dd" format.
     * 
     * @param date
     * @return
     */
    public static String dateToStrYYYMMDD(java.util.Date date) {
        return dateToStr(date, "yyyyMMdd");
    }

    /**
     * 从字符串类型的日期转换为日期类型. 仅支持 "yyyy?MM?dd" 格式的日期字符串,"?"代表任意字符 如果不匹配该格式,则返回null.
     * 
     * @param strDate
     *            日期串
     * @return java.util.Date对象实例
     */
    public static java.util.Date strToDate(String strDate) {
        Assert.hasText(strDate, "必须传入一个日期字符串参数.");
        int year = Integer.parseInt(strDate.substring(0, 4));
        int month = Integer.parseInt(strDate.substring(5, 7));
        int day = Integer.parseInt(strDate.substring(8, 10));

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month - 1);
        cal.set(Calendar.DATE, day);

        return cal.getTime();
    }

    /**
     * 从字符串类型的日期转换为日期类型. 日期字符串格式由给定的pattern参数指定 如果不匹配该格式,则返回null.
     * 
     * @param strDate
     *            日期字符串
     * @param pattern
     *            日期格式匹配模式
     * @return java.util.Date对象实例
     */
    public static java.util.Date strToDate(String strDate, String pattern) {
        Assert.hasText(strDate, "必须传入一个日期字符串参数.");
        Assert.hasText(pattern, "必须传入一个日期格式匹配模式.");

        SimpleDateFormat df = new SimpleDateFormat();
        df.applyPattern(pattern);
        return df.parse(strDate, new ParsePosition(0));
    }

    /**
     * set the begin time of the date range to 00:00:00, and the end time of the
     * date range to 23:59:59.
     * 
     * @param m
     *            : the date range map.
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private static void setTime(Map m) {
        Calendar cal = Calendar.getInstance();
        cal.setTime((Date) m.get(BEGIN));

        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        // put the start of the date range to Map
        m.put(BEGIN, cal.getTime());

        cal.setTime((Date) m.get(END));
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 999);

        // put the end of the date range to Map
        m.put(END, cal.getTime());
    }

    /**
     * 在日期范围的MAP中获取起始日期
     * 
     * @param range
     *            : the date range map. Map必须应是由本类的getDateRange返回的MAP
     * 
     * @return 返回起始日期 如果MAP为空,或没有起始日期的KEY,则返回NULL.
     */
    @SuppressWarnings("rawtypes")
    public static Date getBeginOfRange(Map range) {
        if (range == null || range.isEmpty()) {
            return null;
        }

        return (Date) range.get(DateUtil.BEGIN);
    }

    /**
     * 在日期范围的MAP中获取结束日期
     * 
     * @param range
     *            : the date range map. Map必须应是由本类的getDateRange返回的MAP
     * 
     * @return 返回结束日期 如果MAP为空,或没有结束日期的KEY,则返回NULL.
     * 
     */
    @SuppressWarnings("rawtypes")
    public static Date getEndOfRange(Map range) {
        if (range == null || range.isEmpty())
            return null;

        return (Date) range.get(DateUtil.END);
    }

    public static void main(String[] args) {
        Date date = DateUtil.getNow();
        for (int i = 0; i < 3; i++) {
            System.out.println(DateUtil.dateToStr(date, "yyyy-MM-dd HH:mm:ss.SSS"));

            Date beginDate = DateUtil.getBeginOfRange(DateUtil.getDateRange(date, DateUtil.DAY));
            Date endDate = DateUtil.getEndOfRange(DateUtil.getDateRange(date, DateUtil.DAY));
            System.out.println(DateUtil.dateToStr(beginDate, "yyyy-MM-dd HH:mm:ss.SSS"));

            System.out.println(DateUtil.dateToStr(endDate, "yyyy-MM-dd HH:mm:ss.SSS"));
        }
    }

}
