package com.uga.ecom.exception;

public class NotFoundAnimal extends RuntimeException {

    public NotFoundAnimal(Long id) {
        super("Not Found animal : " +id );
    }
}
