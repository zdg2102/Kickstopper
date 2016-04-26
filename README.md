# Kickstopper

Kickstopper is a satirical web application for people to create and fund projects dedicated to stopping things they don't like. It was inspired by Kickstarter and built using Ruby on Rails and React.js

### Discover View:

![alt text](https://github.com/zdg2102/Kickstopper/raw/master/app/assets/images/kickstopper_screenshot.jpg "Discover View")

### Project View:

![alt text](https://github.com/zdg2102/Kickstopper/raw/master/app/assets/images/kickstopper_project_screenshot.jpg "Project View")

## Overview

On Kickstopper, users have the ability to browse and search projects, make pledges to back projects, and launch projects of their own.

### Discover

* Discover page handles both index view and search
* Index view allows user to filter projects by both category and subcategory through modal selection list
* Index view also allows user to sort projects by multiple sort options through another modal selection list
* Search view uses PostgreSQL text search (via the PgSearch gem) and provides the additional sort option of search rank
* Index and search both handled on the back end via a FilterProjects service object, which takes the given parameters and returns an ActiveRecord Relation with the appropriate filter conditions by category, subcategory, and search term, appends any necessary additional columns like backer count and search rank, sorts by the user's selection or a default sort, and returns a paginated subset via the Kaminari pagination gem

### Pledges

* Pledges handled via Stripe API (the same payments system used by the real Kickstarter)
* User selecting a reward and beginning the checkout process creates a Checkout object on the server side, so that the payment values can't be manipulated on the front end. On completion, Checkout is destroyed and a new Pledge created with the Checkout's values
* Using the Stripe API in test mode, user can submit a predefined dummy card number (included on the payment page form) to generate a response from Stripe
* Stripe token is stored with the Pledge in the Pledges table on the server, so it can be charged only when the project reaches its funding date
* Scheduled Rake task runs every day with Heroku Scheduler to find all projects whose funding period ends that day, charge their pledges if they met their funding goal, and destroy the project and all dependent records

### Create

* Partially completed projects are saved in a separate Unlaunched Projects table (to avoid the potential for accidentally returning them among regular Project results), and their rewards in an Unlaunched Rewards table
* Completion of project form destroyed the Unlaunched Project and Unlaunched Rewards and creates a new Project and new Rewards with their values

### Other Features

* OAuth login with Facebook
* Pages that require login redirect user to the login screen, and then back to their original target page upon completion

## Planned/To-Dos

* Ability to cancel pledges up to the project funding date
* Replace project description field in project creation form with a rich text editor
* System-generated email to user when their project either meets or fails to meet its funding goal
* Add category featured projects with larger tiles
* Automated Rake task to clear old Checkout objects after 7 days (for payments that were initiated but never completed)
