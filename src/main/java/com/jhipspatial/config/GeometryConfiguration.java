package com.jhipspatial.config;

import com.vividsolutions.jts.geom.GeometryFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by che on 25/12/2559.
 */
@Configuration
public class GeometryConfiguration {
    @Bean
    public GeometryFactory geometryFactory() {
        return new GeometryFactory();
    }
}
