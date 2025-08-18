package com.email.writer.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data   // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder // enables EmailRequest.builder()
public class EmailRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailContent;
    private String tone;
}
