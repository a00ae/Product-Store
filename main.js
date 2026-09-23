let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catagory = document.getElementById("catagory");
let submit = document.getElementById("submit");

// get total
let mood = "create";
let tmp;

const getTotal = () => {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "var(--bg-color-btn)";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "";
  }
};

// add new data
// seva in localstorage
let dataTuch;

if (localStorage.product != null) {
  dataTuch = JSON.parse(localStorage.product);
} else {
  dataTuch = [];
}

submit.onclick = () => {
  let newTach = {
    title: title.value,
    price: price.value,
    taxes: taxes.value ? taxes.value : "0",
    ads: ads.value ? ads.value : "0",
    discount: discount.value ? discount.value : "0",
    count: count.value ? count.value : 1,
    total: total.innerHTML,
    catagory: catagory.value,
  };

  // 1. فحص كل حقل بشكل منفصل لتلوينه بالأحمر إذا كان فارغاً
  let isValid = true;

  if (title.value.trim() === "") {
    title.style.borderColor = "#f04";
    isValid = false;
  } else {
    title.style.borderColor = "";
  }

  if (price.value.trim() === "") {
    price.style.borderColor = "#f04";
    isValid = false;
  } else {
    price.style.borderColor = "";
  }

  if (catagory.value.trim() === "") {
    catagory.style.borderColor = "#f04";
    isValid = false;
  } else {
    catagory.style.borderColor = "";
  }

  // 2. التنفيذ فقط إذا كانت البيانات الأساسية مكتملة
  if (isValid) {
    if (mood === "create") {
        dataTuch.push(newTach);

    } else {
      dataTuch[tmp] = newTach;
      mood = "create";
      submit.innerHTML = "create";
    }

    // حفظ البيانات وتحديث الجدول فقط عند نجاح العملية
    localStorage.setItem("product", JSON.stringify(dataTuch));
    clearInputs();
    readData();
  }
};

// clear inputs

const clearInputs = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  catagory.value = "";
  total.style.backgroundColor = "";
};

// read

const readData = () => {
  getTotal();
  let table = "";

  for (let i = 0; i < dataTuch.length; i++) {
    table += `
                <tr>
                  <td>${i + 1}</td>
                  <td>${dataTuch[i].title}</td>
                  <td>${dataTuch[i].price}</td>
                  <td>${dataTuch[i].taxes === "0" ? "-" : dataTuch[i].taxes}</td>
                  <td>${dataTuch[i].ads === "0" ? "-" : dataTuch[i].ads}</td>
                  <td>${dataTuch[i].discount === "0" ? "-" : dataTuch[i].discount}</td>
                  <td>${dataTuch[i].count === "0" ? "-" : dataTuch[i].count}</td>
                  <td>${dataTuch[i].total}</td>
                  <td>${dataTuch[i].catagory}</td>
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            
            `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("delete-all");
  if (dataTuch.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAll()">delete all (${dataTuch.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
};

readData();

// delete
const deleteData = (id) => {
  dataTuch.splice(id, 1);
  localStorage.product = JSON.stringify(dataTuch);

  readData();
};

const deleteAll = () => {
  localStorage.clear();
  dataTuch.splice(0);
  readData();
};

// count
// update

const updateData = (id) => {
  title.value = dataTuch[id].title;
  price.value = dataTuch[id].price;
  taxes.value = dataTuch[id].taxes;
  ads.value = dataTuch[id].ads;
  discount.value = dataTuch[id].discount;
  count.value = dataTuch[id].count;
  catagory.value = dataTuch[id].catagory;

  // get total
  getTotal();

  submit.innerHTML = "update";
  mood = "update";
  tmp = id;

  scroll({
    top: 0,
    behavior: "smooth",
  });
};
// search

// search  mood

let searchMood = "title";

const getSearchMood = (id) => {
  let search = document.getElementById("search");
  if (id === "search-by-title") {
    searchMood = "title";
  } else {
    searchMood = "catagory";
  }

  search.placeholder = `search by ${searchMood}` 
  search.value = '';
  search.focus();
  readData();
  console.log(searchMood);
};

const searchData = (value) => {
  let table = "";

  for (let i = 0; i < dataTuch.length; i++) {
    if (searchMood === "title") {
      if (
        dataTuch[i].title.toLowerCase().includes(value.toLowerCase().trim())
      ) {
        table += `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${dataTuch[i].title}</td>
                      <td>${dataTuch[i].price}</td>
                      <td>${dataTuch[i].taxes}</td>
                      <td>${dataTuch[i].ads}</td>
                      <td>${dataTuch[i].discount}</td>
                      <td>${dataTuch[i].count}</td>
                      <td>${dataTuch[i].total}</td>
                      <td>${dataTuch[i].catagory}</td>
                      <td><button onclick="updateData(${i})" id="update">update</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                   `;
      }
    } else {
      if (
        dataTuch[i].catagory.toLowerCase().includes(value.toLowerCase().trim())
      ) {
        table += `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${dataTuch[i].title}</td>
                      <td>${dataTuch[i].price}</td>
                      <td>${dataTuch[i].taxes}</td>
                      <td>${dataTuch[i].ads}</td>
                      <td>${dataTuch[i].discount}</td>
                      <td>${dataTuch[i].count}</td>
                      <td>${dataTuch[i].total}</td>
                      <td>${dataTuch[i].catagory}</td>
                      <td><button onclick="updateData(${i})" id="update">update</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
};

// clean data
