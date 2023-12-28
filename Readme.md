************************************
* Simple REST api test for netlify 
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


```javascript
import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/.netlify/functions/api/", router);

export const handler = serverless(api);
```

4. In root create dir dist with empty index.html file.

5. In root create netlify config file netlify.toml with this line:

```
[build]
  functions = "functions"
```

6. In packages.json add or edit this line so it look like this:

```javascript
"scripts": {
    "build": "netlify deploy --prod"
}
```

7. Now, run this in console:

>npm run build

if might ask to login to your netlify account and project detais. Fill all the info as preferred and when asked for publish directory:

>Please provide a publish directory (e.g. "public" or "dist" or "."):

Hit enter or provide "."

8. Now test your api:

https://your.project.url/.netlify/functions/api/hello

And here we go: "hello world"

Cheers!

