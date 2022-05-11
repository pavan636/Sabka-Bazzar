async function apiCall(url,requestType,body){
    if(body===undefined && requestType==='GET'){
        const data=await fetch(url,{method:requestType});
        return await data.json();
    }
    else{
        const data=await fetch(url,{
            method:requestType,
            headers:{'Content-Type':'application/json'},
            body:body
        });
    return await data.json();
}
}

function setCartCount(element){
    const item = JSON.parse(localStorage.getItem("items"));
    element.textContent=item.length;
    debugger;   
}
export {apiCall,setCartCount};