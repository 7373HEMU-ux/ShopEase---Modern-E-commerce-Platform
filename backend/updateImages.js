import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

const updateImages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Update images for each product
    const updates = [
      {
        name: "iPhone 15 Pro",
        images: [
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&h=500&fit=crop"
        ]
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&h=500&fit=crop"
        ]
      },
      {
        name: "MacBook Pro 14-inch",
        images: [
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
        ]
      },
      {
        name: "Nike Air Max 270",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop"
        ]
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
        ]
      },
      {
        name: "The Great Gatsby",
        images: [
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
        ]
      },
      {
        name: "Instant Pot Duo 7-in-1",
        images: [
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
        ]
      },
      {
        name: "L'Oreal Paris Revitalift Anti-Aging Cream",
        images: [
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop"
        ]
      }
    ];

    console.log("🖼️ Updating product images...\n");

    for (const update of updates) {
      const result = await Item.updateOne(
        { name: update.name },
        { $set: { images: update.images } }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated images for: ${update.name}`);
        console.log(`   Images: ${update.images.length} images added`);
      } else {
        console.log(`⚠️ No changes for: ${update.name}`);
      }
    }

    console.log("\n🎉 Image update complete!");
    
    // Display updated items
    const items = await Item.find({});
    console.log("\n📦 Updated Products:");
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name}`);
      console.log(`   Images: ${item.images.length} images`);
      console.log(`   First image: ${item.images[0]}`);
      console.log("");
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating images:", error);
    process.exit(1);
  }
};

updateImages();
