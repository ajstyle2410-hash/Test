// app/utils/logger.ts
'use client';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
    private static instance: Logger;
    private isDebug: boolean;

    private constructor() {
        this.isDebug = process.env.NEXT_PUBLIC_DEBUG === 'true';
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private log(level: LogLevel, message: string, ...args: any[]): void {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

        if (level === 'debug' && !this.isDebug) {
            return;
        }

        switch (level) {
            case 'debug':
                console.debug(prefix, message, ...args);
                break;
            case 'info':
                console.info(prefix, message, ...args);
                break;
            case 'warn':
                console.warn(prefix, message, ...args);
                break;
            case 'error':
                console.error(prefix, message, ...args);
                break;
        }
    }

    public debug(message: string, ...args: any[]): void {
        this.log('debug', message, ...args);
    }

    public info(message: string, ...args: any[]): void {
        this.log('info', message, ...args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log('warn', message, ...args);
    }

    public error(message: string, ...args: any[]): void {
        this.log('error', message, ...args);
    }

    public logApiError(error: any, context?: string): void {
        if (error.response) {
            // Server responded with error
            this.error(
                `API Error${context ? ` (${context})` : ''}: ${error.response.status}`,
                {
                    data: error.response.data,
                    headers: error.response.headers,
                    config: {
                        url: error.config?.url,
                        method: error.config?.method,
                        data: error.config?.data,
                    }
                }
            );
        } else if (error.request) {
            // Request made but no response
            this.error(
                `Network Error${context ? ` (${context})` : ''}: No response`,
                {
                    request: {
                        url: error.config?.url,
                        method: error.config?.method,
                    }
                }
            );
        } else {
            // Error in request setup
            this.error(
                `Request Error${context ? ` (${context})` : ''}: ${error.message}`,
                error
            );
        }
    }
}

export const logger = Logger.getInstance();