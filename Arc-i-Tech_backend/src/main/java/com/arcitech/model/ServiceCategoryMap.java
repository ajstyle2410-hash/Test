package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_category_map")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceCategoryMap {
    @EmbeddedId
    private ServiceCategoryMapKey id;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceCategoryMapKey implements java.io.Serializable {
        private Long serviceId;
        private Integer categoryId;
    }
}
