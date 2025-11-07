package com.arcitech.util;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * Utility class for date/time conversions and formatting.
 * Standardizes all date handling across services and entities.
 */
public class DateUtils {

    private static final ZoneId DEFAULT_ZONE = ZoneId.systemDefault();
    private static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
    private static final DateTimeFormatter DISPLAY_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

    private DateUtils() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * Converts java.util.Date to LocalDateTime
     */
    public static LocalDateTime toLocalDateTime(Date date) {
        if (date == null) return null;
        return date.toInstant().atZone(DEFAULT_ZONE).toLocalDateTime();
    }

    /**
     * Converts LocalDateTime to java.util.Date
     */
    public static Date toDate(LocalDateTime localDateTime) {
        if (localDateTime == null) return null;
        return Date.from(localDateTime.atZone(DEFAULT_ZONE).toInstant());
    }

    /**
     * Formats LocalDateTime to a human-readable string
     */
    public static String formatDisplay(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DISPLAY_FORMATTER) : "";
    }

    /**
     * Formats LocalDateTime to ISO-8601 string
     */
    public static String formatIso(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(ISO_FORMATTER) : "";
    }

    /**
     * Parses ISO-8601 formatted string to LocalDateTime
     */
    public static LocalDateTime parseIso(String isoString) {
        return isoString != null && !isoString.isBlank()
                ? LocalDateTime.parse(isoString, ISO_FORMATTER)
                : null;
    }

    /**
     * Gets current system time as LocalDateTime
     */
    public static LocalDateTime now() {
        return LocalDateTime.now(DEFAULT_ZONE);
    }
}
