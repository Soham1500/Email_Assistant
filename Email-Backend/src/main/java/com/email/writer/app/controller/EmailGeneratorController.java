package com.email.writer.app.controller;

import com.email.writer.app.entity.EmailRequest;
import com.email.writer.app.service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/email")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping(value = "/generate",
            produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<Map<String, String>> generateEmail(@RequestBody EmailRequest emailRequest) {
        String aiReply = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("response", aiReply));
    }

    // Optional: Test endpoint with default email content and tone
    @GetMapping(value = "/test",
            produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<Map<String, String>> defaultGenerate() {
        EmailRequest defaultRequest = new EmailRequest();
        defaultRequest.setEmailContent("Can you confirm the meeting schedule?");
        defaultRequest.setTone("professional");

        String response = emailGeneratorService.generateEmailReply(defaultRequest);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("response", response));
    }
}