package com.uga.ecom.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Utilisateurs.
 */
@Entity
@Table(name = "utilisateurs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Utilisateurs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "num_rue")
    private Integer numRue;

    @Column(name = "nom_rue")
    private String nomRue;

    @Column(name = "ville")
    private String ville;

    @Column(name = "code_postal")
    private Integer codePostal;

    @Column(name = "date_naissance")
    private Instant dateNaissance;

    @OneToOne
    @JoinColumn(unique = true)
    private Paniers paniers;

    @OneToMany(mappedBy = "utilisateurs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Commandes> commandes = new HashSet<>();

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumRue() {
        return numRue;
    }

    public Utilisateurs numRue(Integer numRue) {
        this.numRue = numRue;
        return this;
    }

    public void setNumRue(Integer numRue) {
        this.numRue = numRue;
    }

    public String getNomRue() {
        return nomRue;
    }

    public Utilisateurs nomRue(String nomRue) {
        this.nomRue = nomRue;
        return this;
    }

    public void setNomRue(String nomRue) {
        this.nomRue = nomRue;
    }

    public String getVille() {
        return ville;
    }

    public Utilisateurs ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Integer getCodePostal() {
        return codePostal;
    }

    public Utilisateurs codePostal(Integer codePostal) {
        this.codePostal = codePostal;
        return this;
    }

    public void setCodePostal(Integer codePostal) {
        this.codePostal = codePostal;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public Utilisateurs dateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Paniers getPaniers() {
        return paniers;
    }

    public Utilisateurs paniers(Paniers paniers) {
        this.paniers = paniers;
        return this;
    }

    public void setPaniers(Paniers paniers) {
        this.paniers = paniers;
    }

    public Set<Commandes> getCommandes() {
        return commandes;
    }

    public Utilisateurs commandes(Set<Commandes> commandes) {
        this.commandes = commandes;
        return this;
    }

    public Utilisateurs addCommandes(Commandes commandes) {
        this.commandes.add(commandes);
        commandes.setUtilisateurs(this);
        return this;
    }

    public Utilisateurs removeCommandes(Commandes commandes) {
        this.commandes.remove(commandes);
        commandes.setUtilisateurs(null);
        return this;
    }

    public void setCommandes(Set<Commandes> commandes) {
        this.commandes = commandes;
    }

    public User getUser() {
        return user;
    }

    public Utilisateurs user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Utilisateurs)) {
            return false;
        }
        return id != null && id.equals(((Utilisateurs) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Utilisateurs{" +
            "id=" + getId() +
            ", numRue=" + getNumRue() +
            ", nomRue='" + getNomRue() + "'" +
            ", ville='" + getVille() + "'" +
            ", codePostal=" + getCodePostal() +
            ", dateNaissance='" + getDateNaissance() + "'" +
            "}";
    }
}
