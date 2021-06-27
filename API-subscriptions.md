**Create a subscription**

* **URL**

  /subscriptions

* **Method:**

  `POST`

* **Data Params**
  `account` refers to an account ID
  `feature` refers to a feature ID

  **Required:**

  `account: string`  
  `feature: string`

* **Success Response:**

  * **Code:** 200 <br />

* **Error Response:**

  * **Code:** 403 NOT CREATED <br />

**Update a subscription**

* **URL**

  /subscriptions/{id}/update

* **Method:**

  `PUT`

 **URL Params**

   **Required:**

   `id=string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    ``

* **Error Response:**

  Feature does not exist

  * **Code:** 404 NOT FOUND <br />
    **Content:**  
    `{ "statusCode": 404, "message": "Feature not found" }`

**Get a paginated list of subscriptions**

* **URL**

  /subscriptions

* **Method:**

  `GET`

 **URL Params**

   **Required:**

   `pageSize=int`  
   `page=int`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    ``

**Get a specific subscription**

* **URL**

  /subscriptions/find

* **Method:**

  `GET`

 **URL Params**

   **Optional:**

   `id=string`  
   `name=string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    ``
