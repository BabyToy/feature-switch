**Create an account**

* **URL**

  /accounts

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `email: string`  
  `name: string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  `{
  "email": "this-is-an-email",
  "name": "this-is-the-name",
  "id": "8zfGpXdSFBpCNyToMnJFn5",
  "added": "2021-06-27T06:59:21.000Z"
}`

* **Error Response:**

  Duplicate account creation error

  * **Code:** 400 BAD REQUEST <br />
    **Content:**  
    `{
  "statusCode": 400,
  "message": "SQLITE_CONSTRAINT: UNIQUE constraint failed: account.email"
}`

**Update an account**

* **URL**

  /accounts/{id}/update

* **Method:**

  `PUT`

 **URL Params**

   **Required:**

   `id=string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    `{
  "email": "this-is-an-email",
  "name": "this-is-the-name",
  "id": "8zfGpXdSFBpCNyToMnJFn5",
  "added": "2021-06-27T06:59:21.000Z"
}`

* **Error Response:**

  Account does not exist

  * **Code:** 404 NOT FOUND <br />
    **Content:**  
    `{ "statusCode": 404, "message": "Account not found" }`

**Get a paginated list of accounts**

* **URL**

  /accounts

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

**Get a specific account**

* **URL**

  /accounts/find

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
