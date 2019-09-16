package com.uga.ecom.web.rest;

import com.uga.ecom.AubApp;
import com.uga.ecom.domain.Utilisateurs;
import com.uga.ecom.repository.UtilisateursRepository;
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

/**
 * Integration tests for the {@link UtilisateursResource} REST controller.
 */
@SpringBootTest(classes = AubApp.class)
public class UtilisateursResourceIT {

    private static final Integer DEFAULT_NUM_RUE = 1;
    private static final Integer UPDATED_NUM_RUE = 2;
    private static final Integer SMALLER_NUM_RUE = 1 - 1;

    private static final String DEFAULT_NOM_RUE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_RUE = "BBBBBBBBBB";

    private static final String DEFAULT_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_VILLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_CODE_POSTAL = 1;
    private static final Integer UPDATED_CODE_POSTAL = 2;
    private static final Integer SMALLER_CODE_POSTAL = 1 - 1;

    private static final Instant DEFAULT_DATE_NAISSANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_NAISSANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE_NAISSANCE = Instant.ofEpochMilli(-1L);

    @Autowired
    private UtilisateursRepository utilisateursRepository;

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

    private MockMvc restUtilisateursMockMvc;

    private Utilisateurs utilisateurs;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UtilisateursResource utilisateursResource = new UtilisateursResource(utilisateursRepository);
        this.restUtilisateursMockMvc = MockMvcBuilders.standaloneSetup(utilisateursResource)
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
    public static Utilisateurs createEntity(EntityManager em) {
        Utilisateurs utilisateurs = new Utilisateurs()
            .numRue(DEFAULT_NUM_RUE)
            .nomRue(DEFAULT_NOM_RUE)
            .ville(DEFAULT_VILLE)
            .codePostal(DEFAULT_CODE_POSTAL)
            .dateNaissance(DEFAULT_DATE_NAISSANCE);
        return utilisateurs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Utilisateurs createUpdatedEntity(EntityManager em) {
        Utilisateurs utilisateurs = new Utilisateurs()
            .numRue(UPDATED_NUM_RUE)
            .nomRue(UPDATED_NOM_RUE)
            .ville(UPDATED_VILLE)
            .codePostal(UPDATED_CODE_POSTAL)
            .dateNaissance(UPDATED_DATE_NAISSANCE);
        return utilisateurs;
    }

    @BeforeEach
    public void initTest() {
        utilisateurs = createEntity(em);
    }

    @Test
    @Transactional
    public void createUtilisateurs() throws Exception {
        int databaseSizeBeforeCreate = utilisateursRepository.findAll().size();

        // Create the Utilisateurs
        restUtilisateursMockMvc.perform(post("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utilisateurs)))
            .andExpect(status().isCreated());

        // Validate the Utilisateurs in the database
        List<Utilisateurs> utilisateursList = utilisateursRepository.findAll();
        assertThat(utilisateursList).hasSize(databaseSizeBeforeCreate + 1);
        Utilisateurs testUtilisateurs = utilisateursList.get(utilisateursList.size() - 1);
        assertThat(testUtilisateurs.getNumRue()).isEqualTo(DEFAULT_NUM_RUE);
        assertThat(testUtilisateurs.getNomRue()).isEqualTo(DEFAULT_NOM_RUE);
        assertThat(testUtilisateurs.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testUtilisateurs.getCodePostal()).isEqualTo(DEFAULT_CODE_POSTAL);
        assertThat(testUtilisateurs.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
    }

    @Test
    @Transactional
    public void createUtilisateursWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = utilisateursRepository.findAll().size();

        // Create the Utilisateurs with an existing ID
        utilisateurs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUtilisateursMockMvc.perform(post("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utilisateurs)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateurs in the database
        List<Utilisateurs> utilisateursList = utilisateursRepository.findAll();
        assertThat(utilisateursList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUtilisateurs() throws Exception {
        // Initialize the database
        utilisateursRepository.saveAndFlush(utilisateurs);

        // Get all the utilisateursList
        restUtilisateursMockMvc.perform(get("/api/utilisateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utilisateurs.getId().intValue())))
            .andExpect(jsonPath("$.[*].numRue").value(hasItem(DEFAULT_NUM_RUE)))
            .andExpect(jsonPath("$.[*].nomRue").value(hasItem(DEFAULT_NOM_RUE.toString())))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE.toString())))
            .andExpect(jsonPath("$.[*].codePostal").value(hasItem(DEFAULT_CODE_POSTAL)))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())));
    }
    
    @Test
    @Transactional
    public void getUtilisateurs() throws Exception {
        // Initialize the database
        utilisateursRepository.saveAndFlush(utilisateurs);

        // Get the utilisateurs
        restUtilisateursMockMvc.perform(get("/api/utilisateurs/{id}", utilisateurs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(utilisateurs.getId().intValue()))
            .andExpect(jsonPath("$.numRue").value(DEFAULT_NUM_RUE))
            .andExpect(jsonPath("$.nomRue").value(DEFAULT_NOM_RUE.toString()))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE.toString()))
            .andExpect(jsonPath("$.codePostal").value(DEFAULT_CODE_POSTAL))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUtilisateurs() throws Exception {
        // Get the utilisateurs
        restUtilisateursMockMvc.perform(get("/api/utilisateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUtilisateurs() throws Exception {
        // Initialize the database
        utilisateursRepository.saveAndFlush(utilisateurs);

        int databaseSizeBeforeUpdate = utilisateursRepository.findAll().size();

        // Update the utilisateurs
        Utilisateurs updatedUtilisateurs = utilisateursRepository.findById(utilisateurs.getId()).get();
        // Disconnect from session so that the updates on updatedUtilisateurs are not directly saved in db
        em.detach(updatedUtilisateurs);
        updatedUtilisateurs
            .numRue(UPDATED_NUM_RUE)
            .nomRue(UPDATED_NOM_RUE)
            .ville(UPDATED_VILLE)
            .codePostal(UPDATED_CODE_POSTAL)
            .dateNaissance(UPDATED_DATE_NAISSANCE);

        restUtilisateursMockMvc.perform(put("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUtilisateurs)))
            .andExpect(status().isOk());

        // Validate the Utilisateurs in the database
        List<Utilisateurs> utilisateursList = utilisateursRepository.findAll();
        assertThat(utilisateursList).hasSize(databaseSizeBeforeUpdate);
        Utilisateurs testUtilisateurs = utilisateursList.get(utilisateursList.size() - 1);
        assertThat(testUtilisateurs.getNumRue()).isEqualTo(UPDATED_NUM_RUE);
        assertThat(testUtilisateurs.getNomRue()).isEqualTo(UPDATED_NOM_RUE);
        assertThat(testUtilisateurs.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testUtilisateurs.getCodePostal()).isEqualTo(UPDATED_CODE_POSTAL);
        assertThat(testUtilisateurs.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingUtilisateurs() throws Exception {
        int databaseSizeBeforeUpdate = utilisateursRepository.findAll().size();

        // Create the Utilisateurs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUtilisateursMockMvc.perform(put("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utilisateurs)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateurs in the database
        List<Utilisateurs> utilisateursList = utilisateursRepository.findAll();
        assertThat(utilisateursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUtilisateurs() throws Exception {
        // Initialize the database
        utilisateursRepository.saveAndFlush(utilisateurs);

        int databaseSizeBeforeDelete = utilisateursRepository.findAll().size();

        // Delete the utilisateurs
        restUtilisateursMockMvc.perform(delete("/api/utilisateurs/{id}", utilisateurs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Utilisateurs> utilisateursList = utilisateursRepository.findAll();
        assertThat(utilisateursList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Utilisateurs.class);
        Utilisateurs utilisateurs1 = new Utilisateurs();
        utilisateurs1.setId(1L);
        Utilisateurs utilisateurs2 = new Utilisateurs();
        utilisateurs2.setId(utilisateurs1.getId());
        assertThat(utilisateurs1).isEqualTo(utilisateurs2);
        utilisateurs2.setId(2L);
        assertThat(utilisateurs1).isNotEqualTo(utilisateurs2);
        utilisateurs1.setId(null);
        assertThat(utilisateurs1).isNotEqualTo(utilisateurs2);
    }
}
