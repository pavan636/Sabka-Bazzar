import { setCartCount } from "./utility";

let items = [];
async function localProduct(addToCartBtn) {
  //adding data to localstorage
  for (let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener("click", function (e) {
      console.log(e.target.parentElement.parentElement.children[1].children[0].src)
      if (typeof (Storage) !== 'undefined') {
        let item = {
          id: i + 1,
          name: e.target.parentElement.parentElement.children[0].textContent,
          price: e.target.parentElement.children[1].children[1].textContent,
          img: e.target.parentElement.parentElement.children[1].children[0].src,
          no: 1
        };
        if (JSON.parse(localStorage.getItem('items')) === null) {
          items.push(item);
          localStorage.setItem("items", JSON.stringify(items));
          console.log(item);
        } else {
         // e.preventDefault();
         const localItems = JSON.parse(localStorage.getItem("items")); 
          localItems.map((data,index)=> {
            if (item.id === data.id) {
              item.no = data.no + 1;
              items.splice(index,1);
            }
          });
          items.push(item);
          console.log(localItems[0]);
          localStorage.setItem('items', JSON.stringify(items));
        }
        setCartCount(document.getElementById('cartCount2'));
      } else {
        console.log("error");
      }
    });
  }
}

export default localProduct;