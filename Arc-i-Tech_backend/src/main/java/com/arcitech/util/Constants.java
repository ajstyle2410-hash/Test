package com.arcitech.util;

/**
 * Application-wide constants.
 * Avoids magic strings and improves maintainability.
 */
public final class Constants {

    private Constants() {
        throw new IllegalStateException("Utility class");
    }

    // =====================
    // === ROLE KEYS =======
    // =====================
    public static final String ROLE_CUSTOMER = "ROLE_CUSTOMER";
    public static final String ROLE_DEVELOPER = "ROLE_DEVELOPER";
    public static final String ROLE_SUB_ADMIN = "ROLE_SUB_ADMIN";
    public static final String ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN";

    // =====================
    // === JWT KEYS ========
    // =====================
    public static final String AUTH_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";

    // =====================
    // === STATUS VALUES ===
    // =====================
    public static final String STATUS_APPROVED = "APPROVED";
    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_REJECTED = "REJECTED";

    // =====================
    // === PROJECT STATUS ===
    // =====================
    public static final String PROJECT_PLANNING = "PLANNING";
    public static final String PROJECT_DEV = "IN_DEVELOPMENT";
    public static final String PROJECT_TESTING = "TESTING";
    public static final String PROJECT_DEPLOYED = "DEPLOYED";
    public static final String PROJECT_HOLD = "ON_HOLD";

    // =====================
    // === DEFAULT MESSAGES ==
    // =====================
    public static final String MSG_PROJECT_NOT_FOUND = "Project not found";
    public static final String MSG_USER_NOT_FOUND = "User not found";
    public static final String MSG_INQUIRY_NOT_FOUND = "Inquiry not found";
    public static final String MSG_TASK_NOT_FOUND = "Task not found";
    public static final String MSG_NOTIFICATION_NOT_FOUND = "Notification not found";

    // =====================
    // === DATE FORMATS =====
    // =====================
    public static final String DATE_FORMAT_DISPLAY = "dd-MM-yyyy HH:mm";
    public static final String DATE_FORMAT_ISO = "yyyy-MM-dd'T'HH:mm:ss";
}
