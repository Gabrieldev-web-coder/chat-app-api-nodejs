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
    **Content:** `{ "email": "example@gmail.com", "username": "example", "userid": 6916, "picurl": "https://svgsilh.com/svg/1699635.svg", "country": "ec", "description": "Hi! i'm example, nice to meet you! :D" }`

- **Error Response:**

  If for some reason user's id that was provided not exist just will return a simple body with errors fields as follow.

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : "This user don't exist." }`

- **Sample Call:**

  /chat-api/v1.0/**user?id=0001**
