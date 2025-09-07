# 🛍️ ShopEase - Modern E-commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a modern, responsive design and complete shopping functionality.

## 🌟 Features

### 🛒 **Shopping Experience**
- **Product Catalog**: Browse through a wide range of products with high-quality images
- **Advanced Filtering**: Search by name, category, and price range
- **Shopping Cart**: Add/remove items, update quantities, and manage cart
- **Guest Mode**: Shop without registration (cart persists in browser)

### 👤 **User Authentication**
- **User Registration**: Create new accounts with secure password hashing
- **User Login**: Secure JWT-based authentication
- **User Profile**: Personalized shopping experience
- **Logout**: Secure session management

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Professional Styling**: Modern gradient design with smooth animations
- **Loading States**: Beautiful loading spinners and transitions
- **Error Handling**: User-friendly error messages

### 🔧 **Admin Features**
- **Product Management**: Add, edit, and delete products
- **Inventory Control**: Track stock levels and product availability
- **Category Management**: Organize products by categories

## 🚀 Live Demo

**Frontend**: [https://shopease-demo.vercel.app](https://shopease-demo.vercel.app)
**Backend API**: [https://shopease-api.railway.app](https://shopease-api.railway.app)

## 📱 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400/667eea/ffffff?text=ShopEase+Homepage)

### Product Catalog
![Products](https://via.placeholder.com/800x400/764ba2/ffffff?text=Product+Catalog)

### Shopping Cart
![Cart](https://via.placeholder.com/800x400/667eea/ffffff?text=Shopping+Cart)

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations
- **Vite** - Fast build tool and development server

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### **Database**
- **MongoDB Atlas** - Cloud database service
- **Collections**: Users, Items, Cart Items

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shopease.git
cd shopease
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopease
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

Start the backend server:
```bash
npm start
# or for development
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

### 4. Seed Sample Data (Optional)
```bash
cd backend
node seedData.js
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/items` - Get all products (with filters)
- `GET /api/items/:id` - Get single product
- `POST /api/items` - Create product (admin)
- `PUT /api/items/:id` - Update product (admin)
- `DELETE /api/items/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item
- `POST /api/cart/clear` - Clear cart

## 🎯 Usage

### For Customers
1. **Browse Products**: Visit the homepage to see all available products
2. **Search & Filter**: Use the search bar and filters to find specific items
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Manage Cart**: View cart, update quantities, or remove items
5. **Create Account**: Register for a personalized experience
6. **Login**: Access your account and saved cart

### For Admins
1. **Login**: Use admin credentials to access management features
2. **Add Products**: Create new product listings with images and details
3. **Manage Inventory**: Update stock levels and product information
4. **View Orders**: Monitor customer purchases and cart activity

## 🏗️ Project Structure

```
shopease/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Item.js          # Product schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── items.js         # Product routes
│   │   └── cart.js          # Cart routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── server.js            # Main server file
│   ├── seedData.js          # Sample data seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ItemCard.jsx # Product card component
│   │   ├── pages/
│   │   │   ├── Listing.jsx  # Product listing page
│   │   │   ├── CartPage.jsx # Shopping cart page
│   │   │   ├── Login.jsx    # Login page
│   │   │   └── Signup.jsx   # Registration page
│   │   ├── hooks/
│   │   │   └── useAuth.js   # Authentication hook
│   │   ├── styles/
│   │   │   └── global.css   # Global styles
│   │   ├── api.js           # API configuration
│   │   └── main.js          # Main App component
│   └── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data stored in environment variables

## 🚀 Deployment

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Unsplash for providing high-quality product images
- MongoDB Atlas for cloud database hosting
- Railway and Vercel for deployment platforms
- The React and Node.js communities for excellent documentation

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact me at your.email@example.com
- Check the documentation in the `/docs` folder

---

⭐ **Star this repository if you found it helpful!**
