import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
    maxlength: [100, "Item name cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Item description is required"],
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  },
  price: {
    type: Number,
    required: [true, "Item price is required"],
    min: [0, "Price cannot be negative"]
  },
  originalPrice: {
    type: Number,
    min: [0, "Original price cannot be negative"]
  },
  category: {
    type: String,
    required: [true, "Item category is required"],
    enum: [
      "electronics",
      "clothing",
      "books",
      "home",
      "sports",
      "beauty",
      "automotive",
      "toys",
      "food",
      "other"
    ]
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, "Brand name cannot exceed 50 characters"]
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    required: [true, "SKU is required"],
    trim: true,
    uppercase: true
  },
  weight: {
    type: Number,
    min: [0, "Weight cannot be negative"]
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 }
  },
  colors: [{
    type: String,
    trim: true
  }],
  sizes: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, "Review comment cannot exceed 500 characters"]
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  saleStartDate: {
    type: Date
  },
  saleEndDate: {
    type: Date
  },
  shippingInfo: {
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: {
      type: Number,
      min: 0,
      default: 0
    },
    estimatedDelivery: {
      type: String
    }
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, "Meta title cannot exceed 60 characters"]
    },
    metaDescription: {
      type: String,
      maxlength: [160, "Meta description cannot exceed 160 characters"]
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for discount percentage
itemSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for in stock status
itemSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

// Index for better query performance
itemSchema.index({ name: 'text', description: 'text', tags: 'text' });
itemSchema.index({ category: 1 });
itemSchema.index({ price: 1 });
itemSchema.index({ rating: -1 });
itemSchema.index({ createdAt: -1 });
itemSchema.index({ isActive: 1, isFeatured: 1 });

// Pre-save middleware to generate slug
itemSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.seo.slug) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Pre-save middleware to update rating average
itemSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.rating.count = this.reviews.length;
  }
  next();
});

// Static method to find items by category
itemSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true });
};

// Static method to find featured items
itemSchema.statics.findFeatured = function() {
  return this.find({ isFeatured: true, isActive: true });
};

// Static method to find items on sale
itemSchema.statics.findOnSale = function() {
  const now = new Date();
  return this.find({ 
    isOnSale: true, 
    isActive: true,
    $or: [
      { saleStartDate: { $lte: now } },
      { saleStartDate: { $exists: false } }
    ],
    $or: [
      { saleEndDate: { $gte: now } },
      { saleEndDate: { $exists: false } }
    ]
  });
};

// Instance method to add review
itemSchema.methods.addReview = function(userId, rating, comment) {
  this.reviews.push({
    user: userId,
    rating,
    comment
  });
  return this.save();
};

// Instance method to check if item is on sale
itemSchema.methods.isCurrentlyOnSale = function() {
  if (!this.isOnSale) return false;
  
  const now = new Date();
  const startDate = this.saleStartDate || new Date(0);
  const endDate = this.saleEndDate || new Date('2099-12-31');
  
  return now >= startDate && now <= endDate;
};

const Item = mongoose.model("Item", itemSchema);

export default Item;
