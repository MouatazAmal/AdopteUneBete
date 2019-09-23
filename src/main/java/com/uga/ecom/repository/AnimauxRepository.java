package com.uga.ecom.repository;

import com.uga.ecom.domain.Animaux;
import com.uga.ecom.domain.enumeration.Fertilite;
import com.uga.ecom.domain.enumeration.AnimalStatut;
import com.uga.ecom.domain.enumeration.Sexe;
import com.uga.ecom.domain.enumeration.TypeAnimal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Animaux entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnimauxRepository extends JpaRepository<Animaux, Long> {

    List<Animaux> findTop5ByStatutNotOrderByDateAjout(AnimalStatut animalStatut );

    List<Animaux> findAnimauxByPrixBetween(int minPrice, int maxPrice);

    List<Animaux> findAnimauxByPrixGreaterThan(int minPrice);

    List<Animaux> findAnimauxByPrixLessThan(int maxPrice);

    List<Animaux> findAnimauxByAgeBetween(int ageMin, int ageMax);

    List<Animaux> findAnimauxByAgeGreaterThan(int ageMin);

    List<Animaux> findAnimauxByAgeLessThan(int ageMax);

    List<Animaux> findAnimauxByFertilite(Fertilite fertilite);

    List<Animaux> findAnimauxBySexe(Sexe sexe);

    List<Animaux> findAnimauxByTypeAnimal(TypeAnimal typeAnimal);

    List<Animaux> findAnimauxByStatut(AnimalStatut animalStatut);
}

