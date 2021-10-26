# Movie Nominations

React project inspired by Shopify's Front End Web Developer Intern Challenge

[Project preview](https://nominations-app.netlify.app/)

## Motivation
I recently decided to change my career and follow my passion which is coding. I'm excited to keep learning and growing, and by doing this project I was able to use my knowledge in practice.

## About this project
This is my second app built in React, and my first one using Hooks with function components (rather than class components).
Web Development is still quite new to me, but I love trying new things and learning from them. I took this challenge as a great opportunity to learn something new. 

Uses: Sass, React, OMDB REST api

## Challenges:
The OMDB api returns "Error response: Too many results" (and undefined result) when the user has typed only a few letters. 
The documentation for the api provides no parameter to limit the results. 
I tried using the page parameter, but that did not solve the error. I haven't found a solution/workaround, other than displaying an alert message to the user. The second challenge was the lack of posters for some movies. I had to create a default image that is getting rendered when no other image is available. The third issue was duplicated items in search results. I had to implement a results check that deletes duplicates. 
 
## How does it work?
The user enters characters into the search input. On submit, the input is saved and used to make an API call to OMDB. 
  
Results are rendered on the page.  Based on a comparison between the search result array, and the nominations array, the "nominate" buttons are rendered in active or disabled state.
  
The user can click a "nominate" button to add the movie to their nominations. 
  
When the "nominate" button is clicked, that movie is pushed into the nominations array and isNominated property of the movie is changed to true. Based on the isNominated property the "nominate" button is rendered as active or disabled.

The user can remove the nominated movie by clicking the "remove" button. 
  
When the "remove" button is clicked, that movie is removed from the nominations array and isNominated property of the movie is changed to false. The "nominate" button on the movie card becomes active.
  
Once the user has chosen five nominations, the confirmation message appears. 
  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


