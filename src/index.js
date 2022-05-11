import './index.scss'
import header from './html/header.html'
import Template from './javascript/template'
import slide from './javascript/carousel'
import login from './html/login.html'
import register from './html/register.html'
import emptycart from './html/emptycart.html'
import maincart from './html/maincart.html'
import loginValidation from './javascript/login'
import registerValidation from './javascript/register'
import cartStorage from './javascript/countItems'
import { cartClose,productPricing } from './javascript/cart'
import { setCartCount } from './javascript/utility'
// import cart from './javascript/cart'
import product from './html/plp.html'
import localProduct from './javascript/addToCart'
(async function () {
  const headerEl = document.querySelector('#header');
  const mainEl = document.querySelector("#main");
  headerEl.innerHTML = header
  const cartCount=document.getElementById('cartCount2');
  setCartCount(cartCount);
  const loginEL = document.querySelector('#signin');
  const registerEl = document.querySelector('#register');
  const template = new Template();
  mainEl.innerHTML = await template.home();
  const productEl = document.getElementById('product');
  const slider = document.getElementById('slider');
  const sliderItems = document.getElementById('slider');
  const cartBtn = document.getElementById('cartBtn');
  //carousal buttons id extraction from Dom
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  //caraousal dots id extraction from Dom 
  var btn1 = document.getElementById('sb-carousel__btn1');
  var btn2 = document.getElementById('sb-carousel__btn2');
  var btn3 = document.getElementById('sb-carousel__btn3');
  var btn4 = document.getElementById('sb-carousel__btn4');
  var btn5 = document.getElementById('sb-carousel__btn5');
  // local storage cart data
  const productList = document.getElementById('cart__productlist');
  const productTitle = document.getElementById('minicart-modal-section-cart-tittle');

 
  productEl.addEventListener('click', async () => {
    mainEl.innerHTML = product;
    const productListContainer = document.querySelector('#productListContainer');
    const productNav = document.querySelector('.product__nav');
    var productNavAwait = await template.categoryProducts();
    var productAwait = await template.products();
    productListContainer.innerHTML = productAwait;
    productNav.innerHTML = productNavAwait;
    console.log(productListContainer)
    categoryFilter();
  });
  
  cartBtn.addEventListener('click', e => {
    //  const bodyEl=document.querySelector('body');
    const cartEl = document.getElementById('cart');
    if (JSON.parse(localStorage.getItem("items")) === null) {
      cartEl.innerHTML = emptycart;

    }
    else {
      cartEl.innerHTML = maincart;
      let productCart = ``;
      const localData = JSON.parse(localStorage.getItem("items"));
      const productInCart = document.querySelector('.minicart-modal-section-full')
      console.log(localData);
      if (JSON.parse(localStorage.getItem('items')) === null) {
        productInCart.innerHTML = emptyCart;
      } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
          productCart += `<section class="minicart-modal-section-cart" id="cart__productlist">          
        <img class="minicart-modal-section-cart-image image-wrapper" src="${data.img}" alt="">                           
            <span class="minicart-modal-section-cart-name" >${data.name} </span >
            <div class="minicart-div ">
            <div class="minicart-modal-section-cart-counter">
                <button class="minicart-modal-section-cart-counter-btn button-wrapper dec-button">-</button>
                <p class="minicart-modal-section-cart-counter-text">${data.no}</p>
                <button class="minicart-modal-section-cart-counter-btn button-wrapper inc-button">+</button>
                <p class="minicart-modal-section-cart-multiply">X</p>
                <p class="minicart-modal-section-cart-counter-text">Rs.${data.price}</p>  
                </div> 
                <p class="minicart-modal-section-cart-totalprice" >Rs.${data.price} </p>   

            </div>
            
    </section>`
        });
        productInCart.innerHTML = productCart;
      }
      productPricing();
    }
    cartClose()
  })


  const exploreBtn = document.getElementsByClassName('sb-products__categories_Btn');
  for (let i = 0; i < exploreBtn.length; i++) {
    exploreBtn[i].addEventListener("click", async (e) => {
      const categoryName = e.target.textContent.replace("Explore ", "");
      mainEl.innerHTML = product;
      const productListContainer = document.querySelector('#productListContainer');
      const productNav = document.querySelector('.product__nav');
      var productNavAwait = await template.categoryProducts(categoryName);
      productNav.innerHTML = productNavAwait;
      var categoryAwaitList = await template.productFilter(categoryName);
      productListContainer.innerHTML = categoryAwaitList;
      categoryFilter();
    }
    )
  }


  loginEL.addEventListener('click', e => {
    mainEl.innerHTML = login
    window.history.pushState("", "", '/login');
    loginValidation();
  })
  registerEl.addEventListener('click', e => {
    mainEl.innerHTML = register
    window.history.pushState("", "", '/register');
    registerValidation();
  })


  //  cartEl.style.zIndex='100';
  //  bodyEl.style.overflow='hidden'

  // maincartEl.addEventListener('click',e=>{
  //   mainEl.innerHTML=maincart
  //   window.history.pushState("", "",'')
  // })

  const f = slide(slider, sliderItems);
  prev.addEventListener('click', () => f.shiftSlide(-1));
  next.addEventListener('click', () => f.shiftSlide(1));
  btn1.addEventListener('click', () => f.slideDot());
  btn2.addEventListener('click', () => f.slideDot());
  btn3.addEventListener('click', () => f.slideDot());
  btn4.addEventListener('click', () => f.slideDot());
  btn5.addEventListener('click', () => f.slideDot());
  // Touch events
  sliderItems.addEventListener('touchstart', e => f.dragStart(e));
  sliderItems.addEventListener('touchend', e => f.dragEnd(e));
  sliderItems.addEventListener('touchmove', e => f.dragAction(e));

 function categoryFilter(){
  const prodFilter = document.getElementsByClassName('nav-btn');
  for (let i = 0; i < prodFilter.length; i++) {
    prodFilter[i].addEventListener('click', async (e) => {
      const catName = e.target.textContent;
      const removeclass=e.target.parentNode.querySelector('.active-category');
      if(removeclass!==null){
        removeclass.classList.remove('active-category');
      }
      e.target.classList.add('active-category');
      var categoryAwaitList = await template.productFilter(catName);
      productListContainer.innerHTML = categoryAwaitList;
      const filterProd = document.querySelectorAll('#filterProd');
      window.onload = localProduct(filterProd);
    })
  }
  const addToCart = document.querySelectorAll('#addToCart');
  window.onload = localProduct(addToCart);
 } 
})()
