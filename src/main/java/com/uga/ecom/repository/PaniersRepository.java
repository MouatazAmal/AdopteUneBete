package com.uga.ecom.repository;
import com.uga.ecom.domain.Paniers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Paniers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaniersRepository extends JpaRepository<Paniers, Long> {

}
