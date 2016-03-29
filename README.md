## Overview:

Kickstopper is a web application based on Kickstarter and built using Ruby on Rails and React.js.

### Features:

* Create an account
* Log in/log out
* Navigate through live projects by both search and filter views
* Create projects to seek funding
* Make financial pledges to projects
* Use Stripe to charge backers on goal date if project is fully funded
* Manage created/backed projects from user page

## Design Docs:

### Wireframes/Diagrams:

See [wireframe images](https://github.com/zdg2102/Kickstopper/tree/master/proposal_wireframes).

### Routes Outline:

Page | Rails HTTP Route | React Router Local Route
-----|------------------|-------------------------
User Login | /login | none
User Signup | /signup | none
Main Nav Header and Footer | / | /main/ (wrapper route only, not visible in URL and cannot be navigated to directly)
Static Nav Header and Footer | / | /static/ (wrapper route only, not visible in URL and cannot be navigated to directly)
User Profile | / | (/main/)profile/:userId
Main Page | / | (/main/) (default child of main nav)
Discover Page | / | (/main/)discover/
Search Page | / | (/main/)discover/search/
Discover Category Page | / | (/main/)discover/:categoryName
Discover Subcategory Page | / | (/main/)discover/:parentCategoryName/:subCategoryName
Project Page | / | (/main/)projects/:projectId/:projectTitle
Select Pledge Page | / | (/static/)projects/:projectId/:projectTitle/pledge/new/
Make Pledge Page | / | (/static/)payments/new
Project Create Page | / | (/static/)start/

### React Components:

  * Nav header/footer wrapper
    * Header
      * User Options Menu
    * Footer
  * Static header/footer wrapper
  * Highlighted projects slideshow
  * Highlighted by category on main page
    * Categories selector
  * Popular projects subsection
  * Detailed project panel (for highlighted projects)
  * Regular project panel (for lists)
  * Expandable project list
  * Search/filter box
  * Project main page container
    * Project video
    * Project info side panel
    * Project creator details
    * Project details
    * Project description
    * Reward detail box
  * Create form tab buttons
  * Basic information sub-form
  * Rewards sub-form
    * Individual reward sub-form box
  * Description sub-form
  * About creator sub-form
  * Verification sub-form
  * Selectable individual reward
  * Payment form
  * Log in/sign up wrapper
    * Log in form
    * Sign up form
  * User info box
  * User projects list box

### Flux Stores:

  * Popular projects store (for storing project panel details for popular projects expanding list)
  * Projects store (for listing regular projects in expanding list)
  * Project creation form data store (for storing data as user cycles through multiple sub-form tabs)
  * Rewards store (for listing reward details and also tracked selected reward on reward select page)
  * User projects store (for listing owned and backed projects on user profile page)

### API Endpoints:

  * /api/projects/
  * /api/project-panels/ (limited summary details for lists)
  * /api/users/
  * /api/rewards/
  * /api/pledges/

### DB Schema:

* User
  * Name
  * Email
  * Password Hash

* Session Tokens
  * User ID
  * Token String

* Projects
  * Title
  * Creator ID
  * Category ID
  * Subcategory ID
  * Category Featured (boolean)
  * Funding Goal
  * Funding Target Date
  * Proposal Video Asset Link
  * Project Picture Asset Link
  * Short Summary
  * Creator Description
  * Project Description

* Categories
  * Category Name

* Subcategories
  * Subcategory Name
	* Parent Category ID

* Rewards
  * Project ID
  * Minimum Pledge Value
  * Description

* Project Pledges
  * Pledger ID
  * Project ID
  * Reward ID
  * Pledged Amount
  * Payment details (dependent on Stripe API)

## Implementation Timeline:

### W8D2:

* Set up Rails project
* Run user and token migrations
* Set up user authorization
* Add log in/log out functionality
* Seed sample project data
* Set up initial routes/React router
* Get project onto Heroku

### W8D3:

* Run project migrations
* Set up project page (without video)
* Create detailed and regular project panels
* Set up main page (without slideshow or categories selector)
* Add filtering/search querying

### W8D4:

* Create discover/search page
* Create expanding list sections
* Add nav header and footer
* Add search bar

### W8D5:

* Run category migrations
* Run rewards migration
* Build project creation form
* Figure out how Stripe works

### W9D1:

* Run pledges migration
* Build pledge selection page
* Build payment form page
* Incorporate Stripe payments

### W9D2:

* Build user profile page
* Allow user to delete pledges
* Allow user to edit projects they created

### W9D3:

* Add video to project pages
* Add slideshow to main page
* Additional formatting/styling/cleanup

### W9D4/W9D5:

* Time buffer for any of the above that runs longer than accounted for

### Planned additional features (contingent on time constraints)

* Users can set their location and see projects that are geographically nearby
* Users can mark projects with a reminder to come back before the pledge deadline
* Project owners can use the project page to give status updates to the backers after funding is complete
* Can preview finalized project page from project create form
* Method for recommending projects a particular user might be interested in
* Curated pages (page owner can highlight projects for attention of other users)
