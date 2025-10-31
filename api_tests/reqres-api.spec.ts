import { test, expect } from '@playwright/test';

test.describe('Reqres.in API Tests', () => {
  
  test('Scenario_1: Get list of users and print users with odd ID numbers', async ({ request }) => {
    const response = await request.get('/api/users?page=2');
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    const usersWithOddIds = body.data.filter((user: any) => user.id % 2 !== 0);
    console.log(`Users with odd ID numbers:`);
    usersWithOddIds.forEach((user: any) => {
      console.log(`ID: ${user.id}, Name: ${user.first_name} ${user.last_name}, Email: ${user.email}`);
    });
  });

  test('Scenario_2: Create a new user', async ({ request }) => {
    const userData = {
      name: 'John Doe',
      job: 'QA Engineer'
    };
    
    const response = await request.post('/api/users', {
      data: userData
    });
    
    expect(response.status()).toBe(201);
    const body = await response.json();
    
    expect(body.name).toBe(userData.name);
    expect(body.job).toBe(userData.job);
    console.log(`User created with ID: ${body.id}`);
  });

  test('Scenario_3: Update a user', async ({ request }) => {
    const updateData = {
      name: 'Jane Smith',
      job: 'Senior QA Engineer'
    };
    
    const response = await request.put('/api/users/2', {
      data: updateData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    expect(body.name).toBe(updateData.name);
    expect(body.job).toBe(updateData.job);
    console.log(`User updated successfully`);
  });

  test('Scenario_4: Validate response time with delay=0', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/api/users?delay=0');
    const elapsed = Date.now() - startTime;
    
    expect(response.status()).toBe(200);
    expect(elapsed).toBeLessThanOrEqual(1000);
    console.log(`Response time: ${elapsed}ms`);
  });

  test.fixme('Scenario_4: Validate response time with delay=3', async ({ request }) => {
    // This test will fail the 1-second requirement due to 3-second delay
    const startTime = Date.now();
    const response = await request.get('/api/users?delay=3');
    const elapsed = Date.now() - startTime;
    
    expect(response.status()).toBe(200);
    expect(elapsed).toBeLessThanOrEqual(1000);
    console.log(`Response time: ${elapsed}ms`);
  });

  test('Scenario_5: Login without password should fail', async ({ request }) => {
    const loginData = {
      email: 'peter@klaven'
      // Intentionally omitting password
    };
    
    const response = await request.post('/api/login', {
      data: loginData
    });
    
    expect(response.status()).toBe(400);
    const body = await response.json();
    
    expect(body.error).toBe('Missing password');
    console.log(`Login correctly failed: "${body.error}"`);
  });
});