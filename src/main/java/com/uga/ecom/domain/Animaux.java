package com.uga.ecom.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import com.uga.ecom.domain.enumeration.AnimalStatut;

import com.uga.ecom.domain.enumeration.TypeAnimal;

import com.uga.ecom.domain.enumeration.Sexe;

import com.uga.ecom.domain.enumeration.Fertilite;

/**
 * A Animaux.
 */
@Entity
@Table(name = "animaux")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Animaux implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "age")
    private Integer age;

    @Column(name = "prix")
    private Integer prix;

    @Lob
    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private AnimalStatut statut;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_animal")
    private TypeAnimal typeAnimal;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexe")
    private Sexe sexe;

    @Column(name = "poids")
    private Integer poids;

    @Enumerated(EnumType.STRING)
    @Column(name = "fertilite")
    private Fertilite fertilite;

    @Column(name = "date_ajout")
    private Instant dateAjout;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @ManyToOne
    @JsonIgnoreProperties("animauxes")
    private Paniers paniers;

    @ManyToOne
    @JsonIgnoreProperties("animauxes")
    private Commandes commandes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Animaux nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getAge() {
        return age;
    }

    public Animaux age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getPrix() {
        return prix;
    }

    public Animaux prix(Integer prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public Animaux description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AnimalStatut getStatut() {
        return statut;
    }

    public Animaux statut(AnimalStatut statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(AnimalStatut statut) {
        this.statut = statut;
    }

    public TypeAnimal getTypeAnimal() {
        return typeAnimal;
    }

    public Animaux typeAnimal(TypeAnimal typeAnimal) {
        this.typeAnimal = typeAnimal;
        return this;
    }

    public void setTypeAnimal(TypeAnimal typeAnimal) {
        this.typeAnimal = typeAnimal;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public Animaux sexe(Sexe sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public Integer getPoids() {
        return poids;
    }

    public Animaux poids(Integer poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Integer poids) {
        this.poids = poids;
    }

    public Fertilite getFertilite() {
        return fertilite;
    }

    public Animaux fertilite(Fertilite fertilite) {
        this.fertilite = fertilite;
        return this;
    }

    public void setFertilite(Fertilite fertilite) {
        this.fertilite = fertilite;
    }

    public Instant getDateAjout() {
        return dateAjout;
    }

    public Animaux dateAjout(Instant dateAjout) {
        this.dateAjout = dateAjout;
        return this;
    }

    public void setDateAjout(Instant dateAjout) {
        this.dateAjout = dateAjout;
    }

    public byte[] getImage() {
        return image;
    }

    public Animaux image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Animaux imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Paniers getPaniers() {
        return paniers;
    }

    public Animaux paniers(Paniers paniers) {
        this.paniers = paniers;
        return this;
    }

    public void setPaniers(Paniers paniers) {
        this.paniers = paniers;
    }

    public Commandes getCommandes() {
        return commandes;
    }

    public Animaux commandes(Commandes commandes) {
        this.commandes = commandes;
        return this;
    }

    public void setCommandes(Commandes commandes) {
        this.commandes = commandes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Animaux)) {
            return false;
        }
        return id != null && id.equals(((Animaux) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Animaux{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", age=" + getAge() +
            ", prix=" + getPrix() +
            ", description='" + getDescription() + "'" +
            ", statut='" + getStatut() + "'" +
            ", typeAnimal='" + getTypeAnimal() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", poids=" + getPoids() +
            ", fertilite='" + getFertilite() + "'" +
            ", dateAjout='" + getDateAjout() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
