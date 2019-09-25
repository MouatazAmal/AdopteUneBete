package com.uga.ecom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundUserException extends RuntimeException {

    public NotFoundUserException(Long id) {
        super("Le User n'a pas été trouvé" + id);
    }

    public NotFoundUserException(String login) {
        super("Le User n'a pas été trouvé" + login);
    }
}
