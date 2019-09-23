package com.uga.ecom.web.rest;

import com.uga.ecom.domain.Animaux;
import com.uga.ecom.domain.enumeration.Fertilite;
import com.uga.ecom.domain.enumeration.AnimalStatut;
import com.uga.ecom.domain.enumeration.Sexe;
import com.uga.ecom.domain.enumeration.TypeAnimal;
import com.uga.ecom.repository.AnimauxRepository;
import com.uga.ecom.service.AnimauxDbTaskManager;
import com.uga.ecom.service.dto.AnimauxDto;
import com.uga.ecom.service.mapper.AnimauxMapper;
import com.uga.ecom.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

/**
 * REST controller for managing {@link com.uga.ecom.domain.Animaux}.
 */
@RestController
@RequestMapping("/api")
public class AnimauxResource {

    private final Logger log = LoggerFactory.getLogger(AnimauxResource.class);

    private static final String ENTITY_NAME = "animaux";

    @Autowired
    private AnimauxDbTaskManager animauxDbTaskManager;

    @Autowired
    private AnimauxMapper animauxMapper;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnimauxRepository animauxRepository;

    public AnimauxResource(AnimauxRepository animauxRepository) {
        this.animauxRepository = animauxRepository;
    }

    /**
     * {@code POST  /animauxes} : Create a new animaux.
     *
     * @param animaux the animaux to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new animaux, or with status {@code 400 (Bad Request)} if the animaux has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/animauxes")
    public ResponseEntity<Animaux> createAnimaux(@RequestBody AnimauxDto animaux) throws URISyntaxException {
        log.debug("REST request to save Animaux : {}", animaux);
        if (animaux.getId() != null) {
            throw new BadRequestAlertException("A new animaux cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Animaux result = animauxRepository.save(animauxMapper.AnimauxDtoToAnimaux(animaux));
        return ResponseEntity.created(new URI("/api/animauxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /animauxes} : Updates an existing animaux.
     *
     * @param animaux the animaux to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated animaux,
     * or with status {@code 400 (Bad Request)} if the animaux is not valid,
     * or with status {@code 500 (Internal Server Error)} if the animaux couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/animauxes")
    public ResponseEntity<Animaux> updateAnimaux(@RequestBody AnimauxDto animaux) throws URISyntaxException {
        log.debug("REST request to update Animaux : {}", animaux);
        if (animaux.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Animaux result = animauxRepository.save(animauxMapper.AnimauxDtoToAnimaux(animaux));
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, animaux.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /animauxes} : get all the animauxes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of animauxes in body.
     */
    @GetMapping("/animauxes")
    public List<Animaux> getAllAnimauxes(
        @RequestParam(required = false) TypeAnimal typeAnimal,
        @RequestParam(required = false) Sexe sexe,
        @RequestParam(required = false) Fertilite fertilite,
        @RequestParam(required = false) Integer ageMin,
        @RequestParam(required = false) Integer ageMax,
        @RequestParam(required = false) Integer prixMin,
        @RequestParam(required = false) Integer prixMax,
        @RequestParam(required = false) AnimalStatut animalStatut1,
        @RequestParam(required = false) AnimalStatut animalStatut2

    ) {
        log.debug("REST request to get all Animauxes");
        List<Animaux> listResult = new ArrayList<Animaux>();
        boolean premierTrie = true;

        if (prixMin != null || prixMax != null){
            if (premierTrie == true){
                listResult=animauxDbTaskManager.getAnimalsByPrix(prixMin,prixMax);
                premierTrie=false;
            }else{
                listResult.retainAll(animauxDbTaskManager.getAnimalsByPrix(prixMin,prixMax));
            }
        }

        if (ageMin != null || ageMax != null){
            if(premierTrie==true) {
                listResult = animauxDbTaskManager.getAnimalsByAge(ageMin, ageMax);
                premierTrie=false;
            }else{
                listResult.retainAll(animauxDbTaskManager.getAnimalsByAge(ageMin, ageMax));
            }
        }

        if (fertilite!= null){
            if(premierTrie==true) {
                listResult= animauxDbTaskManager.getAnimalsByFertilite(fertilite);
                premierTrie=false;
            }else{
                listResult.retainAll(animauxDbTaskManager.getAnimalsByFertilite(fertilite));
            }
        }

        if (sexe != null){
            if(premierTrie==true) {
                listResult = animauxDbTaskManager.getAnimalsBySexe(sexe);
                premierTrie=false;
            }else{
                listResult.retainAll(animauxDbTaskManager.getAnimalsBySexe(sexe));
            }
        }

        if (typeAnimal != null){
            if(premierTrie==true) {
                listResult=animauxDbTaskManager.getAnimalsByTypeAnimaux(typeAnimal);
                premierTrie=false;
             }else{
                listResult.retainAll(animauxDbTaskManager.getAnimalsByTypeAnimaux(typeAnimal));
            }
        }

        if (animalStatut1 != null ){
            List<Animaux> animauxstatut1;
            List<Animaux> animauxstatut2;
            if (animalStatut2!=null){
                animauxstatut1 = animauxRepository.findAnimauxByStatut(animalStatut1);
                animauxstatut2 = animauxRepository.findAnimauxByStatut(animalStatut2);
                animauxstatut1.addAll(animauxstatut2);
            }else {
                animauxstatut1 = animauxRepository.findAnimauxByStatut(animalStatut1);
            }
            if(premierTrie==true) {
                listResult=animauxstatut1;
                premierTrie=false;
            }else{
                listResult.retainAll(animauxstatut1);
            }
        }

        if (premierTrie==true){
            return animauxRepository.findAll();
        }else {
            return listResult;
        }
    }

    /**
     * {@code GET  /animauxes/:id} : get the "id" animaux.
     *
     * @param id the id of the animaux to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the animaux, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/animauxes/{id}")
    public ResponseEntity<Animaux> getAnimaux(@PathVariable Long id) {
        log.debug("REST request to get Animaux : {}", id);
        Optional<Animaux> animaux = animauxRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(animaux);
    }

    /**
     * {@code DELETE  /animauxes/:id} : delete the "id" animaux.
     *
     * @param id the id of the animaux to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/animauxes/{id}")
    public ResponseEntity<Void> deleteAnimaux(@PathVariable Long id) {
        log.debug("REST request to delete Animaux : {}", id);
        animauxRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /animauxes/new-arrivals} : get animals orderBy dateAjout
     *
     * @return the {@link ResponseEntity} with status {@code 202 (ACCEPTED)}.
     */
    @GetMapping("/animauxes/new-arrivals")
    public ResponseEntity<List<Animaux>> getAnimalsByDate(){
        log.debug("REST request to get new arrivals");
        List<Animaux> animauxes = animauxRepository.findTop5ByOrderByDateAjout();
        return new ResponseEntity<>(animauxes,HttpStatus.ACCEPTED);
    }

    /**
     * {@code GET  /animauxes/animauxes-unsold} : get unsold animals
     *
     * @return the {@link ResponseEntity} with status {@code 202 (ACCEPTED)}.
     */
    @GetMapping("/animauxes/animauxes-unsold")
    public ResponseEntity<List<Animaux>> getAnimalsNonVendu(){
        log.debug("REST request to get unsold animals");
        List<Animaux> animauxdisp = animauxRepository.findAnimauxByStatut(AnimalStatut.DISPONIBLE);
        List<Animaux> animauxres = animauxRepository.findAnimauxByStatut(AnimalStatut.RESERVE);
        animauxdisp.addAll(animauxres);
        return new ResponseEntity<>(animauxdisp,HttpStatus.ACCEPTED);
    }


}
