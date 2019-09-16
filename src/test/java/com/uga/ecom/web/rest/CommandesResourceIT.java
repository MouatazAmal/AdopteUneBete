package com.uga.ecom.web.rest;

import com.uga.ecom.AubApp;
import com.uga.ecom.domain.Commandes;
import com.uga.ecom.repository.CommandesRepository;
import com.uga.ecom.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.uga.ecom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.uga.ecom.domain.enumeration.CommandeStatut;
/**
 * Integration tests for the {@link CommandesResource} REST controller.
 */
@SpringBootTest(classes = AubApp.class)
public class CommandesResourceIT {

    private static final Instant DEFAULT_DATE_COMMANDE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_COMMANDE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE_COMMANDE = Instant.ofEpochMilli(-1L);

    private static final CommandeStatut DEFAULT_STATUT = CommandeStatut.CONFIRMEE;
    private static final CommandeStatut UPDATED_STATUT = CommandeStatut.ANNULEE;

    @Autowired
    private CommandesRepository commandesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCommandesMockMvc;

    private Commandes commandes;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommandesResource commandesResource = new CommandesResource(commandesRepository);
        this.restCommandesMockMvc = MockMvcBuilders.standaloneSetup(commandesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commandes createEntity(EntityManager em) {
        Commandes commandes = new Commandes()
            .dateCommande(DEFAULT_DATE_COMMANDE)
            .statut(DEFAULT_STATUT);
        return commandes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commandes createUpdatedEntity(EntityManager em) {
        Commandes commandes = new Commandes()
            .dateCommande(UPDATED_DATE_COMMANDE)
            .statut(UPDATED_STATUT);
        return commandes;
    }

    @BeforeEach
    public void initTest() {
        commandes = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommandes() throws Exception {
        int databaseSizeBeforeCreate = commandesRepository.findAll().size();

        // Create the Commandes
        restCommandesMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandes)))
            .andExpect(status().isCreated());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeCreate + 1);
        Commandes testCommandes = commandesList.get(commandesList.size() - 1);
        assertThat(testCommandes.getDateCommande()).isEqualTo(DEFAULT_DATE_COMMANDE);
        assertThat(testCommandes.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    @Transactional
    public void createCommandesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commandesRepository.findAll().size();

        // Create the Commandes with an existing ID
        commandes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandesMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandes)))
            .andExpect(status().isBadRequest());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        // Get all the commandesList
        restCommandesMockMvc.perform(get("/api/commandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commandes.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCommande").value(hasItem(DEFAULT_DATE_COMMANDE.toString())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())));
    }
    
    @Test
    @Transactional
    public void getCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        // Get the commandes
        restCommandesMockMvc.perform(get("/api/commandes/{id}", commandes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commandes.getId().intValue()))
            .andExpect(jsonPath("$.dateCommande").value(DEFAULT_DATE_COMMANDE.toString()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCommandes() throws Exception {
        // Get the commandes
        restCommandesMockMvc.perform(get("/api/commandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();

        // Update the commandes
        Commandes updatedCommandes = commandesRepository.findById(commandes.getId()).get();
        // Disconnect from session so that the updates on updatedCommandes are not directly saved in db
        em.detach(updatedCommandes);
        updatedCommandes
            .dateCommande(UPDATED_DATE_COMMANDE)
            .statut(UPDATED_STATUT);

        restCommandesMockMvc.perform(put("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommandes)))
            .andExpect(status().isOk());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
        Commandes testCommandes = commandesList.get(commandesList.size() - 1);
        assertThat(testCommandes.getDateCommande()).isEqualTo(UPDATED_DATE_COMMANDE);
        assertThat(testCommandes.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    public void updateNonExistingCommandes() throws Exception {
        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();

        // Create the Commandes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandesMockMvc.perform(put("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandes)))
            .andExpect(status().isBadRequest());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        int databaseSizeBeforeDelete = commandesRepository.findAll().size();

        // Delete the commandes
        restCommandesMockMvc.perform(delete("/api/commandes/{id}", commandes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commandes.class);
        Commandes commandes1 = new Commandes();
        commandes1.setId(1L);
        Commandes commandes2 = new Commandes();
        commandes2.setId(commandes1.getId());
        assertThat(commandes1).isEqualTo(commandes2);
        commandes2.setId(2L);
        assertThat(commandes1).isNotEqualTo(commandes2);
        commandes1.setId(null);
        assertThat(commandes1).isNotEqualTo(commandes2);
    }
}
