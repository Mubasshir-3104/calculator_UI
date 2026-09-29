# MicroCalc - Interactive Distributed Microservices Calculator (React Frontend)

A modern, high-tech React frontend for a distributed calculator architecture, engineered to integrate with isolated Spring Boot microservices across multiple ports.

---

## ⚡ Spring Boot Microservice Port Mapping

Each mathematical operation calls its own dedicated Spring Boot microservice port:

| Operation          | Arithmetic   | Dedicated Port       | Default Endpoint                     | Frontend Function                                                                                                      | HTTP Method    |
| :----------------- | :----------- | :------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------- |
| **Addition**       | $A + B$      | **`localhost:8080`** | `http://localhost:8080/api/add`      | [`calculateAdd()`](file:///c:/Users/MUBASHSHIR/OneDrive/Desktop/calculator_UI/src/services/calculatorApi.js#L182)      | `POST` / `GET` |
| **Subtraction**    | $A - B$      | **`localhost:8081`** | `http://localhost:8081/api/sub`      | [`calculateSub()`](file:///c:/Users/MUBASHSHIR/OneDrive/Desktop/calculator_UI/src/services/calculatorApi.js#L183)      | `POST` / `GET` |
| **Multiplication** | $A \times B$ | **`localhost:8082`** | `http://localhost:8082/api/multiply` | [`calculateMultiply()`](file:///c:/Users/MUBASHSHIR/OneDrive/Desktop/calculator_UI/src/services/calculatorApi.js#L184) | `POST` / `GET` |
| **Division**       | $A \div B$   | **`localhost:8083`** | `http://localhost:8083/api/divide`   | [`calculateDivide()`](file:///c:/Users/MUBASHSHIR/OneDrive/Desktop/calculator_UI/src/services/calculatorApi.js#L185)   | `POST` / `GET` |
| **Modulo**         | $A \pmod B$  | **`localhost:8084`** | `http://localhost:8084/api/modulo`   | [`calculateModulo()`](file:///c:/Users/MUBASHSHIR/OneDrive/Desktop/calculator_UI/src/services/calculatorApi.js#L186)   | `POST` / `GET` |

---

## 🚀 Getting Started

### 1. Start the React Frontend

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Dual Modes: Simulation Mode vs. Live Microservices Mode

- **Simulation Mode (Default On)**: Test all animations, audio effects, confetti, keypad, and calculation workflows immediately before starting your Spring Boot services.
- **Live Microservices Mode**: Toggle the switch in the top header to send real HTTP `fetch()` requests directly to `localhost:8080` through `8084`.

---

## 📦 Spring Boot Microservice Setup Reference

### 1. Shared Request DTO (`CalcRequest.java`)

```java
package com.example.calculator.dto;

public class CalcRequest {
    private Double num1;
    private Double num2;

    public CalcRequest() {}

    public CalcRequest(Double num1, Double num2) {
        this.num1 = num1;
        this.num2 = num2;
    }

    public Double getNum1() { return num1; }
    public void setNum1(Double num1) { this.num1 = num1; }

    public Double getNum2() { return num2; }
    public void setNum2(Double num2) { this.num2 = num2; }
}
```

### 2. Spring Boot Controllers

#### Addition Service (`server.port=8080`)

```java

```

#### Subtraction Service (`server.port=8081`)

```java
@RestController
@RequestMapping("/api/sub")
@CrossOrigin(origins = "*")
public class SubtractionController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> subtract(@RequestBody CalcRequest req) {
        double result = req.getNum1() - req.getNum2();
        return ResponseEntity.ok(Map.of(
            "result", result,
            "operation", "SUBTRACTION",
            "servicePort", 8081
        ));
    }
}
```

#### Multiplication Service (`server.port=8082`)

```java
@RestController
@RequestMapping("/api/multiply")
@CrossOrigin(origins = "*")
public class MultiplicationController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> multiply(@RequestBody CalcRequest req) {
        double result = req.getNum1() * req.getNum2();
        return ResponseEntity.ok(Map.of(
            "result", result,
            "operation", "MULTIPLICATION",
            "servicePort", 8082
        ));
    }
}
```

#### Division Service (`server.port=8083`)

```java
@RestController
@RequestMapping("/api/divide")
@CrossOrigin(origins = "*")
public class DivisionController {

    @PostMapping
    public ResponseEntity<?> divide(@RequestBody CalcRequest req) {
        if (req.getNum2() == 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Division by zero is undefined."));
        }
        double result = req.getNum1() / req.getNum2();
        return ResponseEntity.ok(Map.of(
            "result", result,
            "operation", "DIVISION",
            "servicePort", 8083
        ));
    }
}
```

#### Modulo Service (`server.port=8084`)

```java
@RestController
@RequestMapping("/api/modulo")
@CrossOrigin(origins = "*")
public class ModuloController {

    @PostMapping
    public ResponseEntity<?> modulo(@RequestBody CalcRequest req) {
        if (req.getNum2() == 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Modulo by zero is undefined."));
        }
        double result = req.getNum1() % req.getNum2();
        return ResponseEntity.ok(Map.of(
            "result", result,
            "operation", "MODULO",
            "servicePort", 8084
        ));
    }
}
```

> **Important**: Ensure your Spring Boot classes or methods include `@CrossOrigin(origins = "*")` to prevent browser CORS restrictions when fetching from `localhost:5173`.
