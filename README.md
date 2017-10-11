# Coding Challenge 

Digg / Reddit clone with upvote and downvotes

## Getting Started

There are two ways to try out this app, you can either test if from [Heroku](https://carousell-home-work.herokuapp.com/), or, you can follow the instruction below to test it in your local machine:

```
git clone https://github.com/AllencxWang/reddit-clone.git
cd reddit-clone
yarn install
yarn run dev
```

## About the Implementation

Assumptions:
- the list must be sync (but not realtime) among all the clients 
- no network error between the server and the clients

Design:
- in order to be sync among all the clients, server returns a sorted list in all the API endpoints
- posting vote delta instead of the vote number to the server to get the correct calculation (say a topic's vote number is 25, if client-X vote up 5 times and client-Y vote down 10 times simultaneously, the final result should be 20)
- using localStorage to store the editing in case some bad things happen, and clear the storage once it's posted
- using debounce to reduce unnecessary network traffic

## How to Deploy

This app uses docker as a service container, if you would like to modify the code and deploy to your own heroku app container, you can follow the steps below:

```
yarn run build
heroku container:push web --app <YOUR-APP-NAME>
```

You have to pass all the test cases, otherwise the build process will not be proceeded.

To know more about how to use docker with heroku, you can read [this](https://devcenter.heroku.com/articles/container-registry-and-runtime).

## Dependencies
You can find the modules that this project uses in the package.json, the reason why almost all the modules are listed in the devDependencies section is because all the frontend code will be built before deployment, so the server only needs **body-parser**, **cors**, and **express**