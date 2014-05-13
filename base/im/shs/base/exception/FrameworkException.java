package im.shs.base.exception;

public class FrameworkException extends RuntimeException {

	private static final long serialVersionUID = -6282072643231698629L;
	/**
	 * 异常的错误码
	 */
	protected String code;

	/**
	 * 根据错误码生成异常对象
	 * 如果在异常信息配置中找到对应的错误码信息，则异常的message为配置中的信息
	 * 否则，为输入的错误码
	 * @param code
	 */
	public FrameworkException(String code, Throwable ex) {
		super(ExceptionService.code2Message(code), ex);
		this.code = code;
	}

	public FrameworkException(String code) {
		super(ExceptionService.code2Message(code));
		this.code = code;
	}

	/**
	 * Construct a <code>NestedCheckedException</code> with the specified
	 * detail message and nested exception.
	 * 
	 * @param code
	 *            错误代码
	 * @param msg
	 *            the detail message
	 * @param ex
	 *            the nested exception
	 */
	public FrameworkException(String code, String msg, Throwable ex) {
		super(ExceptionService.code2Message(code, msg), ex);
		this.code = code;
	}

	public FrameworkException(String code, String msg) {
		this(code, msg, null);
	}

	public FrameworkException(Throwable ex, String code, String... msgArgs) {
		super(ExceptionService.code2Message(code, msgArgs), ex);
		this.code = code;
	}

	public FrameworkException(String code, String... msgArgs) {
		this(null, code, msgArgs);
	}

	public FrameworkException(Throwable cause) {
		super(cause);
	}

	/**
	 * 获取完整的异常信息
	 */
	public String getMessage() {
		return super.getMessage();
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
