package com.uga.ecom.web.rest;

import com.uga.ecom.AubApp;
import com.uga.ecom.domain.Paniers;
import com.uga.ecom.repository.PaniersRepository;
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
import java.util.List;

import static com.uga.ecom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PaniersResource} REST controller.
 */
@SpringBootTest(classes = AubApp.class)
public class PaniersResourceIT {

    @Autowired
    private PaniersRepository paniersRepository;

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

    private MockMvc restPaniersMockMvc;

    private Paniers paniers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaniersResource paniersResource = new PaniersResource(paniersRepository);
        this.restPaniersMockMvc = MockMvcBuilders.standaloneSetup(paniersResource)
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
    public static Paniers createEntity(EntityManager em) {
        Paniers paniers = new Paniers();
        return paniers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paniers createUpdatedEntity(EntityManager em) {
        Paniers paniers = new Paniers();
        return paniers;
    }

    @BeforeEach
    public void initTest() {
        paniers = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaniers() throws Exception {
        int databaseSizeBeforeCreate = paniersRepository.findAll().size();

        // Create the Paniers
        restPaniersMockMvc.perform(post("/api/paniers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paniers)))
            .andExpect(status().isCreated());

        // Validate the Paniers in the database
        List<Paniers> paniersList = paniersRepository.findAll();
        assertThat(paniersList).hasSize(databaseSizeBeforeCreate + 1);
        Paniers testPaniers = paniersList.get(paniersList.size() - 1);
    }

    @Test
    @Transactional
    public void createPaniersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paniersRepository.findAll().size();

        // Create the Paniers with an existing ID
        paniers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaniersMockMvc.perform(post("/api/paniers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paniers)))
            .andExpect(status().isBadRequest());

        // Validate the Paniers in the database
        List<Paniers> paniersList = paniersRepository.findAll();
        assertThat(paniersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPaniers() throws Exception {
        // Initialize the database
        paniersRepository.saveAndFlush(paniers);

        // Get all the paniersList
        restPaniersMockMvc.perform(get("/api/paniers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paniers.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPaniers() throws Exception {
        // Initialize the database
        paniersRepository.saveAndFlush(paniers);

        // Get the paniers
        restPaniersMockMvc.perform(get("/api/paniers/{id}", paniers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paniers.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPaniers() throws Exception {
        // Get the paniers
        restPaniersMockMvc.perform(get("/api/paniers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaniers() throws Exception {
        // Initialize the database
        paniersRepository.saveAndFlush(paniers);

        int databaseSizeBeforeUpdate = paniersRepository.findAll().size();

        // Update the paniers
        Paniers updatedPaniers = paniersRepository.findById(paniers.getId()).get();
        // Disconnect from session so that the updates on updatedPaniers are not directly saved in db
        em.detach(updatedPaniers);

        restPaniersMockMvc.perform(put("/api/paniers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaniers)))
            .andExpect(status().isOk());

        // Validate the Paniers in the database
        List<Paniers> paniersList = paniersRepository.findAll();
        assertThat(paniersList).hasSize(databaseSizeBeforeUpdate);
        Paniers testPaniers = paniersList.get(paniersList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPaniers() throws Exception {
        int databaseSizeBeforeUpdate = paniersRepository.findAll().size();

        // Create the Paniers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaniersMockMvc.perform(put("/api/paniers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paniers)))
            .andExpect(status().isBadRequest());

        // Validate the Paniers in the database
        List<Paniers> paniersList = paniersRepository.findAll();
        assertThat(paniersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaniers() throws Exception {
        // Initialize the database
        paniersRepository.saveAndFlush(paniers);

        int databaseSizeBeforeDelete = paniersRepository.findAll().size();

        // Delete the paniers
        restPaniersMockMvc.perform(delete("/api/paniers/{id}", paniers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Paniers> paniersList = paniersRepository.findAll();
        assertThat(paniersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paniers.class);
        Paniers paniers1 = new Paniers();
        paniers1.setId(1L);
        Paniers paniers2 = new Paniers();
        paniers2.setId(paniers1.getId());
        assertThat(paniers1).isEqualTo(paniers2);
        paniers2.setId(2L);
        assertThat(paniers1).isNotEqualTo(paniers2);
        paniers1.setId(null);
        assertThat(paniers1).isNotEqualTo(paniers2);
    }
}
