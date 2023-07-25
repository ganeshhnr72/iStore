'use strict';

///////////////////////////////////////
const appleProducts = [
  {
    product: 'iPad Pro ',
    price: 200,
    img: './img/img1.jpg',
  },
  {
    product: 'iPhone 14 Max Pro',
    price: 800,
    img: './img/img2.jpg',
  },
  {
    product: 'Mac Book Pro',
    price: 1000,
    img: './img/img3.jpg',
  },
  {
    product: 'Apple watch 5',
    price: 500,
    img: './img/img4.jpg',
  },
  {
    product: 'Apple Vision Pro',
    price: 3500,
    img: './img/img5.jpg',
  },
];

let cartObj = [];
const app = document.querySelector('.app');
appleProducts.forEach((apple, i) => {
  // Use forEach instead of map for side effects
  const html = ` <div class="parent-class">
        <div class="product">
          <img src=${apple.img} />
          <h3>${apple.product} <span class="price">Price ${apple.price}</span></h3>
          <span class="cart-btn"
            ><button
              class="remove-to-cart"
            >
              ➖
            </button><input disabled value="0" class="cart-input" /><button
              class="add-to-cart"
            >
              ➕
            </button>
          </span>
        </div>
      </div>`;
  app.insertAdjacentHTML('beforeend', html);
});
const addToCart1 = document.querySelectorAll('.add-to-cart');
const removeCarts1 = document.querySelectorAll('.remove-to-cart');
const cartBtnValue1 = document.querySelectorAll('.cart-input');
addtoCart(addToCart1, cartBtnValue1);
removeCart(removeCarts1, cartBtnValue1);

function addtoCart(addToCart, cartBtnValue) {
  let cartValue;
  addToCart.forEach((button, i) => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const duplicate = cartObj.some(
        e => e.product.trim() === appleProducts[i].product.trim()
      );
      cartValue = Number(cartBtnValue[i].value) + 1;
      cartBtnValue[i].value = cartValue; // Update the input value

      if (!duplicate) {
        const cost = appleProducts[i].price;
        const tempObj = { ...appleProducts[i], qty: cartValue, cost: cost };
        cartObj.push(tempObj);
      } else {
        cartObj.find(e => e.product === appleProducts[i].product).qty =
          cartValue;
        cartObj.find(e => e.product === appleProducts[i].product).cost =
          cartObj.find(e => e.product === appleProducts[i].product).price *
          cartValue;
      }

      console.log('adding here');
      console.log(cartObj);
      updateCart(cartObj);
    });
  });
}

function removeCart(removeCarts, cartBtnValue) {
  let cartValue = 0;
  removeCarts.forEach((button, i) => {
    button.addEventListener('click', e => {
      e.preventDefault();
      if (cartBtnValue[i].value > 0) {
        cartValue = Number(cartBtnValue[i].value) - 1;
        cartBtnValue[i].value = cartValue; // Update the input value
        console.log(cartValue);
        cartObj.find(e => e.product === appleProducts[i].product).qty =
          cartValue;
        cartObj.find(e => e.product === appleProducts[i].product).cost =
          cartObj.find(e => e.product === appleProducts[i].product).price *
          cartValue;
      }
      if (cartValue === 0) {
        cartObj = cartObj.filter(
          obj => obj.product !== appleProducts[i].product
        );
      }

      console.log(cartObj);
      updateCart(cartObj);
    });
  });
}

const showCart = document.querySelector('.show-cart');
const cartIcon = document.querySelector('.cart');
function updateCart(obj) {
  let cartNum = obj.map(ele => ele.qty).reduce((accu, curr) => accu + curr, 0);
  cartIcon.innerHTML = `🛒${cartNum}`;
}

cartIcon.addEventListener('click', e => {
  e.preventDefault();
  app.classList.add('hide');
  showCart.classList.add('show');
  resultOutput(cartObj);

  cartObj.map(apple => {
    const html2 = ` <div class="product-cart">
        <img src=${apple.img} />
          <h3>${apple.product} <span class="price">Price ${apple.price}</span></h3>
          <span class="cart-btn"
            ><button
              class="remove-to-cart2"
            >
              ➖
            </button><input disabled value=${apple.qty} class="cart-input2" /><button
              class="add-to-cart2"
            >
              ➕
            </button>
          </span></div>
       `;
    showCart.insertAdjacentHTML('beforeend', html2);
  });
  const addToCart2 = document.querySelectorAll('.add-to-cart2');
  const removeCarts2 = document.querySelectorAll('.remove-to-cart2');
  const cartBtnValue2 = document.querySelectorAll('.cart-input2');

  addToCart2.forEach((button, i) => {
    button.addEventListener('click', e => {
      cartBtnValue2[i].value++;
      e.preventDefault();
      console.log(cartBtnValue2[i].value);
      cartObj[i].qty = Number(cartBtnValue2[i].value);
      cartObj[i].cost = cartObj[i].price * Number(cartBtnValue2[i].value);
      console.log(cartObj);
      resultOutput(cartObj);
    });
  });

  removeCarts2.forEach((button, i) => {
    button.addEventListener('click', e => {
      if (cartBtnValue2[i].value > 0) cartBtnValue2[i].value--;
      e.preventDefault();
      console.log(cartBtnValue2[i].value);
      cartObj[i].qty = Number(cartBtnValue2[i].value);
      cartObj[i].cost = cartObj[i].price * Number(cartBtnValue2[i].value);

      console.log(cartObj);
      resultOutput(cartObj);
    });
  });
});

function resultOutput(cartObj) {
  let quantity = cartObj
    .map(ele => ele.qty)
    .reduce((accu, curr) => accu + curr, 0);
  let totalAmount = cartObj
    .map(ele => ele.cost)
    .reduce((accu, curr) => accu + curr, 0);
  const html3 = `<div class="fixed-right-center">
        <h1 class="total-qty">total qty: ${quantity}</h1>
        <h1 class="total-amount">total price: ${totalAmount}</h1>
      </div> `;
  showCart.insertAdjacentHTML('beforeend', html3);
}
