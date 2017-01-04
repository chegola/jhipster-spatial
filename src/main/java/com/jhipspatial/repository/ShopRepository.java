package com.jhipspatial.repository;

import com.jhipspatial.domain.Shop;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Shop entity.
 */
@SuppressWarnings("unused")
public interface ShopRepository extends JpaRepository<Shop,Long> {
    //@Query(value = "select shop from Shop shop where st_dwithin(geography(shop.location), st_setsrid(st_point(:lat,:lon),4326),10000,false)")
    List<Shop> findNearBy(Double lat, Double lon);

}
