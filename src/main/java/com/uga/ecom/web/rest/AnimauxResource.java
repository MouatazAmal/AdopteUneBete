package com.uga.ecom.web.rest;

import com.uga.ecom.domain.Animaux;
import com.uga.ecom.repository.AnimauxRepository;
import com.uga.ecom.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.uga.ecom.domain.Animaux}.
 */
@RestController
@RequestMapping("/api")
public class AnimauxResource {

    private final Logger log = LoggerFactory.getLogger(AnimauxResource.class);

    private static final String ENTITY_NAME = "animaux";

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
    public ResponseEntity<Animaux> createAnimaux(@RequestBody Animaux animaux) throws URISyntaxException {
        log.debug("REST request to save Animaux : {}", animaux);
        if (animaux.getId() != null) {
            throw new BadRequestAlertException("A new animaux cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Animaux result = animauxRepository.save(animaux);
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
    public ResponseEntity<Animaux> updateAnimaux(@RequestBody Animaux animaux) throws URISyntaxException {
        log.debug("REST request to update Animaux : {}", animaux);
        if (animaux.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Animaux result = animauxRepository.save(animaux);
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
    public List<Animaux> getAllAnimauxes() {
        log.debug("REST request to get all Animauxes");
        return animauxRepository.findAll();
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
}
