# How to version a web API

API design is a spicy topic! And while there is no agreed upon "right" way to design an API, it's helpful to identify and understand a few key areas that most developers *do* agree on. A well-structured web API should be...

1. An ongoing contract with the client. The contract guarantees consistency and stability; the client should be able to use the API without concern that it will suddenly break or vanish.

2. Backwards compatible after a change or upgrade. Old queries to new endpoints should still generate the expected return.

3. RESTful. It should speak the language of HTTP verbs: GET, PUT, POST, PATCH, DELETE, etc.

There are several common API versioning methods that we can use to help us check all these boxes. Some of the most popular methods include header, URI and parameter versioning. This app uses the most straightforward approach - URI versioning - a method that uses different paths for different versions of the API.

This is the most common method currently used by APIs today. It allows users to explore different versions with just their browser and it’s super easy to use!

*For example...*

www.example.com/api/v1 --> points to version 1   
www.example.com/api/v2 --> points to version 2   
www.example.com/api/v3 --> points to version 3    

*and so on...*

## API versioning with A Fly Edge App

Most Fly Edge Apps are made up of multiple backends. For example, you can have a static-page on GitHub for your marketing page, a Kubernetes cluster or Heroku deployment for your application, and a database management system or two for your data. You can apply this same logic to your API design.

When you build an API, you receive scalability and load balancing benefits by decoupling your API and hosting it as its own backend. API decoupling also gives us the opportunity to version with relative ease.

## Run the example

* Install Fly globally: `npm install -g @fly/fly`
* Clone this repository and open it: `git clone`, `cd api-versioning`
* Start the Fly server: `fly server`

Head to http://localhost:3000/api/v0,  
http://localhost:3000/api/v1,  
and http://localhost:3000/api/v2 to see all the different versions of the API.

## How it works

This example operates several different API endpoints. Each endpoint is "mounted" onto a different path name. The backend endpoint is received by making a proxy fetch to the origin server. The response from each proxy fetch is mounted onto its own path. To add another API version, simply add another path and endpoint to the `mount` variable (index.js line#18). And voila! You have all your different API versions under one hostname, easily accessible to you and your users.

## Summary

We have endpoints that represent different versions of our API. Our users can receive a specific version by simply making a fetch request to the corresponding URL. If our application receives a major revision, we'll ceremonially bump our URI to the next version number.

There are many different philosophies you can apply when designing and versioning your API. Using this example app, you can see how the flexible power of Fly URI backend routing can enable you to create the API architecture and versioning scheme of your wildest dreams.