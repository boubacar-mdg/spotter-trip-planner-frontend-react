/**
 * Configuration API
 */

// L'URL de base de l'API
//const apiUrl: string = "http://localhost:8090/api/v1";
const apiUrl: string = "https://api.lokaasenegal.com/api/v1";

// Time out 
const apiTimeout: number = 25000;

// Retry count
const apiRetryCount: number = 3;

export { apiUrl, apiTimeout, apiRetryCount };
