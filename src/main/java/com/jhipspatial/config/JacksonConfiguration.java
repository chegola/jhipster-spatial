package com.jhipspatial.config;

import com.bedatadriven.jackson.datatype.jts.JtsModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by che on 24/12/2559.
 */
@Configuration
public class JacksonConfiguration {
    @Bean
    public JtsModule jtsModule() {
        return new JtsModule();
    }
}
