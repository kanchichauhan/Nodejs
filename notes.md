# NODE INTRODUCTION

We worked with JS, which is a browser language, we xecute it in the browser only but we cant exexute it outside browser
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