package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private Long userId;

    private Long serviceId;

    private String orderStatus;

    @Column(precision = 10, scale = 2)
    private BigDecimal priceAtPurchase;

    private LocalDateTime createdAt;

    private String instanceType; // polymorphic type
    private Long instanceId; // polymorphic id
}
