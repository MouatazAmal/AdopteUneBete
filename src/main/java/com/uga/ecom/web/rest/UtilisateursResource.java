package com.uga.ecom.web.rest;

import com.uga.ecom.domain.Utilisateurs;
import com.uga.ecom.repository.UtilisateursRepository;
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
 * REST controller for managing {@link com.uga.ecom.domain.Utilisateurs}.
 */
@RestController
@RequestMapping("/api")
public class UtilisateursResource {

    private final Logger log = LoggerFactory.getLogger(UtilisateursResource.class);

    private static final String ENTITY_NAME = "utilisateurs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UtilisateursRepository utilisateursRepository;

    public UtilisateursResource(UtilisateursRepository utilisateursRepository) {
        this.utilisateursRepository = utilisateursRepository;
    }

    /**
     * {@code POST  /utilisateurs} : Create a new utilisateurs.
     *
     * @param utilisateurs the utilisateurs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new utilisateurs, or with status {@code 400 (Bad Request)} if the utilisateurs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/utilisateurs")
    public ResponseEntity<Utilisateurs> createUtilisateurs(@RequestBody Utilisateurs utilisateurs) throws URISyntaxException {
        log.debug("REST request to save Utilisateurs : {}", utilisateurs);
        if (utilisateurs.getId() != null) {
            throw new BadRequestAlertException("A new utilisateurs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Utilisateurs result = utilisateursRepository.save(utilisateurs);
        return ResponseEntity.created(new URI("/api/utilisateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /utilisateurs} : Updates an existing utilisateurs.
     *
     * @param utilisateurs the utilisateurs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated utilisateurs,
     * or with status {@code 400 (Bad Request)} if the utilisateurs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the utilisateurs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/utilisateurs")
    public ResponseEntity<Utilisateurs> updateUtilisateurs(@RequestBody Utilisateurs utilisateurs) throws URISyntaxException {
        log.debug("REST request to update Utilisateurs : {}", utilisateurs);
        if (utilisateurs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Utilisateurs result = utilisateursRepository.save(utilisateurs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, utilisateurs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /utilisateurs} : get all the utilisateurs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of utilisateurs in body.
     */
    @GetMapping("/utilisateurs")
    public List<Utilisateurs> getAllUtilisateurs() {
        log.debug("REST request to get all Utilisateurs");
        return utilisateursRepository.findAll();
    }

    /**
     * {@code GET  /utilisateurs/:id} : get the "id" utilisateurs.
     *
     * @param id the id of the utilisateurs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the utilisateurs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/utilisateurs/{id}")
    public ResponseEntity<Utilisateurs> getUtilisateurs(@PathVariable Long id) {
        log.debug("REST request to get Utilisateurs : {}", id);
        Optional<Utilisateurs> utilisateurs = utilisateursRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(utilisateurs);
    }

    /**
     * {@code DELETE  /utilisateurs/:id} : delete the "id" utilisateurs.
     *
     * @param id the id of the utilisateurs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/utilisateurs/{id}")
    public ResponseEntity<Void> deleteUtilisateurs(@PathVariable Long id) {
        log.debug("REST request to delete Utilisateurs : {}", id);
        utilisateursRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
