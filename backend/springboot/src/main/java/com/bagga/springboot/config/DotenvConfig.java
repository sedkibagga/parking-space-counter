package com.bagga.springboot.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class DotenvConfig {

    @PostConstruct
    public void loadEnvVariables() {
        Dotenv dotenv = Dotenv.configure()
                .directory("C:\\Users\\Dell\\Desktop\\The Future of Parking\\backend\\springboot\\src\\main\\resources")
              .filename(".env") // Explicitly load ".env"
                .ignoreIfMissing()
                .load();
//        System.out.println("SECRET_KEY: " + dotenv.get("SECRET_KEY"));
//        System.out.println("SECRET_KEY: " + dotenv.get("SPRING_DATASOURCE_USERNAME"));

        dotenv.entries().forEach(entry -> {

            System.setProperty(entry.getKey(), entry.getValue());
//            System.out.println(entry.getKey() + "=" + entry.getValue());  // Debugging
        });
    }
}
