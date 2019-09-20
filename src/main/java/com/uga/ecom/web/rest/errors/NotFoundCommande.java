package com.uga.ecom.web.rest.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundCommande extends RuntimeException {

    public NotFoundCommande(Long id) {
        super("La commande n'a pas été trouvé" + id);
    }
}
