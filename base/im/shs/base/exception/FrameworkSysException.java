package im.shs.base.exception;

public class FrameworkSysException extends FrameworkException {

	private static final long serialVersionUID = 7593800286646153270L;

	public FrameworkSysException(String code, Throwable ex) {
		super(code, ex);
	}

	public FrameworkSysException(String code) {
		super(code);
	}

	public FrameworkSysException(String code, String msg, Throwable ex) {
		super(code, msg, ex);
	}

	public FrameworkSysException(String code, String msg) {
		this(code, msg, null);
	}

	public FrameworkSysException(Throwable ex, String code, String... msgArgs) {
		super(ex, code, msgArgs);
	}

	public FrameworkSysException(String code, String... msgArgs) {
		this(null, code, msgArgs);
	}
}
