package com.uga.ecom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundCommandeException extends RuntimeException {

    public NotFoundCommandeException(Long id) {
        super("La commande n'a pas été trouvé" + id);
    }
}
