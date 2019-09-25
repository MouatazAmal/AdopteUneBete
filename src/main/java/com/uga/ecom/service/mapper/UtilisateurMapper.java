package com.uga.ecom.service.mapper;

import com.uga.ecom.domain.Commandes;
import com.uga.ecom.domain.Paniers;
import com.uga.ecom.domain.Utilisateurs;
import com.uga.ecom.repository.CommandesRepository;
import com.uga.ecom.repository.PaniersRepository;
import com.uga.ecom.repository.UserRepository;
import com.uga.ecom.service.dto.UtilisateurDto;
import com.uga.ecom.exception.NotFoundCommande;
import com.uga.ecom.exception.NotFoundUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class UtilisateurMapper {

    @Autowired
    private CommandesRepository commandesRepository;

    @Autowired
    private PaniersRepository paniersRepository;

    @Autowired
    private UserRepository userRepository;

    public Utilisateurs utilisateursDtoToUtilisateur(UtilisateurDto dto){

        Utilisateurs entity = new Utilisateurs();

        entity.setId(dto.getId());

        entity.setNumRue(dto.getNumRue());

        entity.setNomRue(dto.getNomRue());

        entity.setVille(dto.getVille());

        entity.setCodePostal(dto.getCodePostal());

        entity.setDateNaissance(dto.getDateNaissance());

        if (Objects.isNull( dto.getPaniers())){
            Paniers paniers = new Paniers();
            paniersRepository.save(paniers);
            entity.setPaniers(paniers);
        }

        Set<Commandes> commandesSet = new HashSet<>();

        if(!Objects.isNull(dto.getCommandes())){
            dto.getCommandes().forEach(c ->
                commandesSet.add(commandesRepository.findById(c).orElseThrow(()->new NotFoundCommande(c))));
        }

        entity.setCommandes(commandesSet);

        entity.setUser(userRepository.findById(dto.getUser()).orElseThrow(()->new NotFoundUser(dto.getUser())));

        return entity;
    }
}
