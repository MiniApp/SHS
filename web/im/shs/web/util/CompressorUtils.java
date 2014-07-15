package im.shs.web.util;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import com.yahoo.platform.yui.compressor.CssCompressor;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

/**
 * Utils - 压缩
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public class CompressorUtils {

    private static int linebreakpos = -1;

    private static boolean munge = true;

    private static boolean verbose = false;

    private static boolean preserveAllSemiColons = false;

    private static boolean disableOptimizations = false;

    /**
     * 文件压缩
     * 
     * @param srcFilePath
     *            源文件路径
     * @param destFilePath
     *            目标文件路径
     * @throws Exception
     *             可能抛出的异常
     */
    public static void FileCompress(String srcFilePath, String destFilePath) throws Exception {
        if (StringUtils.isBlank(srcFilePath) || StringUtils.isBlank(destFilePath)) {
            return;
        }
        // 文件路径相同时
        if (StringUtils.equalsIgnoreCase(srcFilePath, destFilePath)) {
            FileCompress(srcFilePath);
        }
        // JS文件
        if (StringUtils.endsWith(srcFilePath, ".js")) {
            JSFileCompress(srcFilePath, destFilePath);
        }
        // CSS文件
        else if (StringUtils.endsWith(srcFilePath, ".css")) {
            CSSFileCompress(srcFilePath, destFilePath);
        }
    }

    /**
     * 文件压缩
     * 
     * @param filePath
     *            文件路径
     * @throws Exception
     *             可能抛出的异常
     */
    public static void FileCompress(String filePath) throws Exception {
        if (StringUtils.isBlank(filePath)) {
            return;
        }
        // JS文件
        if (StringUtils.endsWith(filePath, ".js")) {
            JSFileCompress(filePath);
        }
        // CSS文件
        else if (StringUtils.endsWith(filePath, ".css")) {
            CSSFileCompress(filePath);
        }
    }

    /**
     * JS文件压缩
     * 
     * @param srcFilePath
     *            源文件路径
     * @param destFilePath
     *            目标文件路径
     * @throws Exception
     *             可能抛出的异常
     */
    public static void JSFileCompress(String srcFilePath, String destFilePath) throws Exception {
        File srcFile = null;
        File destFile = null;
        Reader in = null;
        Writer out = null;
        try {
            srcFile = new File(srcFilePath);
            if (!srcFile.exists()) {
                return;
            }
            destFile = new File(destFilePath);
            if (!destFile.exists()) {
                destFile.createNewFile();
            }
            in = new FileReader(srcFile);
            out = new FileWriter(destFile);

            JavaScriptCompressor jscompressor = new JavaScriptCompressor(in, new ErrorReporter() {

                /**
                 * 警告
                 */
                public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
                    if (line < 0) {
                        System.err.println("\n[WARNING] " + message);
                    } else {
                        System.err.println("\n[WARNING] " + line + ':' + lineOffset + ':' + message);
                    }
                }

                /**
                 * 错误
                 */
                public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
                    if (line < 0) {
                        System.err.println("\n[ERROR] " + message);
                    } else {
                        System.err.println("\n[ERROR] " + line + ':' + lineOffset + ':' + message);
                    }
                }

                /**
                 * 运行时异常
                 */
                public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource,
                        int lineOffset) {
                    error(message, sourceName, line, lineSource, lineOffset);
                    return new EvaluatorException(message);
                }

            });

            // 文件压缩
            jscompressor.compress(out, linebreakpos, munge, verbose, preserveAllSemiColons, disableOptimizations);
        } finally {
            IOUtils.closeQuietly(out);
            IOUtils.closeQuietly(in);
        }
    }

    /**
     * JS文件压缩
     * 
     * @param filePath
     *            文件路径
     * @throws Exception
     *             可能抛出的异常
     */
    public static void JSFileCompress(String filePath) throws Exception {
        File file = null;
        File tempFile = null;
        Reader in = null;
        Writer out = null;
        try {
            file = new File(filePath);
            if (!file.exists()) {
                return;
            }
            tempFile = new File(filePath + ".tempFile");
            if (!tempFile.exists()) {
                tempFile.createNewFile();
            }
            in = new FileReader(file);
            out = new FileWriter(tempFile);

            JavaScriptCompressor jscompressor = new JavaScriptCompressor(in, new ErrorReporter() {

                /**
                 * 警告
                 */
                public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
                    if (line < 0) {
                        System.err.println("\n[WARNING] " + message);
                    } else {
                        System.err.println("\n[WARNING] " + line + ':' + lineOffset + ':' + message);
                    }
                }

                /**
                 * 错误
                 */
                public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
                    if (line < 0) {
                        System.err.println("\n[ERROR] " + message);
                    } else {
                        System.err.println("\n[ERROR] " + line + ':' + lineOffset + ':' + message);
                    }
                }

                /**
                 * 运行时异常
                 */
                public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource,
                        int lineOffset) {
                    error(message, sourceName, line, lineSource, lineOffset);
                    return new EvaluatorException(message);
                }

            });

            // 文件压缩
            jscompressor.compress(out, linebreakpos, munge, verbose, preserveAllSemiColons, disableOptimizations);
        } finally {
            IOUtils.closeQuietly(out);
            IOUtils.closeQuietly(in);
            if (tempFile != null) {
                FileUtils.copyFile(tempFile, file);
                FileUtils.deleteQuietly(tempFile);
            }
        }
    }

    /**
     * CSS文件压缩
     * 
     * @param srcFilePath
     *            源文件路径
     * @param destFilePath
     *            目标文件路径
     * @throws Exception
     *             可能抛出的异常
     */
    public static void CSSFileCompress(String srcFilePath, String destFilePath) throws Exception {
        File srcFile = null;
        File destFile = null;
        Reader in = null;
        Writer out = null;
        try {
            srcFile = new File(srcFilePath);
            if (!srcFile.exists()) {
                return;
            }
            destFile = new File(destFilePath);
            if (!destFile.exists()) {
                destFile.createNewFile();
            }
            in = new FileReader(srcFile);
            out = new FileWriter(destFile);
            // 文件压缩
            CssCompressor csscompressor = new CssCompressor(in);
            csscompressor.compress(out, linebreakpos);
        } finally {
            IOUtils.closeQuietly(out);
            IOUtils.closeQuietly(in);
        }
    }

    /**
     * CSS文件压缩
     * 
     * @param filePath
     *            文件路径
     * @throws Exception
     *             可能抛出的异常
     */
    public static void CSSFileCompress(String filePath) throws Exception {
        File file = null;
        File tempFile = null;
        Reader in = null;
        Writer out = null;
        try {
            file = new File(filePath);
            if (!file.exists()) {
                return;
            }
            tempFile = new File(filePath + ".tempFile");
            if (!tempFile.exists()) {
                tempFile.createNewFile();
            }
            in = new FileReader(file);
            out = new FileWriter(tempFile);
            // 文件压缩
            CssCompressor csscompressor = new CssCompressor(in);
            csscompressor.compress(out, linebreakpos);
        } finally {
            IOUtils.closeQuietly(out);
            IOUtils.closeQuietly(in);
            if (tempFile != null) {
                FileUtils.copyFile(tempFile, file);
                FileUtils.deleteQuietly(tempFile);
            }
        }

    }

}