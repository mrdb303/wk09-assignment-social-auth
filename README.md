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

<br>

### Requirements

- Use Clerk.com to set up user signup and login
- Use the Clerk userId to associate posts with a user
- Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to `/user/[userId]`
- Enable users to create posts associated with the userId, and display those posts on the user's profile page
- Show a 404 error if a user profile doesn't exist
- Use at least 1 Radix UI Primitive or similar

<br>

### Stretch goals

- Enable users to visit other user profiles after seeing their posts on a global timeline
- Enable users to follow other users by creating a follower and followee relationship between two user profiles
- Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table
- A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in

<br>

---

### Information on solution

'Fist Bump' is a tinpot social network that uses the term 'Fist Bump' as an alternative term for a 'Like' (which is important for marking, because there is no mention of 'Like' in the UI).

<br>

#### Menu: Timeline

The 'Timeline' page is a user's timeline which contains:
- The user's profile details
- A form to add a new message post
- A list of the posts the user has made, in descending date order

<br>

Note that the user's user number is displayed in the URL as per requirements.

You can experiment with the user number within the URL to bring up their profile details and message posts.
To test this, there are seven users in the database for testing purposes, numbered 1 to 7. For example, once you are authenticated and have set a profile, try the following URL to show the data for user 3: [profile for user 3](https://wk09-assignment-social-auth.vercel.app/pages/user/3) 

Note that a post form is not shown on pages that belong to other users, so a post cannot be made for another user.

It would have been easier to not have the option to make a new post from the timeline page, along with the list of messages and profile, but it is keeping with the definition of a social media 'timeline' and the term timeline was used in the requirements. It was also a personal goal and have found this tricky to achieve in a previous assignment.
<br>
<br>

#### Menu: Show All Posts

Not surprisingly, this menu option shows a list of all posts.

The code will allow a user to add one 'Fist Bump' per post, via the 'Fist Bump' button. Handled by the JS page in `app>pages>fistbump>[fistbump]>page.js` : Link [here](https://github.com/mrdb303/wk09-assignment-social-auth/tree/main/src/app/pages/fistbump/%5Bfistbump%5D)


The 'Edit' button is shown on the post if it belongs to the user, although the editing feature is not present.

<br>

---

### Other notes

The component 'UserPosts.js' was added at an earlier stage, but is not currently used.

<br>

### Requirements achieved

**Use Clerk.com to set up user signup and login**<br>
Clerk was used for user authentication, login and signup

<br>

**Use the Clerk userId to associate posts with a user**<br>
The Clerk userId value was used to associate posts with the user

<br>

**Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to** ```/user/[userId]```
<br>This was carried out. The path used is `user/[userid]`

<br>

**Enable users to create posts associated with the userId and display those posts on the user's profile page** <br>
This functionality is enabled.

<br>

**Show a 404 error if a user profile doesn't exist**<br>
This is working.

<br>
<br/>

### Requirements not achieved

**Use at least 1 Radix UI Primitive or similar** <br>
The intention was to target this at the end, to avoid page clutter when coding. Unfortunately a few challenges stood in the way of progress.


<br>

### Stretch goals achieved

**Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table** <br>
This was achieved in that a user can register a 'fist bump' to a user's post.

**A user's biography cannot be blank - If a user logs in but doesn't have a biography set, they should be asked to fill one in** <br>
This has been achieved.

<br/>

### Extra features

The date and time is recorded in the database against each post made and displayed on the posts in a readable form, converted from the timestamp. I don't think this was mentioned in the requirements.

The menu is dynamic and only shows the options if a user is verified and validated.

The total number of posts are displayed in the 'Show All Posts' page.

Functionality is included to take into account a user's status. On authentication and authorisation, the user level is set to a default of 1 (`table: sn_profiles field: user_level`).
If this value is changed to 2, the code will allow the user to see the 'delete' button against a post(see line 52 [here](https://github.com/mrdb303/wk09-assignment-social-auth/blob/main/src/app/pages/all_posts/page.js) ). However, although the button is displayed, the feature hasn't been added to delete the post yet.
<br>

<br>

### Links

Live link at Vercel: [https://wk09-assignment-social-auth.vercel.app/](https://wk09-assignment-social-auth.vercel.app/)<br>
Link to table setup SQL, queries to populate database with basic test data and the database schema: [here](https://github.com/mrdb303/wk09-assignment-social-auth/tree/main/src/documentation)<br>

<br><br>
Note: changes were made to this readme file after the assignment was submitted. No other code was changed.
<br>
Hopefully the above documentation is useful for marking and not just a "Cool story Bro".

