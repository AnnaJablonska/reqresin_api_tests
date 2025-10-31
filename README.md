# Reqres.in API Tests with Playwright

This project contains API tests for the Reqres.in API using Playwright Test framework.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values (optional - defaults work for basic testing)
nano .env
```

### 3. Run Tests
```bash
# Run all tests
npm test
```

### 4. 📁 Project Structure

```
├── .env.example          # Environment variables template
├── .env                  # Your environment variables (gitignored)
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
└── api_tests/
    └── reqres-api.spec.ts # API test scenarios
```

## 🔐 Environment Variables

The project uses environment variables for configuration. See `.env.example` for all available options.

### Required Variables
- `REQRES_API_KEY`: API key for reqres.in (default: "reqres-free-v1")
- `API_BASE_URL`: Base URL for the API (default: "https://reqres.in")

## 🧪 Test Scenarios

The test suite includes the following scenarios:

1. **Get Users with Odd IDs** - Fetches users and filters those with odd ID numbers
2. **Create New User** - Creates a user and validates the response
3. **Update User** - Updates an existing user's information
4. **Response Time Validation** - Checks API response times
5. **Login Validation** - Tests login failure scenarios

> **Note**: One test may be marked with `test.fixme()` due to API limitations or intentional test cases that exceed expected thresholds (e.g., delay=3 scenario).


## 📝 Adding New Tests

1. Create new test files in the `api_tests/` directory
2. Use the existing patterns for consistency:
   ```typescript
   test('Test name', async ({ request }) => {
     const response = await request.get('/api/endpoint');
     expect(response.status()).toBe(200);
   });
   ```
3. All requests automatically include the configured base URL and headers

---

## 🔧 Manual API Testing

For manual verification of API tests, use these curl commands:

```bash
# Scenario 1: Get users
curl -H "x-api-key: reqres-free-v1" "https://reqres.in/api/users?page=2"

# Scenario 2: Create user
curl -X POST "https://reqres.in/api/users" \
  -H "Content-Type: application/json" \
  -H "x-api-key: reqres-free-v1" \
  -d '{"name": "John Doe", "job": "QA Engineer"}'

# Scenario 3: Update user
curl -X PUT "https://reqres.in/api/users/2" \
  -H "Content-Type: application/json" \
  -H "x-api-key: reqres-free-v1" \
  -d '{"name": "Jane Smith", "job": "Senior QA Engineer"}'

# Scenario 4: Test with delay
curl -H "x-api-key: reqres-free-v1" "https://reqres.in/api/users?delay=3"

# Scenario 5: Login failure
curl -X POST "https://reqres.in/api/login" \
  -H "Content-Type: application/json" \
  -H "x-api-key: reqres-free-v1" \
  -d '{"email": "peter@klaven"}'
```
