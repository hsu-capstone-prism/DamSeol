package prism.damseol.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

// configure Spring MVC and set up view controllers
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /*
    private static final String[] ALLOWED_ORIGINS = {
            "http://localhost:3000"
    };

    public static final String ALLOWED_METHODS = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(ALLOWED_ORIGINS)
                .allowedMethods(ALLOWED_METHODS.split(","))
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }


    //  addViewController는 서버 측에서 뷰 템플릿(Thymeleaf, JSP 등)을 렌더링하기 위한 설정입니다.
    //    React는 클라이언트 측에서 라우팅을 처리하므로, 서버가 모든 경로에 대해 단일 HTML 파일(index.html)을 반환해야 합니다.

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/{path:[^\\.]*}").setViewName("forward:/index.html");
    }
    */
}