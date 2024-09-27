// Array to hold cart items
let cartItems = [];
let itemCount = []; 
   const emptyCartImage = document.getElementById('emptyCartImage');
    emptyCartImage.innerHTML = '<img class="empty-cart-img" src="assets/images/illustration-empty-cart.svg" alt="emptyCartImage">'
    const emptyCartPara = document.getElementById('emptyCartPara');emptyCartPara.innerText = 'Your added items will appear here';


function fetchAndDisplayDesserts() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            const container = document.getElementById('dessertsItems');

            // Loop through each dessert and add it to the page
            data.forEach(dessert => {
                
                //Creating Elements.
                const dessertItem = document.createElement('div');
                const itemImage = document.createElement('div');
                const image = document.createElement('img');
                const addToCartBtn = document.createElement('div');
                const itemDetails = document.createElement('div');
                const itemCategory = document.createElement('p');
                const itemName = document.createElement('h4');
                const itemPrice = document.createElement('p');
                

                // Adding Attributes / innerHTML / innerText;
                image.src = `${dessert.image.thumbnail}`;
                image.alt = `${dessert.name}`;
                image.id = 'itemImage';
                addToCartBtn.innerHTML = '<img class="cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="Description of icon" width="24" height="24"/> Add To Cart';
                itemCategory.innerText = `${dessert.category}`;
                itemName.innerText = `${dessert.name}`;
                itemPrice.innerText = `$${dessert.price.toFixed(2)}`;
                addToCartBtn.setAttribute('id',`${dessert.name}+1`);

                // Adding respective classes to the elements.
                dessertItem.classList.add('desserts-item');
                itemImage.classList.add('item-image');
                addToCartBtn.classList.add('add-to-cart-btn');
                itemDetails.classList.add('item-details');
                itemCategory.classList.add('color-rose-400');
                itemName.classList.add('color-rose-900');
                itemPrice.classList.add('color-red');

                // Appending Elements.
                container.appendChild(dessertItem);
                dessertItem.appendChild(itemImage);
                itemImage.appendChild(image);
                itemImage.appendChild(addToCartBtn);
                dessertItem.appendChild(itemDetails);
                itemDetails.appendChild(itemCategory);
                itemDetails.appendChild(itemName);
                itemDetails.appendChild(itemPrice);


                //creating add to cart btn afte first click
                const svgNS = "http://www.w3.org/2000/svg";

                // Create decrement button SVG
                const decrementSvg = document.createElementNS(svgNS, "svg");
                decrementSvg.setAttribute("id", "decrement-quantity");
                decrementSvg.setAttribute("class", "ind-btn");
                decrementSvg.setAttribute("width", "24");
                decrementSvg.setAttribute("height", "24");
                decrementSvg.setAttribute("viewBox", "0 0 24 24");
        
                const decrementPath = document.createElementNS(svgNS, "path");
                decrementPath.setAttribute("d", "M5 12h14");
                decrementPath.setAttribute("stroke", "white");
                decrementPath.setAttribute("stroke-width", "2");
                decrementPath.setAttribute("fill", "none");
        
                decrementSvg.appendChild(decrementPath);
        
                // Create increment button SVG
                const incrementSvg = document.createElementNS(svgNS, "svg");
                incrementSvg.setAttribute("id", "increment-quantity");
                incrementSvg.setAttribute("class", "ind-btn");
                incrementSvg.setAttribute("width", "24");
                incrementSvg.setAttribute("height", "24");
                incrementSvg.setAttribute("viewBox", "0 0 24 24");
        
                const incrementPath = document.createElementNS(svgNS, "path");
                incrementPath.setAttribute("d", "M12 5v14m-7-7h14");
                incrementPath.setAttribute("stroke", "white");
                incrementPath.setAttribute("stroke-width", "2");
                incrementPath.setAttribute("fill", "none");
        
                incrementSvg.appendChild(incrementPath);

                 // Create count items span
                const countSpan = document.createElement("span");
                countSpan.setAttribute("id", "itemCounts");
                countSpan.setAttribute("class", "count-items");
                //  countSpan.textContent = "1";  // Initial count

                var x = 0;
                addToCartBtn.addEventListener('click', () => {
                    if(!x){
                    addToCartBtn.innerHTML = ' ';
                    addToCart(dessert,null); 
                    document.getElementById('orderAmmountContainer').style.display = 'block';
                    x=2;
                    emptyCartImage.innerHTML = ' ';
                    emptyCartPara.innerText = ' ';
                    addToCartBtn.style.backgroundColor = 'hsl(14, 86%, 42%)';
                    countSpan.innerText = '1';
                    countSpan.setAttribute('id',`${dessert.name}`);
                    addToCartBtn.appendChild(decrementSvg)
                    addToCartBtn.appendChild(countSpan);
                    addToCartBtn.appendChild(incrementSvg);
                }
                });
                incrementSvg.addEventListener('click', ()=>{
                  addToCart(dessert,1); 
                });
                decrementSvg.addEventListener('click', ()=>{
                    addToCart(dessert,-1); 
                 });
             

            });
           
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });
}


let totalOrderPrice = 0;


function addToCart(dessert,id) {
   const dessertPrice = Number(dessert.price);
    
   const cartHeading = document.getElementById('cartHeading');

    const itemInCart = cartItems.find(item => item.name === dessert.name);
    // totalOrderPrice += dessertPrice;

    if (itemInCart && id==1) {
        for (let i = 0; i < cartItems.length; i++) {
            if (dessert.name === cartItems[i].name) {
                itemCount[i] += 1;
                document.getElementById(`${dessert.name}`).innerText = `${itemCount[i]}`;
                totalOrderPrice += dessertPrice;
                break;
            }
        }
    } 
    else if(itemInCart && id==-1){
        for (let i = 0; i < cartItems.length; i++) {
            if (dessert.name === cartItems[i].name) {
                itemCount[i] -= 1;
                document.getElementById(`${dessert.name}`).innerText = `${itemCount[i]}`;
                totalOrderPrice -= dessertPrice;
                if(itemCount[i]==0){
                    cartItems.splice(i, 1);
                document.getElementById(`${dessert.name}+1`).innerHTML ='<img class="cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="Description of icon" width="24" height="24"/> Add To Cart';
                document.getElementById(`${dessert.name}+1`).style.backgroundColor = 'white';
                document.getElementById('orderAmmountContainer').style.display = 'none';
                 emptyCartImage.innerHTML = '<img class="empty-cart-img" src="assets/images/illustration-empty-cart.svg" alt="emptyCartImage">';
                 emptyCartPara.innerText = 'Your added items will appear here';

                }
                document.getElementById('totalOrderAmmount').innerText = `$${totalOrderPrice.toFixed(2)-2*dessert.price}`;
                break;
            }
        }
    }
    else if(id == null){
        cartItems.push(dessert);
        itemCount.push(1);
        totalOrderPrice += dessertPrice;
    }
     let count=0;
    for(let i=0;i<itemCount.length;i++){
       count+=itemCount[i];
    }
    cartHeading.innerText = `Your Cart (${count})`;

    document.getElementById('totalOrderAmmount').innerText = `${totalOrderPrice.toFixed(2)}`;

    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = ' ';

    cartItems.forEach((item, index) => {
        // Create elements
        const cartItem = document.createElement('div');
        const cartItemDetail = document.createElement('div');
        const cartItemName = document.createElement('h4');
        const cartItemCount = document.createElement('span');
        const cartItemTotalPrice = document.createElement('span');
        const cartItemPrice = document.createElement('span');
        const removeBtn = document.createElement('div');
        const hr = document.createElement('hr'); 


        // Ensure the price calculations are numbers
        const itemPrice = Number(item.price);
        const itemCountValue = itemCount[index] || 1;

        // Set values and innerText
        cartItemName.innerText = `${item.name}`;
        cartItemCount.innerText = `${itemCountValue}x `;
        cartItemTotalPrice.innerText = ` $${itemPrice.toFixed(2)} `;
        cartItemPrice.innerText = ` $${(itemPrice * itemCountValue).toFixed(2)}`;
        removeBtn.innerHTML = '<img src="assets/images/icon-remove-item.svg" alt="remove-item">';
        removeBtn.style.color = 'hsl(14, 86%, 42%)';
        removeBtn.setAttribute('class','remove-btn');


        // Add classes to elements
        cartItem.classList.add('cart-item');
        cartItemDetail.classList.add('item-detail');
        cartItemName.classList.add('color-rose-900');
        cartItemCount.classList.add('color-red');
        cartItemTotalPrice.classList.add('color-rose-400');
        cartItemPrice.classList.add('color-rose-900');
        removeBtn.classList.add('remove-btn');

        // Append elements
        cartItemsContainer.appendChild(cartItem);
        cartItemsContainer.appendChild(hr); 
        cartItem.appendChild(cartItemDetail);
        cartItem.appendChild(removeBtn);
        cartItemDetail.appendChild(cartItemName);
        cartItemDetail.appendChild(cartItemCount);
        cartItemDetail.appendChild(cartItemTotalPrice);
        cartItemDetail.appendChild(cartItemPrice);

        

        // Remove button functionality
        removeBtn.addEventListener('click', () => {
            const itemCountValue = itemCount[index] || 1; // Ensure valid value

            totalOrderPrice -= itemPrice * itemCountValue; // Correct price calculation
            totalOrderPrice = isNaN(totalOrderPrice) ? 0 : totalOrderPrice; // Handle NaN case
            document.getElementById('totalOrderAmmount').innerText = `$${totalOrderPrice.toFixed(2)}`;

            document.getElementById(`${dessert.name}+1`).innerHTML ='<img class="cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="Description of icon" width="24" height="24"/> Add To Cart';
            document.getElementById(`${dessert.name}+1`).style.backgroundColor = 'white';
            
            itemCount.splice(index, 1); // Remove count of item
            cartItems.splice(index, 1); // Remove item from cart
            cartItem.remove(); // Remove item from the DOM
            hr.remove(); // Remove the hr element from the DOM


            // Update cart heading after item removal
            const totalItemCount = itemCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            cartHeading.innerText = `Your Cart (${totalItemCount})`;
            
            // If no items left in the cart, clear the display or show a message
            if (totalItemCount === 0) {
                cartHeading.innerText = 'Your cart (0)';
                document.getElementById('orderAmmountContainer').style.display = 'none';
                 emptyCartImage.innerHTML = '<img class="empty-cart-img" src="assets/images/illustration-empty-cart.svg" alt="emptyCartImage">';
                 emptyCartPara.innerText = 'Your added items will appear here';
            }
           
        });
    });
   
}

document.getElementById('orderBtn').addEventListener('click', () => {
    confirmOrder();
})
document.getElementById('newOrder').addEventListener('click', () => {
    location.reload();
})

function confirmOrder () {
 const confirmOrderContainer = document.getElementById('confirmOrderContainer');
 confirmOrderContainer.style.display = 'block';

 const orderedItems = document.getElementById('orderedItems');
 orderedItems.innerHTML = ' ';

 document.getElementById('totalOrderedAmmount').innerText = `$${totalOrderPrice}`;

 cartItems.forEach((item,index) => {

    console.log(item);
     // Create elements
    const orderedItem = document.createElement('div');
    const itemDetail = document.createElement('div');
    const orderedItemContainer = document.createElement('div');
    const orederedItemImageContainer = document.createElement('div');
    const orederedItemImage = document.createElement('img');
    const aboutItem = document.createElement('div');
    const orderedItemName = document.createElement('h4');
    const orderedItemCount = document.createElement('span');
    const orderedItemPrice = document.createElement('span');
    const orderedItemTotalPrice = document.createElement('span');
    const hr = document.createElement('hr');

    // Ensure the price calculations are numbers
    const itemPrice = Number(item.price);
    const itemCountValue = itemCount[index] || 1;

    // Set values and innerText
    orederedItemImage.src = `${item.image.thumbnail}`;
    orderedItemName.innerText = `${item.name}`;
    orderedItemCount.innerText = `${itemCountValue}x `;
    orderedItemPrice.innerText = ` $${itemPrice.toFixed(2)} `;
    orderedItemTotalPrice.innerText = ` $${(itemPrice * itemCountValue).toFixed(2)}`;

    // Add classes to elements
    orderedItem.classList.add('ordered-item');
    itemDetail.classList.add('item-img-and-price-detail-total');
    orderedItemContainer.classList.add('item-img-and-price-detail');
    aboutItem.classList.add('item-detail');
    orederedItemImageContainer.classList.add('ordered-item-img');
    orderedItemCount.classList.add('color-red');
    orderedItemPrice.classList.add('color-rose-400');

    // Append elements
    orderedItems.appendChild(orderedItem);
    orderedItem.appendChild(itemDetail); 
    orderedItems.appendChild(hr);
    itemDetail.appendChild(orderedItemContainer);
    orderedItemContainer.appendChild(orederedItemImageContainer);
    orederedItemImageContainer.appendChild(orederedItemImage);
    orderedItemContainer.appendChild(aboutItem);
    orderedItemContainer.appendChild(orderedItemTotalPrice);
    aboutItem.appendChild(orderedItemName);
    aboutItem.appendChild(orderedItemCount);
    aboutItem.appendChild(orderedItemPrice);

 });


}


// Fetch and display desserts when the page loads
fetchAndDisplayDesserts();
