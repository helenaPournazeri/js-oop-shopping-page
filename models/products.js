class Products {
    constructor (parent, products, cart) {
        this.parent = parent;
        this.products = products;
        this.parent.addEventListener("click", this)
        this.cart = cart
    }
    showProducts() {
        this.products.forEach(product =>
            this.createCard(product)
        );
    }
    createCard (data) {
        const {image, alt, name, price, id} = data;
        const card = document.createElement("div")
        card.className = "card"
        this.parent.appendChild(card);
        card.innerHTML = `
        <img src=${image} alt=${alt}>
        <div class="control">
          <h3>${name}</h3>
          <div>
            <span>$ ${price}</span>
            <button data-id=${id}>+</button>
          </div>
        </div>
        `
    }

    handleEvent() {
        const element = event.target;
    if(element.tagName === "BUTTON") {
        this.addToCart(element.dataset.id)
    }
    }

    addToCart(id) {
        const product = this.products.find(i => i.id === +id);
        this.cart.products.push(product)
        this.cart.showProducts()
    }
}

export default Products;