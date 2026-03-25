# Playwright Conduit E2E Framework

End-to-end test framework for the **Conduit (RealWorld)** application  
built with **Playwright + TypeScript**.

The project combines **UI and API testing** with a clean, scalable architecture.

---

## 🧪 What is tested

### UI tests

- User login
- Article CRUD
- Comment posting
- Authenticated and guest scenarios

### API tests

- User authentication and authorization
- Signup
- Profile, Tags endpoints
- Article CRUD operations
- Schema and API contract validation

### e2e

- Article edit flow (API - UI - API)
- Comment flow
- Favorite/Unfavorite scenarios
- Follow/Unfollow scenarios

### API is also used for

- Test data setup
- Cleanup after UI tests

---

## 🏗 Project Architecture

- Clear separation between UI and API
- pages — UI layer (POM)
- components — reusable UI parts
- api/helpers — API abstraction
- fixtures — DI and test setup
- test-data — factories

---

## 📁 Project Structure

```text
playwright-conduit/
├─ pages/                 # Page Objects (UI abstraction)
├─ tests/
│  ├─ ui/
│  ├─ api/
│  ├─ e2e/
│  └─ mock/                # e2e tests
├─ fixtures/              # API / infrastructure fixtures
├─ types/                 # API entity types
├─ test-data/             # Test data factory
├─ components             # UI componets
├─ helpers/               # UI/API Helpers (auth, data transformation, updates)
├─ .auth/                 # storageState (generated)
├─ playwright.config.ts
└─ global-setup.ts
```

## How to run tests

### 1 Install dependencies

```bash
npm install
```

### 2 Install Playwright browsers

```bash
npx playwright install
```

### 3 Environment variables

```bash
Create a .env file in the project root:
```

```env
BASE_URL=https://conduit-realworld-example-app.fly.dev
USER_EMAIL=your_email@example.com
USER_PASS=your_password
```

### 4 Run all tests

```bash
npm run test
```

### Run UI tests only

```bash
npm run test:ui
```

### Run API tests only

```bash
npm run test:api
```

### Debug guest test

```bash
npm run test:guest:debug
```

### Open test report

```bash
npx playwright show-report
```

### Do not commit .env into the repository!

## CI/Github Actions

Configured via GitHub Secrets:

- USER_EMAIL

- USER_PASS

- USERNAME

- USERNAME_B

- USER_EMAIL_B

- USER_PASS_B

### CI Features

- Runs Playwright tests

- Generates Allure report

- Publishes Allure report to GitHub Pages

## Key Principles

- Fixtures provide infrastructure, not test scenarios
- Test data is generated via factories / builders
- Page Objects contain UI interactions only (no business logic)
- Business logic is implemented in helpers/services layer
- Cleanup is handled via API
- UI and API models are clearly separated
- UI tests have a separate UI setup

## Why this approach

- Fixtures are used for dependency injection and test isolation
- Factories allow flexible and scalable test data generation
- API is used for setup/teardown to keep UI tests fast and stable
- Schema validation protects against backend contract regressions

## 📌 Tech Stack

- Playwright
- TypeScript
- Page Object Pattern
- Hybrid UI + API testing
- Allure reports
- GitHub Actions CI

✅ Notes

- Authentication is performed once and reused via storageState

- API helpers are reused for setup and teardown

- UI and API layers are intentionally not mixed

- The framework is designed to scale without rewriting tests

📎 References

https://playwright.dev

https://github.com/gothinkster/realworld
