**Create a feature**

* **URL**

  /feature/add

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `featureName: string`
  `email: string`

* **Success Response:**

  * **Code:** 200 <br />

* **Error Response:**

  * **Code:** 304 NOT CREATED <br />

**Update a feature**

* **URL**

  /feature/{id}/update

* **Method:**

  `PUT`

 **URL Params**

   **Required:**

   `id=string`

 **Data Params**

   **Required:**

  `featureName: string`
  `email: string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    `{
  "id": "string",
  "featureName": "string",
  "added": "timstamp",
  "email": "string",
  "enabled": true
}`

* **Error Response:**

  Feature does not exist

  * **Code:** 404 NOT FOUND <br />
    **Content:**  
    `{ "statusCode": 404, "message": "Feature not found" }`

**Get a paginated list of features**

* **URL**

  /feature/list

* **Method:**

  `GET`

 **URL Params**

   **Required:**

   `pageSize=int`  
   `page=int`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    `{
  "pageCount": int,
  "totalItems": int,
  "items": [
    {
      "id": "string",
      "featureName": "string",
      "added": "timestamp",
      "email": "string",
      "enabled": true
    }
  ]
}`

**Get a specific feature**

* **URL**

  /feature/{id}

* **Method:**

  `GET`

 **URL Params**

   **Required:**

   `id=string`  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    `{
  "id": "string",
  "featureName": "string",
  "added": "timestamp",
  "email": "string",
  "enabled": true
}`

* **URL**

  /feature/{featurename}

* **Method:**

  `GET`

 **URL Params**

   **Required:**

   `featurename=string`  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    `[
    {
      "id": "string",
      "featureName": "string",
      "added": "timestamp",
      "email": "string",
      "enabled": true
    }
  ]`
