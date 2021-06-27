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

  * **Code:** 201 CREATED <br />

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />  
  * **Content:**  
    `{ "statusCode": 404, "message": "Feature not found" }`

  * **Code:** 404 NOT FOUND <br />  
  * **Content:**  
    `{ "statusCode": 404, "message": "Account not found" }`

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
    `{
    "accountId": "8zfGpXdSFBpCNyToMnJFn5",
    "featureId": "pqG3fhgS3MarVZ2FQJywbx",
    "id": "95PvQpUUm79WkBvmCCUCAX",
    "enabled": "true",
    "added": "2021-06-27T07:04:20.000Z",
    "modified": null,
    "feature": "pqG3fhgS3MarVZ2FQJywbx",
    "account": "8zfGpXdSFBpCNyToMnJFn5"
}`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />  
  * **Content:**  
    `{ "statusCode": 404, "message": "Feature not found" }`

  * **Code:** 404 NOT FOUND <br />  
  * **Content:**  
    `{ "statusCode": 404, "message": "Account not found" }`

  * **Code:** 404 NOT FOUND <br />  
  * **Content:**  
    `{ "statusCode": 404, "message": "Subscription not found" }`

**Get a paginated list of subscriptions**

* **URL**

  /subscriptions

* **Method:**

  `GET`

 **URL Params**

   **Required:**

   `pageSize=int`  
   `page=int`

   **Optional:**

  An account ID may be passed to the service to filter for all subcriptions belonging to that account

   `account=string`  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    `{
  "pageCount": 1,
  "totalItems": 1,
  "items": [
    {
      "accountId": "8zfGpXdSFBpCNyToMnJFn5",
      "featureId": "pqG3fhgS3MarVZ2FQJywbx",
      "id": "95PvQpUUm79WkBvmCCUCAX",
      "enabled": true,
      "added": "2021-06-27T07:04:20.000Z",
      "modified": null
    }
  ]
}
`

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
    `{
  "accountId": "8zfGpXdSFBpCNyToMnJFn5",
  "featureId": "pqG3fhgS3MarVZ2FQJywbx",
  "id": "95PvQpUUm79WkBvmCCUCAX",
  "enabled": false,
  "added": "2021-06-27T07:04:20.000Z",
  "modified": null
}`
