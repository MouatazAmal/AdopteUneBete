package com.uga.ecom.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Paniers.
 */
@Entity
@Table(name = "paniers")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Paniers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "paniers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Animaux> animauxes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Animaux> getAnimauxes() {
        return animauxes;
    }

    public Paniers animauxes(Set<Animaux> animauxes) {
        this.animauxes = animauxes;
        return this;
    }

    public Paniers addAnimaux(Animaux animaux) {
        this.animauxes.add(animaux);
        animaux.setPaniers(this);
        return this;
    }

    public Paniers removeAnimaux(Animaux animaux) {
        this.animauxes.remove(animaux);
        animaux.setPaniers(null);
        return this;
    }

    public void setAnimauxes(Set<Animaux> animauxes) {
        this.animauxes = animauxes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Paniers)) {
            return false;
        }
        return id != null && id.equals(((Paniers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Paniers{" +
            "id=" + getId() +
            "}";
    }
}
