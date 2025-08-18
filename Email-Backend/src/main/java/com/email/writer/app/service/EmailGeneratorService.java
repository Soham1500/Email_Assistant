package com.email.writer.app.service;

import com.email.writer.app.entity.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.url}")
    private String geminiApiUrl;

    @Value("${gemini.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        try {
            String prompt = buildPrompt(emailRequest);

            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(Map.of(
                            "parts", List.of(Map.of("text", prompt))
                    ))
            );

            // Fetch the response as raw bytes
            byte[] responseBytes = webClient.post()
                    .uri(geminiApiUrl + "?key=" + geminiApiKey)
                    .header("Content-Type", "application/json;charset=UTF-8")
                    .accept(MediaType.APPLICATION_JSON)
                    .acceptCharset(StandardCharsets.UTF_8)
                    .bodyValue(requestBody)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, clientResponse ->
                            clientResponse.bodyToMono(String.class)
                                    .flatMap(error -> Mono.error(new RuntimeException("Gemini API error: " + error))))
                    .bodyToMono(byte[].class) // We need the raw bytes to decode them
                    .block();

            // Explicitly decode the raw bytes using UTF-8
            String response = new String(responseBytes, StandardCharsets.UTF_8);

            return extractResponseContent(response);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate email reply", e);
        }
    }

    private String extractResponseContent(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);

            JsonNode textNode = rootNode.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text");

            if (textNode.isMissingNode()) {
                throw new RuntimeException("Unexpected Gemini API response format");
            }

            return textNode.asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response", e);
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. ");
        prompt.append("Don't include a subject line. ");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
        }

        prompt.append("\n\nOriginal email:\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}