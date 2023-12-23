
class Cart {
    constructor(parent, price) {
        this.parent = parent;
        this.price = price;
        this.products = [];
        this.toShow = [];
        this.parent.addEventListener("click", this)

    }

    showProducts() {
        this.toShow = [...new Set(this.products)];
        this.parent.innerHTML = ""
        this.toShow.forEach((item) => {
            const qty = this.products.filter(p => p.id === item.id).length;
            this.createCard(item, qty)
        })
        this.calculateTotalPrice()
    }

    createCard(item, qty) {
        const {id, image, alt, price, name} = item;
        const chosenCard = document.createElement("div")
        chosenCard.className = "chosen-card";
        this.parent.appendChild(chosenCard);
        chosenCard.innerHTML = `
        <div class="cart-img"><img src=${image} alt=${alt}>
            </div>
            <div class="cart-info">
              <span>${name}</span>
              <span>$ ${price}</span>
            </div>
            <div class="cart-control">
              <div class="qty">
                <button data-id=${id} >-</button>
                <span>${qty}</span>
                <button data-id=${id} >+</button>
              </div>
              <div class="rmv-button">
                <button data-id=${id} >Remove</button>
              </div>
            </div>
        `   
    }

    handleEvent (event) {
      const id = event.target.dataset.id;
      const tagName = event.target.tagName;
      const type = event.target.innerText;

      if (tagName !== "BUTTON") return;


      switch(type) {
        case "+":
          this.increase(id)
          break;
        case "-":
          this.decrease(id)
          break;
        case "Remove":
          this.remove(id);
          break;
      }

    }

    increase(id) {
      const product = this.products.find(p => p.id === +id);
      this.products.push(product);
      this.showProducts()
    }
    decrease(id) {
      const productIndex = this.products.findIndex(p => p.id === +id)
      this.products.splice(productIndex, 1);
      this.showProducts()
    }
    remove(id) {
      const newProducts = this.products.filter(p => p.id !== +id)
      this.products = newProducts;
      this.showProducts()
    }
    calculateTotalPrice () {
      const totalPrice = this.products.reduce((acc,cur) => (acc+= cur.price),0)
      this.price.innerText = `$ ${totalPrice}`
    }
}


export default Cart;