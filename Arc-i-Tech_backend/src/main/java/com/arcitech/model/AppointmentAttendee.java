package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "appointment_attendees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentAttendee {
    @EmbeddedId
    private AppointmentAttendeeKey id;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AppointmentAttendeeKey implements java.io.Serializable {
        private Long appointmentId;
        private Long userId;
    }
}
