# Velir QA Take Home Challenge - [Shubham Gera] Analysis

## Overview

I reviewed the existing Playwright + TypeScript automation framework and focused on improving test coverage while keeping the framework structure, coding style, and Page Object Model consistent with the existing implementation.

The framework already had a good foundation with:
- Page Object Model implementation
- UI and API test separation
- Utility classes for test data generation
- Clear Arrange / Act / Assert structure in test cases

My goal was to extend the framework with meaningful test coverage rather than making unnecessary architectural changes.

---

# Improvements Implemented

## 1. Added UI Test - Invalid Email Validation

### Scenario

Verified that the application displays an appropriate validation message when an invalid email address is entered during room booking.

### Why

The existing framework covered:
- Successful booking
- Basic form validation

However, email validation is a common negative scenario that was missing from the suite.

### Validation Verified

```
must be a well-formed email address
```

---

## 2. Added UI Test - Phone Number Boundary Validation

### Scenario

Verified that the application rejects phone numbers shorter than the allowed length.

### Why

This test applies **Boundary Value Analysis (BVA)**, which is one of the most effective testing techniques for validating user input.

### Validation Verified

```
size must be between 11 and 21
```

This improves confidence that invalid phone numbers are correctly rejected before submission.

---

## 3. Improved Error Message Helper

While implementing the new UI tests, I noticed that the existing helper responsible for reading validation messages did not reliably retrieve the displayed error text.

After inspecting the DOM, I found that validation messages are rendered inside the `<li>` element within the alert container.

I updated the helper to:
- Wait until the validation message becomes visible
- Read the actual validation text from the correct DOM element
- Simplify the implementation by removing unnecessary logic

This improvement makes validation handling more reliable for future UI tests.

---

## 4. Added API Negative Test

Added an API test to verify that the booking endpoint rejects an invalid booking payload.

This extends the existing API coverage by validating negative input handling rather than only endpoint availability.

---

# Framework Strengths

The existing framework already demonstrates several good automation practices:

- Clean Page Object Model structure
- Reusable utility methods
- Separation of UI and API tests
- Randomized test data generation
- Easy-to-read test cases following Arrange / Act / Assert

---

# Challenges Encountered

The main challenge during implementation was retrieving validation messages from the booking form.

Initially, the helper method returned an empty string because the validation message was not located directly inside the alert element.

After inspecting the DOM using browser developer tools, I identified that the message was rendered inside a child `<li>` element and updated the helper accordingly.

---

# Additional Improvements (If More Time Were Available)

Given additional time, I would further improve the framework by:

- Adding response schema validation for API tests
- Integrating API tests with authenticated endpoints
- Externalizing test data into dedicated JSON files
- Improving reporting with screenshots and richer failure logs
- Adding accessibility and visual regression testing

---

# Conclusion

My focus was to improve the framework with practical and maintainable enhancements instead of introducing unnecessary complexity.

The changes increase UI validation coverage, improve the reliability of validation handling, and extend API negative testing while keeping the overall framework structure and coding style consistent with the existing project.