# github-followers

# Description
Built using Meteor and React, this application allows a user to enter the name of a Github user and retrieve that user's followers.

# To run locally
* clone this repo, add to whichever directory you choose, cd into the new directory
* you will need to have the meteor cli installed.  If you don't have meteor installed, download it [here](https://www.meteor.com/)
* run the command 'meteor npm install' to load the dependencies from the package.json file
* run the command 'meteor'
* open up a browser and go to localhost:3000


# Technical choices | trade-offs
I built the app using Meteor and React because I have been trying to learn about both of these technologies, having not really used them before, and how React in particular has become a very popular tool.  Meteor provides an excellent CLI and package management set up.  When you create a new application using Meteor, it does set you up with some basic boilerplate (a main.css, main.html, main.js) and also sets you up with some directories dedicated to the client and the server sides.  From there, you can add Node Module packages through their CLI.  I am sure that I could have just as easily used Ember, Ruby on Rails, or Angular for this application, but again, I'm trying to improve my skills using React.

# Notes about the code/app
I have the main functionality working the way I would like, but I would like to dive further into the "best practices" for React, and to get some test coverage.  Currently, the "Load More" button still shows, but then quickly hides when a user with less than 30 followers is used for the API call, I will be looking into a way to fix that.  The follower count that is displayed gets dynamically set based on how many times you have to "load more" followers, as I could not find a means of displaying the total amount of followers with one call using Github's API.

# Links
Here is the application: [My Github Followers](https://my-github-followers.herokuapp.com)

[My Website](http://www.andrewdpohl.com) | 
[LinkedIn](https://www.linkedin.com/in/andrewdpohl)
