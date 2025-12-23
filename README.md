# Playwright Conduit E2E Framework

End-to-end test framework for the **Conduit (RealWorld)** application  
built with **Playwright + TypeScript**.

The project combines **UI and API testing** with a clean, scalable architecture.

---

## 🧪 What is tested

### UI tests

- User login
- Create article
- Update article
- Delete article
- Basic navigation and content assertions

### API tests

- User authentication via API
- Article CRUD operations

### API is also used for

- Test data setup
- Cleanup after UI tests

---

## 🏗 Project Architecture

- Clear separation between **UI and API**
- Test data is generated via **factory**
- Cleanup is done via **API**
- Page Object Pattern
- Minimal logic inside tests

---

## 📁 Project Structure

```text
playwright-conduit/
├─ pages/                 # Page Objects (UI abstraction)
├─ tests/
│  ├─ ui/                 # UI tests
│  └─ api/                # API tests
├─ fixtures/              # API / infrastructure fixtures
│  └─ types/              # API entity types
├─ test-data/
│  └─ article.factory.ts  # Test data factory
├─ helpers/               # Helpers (data transformation, updates)
├─ .auth/                 # storageState (generated)
├─ playwright.config.ts
└─ global-setup.ts
```

## How to run tests

### 1 Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run UI tests only

```bash
npx playwright test tests/ui
```

### Run API tests only

```bash
npx playwright test tests/api
```

### Open test report

```bash
npx playwright show-report
```

## Environment variables

```bash
Create a .env file in the project root:
```

```env
BASE_URL=https://api.realworld.io
USER_EMAIL=your_email@example.com
USER_PASS=your_password
```

## Do not commit .env into the repository!

## Data Flow Diagram

```text
[Test]
|
v
[Factory] → Test Data
|
v
[API Fixtures] → Create / Delete via API
|
v
[Page Objects] → UI Actions
|
v
[Assertions]
```

## Key Principles

- Fixtures provide infrastructure, not test scenarios
- Test data is generated via a factory
- Page Objects contain no business logic
- Cleanup is handled via API
- UI and API models are clearly separated

## 📌 Tech Stack

- Playwright
- TypeScript
- Page Object Pattern
- Hybrid UI + API testing
