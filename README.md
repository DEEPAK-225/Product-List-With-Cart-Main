# Product List With Cart

## Table of contents

  - [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Code snippets](#code-snippets)

## Overview

The Product List With Cart application is designed to enhance the shopping experience by allowing users to browse products and manage their selections in a user-friendly interface. Built with React and Next.js, this application features a dynamic cart system that provides real-time updates as users interact with the product list. The responsive design ensures that users can easily navigate the app on devices of all sizes, making it accessible and convenient for everyone.

### The challenge

Users should be able to:

- Add items to the cart and remove them.
- Increase/decrease the number of items in the cart.
- See an order confirmation modal when they click "Confirm Order."
- Reset their selections when they click "Start New Order."
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.

### Screenshot

![Product List with Cart Screenshot](./screenshot.png)

### Links

- Live Site URL: [Live Site](https://deepak-225.github.io/Product-List-With-Cart/)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

### What I learned

Through this project, I gained deeper insight into developing a dynamic and responsive cart system. Here are the key things I learned:

1. **Dynamic Cart Management**:
   Managing cart items effectively using state allowed me to build a robust cart system where users can add or remove items, and adjust their quantities dynamically.

2. **Modal Implementation**:
   Implementing a modal for order confirmation taught me how to create a user-friendly interface that informs users about their current cart status.

3. **Responsive Design**:
   By using Flexbox and CSS Grid, I learned how to make a layout that adapts well across various screen sizes, providing an optimal experience on both mobile and desktop devices.

### Code snippets

Here’s a highlight of a few code snippets that I am particularly proud of:

1. **Adding items to the cart:**
   This code checks if the item already exists in the cart. If it does, it increments the quantity; otherwise, it adds the new item.

```js
const addToCart = (product) => {
  const existingItem = cartItems.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  updateCart();
};
