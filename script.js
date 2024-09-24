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
            container.classList.add('desserts-item');

            // Loop through each dessert and add it to the page

            data.forEach(dessert => {

                //Creating Elements.

                const dessertItem = document.createElement('div');
                const itemImage = document.createElement('div');
                const image = document.createElement('img');
                const addToCartBtn = document.createElement('div');
                const itemDetails = document.createElement('div')
                const itemCategory = document.createElement('p');
                const itemName = document.createElement('h4');
                const itemPrice = document.createElement('p');


                // Adding Attributes / innerHtml / innerText;

                image.src = `${dessert.image.thumbnail}`;
                image.alt = `${dessert.name}`;
                addToCartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
                itemCategory.innerText = `${dessert.category}`;
                itemName.innerText = `${dessert.name}`;
                itemPrice.innerText = `$${dessert.price.toFixed(2)}`


                // Adding respective class to the elements.

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

                itemImage.addEventListener('click', (event) => {
                    alert('Button was clicked!');
                    console.log(event);
                  });
            });
            
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });

}
fetchAndDisplayDesserts();