# Passport Validator

An opinionated Vue 3 + TypeScript experience for validating passport numbers across supported countries. The project applies Domain Driven Design (DDD) principles with a dedicated domain layer, composable application logic, and component-driven UI development enhanced by Tailwind CSS v4.

## Features

- ✅ Domain services for passport-number validation powered by reusable format definitions.
- ✅ Modern card-based interface styled with a custom Tailwind theme inspired by the provided design reference.
- ✅ Component-driven form controls with accessible keyboard interactions and helpful feedback states.
- ✅ Automated unit and end-to-end style component tests covering happy paths and edge cases.

## Project structure

```
src/
├─ application/           # Composables orchestrating domain logic for the UI layer
│  └─ passport/
├─ components/
│  ├─ PassportValidator.vue
│  └─ passport/           # Component-driven building blocks
├─ domain/
│  └─ passport/           # Passport formats and validation services
└─ style.css              # Tailwind base styles
```

## Getting started

```bash
npm ci
npm run dev
```

Navigate to `http://localhost:5173` to try the validator.

## Testing

```bash
npm test
```

Vitest runs both the domain unit tests and the mounted component end-to-end scenarios.

## Tailwind theme

The Tailwind v4 setup (`tailwind.config.ts`) extends colors, border radii, and shadows to align with the modern card design.

## Licensing

This project is provided for evaluation purposes.
