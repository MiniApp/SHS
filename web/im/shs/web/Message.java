package im.shs.web;

import im.shs.web.enums.MessageTypeEnum;

/**
 * @class : Message
 * @description: 消息
 * 
 * @author suhao
 * @date 2014年7月12日 下午10:29:03
 * @version 1.0
 */
public class Message {

	/** 类型 */
	protected MessageTypeEnum type;

	/** 内容 */
	protected String cont;

	public Message() {

	}

	/**
	 * @param type
	 *            类型
	 * @param cont
	 *            内容
	 */
	public Message(MessageTypeEnum type, String cont) {
		this.type = type;
		this.cont = cont;
	}

	public MessageTypeEnum getType() {
		return type;
	}

	public void setType(MessageTypeEnum type) {
		this.type = type;
	}

	public String getCont() {
		return cont;
	}

	public void setCont(String cont) {
		this.cont = cont;
	}

	/**
	 * 重写toString方法
	 * 
	 * @return 内容
	 */
	@Override
	public String toString() {
		return getCont();
	}

	/**
	 * 返回成功消息
	 * 
	 * @param cont
	 *            内容
	 * @return 成功消息
	 */
	public static Message success(String cont) {
		return new Message(MessageTypeEnum.success, cont);
	}

	/**
	 * 返回警告消息
	 * 
	 * @param cont
	 *            内容
	 * @return 警告消息
	 */
	public static Message warn(String cont) {
		return new Message(MessageTypeEnum.warn, cont);
	}

	/**
	 * 返回错误消息
	 * 
	 * @param cont
	 *            内容
	 * @return 错误消息
	 */
	public static Message error(String cont) {
		return new Message(MessageTypeEnum.error, cont);
	}

}