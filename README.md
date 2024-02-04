# Tech Educators Bootcamp Week 09 Assignment


## Build a social network
-------------------------------------------------

### Task

Build a basic social network site with authenticated users.

<br>
<br>

### Feedback from user stories
- As a user, I am able to sign up for an account and create a user profile
- As a user, I am able to log in and out of my account
- As a user, I am able to create posts on my profile timeline
- As a user, I am able to see all posts by all users on a global timeline

<br>

### Feedback from stretch stories
- As a user, I am able to see a list of other user's posts and/or profiles on the site
- As a user, I am able able to visit other user profiles
- As a user, I am able to follow other users
- As a user, I am able to like posts I think are good, and see how many likes a post has


### Requirements

- Use Clerk.com to set up user signup and login
- Use the Clerk userId to associate posts with a user
- Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to ```/user/[userId]```
- Enable users to create posts associated with the userId, and display those posts on the user's profile page
- Show a 404 error if a user profile doesn't exist
- Use at least 1 Radix UI Primitive or similar


### Stretch goals

- Enable users to visit other user profiles after seeing their posts on a global timeline
- Enable users to follow other users by creating a follower and follwee relationship between two user profiles
- Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table
- A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in



### Requirements achieved

#### Use Clerk.com to set up user signup and login
Clerk was used for user authentication, login and signup

#### Use the Clerk userId to associate posts with a user
The Clerk userId value was used to associate posts with the user

#### Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to ```/user/[userId]```
This was carried out. The path used is ```user/[userid]```

#### Enable users to create posts associated with the userId and display those posts on the user's profile page
This functionality is technically enabled, although a last minute check showed that the buttons that link to a user's profile page currently contain the wrong file paths, so link to the wrong user. Access to the userid pages can still be reached if the values are typed in via the URL. Test data is present for user's numbered 1 to 7.

#### Show a 404 error if a user profile doesn't exist
This is working.

<br/>

### Requirements not achieved
#### Use at least 1 Radix UI Primitive or similar
The intention was to target this at the end, to avoid page clutter when coding. Unfortunately a few challenges stood in the way of progress.


<br>

### Stretch goals achieved

#### Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table
This was achieved in that a user can register a 'fist bump' to a user's post. A bug remains where the calculation for the number of likes via a query isn't working as intended.

#### A user's biography cannot be blank - If a user logs in but doesn't have a biography set, they should be asked to fill one in
This has been achieved.

<br/>

### Extra features



<br/>

### Other notes



### Links

Live link at Vercel: [https://wk09-assignment-social-auth.vercel.app/](https://wk09-assignment-social-auth.vercel.app/)<br>
Link to table setup SQL, queries to populate database with basic test data and the database schema: [here](https://github.com/mrdb303/wk09-assignment-social-auth/tree/main/src/documentation)<br>

<br><br>
Note: changes were made to this readme file after the assignment was submitted. No other code was changed.

