**Create a feature**

* **URL**

  /feature

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `name: string`

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

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    `{
  "name": "updated-feature",
  "id": "pqG3fhgS3MarVZ2FQJywbx",
  "added": "2021-06-27T07:00:40.000Z"
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
  "pageCount": 2,
  "totalItems": 3,
  "items": [
    {
      "email": "ian@whitehouse.gov",
      "name": "ian",
      "id": "8zfGpXdSFBpCNyToMnJFn5",
      "added": "2021-06-27T06:59:21.000Z"
    },
    {
      "email": "this-is-an-email",
      "name": "this-is-the-name",
      "id": "efDUAuBG6jPCcoK7wGeBnr",
      "added": "2021-06-27T12:14:36.000Z"
    }
  ]
}`

**Get a specific feature**

* **URL**

  /feature/find

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
  "name": "updated-feature",
  "id": "pqG3fhgS3MarVZ2FQJywbx",
  "added": "2021-06-27T07:00:40.000Z"
}`
