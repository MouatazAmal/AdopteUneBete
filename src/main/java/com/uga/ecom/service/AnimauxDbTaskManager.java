package com.uga.ecom.service;

import com.uga.ecom.domain.Animaux;
import com.uga.ecom.domain.enumeration.Fertilite;
import com.uga.ecom.domain.enumeration.AnimalStatut;
import com.uga.ecom.domain.enumeration.Sexe;
import com.uga.ecom.domain.enumeration.TypeAnimal;
import com.uga.ecom.repository.AnimauxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimauxDbTaskManager {

    @Autowired
    AnimauxRepository animauxRepository;

    public List<Animaux> getAnimalsByPrix(Integer minPrice, Integer maxPrice){

        if (minPrice != null && maxPrice!= null){
            if (minPrice<0) minPrice = 0;
            return animauxRepository.findAnimauxByPrixBetween(minPrice,maxPrice);
        } else if (minPrice == null){
            return animauxRepository.findAnimauxByPrixLessThan(maxPrice);
        }else{
            if (minPrice<0) minPrice=0;
            return animauxRepository.findAnimauxByPrixGreaterThan(minPrice);
        }
    }

    public List<Animaux> getAnimalsByAge(Integer ageMin, Integer ageMax){
        if (ageMin!=null && ageMax != null){
            if (ageMin<0) ageMin = 0;
            return animauxRepository.findAnimauxByAgeBetween(ageMin,ageMax);
        }
        else if (ageMin == null){
            return animauxRepository.findAnimauxByAgeLessThan(ageMax);
        }else{
            if (ageMin<0) ageMin = 0;
            return animauxRepository.findAnimauxByAgeGreaterThan(ageMin);
        }
    }

    public List<Animaux> getAnimalsByFertilite(Fertilite fertilite){
        return animauxRepository.findAnimauxByFertilite(fertilite);
    }

    public List<Animaux> getAnimalsByTypeAnimaux(TypeAnimal typeAnimal){
        return animauxRepository.findAnimauxByTypeAnimal(typeAnimal);
    }

    public List<Animaux> getAnimalsBySexe(Sexe sexe){
        return animauxRepository.findAnimauxBySexe(sexe);
    }

    public List<Animaux> getAnimalsByAnimalStatut(AnimalStatut animalStatut){
        return animauxRepository.findAnimauxByStatut(animalStatut);
    }

}
