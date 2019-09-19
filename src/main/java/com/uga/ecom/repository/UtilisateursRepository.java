package com.uga.ecom.repository;
import com.uga.ecom.domain.Utilisateurs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Utilisateurs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UtilisateursRepository extends JpaRepository<Utilisateurs, Long> {

}
