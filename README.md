# Chat api

This is a relatively simple rest api for made basic operations on database for my chat app application builded in Angular, also for learning propuses, wrote it 100% with TypeScript and NodeJs, is be able to register, login, send friend request and response them, search users, change user profile settings, manage friend list, (And soon manage groups).

## Finding users

- **URL**

  /chat-api/v1.0/**user?id=user-id**

- **Method:**

  `GET`

- **URL Params**

  Simple method for get basic user information that has been registered before by id.

  **Required:**

  `id=[integer]`

- **Success Response:**
  On success response will return a simple json containing basic information of user, should looks like following.

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "email": "example@gmail.com",
      "username": "example",
      "userid": 0002,
      "picurl": "https://svgsilh.com/svg/1699635.svg",
      "country": "ec",
      "description": "Hi! i'm example, nice to meet you! :D"
    }
    ```

- **Error Response:**

  If for some reason user's id that was provided not exist just will return a simple body with errors fields as follow.

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    { "errors": "This user don't exist." }
    ```

- **Sample Call:**

  /chat-api/v1.0/**user?id=0001**

## Login users

- **URL**

  /chat-api/v1.0/**login-user**

- **Method:**

  `POST`

- **Data Params**

  Using a basic authentication using username or email to identify user and a password for server validation.

  **Payload:**

```json
{
  "username": "example",
  "pwd": "examplePwd"
}
```

- **Success Response:**
  On success response will return a json with complete user's information, should looks as follow.

  - **Code:** 200 <br />
    **Content:**

```json
{
  "result": {
    "email": "example@hotmail.com",
    "username": "example",
    "userid": 0001,
    "picurl": "https://svgsilh.com/svg/1699635.svg",
    "country": "ec",
    "accountCreatedAt": "Thursday, August 11, 2022 9:47 AM",
    "description": "Hi! i'm example, nice to meet you! :D",
    "lastMoficationAt": "No changes yet.",
    "groups": [],
    "friends": [],
    "pendingRequest": [
      {
        "to": 9998,
        "accepted": null
      }
    ],
    "friendRequest": [
      {
        "from": 9991,
        "accepted": null
      }
    ],
    "token": "token."
  }
}
```

- **Error Response:**

  Depending type of error, will return a json with a "errors" field saying what's wrong with request.

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    { "errors": "Incorrect password." }
    //OR
    { "errors": "This user don't exist, consider register" }

    ```

- **Sample Call:**

  /chat-api/v1.0/**login-user**

## Register users

- **URL**

  /chat-api/v1.0/**register-user**

- **Method:**

  `POST`

- **Data Params**

  Here must send an email, username and password as body payload to confirm a new user registered.

  **Payload:**

```json
{
  "email": "example@hotmail.com",
  "username": "exampleUser",
  "pwd": "1234567890"
}
```

- **Success Response:**
  On success response will return a jwt to session initialization, should looks as follow.

  - **Code:** 200 <br />
    **Content:**

```json
{
  "token": "token."
}
```

- **Error Response:**

  Depending type of error, will return a json with a "errors" field saying what's wrong with request.

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    { "errors": "Your username or email is already taken." }
    ```

- **Sample Call:**

  /chat-api/v1.0/**register-user**
