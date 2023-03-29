![ParKing Logo](/parKingFull@3x.png)
# Front End
#### Sean Ferguson & Christopher Krause

Youtube Link: 

#### New and Updated features:
1. Implemented a Sell/Listing screen
2. Added Listing objects below map API
3. Integratted back end login and registration'
4. Recreated form styling with ngModel inputs
5. Recreated Cypress testing based on ngModel forms

#### Unit Testing with Cypress (recreated old testing):
- Flow/Routing Tests
  - Check for Logo on main page
  - Start on Login and click Events Tab, make sure url matches
  - Start on Events and click Sell Tab, make sure url matches
  - Start on Events and click Login Tab, verify page identifier exist and make sure url matches
  - Start on Events and click Register Tab, verify page identifier exist and make sure url matches
- Login Tests
  - Start on Login, type in username and click submit button, no login as password field empty
  - Start on Login, type in password and click submit button, no login as username field empty
  - Start on Login, click submit button, no login as username and password field empty
  - Start on Login, type in password and username click submit button, login (sign in event creating)
- Registration Tests
  - Start on Registration, type in all fields except email is "exampleemail", invalid email, no login
  - Start on Registration, no password or confirmation password input, no login
  - Start on Registration, no confirmation password input, no login
  - Start on Registration, no password input, no login
  - Start on Registration, no email input, no login
  - Start on Registration, all fields filled, login (no event, brought back to event page)


#### Currently work in progress/not working:
1. Google maps API not working, when demoing in other HTML libraries it works but angular requires an API key
  -This is not provided or avaliable with our UF emails
2. Search bar will look for specific addresses in Google's databases
3. Remove events and special-events routing from original tutorial and rename to buy and sell

#### Bugs encountered and Status:
1. Google Maps API not displaying (WIP)
2. Login doesn't route to main page after successful login (WIP)

# Back End
#### Rodrigo Avila Merchan

Video file uploaded to canvas

### Created Parking Spot Structure:
1. Implemented parking spot structure in go
2. Populated the structure with variables needed for the website
3. Implemented parking spot availability message
4. Implemented parking spot address message

### Parking Spot Unit Testing
- Initialization Test
  -  Check if parking spot is initialized and populates with randomly genreated data from csv file 
- Availability Test
  - Check if the parking spot is available or not and displays result
- Address Test
  - Check if the parking spot address is populatd, formats it, and displays the full address

### Backend API
