This is a sample demo of GitHub Login With React (GitHub APIs, GitHub OAuth 2.0 Authentication), following the tutorial https://www.youtube.com/watch?v=rRn2EisxPl4

The details steps are:

* Initialize GitHub OAuth 2.0 Application
* Creating initial login logic
* Process code parameter from URL
* Create proxy server / call GitHub APIs
* Create access token logic for frontend
* Get user data with access token

For Github authentication, you need to create the OAuh Apps in the Github => Settings => Developer Settings => OAuth, fill in the homepage url and callback url, for localhost, it could be http://localhost:5173/. When deployed to production, you need to update the application callback url.