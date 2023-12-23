import { fetchData } from "./utils/httpreq.js";
import Products from "./models/products.js"
import Cart from "./models/cart.js";

const productsNode = document.getElementById("products");
const cartListNode = document.getElementById("cart-list");
const totalPriceNode = document.getElementById("total-price").querySelector("span")

async function render () {
    const productsData = await fetchData();
    const CartInstance = new Cart(cartListNode, totalPriceNode);
    const productsInstance = new Products(productsNode, productsData, CartInstance);
    
    productsInstance.showProducts()
}


document.addEventListener("DOMContentLoaded", render)