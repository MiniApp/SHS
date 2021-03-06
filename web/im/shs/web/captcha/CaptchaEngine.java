package im.shs.web.captcha;

import java.awt.Color;
import java.awt.Font;

import org.springframework.core.io.ClassPathResource;

import com.octo.captcha.component.image.backgroundgenerator.BackgroundGenerator;
import com.octo.captcha.component.image.backgroundgenerator.FileReaderRandomBackgroundGenerator;
import com.octo.captcha.component.image.color.RandomListColorGenerator;
import com.octo.captcha.component.image.fontgenerator.FontGenerator;
import com.octo.captcha.component.image.fontgenerator.RandomFontGenerator;
import com.octo.captcha.component.image.textpaster.DecoratedRandomTextPaster;
import com.octo.captcha.component.image.textpaster.TextPaster;
import com.octo.captcha.component.image.textpaster.textdecorator.TextDecorator;
import com.octo.captcha.component.image.wordtoimage.ComposedWordToImage;
import com.octo.captcha.component.word.wordgenerator.RandomWordGenerator;
import com.octo.captcha.engine.image.ListImageCaptchaEngine;
import com.octo.captcha.image.gimpy.GimpyFactory;

/**
 * @class : CaptchaEngine
 * @description: 验证码引擎
 *
 * @author suhao
 * @date 2014年7月15日 下午10:56:57
 * @version 1.0
 */
public class CaptchaEngine extends ListImageCaptchaEngine {

    /** 图片宽度 */
    private static final int IMAGE_WIDTH = 80;

    /** 图片高度 */
    private static final int IMAGE_HEIGHT = 28;

    /** 最小字体大小 */
    private static final int MIN_FONT_SIZE = 12;

    /** 最大字体大小 */
    private static final int MAX_FONT_SIZE = 16;

    /** 最小字符个数 */
    private static final int MIN_WORD_LENGTH = 4;

    /** 最大字符个数 */
    private static final int MAX_WORD_LENGTH = 4;

    /** 随机字符 */
    private static final String CHAR_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ3456789";

    /** 随机背景图片路径 */
    private static final String BACKGROUND_IMAGE_PATH = "/im/shs/web/captcha/background/";

    /**
     * 随机字体
     */
    private static final Font[] FONTS = new Font[] { new Font("nyala", Font.BOLD, MAX_FONT_SIZE),
            new Font("Arial", Font.BOLD, MAX_FONT_SIZE), new Font("nyala", Font.BOLD, MAX_FONT_SIZE),
            new Font("Bell", Font.BOLD, MAX_FONT_SIZE), new Font("Bell MT", Font.BOLD, MAX_FONT_SIZE),
            new Font("Credit", Font.BOLD, MAX_FONT_SIZE), new Font("valley", Font.BOLD, MAX_FONT_SIZE),
            new Font("Impact", Font.BOLD, MAX_FONT_SIZE) };

    /**
     * 随机颜色
     */
    private static final Color[] COLORS = new Color[] { new Color(255, 255, 255), new Color(255, 220, 220),
            new Color(220, 255, 255), new Color(220, 220, 255), new Color(255, 255, 220), new Color(220, 255, 220) };

    /**
     * 验证码图片生成
     */
    @Override
    protected void buildInitialFactories() {

        // 创建随即字体构造器
        FontGenerator fontGenerator = new RandomFontGenerator(MIN_FONT_SIZE, MAX_FONT_SIZE, FONTS);

        // 创建文件字符流随机背景构造器
        BackgroundGenerator backgroundGenerator = new FileReaderRandomBackgroundGenerator(IMAGE_WIDTH, IMAGE_HEIGHT,
                new ClassPathResource(BACKGROUND_IMAGE_PATH).getPath());

        // 创建随机文本粘贴器
        TextPaster textPaster = new DecoratedRandomTextPaster(MIN_WORD_LENGTH, MAX_WORD_LENGTH,
                new RandomListColorGenerator(COLORS), new TextDecorator[] {});

        // 添加验证码图片工厂
        addFactory(new GimpyFactory(new RandomWordGenerator(CHAR_STRING), new ComposedWordToImage(fontGenerator,
                backgroundGenerator, textPaster)));
    }

}