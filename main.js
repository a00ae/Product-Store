let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catagory= document.getElementById("catagory");
let submit = document.getElementById("submit");


// get total

const getTotal = () => {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'var(--bg-color-btn)';
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = '';
    }

}



let dataTuch;
if(localStorage.product != null) {
    dataTuch = JSON.parse(localStorage.product);
}
else {
    dataTuch = [];
}


submit.onclick = () => {

    let newTach = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        catagory: catagory.value

    }
    
    dataTuch.push(newTach);
    // حفظ البيانات داخل ذاكرة المتصفح = localStorage
    localStorage.setItem("product", JSON.stringify(dataTuch));
    
 
}


// seva in localstorage
// clear inputs
// read 
// count
// delete
// update
// search
// clean data 
