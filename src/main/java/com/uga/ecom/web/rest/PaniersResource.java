package com.uga.ecom.web.rest;

import com.uga.ecom.domain.Paniers;
import com.uga.ecom.domain.User;
import com.uga.ecom.domain.Utilisateurs;
import com.uga.ecom.exception.NotFoundPaniersException;
import com.uga.ecom.exception.NotFoundUserException;
import com.uga.ecom.repository.AnimauxRepository;
import com.uga.ecom.repository.PaniersRepository;
import com.uga.ecom.repository.UserRepository;
import com.uga.ecom.repository.UtilisateursRepository;
import com.uga.ecom.service.dto.PanierDto;
import com.uga.ecom.service.mapper.PanierMapper;
import com.uga.ecom.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.uga.ecom.domain.Paniers}.
 */
@RestController
@RequestMapping("/api")
public class PaniersResource {

    private final Logger log = LoggerFactory.getLogger(PaniersResource.class);

    private static final String ENTITY_NAME = "paniers";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaniersRepository paniersRepository;

    @Autowired
    private PanierMapper panierMapper;

    @Autowired
    private AnimauxRepository animauxRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UtilisateursRepository utilisateursRepository;

    public PaniersResource(PaniersRepository paniersRepository) {
        this.paniersRepository = paniersRepository;
    }

    /**
     * {@code POST  /paniers} : Create a new paniers.
     *
     * @param paniers the paniers to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paniers, or with status {@code 400 (Bad Request)} if the paniers has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paniers")
    @Transactional
    public ResponseEntity<Paniers> createPaniers(@RequestBody PanierDto paniers) throws URISyntaxException {
        log.debug("REST request to save Paniers : {}", paniers);

        if (paniers.getId() != null) {
            throw new BadRequestAlertException("A new paniers cannot already have an ID", ENTITY_NAME, "idexists");
        }

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User loggedUser = userRepository.findOneByLogin(login).orElseThrow(()->new NotFoundUserException(login));
        Utilisateurs utilisateurs = utilisateursRepository.findById(loggedUser.getId())
            .orElseThrow(()-> new NotFoundPaniersException());

        Paniers loggedUserPanier = utilisateurs.getPaniers();
        Paniers result = paniersRepository.save(panierMapper.paniersDtoToPanier(loggedUserPanier,paniers));
        utilisateurs.setPaniers(result );
        utilisateursRepository.save(utilisateurs);
        return ResponseEntity.created(new URI("/api/paniers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /paniers} : Updates an existing paniers.
     *
     * @param paniers the paniers to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paniers,
     * or with status {@code 400 (Bad Request)} if the paniers is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paniers couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paniers")
    @Transactional
    public ResponseEntity<Paniers> updatePaniers(@RequestBody PanierDto paniers) throws URISyntaxException {
        log.debug("REST request to update Paniers : {}", paniers);
        if (paniers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User loggedUser = userRepository.findOneByLogin(login).orElseThrow(()->new NotFoundUserException(login));
        Paniers loggedUserPanier = utilisateursRepository.findById(loggedUser.getId()).get().getPaniers();

        Paniers result = paniersRepository.save(panierMapper.paniersDtoToPanier(loggedUserPanier,paniers));
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paniers.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /paniers} : get all the paniers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paniers in body.
     */
    @GetMapping("/paniers")
    public List<Paniers> getAllPaniers() {
        log.debug("REST request to get all Paniers");
        return paniersRepository.findAll();
    }

    /**
     * {@code GET  /paniers/:id} : get the "id" paniers.
     *
     * @param id the id of the paniers to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paniers, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paniers/{id}")
    public ResponseEntity<Paniers> getPaniers(@PathVariable Long id) {
        log.debug("REST request to get Paniers : {}", id);
        Optional<Paniers> paniers = paniersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paniers);
    }

    /**
     * {@code DELETE  /paniers/:id} : delete the "id" paniers.
     *
     * @param id the id of the paniers to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paniers/{id}")
    public ResponseEntity<Void> deletePaniers(@PathVariable Long id) {
        log.debug("REST request to delete Paniers : {}", id);
        paniersRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
