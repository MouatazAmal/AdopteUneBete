package com.uga.ecom.web.rest;

import com.uga.ecom.domain.Commandes;
import com.uga.ecom.repository.CommandesRepository;
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
 * REST controller for managing {@link com.uga.ecom.domain.Commandes}.
 */
@RestController
@RequestMapping("/api")
public class CommandesResource {

    private final Logger log = LoggerFactory.getLogger(CommandesResource.class);

    private static final String ENTITY_NAME = "commandes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandesRepository commandesRepository;

    public CommandesResource(CommandesRepository commandesRepository) {
        this.commandesRepository = commandesRepository;
    }

    /**
     * {@code POST  /commandes} : Create a new commandes.
     *
     * @param commandes the commandes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commandes, or with status {@code 400 (Bad Request)} if the commandes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commandes")
    public ResponseEntity<Commandes> createCommandes(@RequestBody Commandes commandes) throws URISyntaxException {
        log.debug("REST request to save Commandes : {}", commandes);
        if (commandes.getId() != null) {
            throw new BadRequestAlertException("A new commandes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commandes result = commandesRepository.save(commandes);
        return ResponseEntity.created(new URI("/api/commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commandes} : Updates an existing commandes.
     *
     * @param commandes the commandes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandes,
     * or with status {@code 400 (Bad Request)} if the commandes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commandes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commandes")
    public ResponseEntity<Commandes> updateCommandes(@RequestBody Commandes commandes) throws URISyntaxException {
        log.debug("REST request to update Commandes : {}", commandes);
        if (commandes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Commandes result = commandesRepository.save(commandes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commandes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commandes} : get all the commandes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commandes in body.
     */
    @GetMapping("/commandes")
    public List<Commandes> getAllCommandes() {
        log.debug("REST request to get all Commandes");
        return commandesRepository.findAll();
    }

    /**
     * {@code GET  /commandes/:id} : get the "id" commandes.
     *
     * @param id the id of the commandes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commandes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commandes/{id}")
    public ResponseEntity<Commandes> getCommandes(@PathVariable Long id) {
        log.debug("REST request to get Commandes : {}", id);
        Optional<Commandes> commandes = commandesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commandes);
    }

    /**
     * {@code DELETE  /commandes/:id} : delete the "id" commandes.
     *
     * @param id the id of the commandes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commandes/{id}")
    public ResponseEntity<Void> deleteCommandes(@PathVariable Long id) {
        log.debug("REST request to delete Commandes : {}", id);
        commandesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
