import {setCartCount} from './utility'
function cartClose(){
    const mainCart = document.querySelector('.minicart');
    const closeBtn = document.querySelector('.minicart-modal-header-btn');
    const overLay = document.querySelector('.overlay');
    const buttonClose = document.querySelector('.minicart-modal-footer-btn')
    
    closeBtn.addEventListener('click', ()=>{
       mainCart.style.display ='none'
        mainCart.classList.add('cart-hide');
        overLay.classList.add('cart-hide');

    })

    overLay.addEventListener('click', ()=>{
        mainCart.style.display ='none'
         mainCart.classList.add('cart-hide');
         overLay.classList.add('cart-hide');
 
     })
    buttonClose.addEventListener('click', ()=>{
        mainCart.style.display ='none'
        mainCart.classList.add('cart-hide');
        overLay.classList.add('cart-hide');
    })

}



function productPricing(){
    const incBtn = document.querySelectorAll('.inc-button');
    const decBtn = document.querySelectorAll('.dec-button');
    // const qty = document.querySelector('.minicart-modal-section-cart-counter-text');
    const finalPrice = document.querySelector('#finalPrice');
    const cartCount=document.getElementById('cartCount');
    
    setCartCount(cartCount);
    function setFinalPrice(){
    const totalPriceEl = document.querySelectorAll('.minicart-modal-section-cart-totalprice');
        let sum=0;
        for(let i=0;i<totalPriceEl.length;i++){
            sum+=parseInt(totalPriceEl[i].textContent.replace("Rs.",""));
        }
        finalPrice.textContent="Rs. "+sum;
    } 
    setFinalPrice();
    // var total=parseInt(amount.textContent);
    for(let i=0; i<incBtn.length ;i++){
     incBtn[i].addEventListener('click', (e)=>{
    let incQuantity = parseInt(e.target.parentNode.children[1].textContent)
    incQuantity ++
    updateLocalStorage(e.target.parentNode.children[4].textContent.replace("Rs.",""),"increment")
    e.target.parentNode.children[1].textContent = incQuantity
    const incAmount = parseInt(e.target.parentNode.children[4].textContent.replace("Rs.",""))
    e.target.parentNode.parentNode.children[1].textContent = "Rs."+(incAmount * incQuantity) 
   setFinalPrice();
 
      });
      
    }
    for(let i=0; i<decBtn.length ;i++){
        console.log(i)
     decBtn[i].addEventListener('click', (e)=>{
        
        let decQuantity = parseInt(e.target.parentNode.children[1].textContent)
    decQuantity --
    updateLocalStorage(e.target.parentNode.children[4].textContent.replace("Rs.",""),"decrement")
    if (decQuantity === 0) {
        e.target.parentNode.parentNode.parentNode.remove()
        setFinalPrice();
        setCartCount(cartCount);
        setCartCount(document.getElementById('cartCount2'));
    } else {
        e.target.parentNode.children[1].textContent = decQuantity
        const decAmount = parseInt(e.target.parentNode.children[4].textContent.replace("Rs.",""))
        e.target.parentNode.parentNode.children[1].textContent = "Rs."+(decAmount * decQuantity)
        setFinalPrice();   
    }
       });
       
    }

     function updateLocalStorage(price,action){
        const item = JSON.parse(localStorage.getItem("items"))       
        const itemId = item.filter(filteritems => filteritems.price == price)[0].id
       item.map((data,index) => {
         if (itemId == data.id) {
             if(action=="decrement"){
                data.no--;
               
             }
             if(action=="increment"){
                data.no++;
             }
            console.log(data.no);
           item[index].no=data.no;
           if(data.no==0){
               item.splice(index,1);
           }    
         }
     });
   
     localStorage.setItem("items",JSON.stringify(item));
     }
   
}




export {cartClose,productPricing}