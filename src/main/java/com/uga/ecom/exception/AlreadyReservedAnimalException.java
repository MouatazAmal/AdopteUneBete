package com.uga.ecom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AlreadyReservedAnimalException extends RuntimeException {

    public AlreadyReservedAnimalException(Long id) {
        super("L'animal est déja reservé : " + id);
    }
}
