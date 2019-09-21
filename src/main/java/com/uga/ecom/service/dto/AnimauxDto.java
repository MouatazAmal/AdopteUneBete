package com.uga.ecom.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.uga.ecom.domain.Commandes;
import com.uga.ecom.domain.enumeration.AnimalStatut;
import com.uga.ecom.domain.enumeration.Fertilite;
import com.uga.ecom.domain.enumeration.Sexe;
import com.uga.ecom.domain.enumeration.TypeAnimal;
import io.swagger.models.auth.In;

import java.time.Instant;

public class AnimauxDto {

    private Long id;

    private String nom;

    private Integer age;

    private Integer prix;

    private String description;

    private AnimalStatut statut;

    private TypeAnimal typeAnimal;

    private Sexe sexe;

    private Integer poids;

    private Fertilite fertilite;

    private Instant dateAjout;

    private byte[] image;

    private String imageContentType;

    private Long paniers;

    private Long commandes;

    public AnimauxDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getPrix() {
        return prix;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AnimalStatut getStatut() {
        return statut;
    }

    public void setStatut(AnimalStatut statut) {
        this.statut = statut;
    }

    public TypeAnimal getTypeAnimal() {
        return typeAnimal;
    }

    public void setTypeAnimal(TypeAnimal typeAnimal) {
        this.typeAnimal = typeAnimal;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public Integer getPoids() {
        return poids;
    }

    public void setPoids(Integer poids) {
        this.poids = poids;
    }

    public Fertilite getFertilite() {
        return fertilite;
    }

    public void setFertilite(Fertilite fertilite) {
        this.fertilite = fertilite;
    }

    public Instant getDateAjout() {
        return dateAjout;
    }

    public void setDateAjout(Instant dateAjout) {
        this.dateAjout = dateAjout;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Long getPaniers() {
        return paniers;
    }

    public void setPaniers(Long paniers) {
        this.paniers = paniers;
    }

    public Long getCommandes() {
        return commandes;
    }

    public void setCommandes(Long commandes) {
        this.commandes = commandes;
    }
}
