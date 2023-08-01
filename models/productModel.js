const { Schema } = required('mongoose');

const productSchema = new Schema({
    category_product: {
        type: String,
        required:[true, "Category is required, it can't be empty"]
    },
    subcategory_product: {
        type: String,
        required:[true, "Subcategory is required, it can't be empty"]
    },
    product_name: {
        type: String,
        required:[true, "Name of the product is required, it can't be empty"]
    },
    product_description: {
        type: String,
        required:[true, "Product Description is required"]
    },
    product_price: {
        type: Double,
        required:[true,]
    },
    product_img: {
        title: String,
        image: Buffer,
        required:[true, "Product image is required"]
    },
    product_state: {
        type: String,
        enum:['In Stock', 'Sold Out'],
        default: 'In Stock',
        required:[true, "Product State is required, it cannot be empty"]
    }
});

const Product = moongose.model("Product", productSchema);

module.exports = Product;