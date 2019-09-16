package com.uga.ecom.web.rest;

import com.uga.ecom.AubApp;
import com.uga.ecom.domain.Animaux;
import com.uga.ecom.repository.AnimauxRepository;
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
import org.springframework.util.Base64Utils;
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

import com.uga.ecom.domain.enumeration.AnimalStatut;
import com.uga.ecom.domain.enumeration.TypeAnimal;
import com.uga.ecom.domain.enumeration.Sexe;
import com.uga.ecom.domain.enumeration.Fertilite;
/**
 * Integration tests for the {@link AnimauxResource} REST controller.
 */
@SpringBootTest(classes = AubApp.class)
public class AnimauxResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;
    private static final Integer SMALLER_AGE = 1 - 1;

    private static final Integer DEFAULT_PRIX = 1;
    private static final Integer UPDATED_PRIX = 2;
    private static final Integer SMALLER_PRIX = 1 - 1;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final AnimalStatut DEFAULT_STATUT = AnimalStatut.DISPONIBLE;
    private static final AnimalStatut UPDATED_STATUT = AnimalStatut.RESERVE;

    private static final TypeAnimal DEFAULT_TYPE_ANIMAL = TypeAnimal.POISSON;
    private static final TypeAnimal UPDATED_TYPE_ANIMAL = TypeAnimal.REPTILE;

    private static final Sexe DEFAULT_SEXE = Sexe.MALE;
    private static final Sexe UPDATED_SEXE = Sexe.FEMELLE;

    private static final Integer DEFAULT_POIDS = 1;
    private static final Integer UPDATED_POIDS = 2;
    private static final Integer SMALLER_POIDS = 1 - 1;

    private static final Fertilite DEFAULT_FERTILITE = Fertilite.STERILE;
    private static final Fertilite UPDATED_FERTILITE = Fertilite.CASTRE;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_DATE_AJOUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_AJOUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE_AJOUT = Instant.ofEpochMilli(-1L);

    @Autowired
    private AnimauxRepository animauxRepository;

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

    private MockMvc restAnimauxMockMvc;

    private Animaux animaux;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnimauxResource animauxResource = new AnimauxResource(animauxRepository);
        this.restAnimauxMockMvc = MockMvcBuilders.standaloneSetup(animauxResource)
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
    public static Animaux createEntity(EntityManager em) {
        Animaux animaux = new Animaux()
            .nom(DEFAULT_NOM)
            .age(DEFAULT_AGE)
            .prix(DEFAULT_PRIX)
            .description(DEFAULT_DESCRIPTION)
            .statut(DEFAULT_STATUT)
            .typeAnimal(DEFAULT_TYPE_ANIMAL)
            .sexe(DEFAULT_SEXE)
            .poids(DEFAULT_POIDS)
            .fertilite(DEFAULT_FERTILITE)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .dateAjout(DEFAULT_DATE_AJOUT);
        return animaux;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Animaux createUpdatedEntity(EntityManager em) {
        Animaux animaux = new Animaux()
            .nom(UPDATED_NOM)
            .age(UPDATED_AGE)
            .prix(UPDATED_PRIX)
            .description(UPDATED_DESCRIPTION)
            .statut(UPDATED_STATUT)
            .typeAnimal(UPDATED_TYPE_ANIMAL)
            .sexe(UPDATED_SEXE)
            .poids(UPDATED_POIDS)
            .fertilite(UPDATED_FERTILITE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .dateAjout(UPDATED_DATE_AJOUT);
        return animaux;
    }

    @BeforeEach
    public void initTest() {
        animaux = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnimaux() throws Exception {
        int databaseSizeBeforeCreate = animauxRepository.findAll().size();

        // Create the Animaux
        restAnimauxMockMvc.perform(post("/api/animauxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(animaux)))
            .andExpect(status().isCreated());

        // Validate the Animaux in the database
        List<Animaux> animauxList = animauxRepository.findAll();
        assertThat(animauxList).hasSize(databaseSizeBeforeCreate + 1);
        Animaux testAnimaux = animauxList.get(animauxList.size() - 1);
        assertThat(testAnimaux.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAnimaux.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testAnimaux.getPrix()).isEqualTo(DEFAULT_PRIX);
        assertThat(testAnimaux.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAnimaux.getStatut()).isEqualTo(DEFAULT_STATUT);
        assertThat(testAnimaux.getTypeAnimal()).isEqualTo(DEFAULT_TYPE_ANIMAL);
        assertThat(testAnimaux.getSexe()).isEqualTo(DEFAULT_SEXE);
        assertThat(testAnimaux.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testAnimaux.getFertilite()).isEqualTo(DEFAULT_FERTILITE);
        assertThat(testAnimaux.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testAnimaux.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testAnimaux.getDateAjout()).isEqualTo(DEFAULT_DATE_AJOUT);
    }

    @Test
    @Transactional
    public void createAnimauxWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = animauxRepository.findAll().size();

        // Create the Animaux with an existing ID
        animaux.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnimauxMockMvc.perform(post("/api/animauxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(animaux)))
            .andExpect(status().isBadRequest());

        // Validate the Animaux in the database
        List<Animaux> animauxList = animauxRepository.findAll();
        assertThat(animauxList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAnimauxes() throws Exception {
        // Initialize the database
        animauxRepository.saveAndFlush(animaux);

        // Get all the animauxList
        restAnimauxMockMvc.perform(get("/api/animauxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(animaux.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].typeAnimal").value(hasItem(DEFAULT_TYPE_ANIMAL.toString())))
            .andExpect(jsonPath("$.[*].sexe").value(hasItem(DEFAULT_SEXE.toString())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS)))
            .andExpect(jsonPath("$.[*].fertilite").value(hasItem(DEFAULT_FERTILITE.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].dateAjout").value(hasItem(DEFAULT_DATE_AJOUT.toString())));
    }
    
    @Test
    @Transactional
    public void getAnimaux() throws Exception {
        // Initialize the database
        animauxRepository.saveAndFlush(animaux);

        // Get the animaux
        restAnimauxMockMvc.perform(get("/api/animauxes/{id}", animaux.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(animaux.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()))
            .andExpect(jsonPath("$.typeAnimal").value(DEFAULT_TYPE_ANIMAL.toString()))
            .andExpect(jsonPath("$.sexe").value(DEFAULT_SEXE.toString()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS))
            .andExpect(jsonPath("$.fertilite").value(DEFAULT_FERTILITE.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.dateAjout").value(DEFAULT_DATE_AJOUT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnimaux() throws Exception {
        // Get the animaux
        restAnimauxMockMvc.perform(get("/api/animauxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnimaux() throws Exception {
        // Initialize the database
        animauxRepository.saveAndFlush(animaux);

        int databaseSizeBeforeUpdate = animauxRepository.findAll().size();

        // Update the animaux
        Animaux updatedAnimaux = animauxRepository.findById(animaux.getId()).get();
        // Disconnect from session so that the updates on updatedAnimaux are not directly saved in db
        em.detach(updatedAnimaux);
        updatedAnimaux
            .nom(UPDATED_NOM)
            .age(UPDATED_AGE)
            .prix(UPDATED_PRIX)
            .description(UPDATED_DESCRIPTION)
            .statut(UPDATED_STATUT)
            .typeAnimal(UPDATED_TYPE_ANIMAL)
            .sexe(UPDATED_SEXE)
            .poids(UPDATED_POIDS)
            .fertilite(UPDATED_FERTILITE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .dateAjout(UPDATED_DATE_AJOUT);

        restAnimauxMockMvc.perform(put("/api/animauxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnimaux)))
            .andExpect(status().isOk());

        // Validate the Animaux in the database
        List<Animaux> animauxList = animauxRepository.findAll();
        assertThat(animauxList).hasSize(databaseSizeBeforeUpdate);
        Animaux testAnimaux = animauxList.get(animauxList.size() - 1);
        assertThat(testAnimaux.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAnimaux.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testAnimaux.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testAnimaux.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAnimaux.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testAnimaux.getTypeAnimal()).isEqualTo(UPDATED_TYPE_ANIMAL);
        assertThat(testAnimaux.getSexe()).isEqualTo(UPDATED_SEXE);
        assertThat(testAnimaux.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testAnimaux.getFertilite()).isEqualTo(UPDATED_FERTILITE);
        assertThat(testAnimaux.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testAnimaux.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testAnimaux.getDateAjout()).isEqualTo(UPDATED_DATE_AJOUT);
    }

    @Test
    @Transactional
    public void updateNonExistingAnimaux() throws Exception {
        int databaseSizeBeforeUpdate = animauxRepository.findAll().size();

        // Create the Animaux

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnimauxMockMvc.perform(put("/api/animauxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(animaux)))
            .andExpect(status().isBadRequest());

        // Validate the Animaux in the database
        List<Animaux> animauxList = animauxRepository.findAll();
        assertThat(animauxList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnimaux() throws Exception {
        // Initialize the database
        animauxRepository.saveAndFlush(animaux);

        int databaseSizeBeforeDelete = animauxRepository.findAll().size();

        // Delete the animaux
        restAnimauxMockMvc.perform(delete("/api/animauxes/{id}", animaux.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Animaux> animauxList = animauxRepository.findAll();
        assertThat(animauxList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Animaux.class);
        Animaux animaux1 = new Animaux();
        animaux1.setId(1L);
        Animaux animaux2 = new Animaux();
        animaux2.setId(animaux1.getId());
        assertThat(animaux1).isEqualTo(animaux2);
        animaux2.setId(2L);
        assertThat(animaux1).isNotEqualTo(animaux2);
        animaux1.setId(null);
        assertThat(animaux1).isNotEqualTo(animaux2);
    }
}
