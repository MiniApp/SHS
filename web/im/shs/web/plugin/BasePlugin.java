package im.shs.web.plugin;

import im.shs.web.entity.PluginConfigEntity;
import im.shs.web.plugin.payment.PaymentPlugin;
import im.shs.web.service.PluginConfigService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

/**
 * @class : BasePlugin
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月14日 下午10:54:28
 * @version 1.0
 */
public abstract class BasePlugin implements Comparable<BasePlugin> {

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
     * 获取安装URL
     * 
     * @return 安装URL
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
     * 获取排序
     * 
     * @return 排序
     */
    public Integer getOrder() {
        PluginConfigEntity pPluginConfig = getPluginConfig();
        return pPluginConfig != null ? pPluginConfig.getOrder() : null;
    }

    /**
     * GET请求
     * 
     * @param url
     *            URL
     * @param parameterMap
     *            请求参数
     * @return 返回结果
     */
    protected String get(String url, Map<String, Object> parameterMap) {
        Assert.hasText(url);
        String result = null;
        HttpClient httpClient = new DefaultHttpClient();
        try {
            List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
            if (parameterMap != null) {
                for (Entry<String, Object> entry : parameterMap.entrySet()) {
                    String name = entry.getKey();
                    String value = ConvertUtils.convert(entry.getValue());
                    if (StringUtils.isNotBlank(name)) {
                        nameValuePairs.add(new BasicNameValuePair(name, value));
                    }
                }
            }
            HttpGet httpGet = new HttpGet(url + (StringUtils.contains(url, "?") ? "&" : "?")
                    + EntityUtils.toString(new UrlEncodedFormEntity(nameValuePairs, "UTF-8")));
            HttpResponse httpResponse = httpClient.execute(httpGet);
            HttpEntity httpEntity = httpResponse.getEntity();
            result = EntityUtils.toString(httpEntity);
            EntityUtils.consume(httpEntity);
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            httpClient.getConnectionManager().shutdown();
        }
        return result;
    }

    /**
     * POST请求
     * 
     * @param url
     *            URL
     * @param parameterMap
     *            请求参数
     * @return 返回结果
     */
    protected String post(String url, Map<String, Object> parameterMap) {
        Assert.hasText(url);
        String result = null;
        HttpClient httpClient = new DefaultHttpClient();
        try {
            HttpPost httpPost = new HttpPost(url);
            List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
            if (parameterMap != null) {
                for (Entry<String, Object> entry : parameterMap.entrySet()) {
                    String name = entry.getKey();
                    String value = ConvertUtils.convert(entry.getValue());
                    if (StringUtils.isNotBlank(name)) {
                        nameValuePairs.add(new BasicNameValuePair(name, value));
                    }
                }
            }
            httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs, "UTF-8"));
            HttpResponse httpResponse = httpClient.execute(httpPost);
            HttpEntity httpEntity = httpResponse.getEntity();
            result = EntityUtils.toString(httpEntity);
            EntityUtils.consume(httpEntity);
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            httpClient.getConnectionManager().shutdown();
        }
        return result;
    }

    /**
     * 连接Map值
     * 
     * @param map
     *            Map
     * @param prefix
     *            前缀
     * @param suffix
     *            后缀
     * @param separator
     *            连接符
     * @param ignoreEmptyValue
     *            忽略空值
     * @param ignoreKeys
     *            忽略Key
     * @return 字符串
     */
    protected String joinValue(Map<String, Object> map, String prefix, String suffix, String separator,
            boolean ignoreEmptyValue, String... ignoreKeys) {
        List<String> list = new ArrayList<String>();
        if (map != null) {
            for (Entry<String, Object> entry : map.entrySet()) {
                String key = entry.getKey();
                String value = ConvertUtils.convert(entry.getValue());
                if (StringUtils.isNotBlank(key) && !ArrayUtils.contains(ignoreKeys, key)
                        && (!ignoreEmptyValue || StringUtils.isNotBlank(value))) {
                    list.add(value != null ? value : "");
                }
            }
        }
        return (prefix != null ? prefix : "") + StringUtils.join(list, separator) + (suffix != null ? suffix : "");
    }

    /**
     * 连接Map键值对
     * 
     * @param map
     *            Map
     * @param prefix
     *            前缀
     * @param suffix
     *            后缀
     * @param separator
     *            连接符
     * @param ignoreEmptyValue
     *            忽略空值
     * @param ignoreKeys
     *            忽略Key
     * @return 字符串
     */
    protected String joinKeyValue(Map<String, Object> map, String prefix, String suffix, String separator,
            boolean ignoreEmptyValue, String... ignoreKeys) {
        List<String> list = new ArrayList<String>();
        if (map != null) {
            for (Entry<String, Object> entry : map.entrySet()) {
                String key = entry.getKey();
                String value = ConvertUtils.convert(entry.getValue());
                if (StringUtils.isNotBlank(key) && !ArrayUtils.contains(ignoreKeys, key)
                        && (!ignoreEmptyValue || StringUtils.isNotBlank(value))) {
                    list.add(key + "=" + (value != null ? value : ""));
                }
            }
        }
        return (prefix != null ? prefix : "") + StringUtils.join(list, separator) + (suffix != null ? suffix : "");
    }

    /**
     * 连接Map键值对
     * 
     * @param map
     *            Map
     * @param prefix
     *            前缀
     * @param suffix
     *            后缀
     * @param separator
     *            分隔符
     * @param keyValueSeparator
     *            键值分隔符
     * @param valuePrefix
     *            value前缀
     * @param valueSuffix
     *            value后缀
     * @param ignoreEmptyValue
     *            忽略空值
     * @param ignoreKeys
     *            忽略Key
     * @return 字符串
     */
    protected String joinKeyValue(Map<String, Object> map, String prefix, String suffix, String separator,
            String keyValueSeparator, String valuePrefix, String valueSuffix, boolean ignoreEmptyValue,
            String... ignoreKeys) {
        List<String> list = new ArrayList<String>();
        if (map != null) {
            for (Entry<String, Object> entry : map.entrySet()) {
                String key = entry.getKey();
                String value = ConvertUtils.convert(entry.getValue());
                if (StringUtils.isNotBlank(key) && !ArrayUtils.contains(ignoreKeys, key)
                        && (!ignoreEmptyValue || StringUtils.isNotBlank(value))) {
                    list.add(key + keyValueSeparator + (valuePrefix != null ? valuePrefix : "")
                            + (value != null ? value : "") + (valueSuffix != null ? valueSuffix : ""));
                }
            }
        }
        return (prefix != null ? prefix : "") + StringUtils.join(list, separator) + (suffix != null ? suffix : "");
    }

    /**
     * 生成HashCode
     * 
     * @return HashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getId()).toHashCode();
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
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        PaymentPlugin other = (PaymentPlugin) obj;
        return new EqualsBuilder().append(getId(), other.getId()).isEquals();
    }

    /**
     * 比较
     * 
     * @param basePlugin
     *            插件
     * @return 比较结果
     */
    @Override
    public int compareTo(BasePlugin plugin) {
        return new CompareToBuilder().append(getOrder(), plugin.getOrder()).append(getId(), plugin.getId())
                .toComparison();
    }

}