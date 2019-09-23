package com.uga.ecom.service.dto;

import java.util.Set;

public class PanierDto {

    private Long id;

    private Set<Long> animauxes;

    public PanierDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Long> getAnimauxes() {
        return animauxes;
    }

    public void setAnimauxes(Set<Long> animauxes) {
        this.animauxes = animauxes;
    }
}
