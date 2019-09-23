package com.uga.ecom.exception;

public class NotFoundPaniersException extends RuntimeException {

    public NotFoundPaniersException(Long id) {
        super("le panier où est affectée cet animal n'existe pas : "+ id);
    }
}
