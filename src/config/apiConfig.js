// One Spring Boot service per operation. Each runs on its own port.
// Endpoint format: POST http://localhost:<port>/api/<path>/{a}/{b}
export const SERVICES = {
    add: { name: "Addition", symbol: "+", baseUrl: "https://glistening-success-production-570f.up.railway.app", path: "add" },
  sub:      { name: "Subtraction",    symbol: "−", port: 8081, path: "subtract" },
  multiply: { name: "Multiplication", symbol: "×", port: 8082, path: "multiply" },
  divide:   { name: "Division",       symbol: "÷", port: 8083, path: "divide" },
  modulo:   { name: "Modulo",         symbol: "%", port: 8084, path: "modulo" },
};
