// src/app/shared/utils/constants.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const APP_NAME = "Arc-i-Tech Platform";

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SUB_ADMIN: "SUB_ADMIN",
  DEVELOPER: "DEVELOPER",
  CUSTOMER: "CUSTOMER"
} as const;

export const MESSAGES = {
  ERROR_GENERIC: "Something went wrong. Please try again.",
  LOGIN_REQUIRED: "You must be logged in to continue.",
};
export const NOTIFICATION_TYPES = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",   
    WARNING: "WARNING",

    ERROR: "ERROR",
} as const;
