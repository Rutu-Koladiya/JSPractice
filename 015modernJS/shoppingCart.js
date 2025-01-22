// Exporting module
console.log("Exporting module");

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quality) {
  cart.push({ product, quality });
  console.log(`${quality} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quality) {
  cart.push({ product, quality });
  console.log(`${quality} ${product} added to cart`);
};
