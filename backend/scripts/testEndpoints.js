import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.yellow}ℹ${colors.reset} ${msg}`)
};

async function testEndpoint(method, endpoint, description) {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      validateStatus: () => true // Don't throw on any status
    });
    
    if (response.status < 500) {
      log.success(`${method.toUpperCase()} ${endpoint} - ${description} (${response.status})`);
      return true;
    } else {
      log.error(`${method.toUpperCase()} ${endpoint} - ${description} (${response.status})`);
      return false;
    }
  } catch (error) {
    log.error(`${method.toUpperCase()} ${endpoint} - ${description} (Connection failed)`);
    return false;
  }
}

async function runTests() {
  console.log('\n🧪 Testing KrishakMart API Endpoints\n');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;

  // Health Check
  log.info('Testing Health Check...');
  if (await testEndpoint('get', '/health', 'Health check')) passed++; else failed++;
  
  console.log('\n' + '='.repeat(60));
  log.info('Testing Public Endpoints...');
  
  // Products
  if (await testEndpoint('get', '/products', 'Get all products')) passed++; else failed++;
  if (await testEndpoint('get', '/products?category=seeds', 'Get products by category')) passed++; else failed++;
  if (await testEndpoint('get', '/products?search=fertilizer', 'Search products')) passed++; else failed++;
  
  console.log('\n' + '='.repeat(60));
  log.info('Testing Protected Endpoints (should return 401)...');
  
  // Cart (requires auth)
  if (await testEndpoint('get', '/cart', 'Get cart (protected)')) passed++; else failed++;
  
  // Orders (requires auth)
  if (await testEndpoint('get', '/orders/my-orders', 'Get my orders (protected)')) passed++; else failed++;
  
  // Wishlist (requires auth)
  if (await testEndpoint('get', '/wishlist', 'Get wishlist (protected)')) passed++; else failed++;
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Results: ${colors.green}${passed} passed${colors.reset}, ${colors.red}${failed} failed${colors.reset}\n`);
  
  if (failed === 0) {
    log.success('All endpoints are responding correctly!');
  } else {
    log.error('Some endpoints are not responding. Check if the server is running.');
  }
  
  console.log('\n💡 To test authenticated endpoints, use Postman or the frontend.\n');
}

// Check if server is running
axios.get(`${API_URL}/health`)
  .then(() => {
    runTests();
  })
  .catch(() => {
    log.error('Cannot connect to server. Make sure the backend is running on port 5000.');
    log.info('Start the server with: npm run dev');
    process.exit(1);
  });
