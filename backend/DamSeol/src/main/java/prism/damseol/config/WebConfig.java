package prism.damseol.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 모든 경로를 index.html로 매핑 (API 제외)
        registry.addViewController("/{spring:\\w+}")
                .setViewName("forward:/index.html");

        registry.addViewController("/**/{spring:\\w+}")
                .setViewName("forward:/index.html");

        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/index.html");
    }
}