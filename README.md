# DemoBlaze – Test Engineer Assessment (Playwright + TypeScript, POM)

## 📋 Objective

This submission demonstrates my **test planning, test case design, automation, and issue reporting** for the DemoBlaze demo application. The solution uses **Playwright + TypeScript** with the **Page Object Model (POM)** for maintainability, aligning with the assessment requirements.

## 📝 Test Plan

**Types of tests prioritised:**

- Functional: Sign up, login/logout, add/remove cart items, place order, category browsing
- Negative: Empty/invalid Place Order submissions, empty cart purchase, contact form without input
- Regression: Reusable automated coverage for core flows

**Rationale for approach:**

- Risk-based testing: Focused first on **checkout, authentication, and cart**, as these deliver the highest business value.
- Critical paths automated to ensure fast feedback and prevent regressions.
- Exploratory testing used for edge cases and error handling.

**Tools & Frameworks:**

- Playwright Test (TypeScript) for cross-browser functional automation
- Page Object Model (POM) for cleaner, reusable test structure
- Local execution, extendable to BrowserStack for cloud testing
- Excel for test plan, test cases, and defect tracking

## 🤖 Automated Tests

Implemented in `/tests` using Playwright POM:

- **auth.spec.ts** → Sign up, login, logout
- **add-to-cart.spec.ts** → Add product to cart
- **remove-from-cart.spec.ts** → Remove product from cart
- **place-order.spec.ts** → Valid/invalid checkout, empty submission
- **empty-order.spec.ts** → Negative test: prevent purchase with empty cart
- **contact.spec.ts** → Negative test: prevent sending message with empty fields
- **browse-categories.spec.ts** → Phones/Laptops/Monitors category browsing

**Why automated:**  
Each test case targets either a **critical user flow** (high business risk) or a **negative path** (common failure point). See Excel `Test Cases` sheet for rationale.

## 🐞 Issues Reported

1. **Place Order accepts empty submission** → Validation missing
2. **Place Order accepts invalid input** → No field validation
3. **Contact form allows empty submission** → Missing validation
4. **Empty cart purchase attempt possible** → Logical error

**Adjustment to approach:**

- Strengthen negative and validation test coverage
- Add more exploratory scenarios around modal handling
- Include regression checks to block illogical states

Details are in Excel `Issues Reporting` sheet.

## 🌍 Cross-Browser

Tests were executed using Playwright across **Chromium, Firefox, and WebKit** locally, ensuring consistent behaviour across major browsers.

## ▶️ How to Run

```bash
npm install
npm run install:playwright
npx playwright test
npm run report
```

## 📊 Deliverables

- **Playwright + TypeScript (POM) codebase**
- **DemoBlaze Excel Test Documentation** (Test Plan, Test Cases with rationale, Issues Reporting with adjustments)
- **README (this file)** – Submission overview

---

✅ This structured approach shows **end-to-end quality ownership**: planning, automation, defect identification, and communication.
