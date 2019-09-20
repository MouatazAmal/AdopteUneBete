package com.uga.ecom.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.uga.ecom.domain.enumeration.CommandeStatut;

/**
 * A Commandes.
 */
@Entity
@Table(name = "commandes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Commandes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_commande")
    private Instant dateCommande;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private CommandeStatut statut;

    @OneToMany(mappedBy = "commandes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Animaux> animauxes = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("commandes")
    private Utilisateurs utilisateurs;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateCommande() {
        return dateCommande;
    }

    public Commandes dateCommande(Instant dateCommande) {
        this.dateCommande = dateCommande;
        return this;
    }

    public void setDateCommande(Instant dateCommande) {
        this.dateCommande = dateCommande;
    }

    public CommandeStatut getStatut() {
        return statut;
    }

    public Commandes statut(CommandeStatut statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(CommandeStatut statut) {
        this.statut = statut;
    }

    public Set<Animaux> getAnimauxes() {
        return animauxes;
    }

    public Commandes animauxes(Set<Animaux> animauxes) {
        this.animauxes = animauxes;
        return this;
    }

    public Commandes addAnimaux(Animaux animaux) {
        this.animauxes.add(animaux);
        animaux.setCommandes(this);
        return this;
    }

    public Commandes removeAnimaux(Animaux animaux) {
        this.animauxes.remove(animaux);
        animaux.setCommandes(null);
        return this;
    }

    public void setAnimauxes(Set<Animaux> animauxes) {
        this.animauxes = animauxes;
    }

    public Utilisateurs getUtilisateurs() {
        return utilisateurs;
    }

    public Commandes utilisateurs(Utilisateurs utilisateurs) {
        this.utilisateurs = utilisateurs;
        return this;
    }

    public void setUtilisateurs(Utilisateurs utilisateurs) {
        this.utilisateurs = utilisateurs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commandes)) {
            return false;
        }
        return id != null && id.equals(((Commandes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Commandes{" +
            "id=" + getId() +
            ", dateCommande='" + getDateCommande() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
