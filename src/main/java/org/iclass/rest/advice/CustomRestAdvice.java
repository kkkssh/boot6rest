package org.iclass.rest.advice;

import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
@Log4j2
public class CustomRestAdvice {
    //RestController 에서 발생하는 예외를 json 형식으로 전달하기
    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    public ResponseEntity<Map<String, String>> handleBindException(BindException e) {
        log.error(e);
        Map<String, String> errorMap = new HashMap<>();
        if (e.hasErrors()) {
            BindingResult bindingResult = e.getBindingResult();
            bindingResult.getFieldErrors().forEach(fieldError -> {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            });

        }
            return ResponseEntity.badRequest().body(errorMap);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    public ResponseEntity<Map<String,String>> handlerFKException(Exception e){
        log.error(e);
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("time", " " + System.currentTimeMillis());
        errorMap.put("message", "테이블 제약조건 위반입니다.");
        return ResponseEntity.badRequest().body(errorMap);

    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    public ResponseEntity<Map<String,String>> handlerNoSuchEleException(NoSuchElementException e){
        log.error(e);
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("time", " " + System.currentTimeMillis());
        errorMap.put("message", "존재하지 않는 리소스 입니다.");
        return ResponseEntity.badRequest().body(errorMap);

    }
}
