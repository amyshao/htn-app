# Hack the North Exec App (Frontend)

Link to site: https://pedantic-wilson-c6bf2f.netlify.app/

## Questions
### Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?      
<br />

I have previous experience with React and Typescript separately so at first I decided that I was going to try out Typescript with React, which was a mistake and took much longer to set up than I expected. 

After I gave up on that approach I decided to go with React and Javascript plain and simple since it's what I'm used to. I have done similar projects like a store app that navigates to different product pages, so I modelled the event navigation similarly. I wanted to avoid using boiler-plate heavy addons like Redux after being scarred by trying Typescript so I handled API requests using an urql client in the local component state. This works out fine because fetched event data isn't really shared between several components.

I anticipated the most difficult component would be to integrate the login page and have private events hidden from the user. After rejecting Redux I decided to write a custom hook to save the login state (isLoggedIn) to session storage so other components like the login page, nav bar, event page etc can easily access the login state. 

This is where I encountered a problem, where because the nav bar is located above the login page (in the login page's parent component), it is not updated when the user logs in. I've realized getting a child to notify the parent to render in React isn't as straightforward as I thought. This is probably where global state managers like Redux would be useful. At first I just refreshed the whole page upon login, but this caused problems after the app was hosted, as netlify would show a page not found error. In the end I just passed in a callback function to the login component to change the nav bar state.  

I'm pretty proud of how I got a custom React hook working, as well as how I have a navbar that can update at runtime. (After login the login nav link becomes logout). Ultimately the initial time wasted with Typescript caused my overall project to be a little rushed near the end with css formating, but I'm pretty happy with the basic implementation. 

<br />

### Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event?
<br />

I've already mentioned this but I would spend time migrating in Redux as it is a better way to handle global state as well as helpful with debugging when API requests fail. I also haven't spent much time with error handling, which is important when you have a large-scale application as things can easily go wrong with API requests, incorrect data input, and other problems. I also didn't write any test cases, and those are helpful for similar reasons.

Another thing is I didn't have time to explore some of the bonus functionality that would be important, such as having a search bar or being able to filter events by type etc for a better user experience. 

One more thing is my lack of global constants and theme and structure for the overall design with css. I just had separate css sheets for each component even though many of them had common functionality, but it would be useful to store color themes etc on a single sheet for easy readability as well as increased scalability. 