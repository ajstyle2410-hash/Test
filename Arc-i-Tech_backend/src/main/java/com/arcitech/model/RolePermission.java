package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "role_permissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolePermission {
    @EmbeddedId
    private RolePermissionKey id;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RolePermissionKey implements java.io.Serializable {
        private Integer roleId;
        private Integer permissionId;
    }
}
