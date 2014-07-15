package im.shs.web.template.method;

import im.shs.web.util.DateTimeUtil;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Component;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

/**
 * @class : DateUtilMethod
 * @description: 模板方法 - 日期工具
 *
 * @author suhao
 * @date 2014年7月13日 上午1:01:26
 * @version 1.0
 */
@Component("dateUtilMethod")
public class DateUtilMethod implements TemplateMethodModelEx {

    @SuppressWarnings("rawtypes")
    public Object exec(List arguments) throws TemplateModelException {
        if (arguments != null && arguments.size() > 0) {

            // 获取类型
            String type = arguments.get(0).toString();
            // 日期
            Date date = null;
            try {
                date = DateTimeUtil.parseToDate(arguments.get(1).toString());
            } catch (Exception e) {
                e.printStackTrace();
            }

            // 添加天数
            if (StringUtils.equals(type, "addDays") && arguments.size() > 1) {
                Integer days = Integer.valueOf(arguments.get(2).toString());
                return new SimpleScalar(DateTimeUtil.formatDateTimetoString(DateUtils.addDays(date, days)));
            }
            // 添加月数
            else if (StringUtils.equals(type, "addMonths") && arguments.size() > 1) {
                Integer months = Integer.valueOf(arguments.get(2).toString());
                return new SimpleScalar(DateTimeUtil.formatDateTimetoString(DateUtils.addMonths(date, months)));
            }
            // 时间差
            else if (StringUtils.equals(type, "dynDiff") && arguments.size() > 1) {
                Date endDate = null;
                try {
                    endDate = DateTimeUtil.parseToDate(arguments.get(2).toString());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return new SimpleScalar(difference(date, endDate));
            }
        }
        return null;
    }

    /**
     * 时间差
     * 
     * @param startTime
     *            开始时间
     * @param endTime
     *            结束时间
     * @return 返回时间差
     */
    private String difference(Date startTime, Date endTime) {
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        start.setTime(startTime);
        end.setTime(endTime);

        long startMs = start.getTimeInMillis();
        long endMs = end.getTimeInMillis();
        long l_differ = endMs - startMs;// 毫秒数

        long second_differ = l_differ / 1000;// 秒

        long year_differ = second_differ / (60 * 60 * 24 * 365);// 得到年数
        long month_differ = second_differ / (60 * 60 * 24 * 30);// 得到月数

        long day_differ = second_differ / (60 * 60 * 24);// 得到天数
        second_differ = second_differ - day_differ * 60 * 60 * 24;// 天
        long hour_differ = second_differ / (60 * 60);// 时
        second_differ = second_differ - hour_differ * 60 * 60;
        long minute_differ = second_differ / 60;// 分
        second_differ = second_differ - minute_differ * 60;

        StringBuffer str = new StringBuffer();
        if (year_differ > 0) {
            str.append(year_differ + "年");
        }
        if (month_differ > 0) {
            str.append(month_differ + "月");
        }
        if (day_differ > 0) {
            str.append(day_differ + "天");
        }
        if (hour_differ > 0) {
            str.append(hour_differ + "时");
        }
        if (minute_differ > 0) {
            str.append(minute_differ + "分");
        }
        if (second_differ > 0) {
            str.append(second_differ + "秒");
        }

        return str.toString();
    }

}
