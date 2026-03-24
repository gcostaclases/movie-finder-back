import * as Sentry from "@sentry/node";

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	// Tracing
	tracesSampleRate: 1.0, // Capture 100% of the transactions for performance monitoring.
	serverName: process.env.SENTRY_SERVICE_NAME, // 👈🏻 Nombre del servicio
	environment: process.env.NODE_ENV || "development", // 👈🏻 Entorno
	// Setting this option to true will make sure that we send PII data to Sentry.
	// For example, automatic IP address collection on events.
	sendDefaultPii: true, // 👈🏻 Información personal sensible
});

export default Sentry;

