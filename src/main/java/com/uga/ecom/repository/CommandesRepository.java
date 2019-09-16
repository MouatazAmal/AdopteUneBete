package com.uga.ecom.repository;

import com.uga.ecom.domain.Commandes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Commandes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandesRepository extends JpaRepository<Commandes, Long> {

}
