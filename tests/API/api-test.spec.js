const { test, expect } = require('@playwright/test');
  //const baseURL = 'https://simple-grocery-store-api.glitch.me'

test.describe('API testing', () => {

    //const baseURL = 'https://simple-grocery-store-api.glitch.me'
    test('Validate endpoint response status is  success', async ({ request }) => {
     
        const response = await request.get('https://simple-grocery-store-api.glitch.me/status');
        //const response = await request.get(baseURL + "/status");
        expect(response.status()).toBe(200);

    });
  
    test('Validate endpoint is invalid', async ({ request }) => {
     
        const response = await request.get('https://simple-grocery-store-api.glitch.me/status1');
        expect(response.status()).toBe(404);

    });

    test('Validate the response body', async ({ request }) => {
    
        const response = await request.get('https://simple-grocery-store-api.glitch.me/status');
        expect(response.status()).toBe(200);
        //console.log(response);  

        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);

    });
    
    test('Validate1 the response body', async ({ request }) => {
    
        const response = await request.get('https://simple-grocery-store-api.glitch.me/status');
        expect(response.status()).toBe(200);
        //console.log(response);  

        const responseBody = await response.json();
        console.log(responseBody);
        

    });

    test('Validate the single product response body', async ({ request }) => {
    
        const response = await request.get('https://simple-grocery-store-api.glitch.me/products/4643');
        expect(response.status()).toBe(200);
        

        const responseBody = await response.json();
        expect(responseBody.id).toBe(4643);
        expect(responseBody.category).toBe("coffee");
        expect(responseBody.name).toContain("Starbucks");
        expect(responseBody.manufacturer).toBeTruthy();
        expect(responseBody.price).toBeGreaterThan(40);
        expect(responseBody["current-stock"]).not.toBeNull;
       
    });

    test('POST - Add new product to the cart', async ({ request }) => {
    
        const response = await request.post('https://simple-grocery-store-api.glitch.me/carts/y4fvWA5H1BWG6Q3On_kv2/items', {
            data: {
                productId: 4643,
            }
        });
        expect(response.status()).toBe(201);
        
        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Adding new product to the cart and deleting it', async ({ request }) => {
    
        const response = await request.post('https://simple-grocery-store-api.glitch.me/carts/y4fvWA5H1BWG6Q3On_kv2/items', {
            data: {
                productId: 4643,
            }
        });
        expect(response.status()).toBe(201);
        
        const responseBody = await response.json();
        console.log(responseBody);
    });



    test('POST - Add new product to the new cart', async ({ request }) => {
    
        const response = await request.post('https://simple-grocery-store-api.glitch.me/carts/UmzeSt5QdNNczrEwy3-fz/items', {
            data: {
                itemId: 4641,
            }
        });
        expect(response.status()).toBe(201);
        
        const responseBody = await response.json();
        console.log(responseBody);
    });

    

    test('Create a new cart - validate it got created', async ({ request }) => {
        
        const response = await request.post('https://simple-grocery-store-api.glitch.me/carts')
         
           

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        console.log(responseBody); 
        //expect(cart).toHaveProperty("cartId");
        
    });




    test('Creating a new cart, adding a new item and then deleting it from the cart.', async ({ request }) => {


        // Creates a new cart


        const createCart = await request.post(baseURL + "/carts");
        expect(createCart.status()).toBe(201);


        const createCartBody = await createCart.json();
        expect(createCartBody.created).toBe(true);


        // Saves the unique cart id as a new constant from the previous response body


        const cartID = createCartBody.cartId;
        console.log(cartID);


        // Makes the POST call to add new product to the cart, validates it got added


        const addProduct = await request.post(baseURL + "/carts/" + cartID + "/items", {


            data: {
                productId: 4643
            }
        });
        expect(addProduct.status()).toBe(201);
        const addProductBody = await addProduct.json();
        expect(addProductBody.created).toBe(true);


        // Extracts the newly added product item ID from the response body as a new constant


        const itemID = addProductBody.itemId;
        console.log(itemID);


        // DELETE call to delete the newly added product using the saved item ID


        const deleteItem = await request.delete(baseURL + "/carts/" + cartID + "/items/" + itemID)
        expect(deleteItem.status()).toBe(204);




        // GET call to receive contents of cart and validate that it is empty


        const getCartItems = await request.get(baseURL + "/carts/" + cartID);
        expect(getCartItems.status()).toBe(200);
        const getCartItemsBody = await getCartItems.json();
        expect(getCartItemsBody.items).toStrictEqual([]);
    });



    test('Creating a new cart, adding a 2 products in it and then replacing one of them, validating it got replaced and other one stayed.', async ({ request }) => {


        // Creates a new cart


        const createCart = await request.post(baseURL + "/carts");
        expect(createCart.status()).toBe(201);


        const createCartBody = await createCart.json();
        expect(createCartBody.created).toBe(true);


        // Saves the unique cart id as a new constant from the previous response body


        const cartID = createCartBody.cartId;
        console.log(cartID);


        // Makes the POST call to add 1st product to the cart, validates it got added


        const addProduct = await request.post(baseURL + "/carts/" + cartID + "/items", {


            data: {
                productId: 4643
            }
        });
        expect(addProduct.status()).toBe(201);
        const addProductBody = await addProduct.json();
        expect(addProductBody.created).toBe(true);
        console.log(addProductBody);


        // Extracts the first added product item ID from the response body as a new constant


        const itemID = addProductBody.itemId;
        console.log(itemID);


        // Makes the POST call to add 2nd product to the cart, validates it got added


        const addProduct2 = await request.post(baseURL + "/carts/" + cartID + "/items", {


            data: {
                productId: 5477
            }
        });
        expect(addProduct2.status()).toBe(201);
        const addProductBody2 = await addProduct2.json();
        expect(addProductBody2.created).toBe(true);
        console.log(addProductBody2);


        // Extracts the first added product item ID from the response body as a new constant


        const itemID2 = addProductBody2.itemId;
        console.log(itemID2);


        // GET call to see the entire cart and validate it now contains our 2 products


        const getCartItems = await request.get(baseURL + "/carts/" + cartID);
        expect(getCartItems.status()).toBe(200);
        const getCartItemsBody = await getCartItems.json();
        console.log(getCartItemsBody);
        expect(getCartItemsBody.items[0].productId,).toBe(4643);
        expect(getCartItemsBody.items[1].productId,).toBe(5477);


        // PUT call - replaces the 1st item 4643 (coffee) with 5774 (milk chocolate)


        const replaceProduct = await request.put(baseURL + "/carts/" + cartID + "/items/" + itemID, {


            data: {
                productId: 6483
            }
        });
        expect(replaceProduct.status()).toBe(204);


        // GET call to see the updated cart and validate new product got added and original one is still there.


        const getCartItems2 = await request.get(baseURL + "/carts/" + cartID);
        expect(getCartItems2.status()).toBe(200);
        const getCartItemsBody2 = await getCartItems2.json();
        console.log(getCartItemsBody2);
        expect(getCartItemsBody2.items[0].productId,).toBe(6483);
        expect(getCartItemsBody2.items[1].productId,).toBe(5477);


    });

    test('Get the list of orders', async ({ request }) => {
     
        const response = await request.get('https://simple-grocery-store-api.glitch.me/status1');
        expect(response.status()).toBe(404);


});







