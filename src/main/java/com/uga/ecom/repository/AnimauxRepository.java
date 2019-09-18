package com.uga.ecom.repository;
import com.uga.ecom.domain.Animaux;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Animaux entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnimauxRepository extends JpaRepository<Animaux, Long> {

}
