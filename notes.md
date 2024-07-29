# NODE INTRODUCTION

We worked with JS, which is a browser language, we execute it in the browser only but we cant exexute it outside browser
Since browser contains JS engine (only exists in browser).

Every browser has its own JS engine - 
Chrome - V8 (Popular)
Firefox - spidermonkey
Safari - Apple JS engine

Ryan Dahl embedded `v8 engine with C++(machine functionalities)` and called it as nodeJS
- now we can run JS outside of the browser
- Javascript can talk to native machine because of C++ (file handling, etc)
- you can create webservers in Javascript language

NODE JS is an open-source, cross-platform Javascript runtime environment

console.log(window) or console.log(alert('')) - won't work in node JS

- Doesn't work the functions or anything with this since this is only available in browser

# npm?

Node package manager (npm) is a package manager and a software register but it's also a place where developers can find, build and manage code packages. 

# package.json & package.lock.json

# modules nodejs

when we work in production based env. we distribute our code in small pieces
those small codes known as modules.

module.exports = add
module.exports = sub

=> if we do it like this then add will get override my sub

so will do

module.exports = {
    addFn: add,
    subFn: sub
}

# NODEJS ARCHITECTURE

- client make a request to a server
- Every request comes in Event queue in FIFO principle
- now each req goes to Event loop (which keeps an eye on event queue)
- when event loop picks up the request from the event queue, there could be 2 types of requests 
    blocking operations (sync)
    non-blocking operations (async)
- if its a non blocking operation then event loop processes & it sends the response to the the user
- blocking operation goes to Thread Pool (pool which contains threads(workers responsible to fulfill blocking operation))
- threadpool checked for worker available then it assigns the blocking operation to worker, then worker will process and sends the result back to the event loop
- threadpool has limited workers (CPU Core = number of threads) so it can handle only first 5 operations at a time and the it will wait for one of the workers to be available for other requests

# Handling URL'S in NODEJS

- URL (uniform resource locator) - user friendly name for IP address

https://www.kanchichauhan.dev/project/1?userId=1&a=2

- `Protocol` - https => (hypertext transfer protocol secure) set of rules which tells browser how to communicate, in this  it uses SSL certificate which encrypts the data

- `Domain` - www.kanchichauhan.dev => we purchase a domain and which points to the IP address, cz its impossible to remember IP address for every site

- `Path` - /project/
- `nested path` - project/1
- `query parameters` - ?userId=1&a=2 => extra info passed through URL

`npmjs` - npm i url => third party lib to handle query params

Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?myname=kanchi',
  query: 'myname=kanchi',
  pathname: '/about',
  path: '/about?myname=kanchi',
  href: '/about?myname=kanchi'
}

# HTTP METHODS (GET, POST, PUT, PATCH, DELETE)

- GET => get some data from the server
  whenever we search something in browser, the browser will send GET request to get the data from the server

- POST => send and mutate some data in server
  to send the data when submit the form we do POST request, it will send form data with POST request

- PUT => 
  let's say we want to upload photo to the form then we do put request

- PATCH => to change the existing entry in the database in that case we do patch

- DELETE => deletes the data from the server

# Why Express

- `Framework for Node.js`: Express.js is a framework that runs on Node.js, a runtime environment that allows you to execute. JavaScript on the server side. It simplifies the process of creating and managing web servers and handling HTTP requests.

- `Minimalist and Flexible`: Express is known for its minimalist design. It provides the core functionalities needed to build web applications while allowing developers the freedom to structure their applications in the way that best suits their needs.

- `Middleware-Based Architecture`: Express uses a middleware-based architecture. Middleware functions are pieces of code that execute during the request-response cycle. They can handle tasks such as logging, authentication, data parsing, and more. This architecture provides a modular approach to managing different aspects of a web application.

- `Routing`: Express provides a powerful and flexible routing system. You can define routes to handle various HTTP methods (GET, POST, PUT, DELETE) and URL paths, making it easier to build RESTful APIs and handle different types of requests.

- `Error Handling`: It includes built-in mechanisms for handling errors and sending appropriate responses to clients. This helps in managing and debugging issues effectively.

- `Templating Engines`: Express supports various templating engines, which allow you to generate dynamic HTML pages. Popular engines like EJS, Pug, and Handlebars can be easily integrated with Express.

- `Community and Ecosystem`: Express has a large and active community. There are many third-party modules and middleware available for extending its functionality, which can be easily integrated into Express applications.

# Versioning - ^4.18.2, ~4.18.2

- `1st part 4`  => Major/breaking release/update which might not let our code to run due to a big release for existing features
- `2nd part 18` => Recommended bug fix/ security fix ex, added a feature or made a bug fix
- `3rd part 2`  => Minor fixes(optional)/small change happened to the latest version which really doesnt affect the output
- `^` => means compatible with versions, 4 will always remain same, but the versions 18 and 2 can be installed
        ^4.18.2 | 4.18.2 -> < 5.0.0
        install all recommended and minor fixes automatically

- `~` => will able to change only 3rd part, it wont let you install the major and recommended release

Lets say I want to decide myself in which version I want the dependency to be installed

npm install express4.17.2

# Rest API / Restful API (Representational State Transfer)

Representational State Transfer (REST) is a software architecture that imposes conditions on how an API should work. REST was initially created as a guideline to manage communication on a complex network like the internet. You can use REST-based architecture to support high-performing and reliable communication at scale. You can easily implement and modify it, bringing visibility and cross-platform portability to any API system.

- representational state of an API which follows some standards
- works on server-client architecture (server and client are separate entities & they shouldn't be dependent on each other)
- always respect all http methods, if we made a route 
  GET/user - we are getting the user data
  POST/user - handle new user creation
  PATCH/user - update user

  we need to make sure that we are using the methods accordingly and like dont use POST to delete the user, instead use DELETE.
 
lets say we have a server and a client
now the client can be a browser, mobile, alexa
now how do they communicate
client sends a req and server gives the response
Response could be text, image, HTML document (SSR- server side rendering), JSON (key-value pairs)

- if we are sure that client is browser, then we can getting response as an HTML doc would be better
- if we have cross-platform (smart-device, mobile....) then will send it as a JSON and frontend will handle it accordingly

# Why restful API

`Statelessness`: Each request from the client to the server must contain all the information the server needs to fulfill that request. This means that the server does not need to store any information about the client between requests, which simplifies the design and scalability of the server.

`Scalability`: Because RESTful APIs are stateless, it's easier to scale them horizontally. You can add more servers to handle increased load without worrying about session management.

`Uniform Interface`: RESTful APIs use a consistent and standard set of HTTP methods (GET, POST, PUT, DELETE, etc.) and URL patterns, which makes it easier for developers to understand and use the API. This uniformity simplifies the integration and interaction with different systems.

`Resource-Based`: RESTful APIs are based on resources (which are identified by URLs) rather than actions. This means you interact with resources using standard HTTP methods, which can be more intuitive and align with web architecture principles.

`Caching`: RESTful APIs can leverage HTTP caching mechanisms, which can improve performance by reducing the need to generate responses for repeated requests.

`Layered System`: REST APIs can be composed of layers, which can help with load balancing, security, and other concerns. Each layer only needs to understand the layer it directly interacts with, which can help in managing and evolving the system.

`Interoperability`: RESTful APIs are language-agnostic and can be used with any programming language that supports HTTP. This makes it easier to integrate with other systems and services regardless of their underlying technology.

`Flexibility and Extensibility`: RESTful APIs allow clients and servers to evolve independently. For example, you can add new endpoints or change the way data is represented without affecting existing clients.

`Standard Formats`: RESTful APIs commonly use JSON or XML for data interchange, both of which are widely supported and understood. JSON, in particular, is lightweight and easy for both humans and machines to read and write.

Overall, RESTful APIs offer a robust, scalable, and easy-to-understand framework for building and interacting with web services.

# Server side rendering (SSR) or client side rendering (CSR)

# Postman

# Express middleware - plugin

- we have a client which requests (GET) to users, then express server has a route function (app.get(/users)), express checks which block of code needs to run & then it will send the response to the client accordingly

Now when we talk about middlewares, when client makes a request & it goes to middleware & then middleware can do any processing with that req (like it can check whether the req is valid or not, etx), so if everything is ok it will forward the request & then response gets back to the client

but if the middleware didn't accept the request then it will send back to client without response & ended the response-request cycle

- there could be multiple middlewares
 client => middleware1 => middleware2 => middleware3 => block of function

# what middlewares can do?

- Execute any code
- make changes to the request and the response objects
- end the request.response cycle
- call the next middleware function in the stack

# HTTP Headers

HTTP headers are an important part of the API request and response as they represent the meta-data associated with the API request and response.
Headers carry information for the request and response body

- custom headers

# Status codes

indicates whether a specific HTTP request has been successfully completed. Responses are grouped in 5 classes

- Informational Response -> 101 - 199
- Successful responses -> 200 - 299
- Redirection messages -> 300 - 399
- Client error responses -> 400 - 499
- Server error responses -> 500 - 599

# MongoDB

- no-sql document based database
- strong support for aggregation pipes
- works on BSON format
- best for node applications

=> some commands
  show dbs - show data bases
  use <db_name>
  show collections
  db.coll.find() - we can do queries tp find collection
  db.users.insert({ }) - inserting this to database

# Mongoose

Schema - Define the structure
Schema - Model
Using model we do CRUD operations (create, read, update, delete)