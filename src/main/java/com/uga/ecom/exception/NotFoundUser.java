package com.uga.ecom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundUser extends RuntimeException {
    public NotFoundUser(Long id) {
        super("Le User n'a pas été trouvé" + id);
    }
}
