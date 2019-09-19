package com.uga.ecom.web.rest.errors;

import com.uga.ecom.domain.enumeration.Fertilite;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotExistingFertiliteException extends RuntimeException {

    public NotExistingFertiliteException(Fertilite fertilite) {
        super("ce type de fertilité n'existe pas : "+ fertilite);
    }
}
