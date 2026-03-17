/**
 * Simple Logger Utility
 * Outputs timestamped logs to the console
 */
export const info = (...args) => {
    console.log(`[${new Date().toISOString()}] INFO:`, ...args);
};

export const error = (...args) => {
    console.error(`[${new Date().toISOString()}] ERROR:`, ...args);
};