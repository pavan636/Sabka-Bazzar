import config from "./config";
import {apiCall} from "./utility";
export default class Template {
    async home() {
        const banners = await apiCall(config.banners, 'GET');
        let slide = '';
        banners.forEach(banner => {
            slide += `<img class="slider_img"  src="${banner.bannerImageUrl}" alt="${banner.bannerImageAlt}">`
        });
        const categories = await apiCall(config.category, 'GET');
        const categoriesfilter = categories.filter(cat => cat.enabled === true).sort((a, b) => a.order - b.order)
        let categoryHtml = '';
        let i = 0;
        categoriesfilter.forEach(category => {
            let class_name
            if (i++ % 2 == 0) {
                class_name = 'sb-products__categories_even'
            }
            else {
                class_name = 'sb-products__categories_odd'
            }
            categoryHtml += `<article class="sb-products--article">
            <div class="${class_name}">
                <img src="${category.imageUrl}" alt="${category.key}" class="sb-products__img_categories">
                <div class="sb-products__categories_details">
                    <p class="sb-products__category_title">${category.name}</p>
                    <p class="sb-products__category_description">
                        ${category.description}
                    </p>
                    <button class="sb-products__categories_Btn">Explore ${category.key}</button>
                </div>
            </div>
    </article>`
        });
        let home = `<section id="cart"></section>
        <section class="sb-carousel">
            <div id="slider" class="sb-carousel--slider">
                ${slide}
            </div>
            <button id="prev" class="sb-carousel__prev">Prev</button>
        <button id="next" class="sb-carousel__next">Next</button>
            <div class="sb-carousel--indicators">
                <button id="sb-carousel__btn1" class=" sb-carousel__indicator_span active"></button>
                <button id="sb-carousel__btn2" class=" sb-carousel__indicator_span"></button>
                <button id="sb-carousel__btn3" class=" sb-carousel__indicator_span"></button>
                <button id="sb-carousel__btn4" class=" sb-carousel__indicator_span"></button>
                <button id="sb-carousel__btn5" class=" sb-carousel__indicator_span"></button>
            </div>
    </section>
    <section class="sb-products" id="products">
        ${categoryHtml}
      </section>`
        return home
    }


    async products() {
        const productList = await apiCall(config.products, 'GET');
        let productHtml = ``;
        productList.forEach(prodElems => {
            productHtml += `<section class="product__card">
      <span class="product__card--title"> ${prodElems.name} </span>
      <figure class="product__card--img-wrapper">
        <img
          src="${prodElems.imageURL}"
          class="product__img"
          alt="${prodElems.name}"
        />
      </figure>
      <p class="product__card--desc">
        ${prodElems.description}
      </p>
      <section class="product__card--price-details">
      <p class="product__price">MRP Rs. ${prodElems.price}</p>
      <button class="btn-primary buy-now-cta" id="addToCart">Buy Now <span class="desktop-hide"> @ MRP Rs.</span><span class="desktop-hide">${prodElems.price}</span></button>
      </section>
    </section>`
        })
        return productHtml;
    }

    async categoryProducts(currentState) {
        const productNav = await apiCall(config.category, 'GET');
        const category = productNav.filter(filterItem => filterItem.enabled === true)
        console.log(category);
        let productsNav = ``;
        category.forEach(catElems => {
            if (catElems.name == currentState || catElems.key == currentState)
            productsNav += `<button class="btn-primary nav-btn active-category">${catElems.name}</button>`
            else 
            productsNav += `<button class="btn-primary nav-btn">${catElems.name}</button>`
        })
        return productsNav;
    }

    async productFilter(name) {
        const productList = await apiCall(`http://localhost:3000/filterproduct/${name}`, 'GET');
        let productFilterHtml = ``;
        productList.forEach(prodElems => {
            productFilterHtml += `<section class="product__card">
      <span class="product__card--title"> ${prodElems.name} </span>
      <figure class="product__card--img-wrapper">
        <img
          src="${prodElems.imageURL}"
          class="product__img"
          alt="${prodElems.name}"
        />
      </figure>
      <p class="product__card--desc">
        ${prodElems.description}
      </p>
      <section class="product__card--price-details">
        <p class="product__price">MRP Rs. ${prodElems.price}</p>
        <button class="btn-primary buy-now-cta" id="filterProd">Buy Now  <span class="desktop-hide">@ MRP Rs.</span><span class="desktop-hide">${prodElems.price}</span></button>
      </section>
    </section>`
        })
        return productFilterHtml;
    }
}