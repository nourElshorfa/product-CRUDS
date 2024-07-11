var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory")
var productDescribtionInput = document.getElementById("productDescribtion")
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex ;

var productList = []

if (localStorage.getItem("products") != null) {   //zbon adeem
    productList = JSON.parse(localStorage.getItem("products")) 
    showProducts(productList)
}

function addProduct() {

    if(validateProductName() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            describtion: productDescribtionInput.value
        }
        productList.push(product)
        localStorage.setItem("products", JSON.stringify(productList))
        showProducts(productList)
        clearForm()
        productNameInput.classList.remove("is-invalid")
        productNameInput.style.border = "0px solid green"
    } else {
       productNameInput.style.border = "2px solid red"
       productNameInput.classList.add("is-invalid")
    }
    

}


function showProducts(product) {
 
    var cartoona = ``;
    for (var i = 0; i < product.length; i++) {
        
        cartoona += `<tr>
          <td>${product[i].name}</td>
          <td>${product[i].price}</td>
          <td>${product[i].category}</td>
          <td>${product[i].describtion}</td>
          <td> <button onclick="setFormForUpdate(${i})" class="btn btn-warning text-white">Update</button></td>
          <td> <button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableContent").innerHTML = cartoona
}

function clearForm(){
    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productDescribtionInput.value = ""
}

function deleteProduct(productIndex){
 productList.splice(productIndex,1)
 localStorage.setItem("products", JSON.stringify(productList))
 showProducts(productList)
}

function setFormForUpdate(productIndex){  
    currentIndex = productIndex  

    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    productNameInput.value = productList[productIndex].name
    productPriceInput.value = productList[productIndex].price
    productCategoryInput.value = productList[productIndex].category
    productDescribtionInput.value = productList[productIndex].describtion

}

function updateProduct(){



    //1st Way

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        describtion: productDescribtionInput.value
    }

    // productList[currentIndex] = product
    //or
    productList.splice(currentIndex,1,product)
 
    //2nd Way

    // productList[currentIndex].name = productNameInput.value
    // productList[currentIndex].price = productPriceInput.value
    // productList[currentIndex].category = productCategoryInput.value
    // productList[currentIndex].describtion = productDescribtionInput.value


    localStorage.setItem("products", JSON.stringify(productList))
    showProducts(productList)
    clearForm()
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
}


function searchByName(word){

    var foundedList = []
    for( var i = 0 ; i < productList.length ; i++){
        if( productList[i].name.toLowerCase().includes(word.toLowerCase())){
            console.log("Founded" , i);
            foundedList.push(productList[i])
        } 
    }
    showProducts(foundedList)
}

function validateProductName(){

    var regex = /^[A-Z][a-z]{3,10}$/
    return regex.test(productNameInput.value) 
}

