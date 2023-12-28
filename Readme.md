************************************
* Simple REST api test for netlify *
************************************

instructions:

How to Upload node.js (express) REST apis to netlify (2023)

1. create directory with project name and inside it run:
>npm init -y (default node project)

2. install dependencies:
>npm i express serverless-http @netlify/functions @types/express netlify-cli netlify-lambda

if it doesn't work, split installing into parts:
>npm install express serverless-http @netlify/functions @types/express 
>npm install netlify-cli
>npm install netlify-lambda

3.create functions directory in the root and create api.js file for example:

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/.netlify/functions/api/", router);

export const handler = serverless(api);

4. In root create dir dist with empty index.html fiel inside

5. In root create netlify config file netlify.toml with this line:

[build]
  functions = "functions"

6. in packages.json add or edit this line so it looks like this:

"scripts": {
    "build": "netlify deploy --prod"
  }

7. now in console run this:

>npm run build

it will ask to connect with netlify and ask to create new project. Fill all the info and when it will ask for publish directory:

>Please provide a publish directory (e.g. "public" or "dist" or "."):

Hit enter or provide "."

8. Now test your api:

https://your.project.url/.netlify/functions/api/hello

And here we go: "hello world"

Cheers!

