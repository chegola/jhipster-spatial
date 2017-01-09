package com.jhipspatial.repository;

import com.jhipspatial.domain.Shop;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Shop entity.
 */
@SuppressWarnings("unused")
public interface ShopRepository extends JpaRepository<Shop,Long> {

    @Query(value = "select s from Shop s where dwithin(s.location, ?1, ?2 * 1000.0, false) = true")
    List<Shop> findNearBy(Geometry geometry, Double km);


}

