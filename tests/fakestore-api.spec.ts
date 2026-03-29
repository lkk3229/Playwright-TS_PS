import { test, expect } from '@playwright/test';

// Optional: Import Ajv for JSON Schema validation (requires: npm install ajv)
import Ajv from 'ajv';
const ajv = new Ajv();

test.describe('Fake Store API Tests', () => {
  const API_URL = 'https://fakestoreapi.com/products/1';

  // JSON Schema for product validation
  const productSchema = {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      category: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      image: { type: 'string' },
      rating: { 
        type: 'object',
        properties: {
          rate: { type: 'number' },
          count: { type: 'number' }
        }
      }
    },
    required: ['id', 'title', 'category', 'description']
  };

  test('GET /products/1 - Verify response status and required fields', async ({ request }) => {
    // Step 1 & 2: Send GET request to the endpoint
    const response = await request.get(API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Step 3: Verify the response status is 200
    expect(response.status()).toBe(200);
    console.log(`✓ Response status: ${response.status()}`);

    // Parse the response body
    const responseData = await response.json();

    // Step 4: Validate that response contains required keys
    const requiredKeys = ['id', 'title', 'category', 'description'];
    requiredKeys.forEach(key => {
      expect(responseData).toHaveProperty(key);
      console.log(`✓ Response contains key: ${key}`);
    });

    // Step 6: Log the product title and price to the console
    console.log(`\n📦 Product Details:`);
    console.log(`   Title: ${responseData.title}`);
    console.log(`   Price: $${responseData.price}`);
    console.log(`   Category: ${responseData.category}`);
    console.log(`   Description: ${responseData.description}\n`);

    // Step 5 (Optional): Validate JSON Schema using Ajv
    // To enable this, install Ajv: npm install ajv
    // Then uncomment the Ajv imports at the top and the following code:
    
    //Uncomment to enable JSON Schema validation:
    const validate = ajv.compile(productSchema);
    const isValid = validate(responseData);
    
    if (!isValid) {
      console.error('❌ Schema validation failed:', validate.errors);
    } else {
      console.log('✓ Response data matches JSON Schema');
    }
    
    expect(isValid).toBe(true);
    
  });

  test('GET /products/1 - Validate specific field values', async ({ request }) => {
    // Send GET request
    const response = await request.get(API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    expect(response.status()).toBe(200);

    const product = await response.json();

    // Validate specific fields
    expect(product.id).toBe(1);
    expect(product.title).toBeTruthy();
    expect(product.category).toBeTruthy();
    expect(product.description).toBeTruthy();
    expect(product.price).toBeGreaterThan(0);

    console.log(`✓ All field validations passed`);
    console.log(`   Product ID: ${product.id}`);
    console.log(`   Title: ${product.title}`);
    console.log(`   Price: $${product.price}`);
  });

  test('GET /products/1 - Validate response headers', async ({ request }) => {
    // Send GET request
    const response = await request.get(API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    expect(response.status()).toBe(200);

    // Validate response headers
    expect(response.headers()['content-type']).toContain('application/json');
    console.log(`✓ Content-Type: ${response.headers()['content-type']}`);

    const product = await response.json();
    console.log(`✓ Response successfully parsed as JSON`);
    console.log(`   Product: ${product.title}`);
  });
});
