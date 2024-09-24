// Array to hold cart items
let cartItems = [];
let itemCount = [];

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
                addToCartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
                itemCategory.innerText = `${dessert.category}`;
                itemName.innerText = `${dessert.name}`;
                itemPrice.innerText = `$${dessert.price.toFixed(2)}`;


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

                // Click event for Add to Cart button for each dessert
                addToCartBtn.addEventListener('click', () => {
                    addToCart(dessert); 
                });
            });
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });
}

// Function to add item to the cart
let totalOrderPrice=0;
function addToCart(dessert) {
    document.getElementById('cartHeading').innerText = `Your Cart (${itemCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0) +1})`;

    const itemInCart = cartItems.find(item => item.name === dessert.name);
    totalOrderPrice += dessert.price;
    document.getElementById('totalOrderAmmount').innerText = `$${totalOrderPrice}`;

    if (itemInCart) {
        for(let i=0;i<cartItems.length;i++){
            if(dessert.name == cartItems[i].name){
                itemCount[i]+=1; break;
            } 
        }
    } 
    else {
        cartItems.push(dessert);
        itemCount.push(1);
    }
    const cartItemsContainer = document.getElementById('cartItemsContainer');
       cartItemsContainer.innerHTML = " ";

    cartItems.forEach(item => {

       //creating elements
       const cartItem = document.createElement('div');
       const cartItemDetail = document.createElement('div');
       const cartItemName = document.createElement('h4');
       const cartItemCount = document.createElement('span');
       const cartItemTotalPrice = document.createElement('span');
       const cartItemPrice = document.createElement('span');
       const removeBtn = document.createElement('div');
       const hr = document.createElement('hr');

        // Adding Attributes / innerHTML / innerText;
        cartItemName.innerText = `${item.name}`;
        let i;
        for(i=0;i<cartItems.length;i++){
            if(item.name == cartItems[i].name){
                cartItemCount.innerText = `${itemCount[i]}x `; break;
            } 
        }
        cartItemTotalPrice.innerText = ` $${item.price} `;
        cartItemPrice.innerText = ` $${item.price*itemCount[i]}`; 
        removeBtn.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        
        // Adding respective classes to the elements.
        cartItem.classList.add('cart-item');
        cartItemDetail.classList.add('item-detail');
        cartItemName.classList.add('color-rose-900');
        cartItemCount.classList.add('color-red');
        cartItemTotalPrice.classList.add('color-rose-400');
        cartItemPrice.classList.add('color-rose-900');
        removeBtn.classList.add('remove-btn');

        //Appending Elements
        cartItemsContainer.appendChild(cartItem);
        cartItemsContainer.appendChild(hr)
        cartItem.appendChild(cartItemDetail);
        cartItem.appendChild(removeBtn);
        cartItemDetail.appendChild(cartItemName);
        cartItemDetail.appendChild(cartItemCount);
        cartItemDetail.appendChild(cartItemTotalPrice);
        cartItemDetail.appendChild(cartItemPrice);

        removeBtn.addEventListener('click', () => {
            
            for(let i=0;i<cartItems.length;i++){
                if(item.name == cartItems[i].name){
                    totalOrderPrice -= itemCount[i]*item.price;
                    console.log(totalOrderPrice);
                    itemCount[i] = 0 ;
                    cartItem.remove(cartItem[i]);
                    break;
                } 
            }
          console.log(item);
        })

    });
}

// Fetch and display desserts when the page loads
fetchAndDisplayDesserts();
