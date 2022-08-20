# Chat api

This is a relatively simple rest api for made basic operations on database for my chat app application builded in Angular, also for learning propuses, wrote it 100% with TypeScript and NodeJs, is be able to register, login, send friend request and response them, search users, change user profile settings, manage friend list, (And soon manage groups).

## Finding users

- **URL**

  /chat-api/v1.0/**user?id=<user-id>**

- **Method:**

  `GET`

- **URL Params**

  Simple method for get basic user information that has been registered before by id.

  **Required:**

  `id=[integer]`

- **Data Params**

  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>

- **Success Response:**

  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  - **Code:** 200 <br />
    **Content:** `{ id : 12 }`

- **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  - **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

- **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._>

- **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>
