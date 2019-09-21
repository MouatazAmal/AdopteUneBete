package com.uga.ecom.service.mapper;

import com.uga.ecom.domain.Animaux;
import com.uga.ecom.exception.NotFoundCommande;
import com.uga.ecom.exception.NotFoundPaniersException;
import com.uga.ecom.repository.CommandesRepository;
import com.uga.ecom.repository.PaniersRepository;
import com.uga.ecom.service.dto.AnimauxDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Service
public class AnimauxMapper {

    @Autowired
    private PaniersRepository paniersRepository;

    @Autowired
    private CommandesRepository commandesRepository;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d-M-y");

    public Animaux AnimauxDtoToAnimaux(AnimauxDto dto){

        Animaux entity = new Animaux();

        entity.setId(dto.getId());

        entity.setNom(dto.getNom());

        entity.setAge(dto.getAge());

        entity.setDescription(dto.getDescription());

        entity.setStatut(dto.getStatut());

        entity.setTypeAnimal(dto.getTypeAnimal());

        entity.setSexe(dto.getSexe());

        entity.setPoids(dto.getPoids());

        entity.setFertilite(dto.getFertilite());

        entity.setDateAjout(dto.getDateAjout());

        entity.setImage(dto.getImage());

        entity.setImageContentType(dto.getImageContentType());

        if (!Objects.isNull(dto.getPaniers())){
            entity.setPaniers(paniersRepository.findById(dto.getPaniers()).orElseThrow(()->new NotFoundPaniersException(dto.getPaniers())));
        }

        if (!Objects.isNull(dto.getCommandes())){
            entity.setCommandes(commandesRepository.findById(dto.getCommandes()).orElseThrow(()-> new NotFoundCommande(dto.getPaniers())));
        }

        return entity;
    }
}
