Playdate
-----------------------------
Playdate is a web application that lets you explore events and recommendations from friends and others in your area.
Just schedule an activity anywhere, anytime, and open it up to your friends or to the public.
Or, make recommendations for movies and shows that your friends might be interested in.

The idea
-----------------------------
The idea for Playdate came about after hours of caffeine-assisted delirium.
Our team realized that something was missing in our lives: the ability to organize activities on a whim, and actually get people to show up.
With a service like Facebook Events, there is a heavy amount of scheduling and planning that goes into any given event: in particular, the host usually has to provide details weeks or even months in advance.
While this is great for more formal events that require such high organization and attention to detail, it is an absolute pain when you just want to plan a small, informal event near you.
The other option would have been messaging out to multiple friends to attempt to plan that way, but this becomes a nightmare of its own when trying to coordinate across multiple chats and conflicting schedules.

Out of this necessity for something new, Playdate was born.

Process
-----------------------------
Playdate was built in under 24 hours as part of HackMIT 2019, a hackathon based at MIT.
Our application is built on React (front-end) and Node.js (back-end).
We make heavy use of Google Maps through the Google Cloud API to provide location functionality in planning activities.

Challenges
-----------------------------
Our team began HackMIT this year with almost no web development experience.
None of us had ever built a web application completely from scratch, and one of our biggest hurdles was simply figuring out how to even begin.
That, coupled with our plan to implement the Google Maps API, seemed insurmountable from Hour 1.
Despite this, we pulled through after several dozen online tutorials, a waffle-and-ice-cream break, and expert StackOverflow usage.
We like to think that we learned a good deal from this experience with regards to workflow, team environments, and actual web development.

How to use
-----------------------------
### Website
Use our web app online [here!](https://playdate-app.herokuapp.com "Playdate").

Or, if you'd prefer...
### Installation
```bash
git clone https://github.com/JPark617/playdate.git
cd playdate
npm install
npm start
```