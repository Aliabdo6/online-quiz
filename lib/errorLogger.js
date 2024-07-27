export function logError(error, context = "") {
  console.error(
    `[${new Date().toISOString()}] ${context}:`,
    error
  );
  // You could also implement more sophisticated logging here,
  // such as sending errors to a monitoring service
}
