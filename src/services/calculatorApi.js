import { SERVICES } from "../config/apiConfig";

const INT_MIN = -2147483648;
const INT_MAX = 2147483647;

function parseInteger(value, label) {
  if (!/^-?\d+$/.test(value)) {
    throw new Error(`${label} must be a whole number.`);
  }
  const n = Number(value);
  if (n < INT_MIN || n > INT_MAX) {
    throw new Error(`${label} is too large (allowed range: ${INT_MIN} to ${INT_MAX}).`);
  }
  return n;
}

// Calls the Spring Boot service for the given operation and returns the result number.
export async function calculate(operation, a, b) {
  const service = SERVICES[operation];
  const x = parseInteger(a, "Number 1");
  const y = parseInteger(b, "Number 2");

  const url = `http://localhost:${service.port}/api/${service.path}/${x}/${y}`;

  let response;
  try {
    response = await fetch(url, { method: "POST" });
  } catch {
    throw new Error(
      `Cannot reach the ${service.name} service on port ${service.port}. Is it running?`,
    );
  }

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `${service.name} service returned HTTP ${response.status}.`);
  }
  return JSON.parse(text);
}
