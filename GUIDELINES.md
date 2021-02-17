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

- `app.ts` is the application module and the `index.ts` is the file that starts the application; that is the Node.js convention.

- `package.json` holds all the relevant metadata for our project, like name, version and dependencies.  

- `.eslintrc.json` is a configuration file for the automatic linter.  

- `tsconfig.json` is a configuration file for Typescript.

**Starting the application**  
All Node.js services should have their starting script set in the `package.json`. Most developers,services and software including AWS Lambda, GCP App Engine, Heroku and even Visual Studio Code use the starting script `npm start` by default.

Applications made on a transpiled language like ClojureScript, Purescript or Typescript must be built before starting, in this cases the build script should also be included in the `package.json`

**Controllers as classes, Routes as functions**  
Both the controllers and the routes need exterior dependecies, optimally you pass the depencies as a parameter.

This will give you the flexibility to inject any compatible dependency.

Routes only need to return a router object, so they are functions; Controllers need to return multiple methods and variables, so they are classes.

```typescript
// Routes
function routes (dependency) {
    const router: Router()
    return router
}

// Controller
class Controller {
    dependency: Dependency
    constructor (dependency) {
        this.dependency = dependency
    }

    method () { ... }
}
```

### 1.2 View template engine usage
#### Handlebars
Handlebars is simple template engine based on mustache. When a template is executed all expressions within a `{{}}` will be replaced with the values from an input object.

**Documentation**  
Official documentation for Handlebars can be found on: [https://handlebarsjs.com/guide](https://handlebarsjs.com/guide)

**Usage**  
Send rendered template to client:
##### Simple template
```typescript
router.get('/', (_req, res, _next) => {
    res.render('index', { name: 'World' })
})
```
```html
<p>Hello {{name}}!</p>
```
##### Objects
```typescript
router.get('/', (_req, res, _next) => {
    res.render('index', {
        person: {
            firstname: "Yehuda",
            lastname: "Katz",
        }
    })
})
```
```html
<p>{{person.firstname}} {{person.lastname}}</p>
```

##### Arrays
```typescript
router.get('/', (_req, res, _next) => {
    res.render('index', {
        people: [
            "Yehuda Katz",
            "Alan Johnson",
            "Charles Jolley",
        ]
    })
})
```
```html
<ul class="people_list">
  {{#each people}}
    <li>{{this}}</li>
  {{/each}}
</ul>
```

### 1.3 SSO integration

### 1.4 Onboarding and offboarding

### 1.5 ORM selection and usage
#### TypeORM
TypeORM is an advanced object-relations-management module that runs in Node.js. As the name implies, TypeORM is meant to be used with TypeScript.

TypeORM uses Typescripts native types to create the database model, this makes the database and program models seamless, it also offers superior scripting capabilities for migrations compared to Sequelize.

**Documentation**  
Official documentation for TypeORM can be found on: [https://typeorm.io](https://typeorm.io)

**Usage**  
Example of a model:
```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  firstname!: string

  @Column()
  lastname!: string

  @Column()
  email!: string

  @Column()
  password!: string
}
```

Example of a connection:
```ts
await createConnection({
    type: 'postgres',
    url: 'postgres://postgres:postgres@localhost:5432/postgres',
    entities: [
        User
    ],
    synchronize: true,
    logging: false
})
```

### 1.6 Development, testing and production evironments handling

### 1.7 Unit testing
#### Mocha and Chai
Mocha is a test suite library and Chai is an assertion library

Official documentation for TypeORM can be found on: 
- [https://mochajs.org/](https://mochajs.org/)
- [https://www.chaijs.com/](https://mochajs.org/)

**Usage**  
```npm run test```

![test coverage](testCoverage.png)  
All routes and functions in the components need to be tested. And the percentage of lines and statements tested should exceed 80%

**How to write tests**  
TODO

### 1.8 Packaging and implementation
### 1.9 OWASP policies
### 1.10 Logging and monitoring
### 1.11 Documentation for support
### 1.12 Technical gap reduction policies