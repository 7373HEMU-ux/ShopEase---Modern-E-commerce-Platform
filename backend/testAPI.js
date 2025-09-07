import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Base API
    console.log('1️⃣ Testing Base API...');
    const baseResponse = await axios.get('http://localhost:5000');
    console.log('✅ Base API:', baseResponse.data);
    console.log('');

    // Test 2: Get all items
    console.log('2️⃣ Testing Items API...');
    const itemsResponse = await axios.get(`${API_BASE}/items`);
    console.log(`✅ Items API: Found ${itemsResponse.data.length} items`);
    console.log('📦 Sample items:');
    itemsResponse.data.slice(0, 3).forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.name} - $${item.price} (${item.category})`);
    });
    console.log('');

    // Test 3: Get single item
    if (itemsResponse.data.length > 0) {
      console.log('3️⃣ Testing Single Item API...');
      const itemId = itemsResponse.data[0]._id;
      const singleItemResponse = await axios.get(`${API_BASE}/items/${itemId}`);
      console.log(`✅ Single Item API: ${singleItemResponse.data.name}`);
      console.log('');
    }

    // Test 4: Test user registration
    console.log('4️⃣ Testing User Registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    try {
      const signupResponse = await axios.post(`${API_BASE}/auth/signup`, testUser);
      console.log('✅ User Registration: Success');
      console.log(`   User ID: ${signupResponse.data.user.id}`);
      console.log(`   Token: ${signupResponse.data.token.substring(0, 20)}...`);
      
      // Test 5: Test user login
      console.log('');
      console.log('5️⃣ Testing User Login...');
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ User Login: Success');
      console.log(`   Token: ${loginResponse.data.token.substring(0, 20)}...`);
      
      // Test 6: Test cart functionality (requires auth)
      console.log('');
      console.log('6️⃣ Testing Cart API...');
      const token = loginResponse.data.token;
      const cartResponse = await axios.get(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Cart API: Success');
      console.log(`   Cart items: ${cartResponse.data.length}`);
      
      // Test 7: Add item to cart
      if (itemsResponse.data.length > 0) {
        console.log('');
        console.log('7️⃣ Testing Add to Cart...');
        const addToCartResponse = await axios.post(`${API_BASE}/cart/add`, {
          itemId: itemsResponse.data[0]._id,
          qty: 1
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Add to Cart: Success');
        console.log(`   Cart now has ${addToCartResponse.data.length} items`);
      }
      
    } catch (authError) {
      if (authError.response?.status === 400 && authError.response?.data?.msg === 'User exists') {
        console.log('⚠️ User already exists, testing login instead...');
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ User Login: Success');
      } else {
        console.log('❌ Auth Error:', authError.response?.data?.msg || authError.message);
      }
    }

    console.log('');
    console.log('🎉 API Testing Complete!');
    console.log('');
    console.log('📋 Available Endpoints:');
    console.log('   GET  /api/items - Get all items');
    console.log('   GET  /api/items/:id - Get single item');
    console.log('   POST /api/items - Create item (requires auth)');
    console.log('   PUT  /api/items/:id - Update item (requires auth)');
    console.log('   DELETE /api/items/:id - Delete item (requires auth)');
    console.log('   POST /api/auth/signup - User registration');
    console.log('   POST /api/auth/login - User login');
    console.log('   GET  /api/cart - Get user cart (requires auth)');
    console.log('   POST /api/cart/add - Add to cart (requires auth)');
    console.log('   POST /api/cart/update - Update cart (requires auth)');
    console.log('   POST /api/cart/clear - Clear cart (requires auth)');

  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
  }
}

testAPI();
