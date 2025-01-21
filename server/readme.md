# Online Tailoring Service API

This API provides various endpoints for managing users, products, orders, profiles, addresses, and more for an online tailoring service.

## Table of Contents

- [User Routes](#user-routes)
- [Product Routes](#product-routes)
- [Order Routes](#order-routes)
- [Profile Routes](#profile-routes)
- [Address Routes](#address-routes)
- [Cart Routes](#cart-routes)
- [Agent Order Routes](#agent-order-routes)
- [Landing Page Routes](#landing-page-routes)
- [Trending Routes](#trending-routes)
- [Fashion Routes](#fashion-routes)
- [Category Routes](#category-routes)
- [Click Routes](#click-routes)
- [Order Summary Routes](#order-summary-routes)
- [Personal Details Routes](#personal-details-routes)

## User Routes

- **POST /api/send-otp**: Send OTP to the user's phone number.
- **POST /api/verify-otp**: Verify the OTP sent to the user's phone number.
- **GET /api/getUserDetails**: Get user details.

## Product Routes

- **GET /api/v1/products/allProducts**: Get specific products.
- **GET /api/v1/products/getAllCategory**: Get all categories.
- **GET /api/v1/products/getAllCategoryWithImages**: Get all categories with images.
- **GET /api/v1/products/getGenderWiseCategory**: Get gender-wise categories.
- **GET /api/v1/products/getSubcategory**: Get subcategories.
- **GET /api/v1/products/getGenderPlusCategory**: Get gender plus category.
- **GET /api/v1/products/GenderCategorySubcategory**: Get products by gender, category, and subcategory.
- **PUT /api/v1/products/UpdateGenderCategorySubcategory**: Update gender, category, and subcategory with images.
- **DELETE /api/v1/products/CategorySubcategoryDelete**: Delete category and subcategory.
- **GET /api/v1/products/GenderCategory**: Get gender category.
- **PUT /api/v1/products/UpdateGenderCategory**: Update gender category with image.
- **DELETE /api/v1/products/CategoryDelete**: Delete category.
- **POST /api/v1/products/add-subcategory**: Add subcategory with images.

## Order Routes

- **POST /orders/create**: Create a new order.
- **PUT /orders/updatestatus**: Update the status of an order.
- **GET /orders/getorder**: Get all orders.
- **GET /orders/getOrdersByUser**: Get orders by user ID.
- **GET /orders/grouped**: Get orders grouped by delivery date.
- **GET /orders/getOrderbyID**: Get a specific order by ID.
- **PUT /orders/:id**: Update an order by ID.
- **DELETE /orders/:id**: Delete an order by ID.

## Profile Routes

- **POST /profile**: Create a new profile.
- **GET /profile/:userId**: Get a user's profile.
- **PUT /profile/:userId**: Update a user's profile.
- **POST /profile/:userId/addresses**: Add an address to a user's profile.
- **POST /profile/:userId/orders**: Add an order to a user's profile.
- **POST /profile/:userId/help-and-support**: Add a support ticket.
- **GET /profile/:userId/notifications**: Get all notifications.
- **PUT /profile/:userId/notifications/:notificationId/read**: Mark a notification as read.

## Address Routes

- **POST /addAddressbyuserID**: Add a new address.
- **GET /list**: Get all addresses.
- **PUT /edit/:id**: Edit an existing address.
- **GET /getAddressByUser**: Get addresses by user ID.
- **PUT /update/:id**: Update an address.
- **DELETE /delete/:id**: Delete an address.

## Cart Routes

- **POST /add-to-cart**: Add a product to the cart.

## Agent Order Routes

- **POST /createagentorder**: Create a new agent order.
- **GET /getandupdate**: Fetch and update an agent order.
- **GET /agentorder**: Fetch a specific agent order by ID.
- **POST /updateagentorder**: Update a specific agent order by ID.

## Landing Page Routes

- **POST /addLandingPageImages**: Add landing page images.
- **GET /getLandingPageImages**: Get landing page images.

## Trending Routes

- **POST /addTrendingImages**: Add trending images.
- **GET /getTrendingPageImages**: Get trending page images.

## Fashion Routes

- **POST /addFashionImages**: Add fashion images.
- **GET /getFashionPageImages**: Get fashion page images.

## Category Routes

- **GET /fetchcategories**: Fetch categories with images.
- **POST /addCategoryData**: Add category data.
- **GET /getGenderWiseCategory**: Get gender-wise categories.
- **GET /deleteCategory**: Delete a category.

## Click Routes

- **POST /trackClick**: Track a click.
- **GET /getClickStats**: Get click statistics.

## Order Summary Routes

- **POST /ordersummary**: Create a new order summary.
- **GET /ordersummary/:userId**: Get order summary by user ID.
- **PUT /ordersummary/:id**: Update an order summary.
- **DELETE /ordersummary/:id**: Delete an order summary.

## Personal Details Routes

- **GET /listpersonal**: Get personal details by user ID.
- **POST /uploadProfilePicture**: Upload profile picture.
- **POST /addOrUpdate**: Add or update personal details.
- **PUT /edit/:userID**: Edit personal details.

## Running the Server

To run the server, use the following command:

```sh
npm start

 The client will start on the port specified in the vite.config.js file or default to port 3000.

Environment Variables
Make sure to set the following environment variables in your .env file:

TWILIO_ACC_SID: Your Twilio account SID.
TWILIO_AUTH_TOKEN: Your Twilio auth token.
TWILIO_PHONE_NUMBER: Your Twilio phone number.
PORT: The port on which the server will run.
NODE_ENV: The environment in which the server is running (development or production).

PUBLIC_URL: The public URL of the client application.

Dependencies:-
Express
Mongoose
Multer
Twilio
Redis
Body-parser
Cors
Dotenv
Path
URL