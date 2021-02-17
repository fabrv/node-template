# Guidelines
## 1. Coding best practices
### 1.1 Development frameworks
#### Express.js
Express.js is a minimal framework for developing web applications and services with Node.js.
It's Sinitra inspired middleware system creates a flexible, easy and robust framework whis is why it is the most popular and best documented framework for Node.

**Documentation**  
Official documentation for Express can be found on: [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)

**File structure**  
The default Express file structure goes as follow:
```
.
├── app.js
├── bin
│   └── www
├── package.json
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```
However this file structure has several problems:
1. It uses vanilla Javascript
2. It is not clear where the separation between controller and route is
3. Subdirectories quickly become overcrowded in full production applications
4. Starting file is /bin/www which is unconventional and unclear to beginners
  
This is the improved and recommended file structure that is included in the Node Template:
```
.
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── utils
│   │     └── utility
│   │           ├── utility.test.ts
│   │           └── utility.ts
│   ├── components
│   │     └── index
│   │           ├── Index.test.ts
│   │           ├── IndexController.ts
│   │           └── IndexRoutes.ts
│   ├── services
│   └── views
│       ├── error.hbs
│       ├── index.hbs
│       └── layout.hbs
├── package.json
├── .eslintrc.json
├── tsconfig.json
├── Dockerfile
└── docker-compose.yml
```
This new file structure fixes the issues mentioned above about the default Express file structure and it also makes self evident the architecture the application should use; where each `component` has the business logic in the `controller` which is exposed in the `route`.

The individual files are the following:

- `app.ts` is the application module and the `index.ts` is the file that starts the application; that is the NodeJs convention.

- `package.json` holds all the relevant metadata for our project, like name, version and dependencies.  

- `.eslintrc.json` is a configuration file for the automatic linter.  

- `tsconfig.json` is a configuration file for Typescript.

**Starting the application**  
All NodeJs services should have their starting script set in the `package.json`. Most developers,services and software including AWS Lambda, GCP App Engine, Heroku and even Visual Studio Code use the starting script `npm start` by default.

Applications made on a transpiled language like ClojureScript, Purescript or Typescript must be built before starting, in this cases the build script should also be included in the `package.json`

**Controllers as a class, Routes as a function**  
