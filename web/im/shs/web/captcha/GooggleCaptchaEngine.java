package im.shs.web.captcha;

import java.awt.Color;
import java.awt.Font;
import java.util.ArrayList;

import com.octo.captcha.component.image.backgroundgenerator.BackgroundGenerator;
import com.octo.captcha.component.image.backgroundgenerator.UniColorBackgroundGenerator;
import com.octo.captcha.component.image.color.RandomListColorGenerator;
import com.octo.captcha.component.image.deformation.ImageDeformation;
import com.octo.captcha.component.image.fontgenerator.FontGenerator;
import com.octo.captcha.component.image.fontgenerator.RandomFontGenerator;
import com.octo.captcha.component.image.textpaster.GlyphsPaster;
import com.octo.captcha.component.image.textpaster.TextPaster;
import com.octo.captcha.component.image.textpaster.glyphsvisitor.GlyphsVisitors;
import com.octo.captcha.component.image.textpaster.glyphsvisitor.OverlapGlyphsUsingShapeVisitor;
import com.octo.captcha.component.image.textpaster.glyphsvisitor.TranslateAllToRandomPointVisitor;
import com.octo.captcha.component.image.textpaster.glyphsvisitor.TranslateGlyphsVerticalRandomVisitor;
import com.octo.captcha.component.image.wordtoimage.DeformedComposedWordToImage;
import com.octo.captcha.component.image.wordtoimage.WordToImage;
import com.octo.captcha.component.word.FileDictionary;
import com.octo.captcha.component.word.wordgenerator.ComposeDictionaryWordGenerator;
import com.octo.captcha.component.word.wordgenerator.WordGenerator;
import com.octo.captcha.engine.image.ListImageCaptchaEngine;
import com.octo.captcha.image.gimpy.GimpyFactory;

/**
 * @class : GooggleCaptchaEngine
 * @description: Googgle验证码引擎
 *
 * @author suhao
 * @date 2014年7月21日 下午9:33:32
 * @version 1.0
 */
public class GooggleCaptchaEngine extends ListImageCaptchaEngine {

    /** 图片宽度 */
    private static final int IMAGE_WIDTH = 80;

    /** 图片高度 */
    private static final int IMAGE_HEIGHT = 28;

    /** 最小字符个数 */
    private static final int MIN_WORD_LENGTH = 4;

    /** 最大字符个数 */
    private static final int MAX_WORD_LENGTH = 4;

    /** 字符垂直距离 */
    private static final double WORD_VERTICAL_RANGE = 1.50D;

    /** 字符像素重叠 */
    private static final double WORD_OVERLAP_PIXELS = 0.50D;

    /** 字符水平间隔 */
    private static final double WORD_HORIZONTAL_MARGINS = 10.0D;

    /** 字符垂直间隔 */
    private static final double WORD_VERTICAL_MARGINS = 3.0D;

    /** 最小字体大小 */
    private static final int MIN_FONT_SIZE = 28;

    /** 最大字体大小 */
    private static final int MAX_FONT_SIZE = 28;

    /** 随机字体颜色 */
    private static final Color[] FONT_COLORS = new Color[] { new Color(23, 170, 27), new Color(220, 34, 11),
            new Color(23, 67, 172) };

    /**
     * 随机字体
     */
    private static final Font[] FONTS = new Font[] { new Font("Credit valley", Font.PLAIN, MAX_FONT_SIZE),
            new Font("nyala", Font.PLAIN, MAX_FONT_SIZE), new Font("Bell MT", Font.BOLD, MAX_FONT_SIZE) };

    /**
     * 验证码图片生成
     */
    @Override
    protected void buildInitialFactories() {

        // 词典单词
        WordGenerator dictionnaryWords = new ComposeDictionaryWordGenerator(new FileDictionary("toddlist"));

        // 随即字体构造器
        FontGenerator fontGenerator = new RandomFontGenerator(MIN_FONT_SIZE, MAX_FONT_SIZE, FONTS);

        // 背景颜色构造器
        BackgroundGenerator backgroundGenerator = new UniColorBackgroundGenerator(IMAGE_WIDTH, IMAGE_HEIGHT,
                Color.white);

        // 随机文本粘贴器
        TextPaster randomTextPaster = new GlyphsPaster(MIN_WORD_LENGTH, MAX_WORD_LENGTH, new RandomListColorGenerator(
                FONT_COLORS), new GlyphsVisitors[] { new TranslateGlyphsVerticalRandomVisitor(WORD_VERTICAL_RANGE),
                new OverlapGlyphsUsingShapeVisitor(WORD_OVERLAP_PIXELS),
                new TranslateAllToRandomPointVisitor(WORD_HORIZONTAL_MARGINS, WORD_VERTICAL_MARGINS) });

        // 单词图片
        WordToImage word2image = new DeformedComposedWordToImage(false, fontGenerator, backgroundGenerator,
                randomTextPaster, new ArrayList<ImageDeformation>(), new ArrayList<ImageDeformation>(),
                new ArrayList<ImageDeformation>());

        // 添加图片工厂
        addFactory(new GimpyFactory(dictionnaryWords, word2image, false));
    }
}