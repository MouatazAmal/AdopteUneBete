package com.uga.ecom.service.mapper;

import com.uga.ecom.domain.Animaux;
import com.uga.ecom.domain.Paniers;
import com.uga.ecom.exception.NotFoundAnimal;
import com.uga.ecom.repository.AnimauxRepository;
import com.uga.ecom.service.dto.PanierDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class PanierMapper {

    @Autowired
    private AnimauxRepository animauxRepository;

    public Paniers paniersDtoToPanier(PanierDto dto){

        Paniers entity = new Paniers();

        entity.setId(dto.getId());

        Set<Animaux> animauxSet = new HashSet<>();

        dto.getAnimauxes().forEach(p -> animauxSet.add(animauxRepository.findById(p).orElseThrow(()-> new NotFoundAnimal(p))));

        entity.setAnimauxes(animauxSet);
        
        return entity;
    }
}
