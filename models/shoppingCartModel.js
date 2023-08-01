const mongoose = require('mongoose');
const User = mongoose.model('User');
const Product = mongoose.model('Product');

const shoppingCartSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: `${User}`
    },
    date: {
        type: Date,
        default: Date.now,
        required:[true, "Date is required, it can't be empty"]
    },
    productId: {
        type: Schema.ObjectId,
        ref: `${Product}`
    },
    product_price: {
        type: Schema.product_price,
        ref: `${Product}`
    },
    total_to_pay: {
        type: Double,
        default: 0.0,
        required: [true]
    },
    order_status: {
        type: String,
        enum: ['Ready', 'Cooking', 'On hold'],
        default: 'On hold',
        required: [true, ]
    }
});

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;