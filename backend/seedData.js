import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

const sampleItems = [
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system",
    price: 999,
    originalPrice: 1099,
    category: "electronics",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"],
    stock: 50,
    sku: "IPH15PRO-128",
    weight: 187,
    dimensions: { length: 14.67, width: 7.15, height: 0.83 },
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    tags: ["smartphone", "apple", "premium", "camera"],
    isFeatured: true,
    isOnSale: true,
    saleStartDate: new Date(),
    saleEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days"
    }
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI features",
    price: 1199,
    originalPrice: 1299,
    category: "electronics",
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"],
    stock: 30,
    sku: "SGS24U-256",
    weight: 232,
    dimensions: { length: 16.24, width: 7.9, height: 0.88 },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
    sizes: ["256GB", "512GB", "1TB"],
    tags: ["android", "samsung", "s-pen", "camera"],
    isFeatured: true,
    isOnSale: false,
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "1-2 business days"
    }
  },
  {
    name: "MacBook Pro 14-inch",
    description: "Powerful laptop with M3 Pro chip, Liquid Retina XDR display, and all-day battery life",
    price: 1999,
    originalPrice: 2199,
    category: "electronics",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"],
    stock: 25,
    sku: "MBP14-M3PRO",
    weight: 1600,
    dimensions: { length: 31.26, width: 22.12, height: 1.55 },
    colors: ["Space Gray", "Silver"],
    sizes: ["512GB", "1TB", "2TB"],
    tags: ["laptop", "macbook", "apple", "professional"],
    isFeatured: true,
    isOnSale: true,
    saleStartDate: new Date(),
    saleEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "3-5 business days"
    }
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Max Air cushioning and breathable mesh upper",
    price: 150,
    originalPrice: 180,
    category: "sports",
    brand: "Nike",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"],
    stock: 100,
    sku: "NAM270-BLK",
    weight: 300,
    dimensions: { length: 32, width: 12, height: 10 },
    colors: ["Black", "White", "Red", "Blue"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["shoes", "nike", "running", "comfortable"],
    isFeatured: false,
    isOnSale: true,
    saleStartDate: new Date(),
    saleEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    shippingInfo: {
      freeShipping: false,
      shippingCost: 9.99,
      estimatedDelivery: "5-7 business days"
    }
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling wireless headphones with 30-hour battery life",
    price: 399,
    originalPrice: 449,
    category: "electronics",
    brand: "Sony",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    stock: 40,
    sku: "WH1000XM5-BLK",
    weight: 250,
    dimensions: { length: 20, width: 17, height: 8 },
    colors: ["Black", "Silver"],
    sizes: ["One Size"],
    tags: ["headphones", "sony", "noise-canceling", "wireless"],
    isFeatured: true,
    isOnSale: false,
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "2-4 business days"
    }
  },
  {
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald about the Jazz Age",
    price: 12.99,
    originalPrice: 15.99,
    category: "books",
    brand: "Penguin Classics",
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"],
    stock: 200,
    sku: "TGG-PENGUIN",
    weight: 200,
    dimensions: { length: 19.8, width: 12.9, height: 1.5 },
    colors: ["N/A"],
    sizes: ["Paperback"],
    tags: ["book", "classic", "literature", "fiction"],
    isFeatured: false,
    isOnSale: true,
    saleStartDate: new Date(),
    saleEndDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    shippingInfo: {
      freeShipping: false,
      shippingCost: 4.99,
      estimatedDelivery: "3-5 business days"
    }
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Multi-functional electric pressure cooker for quick and easy cooking",
    price: 99.99,
    originalPrice: 129.99,
    category: "home",
    brand: "Instant Pot",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"],
    stock: 60,
    sku: "IP-DUO-6QT",
    weight: 5000,
    dimensions: { length: 33, width: 30, height: 30 },
    colors: ["Black", "Stainless Steel"],
    sizes: ["6 Quart"],
    tags: ["cooking", "pressure-cooker", "kitchen", "appliance"],
    isFeatured: false,
    isOnSale: true,
    saleStartDate: new Date(),
    saleEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "4-6 business days"
    }
  },
  {
    name: "L'Oreal Paris Revitalift Anti-Aging Cream",
    description: "Anti-aging face cream with retinol and hyaluronic acid for younger-looking skin",
    price: 24.99,
    originalPrice: 29.99,
    category: "beauty",
    brand: "L'Oreal Paris",
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500"],
    stock: 150,
    sku: "LOR-REVITALIFT-50ML",
    weight: 100,
    dimensions: { length: 8, width: 8, height: 5 },
    colors: ["N/A"],
    sizes: ["50ml"],
    tags: ["skincare", "anti-aging", "cream", "beauty"],
    isFeatured: false,
    isOnSale: true,
    saleStartDate: new Date(),
    saleEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    shippingInfo: {
      freeShipping: false,
      shippingCost: 5.99,
      estimatedDelivery: "2-3 business days"
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing items
    await Item.deleteMany({});
    console.log("🗑️ Cleared existing items");

    // Insert sample items
    const createdItems = await Item.insertMany(sampleItems);
    console.log(`✅ Created ${createdItems.length} sample items`);

    // Display created items
    console.log("\n📦 Sample Items Created:");
    createdItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price} (${item.category})`);
    });

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
