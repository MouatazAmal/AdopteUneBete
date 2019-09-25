package com.uga.ecom.exception;

public class NotFoundAnimalException extends RuntimeException {

    public NotFoundAnimalException(Long id) {
        super("Not Found animal : " +id );
    }
}
