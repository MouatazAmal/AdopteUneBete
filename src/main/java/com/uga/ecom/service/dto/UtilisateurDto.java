package com.uga.ecom.service.dto;

import java.time.Instant;
import java.util.Set;

public class UtilisateurDto {

    private Long id;

    private Integer numRue;

    private String nomRue;

    private String ville;

    private Integer codePostal;

    private Instant dateNaissance;

    private Long paniers;

    private Set<Long> commandes;

    private Long user;

    public UtilisateurDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumRue() {
        return numRue;
    }

    public void setNumRue(Integer numRue) {
        this.numRue = numRue;
    }

    public String getNomRue() {
        return nomRue;
    }

    public void setNomRue(String nomRue) {
        this.nomRue = nomRue;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Integer getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(Integer codePostal) {
        this.codePostal = codePostal;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Long getPaniers() {
        return paniers;
    }

    public void setPaniers(Long paniers) {
        this.paniers = paniers;
    }

    public Set<Long> getCommandes() {
        return commandes;
    }

    public void setCommandes(Set<Long> commandes) {
        this.commandes = commandes;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }
}
