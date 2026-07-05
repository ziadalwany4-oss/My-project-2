     let input1 = document.getElementById("input1");
     let input2 = document.getElementById("input2");
     let input3 = document.getElementById("input3");
     let srcbutton = document.getElementById("srcbutton");
     let message = document.getElementById("message");
     let ProductList = document.getElementById("ProductList");

     let Product = [];
     let editsindex = null;

     let SavedseProduct =localStorage.getItem("Product");

     if(SavedseProduct !==null){
        Product = JSON.parse(SavedseProduct);
     }
     
    function saveToLocalStorage(){
        localStorage.setItem("Product", JSON.stringify(Product));
    }

      
     function displayProduct (){
        ProductList.innerHTML ='';

        Product.forEach(function(item, index){
        ProductList.innerHTML +=`
        <div class="Product">
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>quantity: ${item.quantity}</p>
        <button onclick= "editsProduct(${index})">Edit</button>
        <button onclick= "DeleteProduct(${index})">Delete</button>
        </div>
        `;
        });
     }
        
    srcbutton.addEventListener("click" , function() {
      let Products = {
        name: input1.value,
        price: input2.value,
        quantity: input3.value
      };

    if(editsindex ===null){
       Product.push(Products);
    message.textContent = "Product Added successfully";
    }else {
        Product[editsindex]= Products;
        editsindex= null;
        srcbutton.textContent = "Save Product";
        message.textContent = "Product Updated Successfully";
    }

    saveToLocalStorage();
    displayProduct();

    input1.value = "";
    input2.value = "";
    input3.value = ""; 
      
});

function editsProduct(index){
   input1.value = Product[index].name
   input2.value = Product[index].price;
   input3.value = Product[index].quantity; 

   editsindex = index;
   srcbutton.textContent = "Update Product";
}

function DeleteProduct(index){
    Product.splice(index,1);
   saveToLocalStorage();
    displayProduct();

    message.textContent = "Product Delete Successfully";
}
displayProduct();