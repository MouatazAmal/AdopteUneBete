package com.uga.ecom.service.mapper;

import com.uga.ecom.domain.Animaux;
import com.uga.ecom.domain.Paniers;
import com.uga.ecom.domain.enumeration.AnimalStatut;
import com.uga.ecom.exception.NotFoundAnimalException;
import com.uga.ecom.repository.AnimauxRepository;
import com.uga.ecom.service.dto.PanierDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class PanierMapper {

    @Autowired
    private AnimauxRepository animauxRepository;

    @Transactional
    public Paniers paniersDtoToPanier(Paniers entity, PanierDto dto){

        Set<Animaux> animauxSet = new HashSet<>();

        if (!Objects.isNull(dto.getAnimauxes()) || !dto.getAnimauxes().isEmpty()){
            dto.getAnimauxes().forEach(p -> animauxSet.add(animauxRepository.findById(p).orElseThrow(()-> new NotFoundAnimalException(p))));
        }

        if (!Objects.isNull(entity.getAnimauxes()) || !entity.getAnimauxes().isEmpty()){
            for (Animaux animal : entity.getAnimauxes()){
                animal.setStatut(AnimalStatut.DISPONIBLE);
                animauxRepository.save(animal);
            }
        }

        entity.setAnimauxes(animauxSet);

        if (!Objects.isNull(entity.getAnimauxes()) || !entity.getAnimauxes().isEmpty()){
            entity.getAnimauxes().forEach(animal -> animal.setStatut(AnimalStatut.RESERVE));
       }

        return entity;
    }
}
