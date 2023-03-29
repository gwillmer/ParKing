![ParKing Logo](/parKingFull@3x.png)
# Front End
#### Sean Ferguson & Christopher Krause

Youtube Link: 

#### New and Updated features:
1. Implemented a Sell/Listing screen
2. Added Listing objects below map API
3. Integratted back end login and registration
4. Recreated form styling with ngModel inputs
5. Recreated Cypress testing based on ngModel forms

#### Unit Testing with Cypress (recreated old testing):
- Flow/Routing Tests
  - Start on Events and click Login Tab, reworked
  - Start on Events and click Register Tab, reworked
- Login Tests
  - Start on Login: 
  - Should display email validation message for invalid email
  - Should disable the login button if email or password is missing
  - Should not login, Password Needed
  - Should not login, Email Needed
  - Should not login, Email Invalid, no @
  - Should not login, Email Invalid, no .com
  - Should login
- Registration Tests
  - Start on Registration, 
  - Should fill every field and clicks button
  - Should not register if empty field
  - Should not submit if email is invalid
  - Should require passwords to match
- Create Listing Tests
  - Submits the form successfully
  - Temp as this is still a form and we use inputs now

#### Description of New Implementations
- Listing Screen
  - Includes a simple form that is tied to your account
  - Address, Zip Code, State Drop down menu, Parking spot size drop down menu, Start date calender, End date calender, Description, Upload image
  - Will incorperate into the class object made last sprint to allow users to upload multiple listings (GoDojo/main.go)
- Listing Objects/Adverts
  - Created simple adverts that are non interactive atm
  - Will include pictures of the parking spot, description, size, location, etc.
  - Allows users to book avaliable spaces and a hyperlink to seller info which will link them to the listing user's name, email, and number
- Login/Register rework to allow backend usage
  - MySQL dislpays new users and allows them to login
  - Rework now displays TypeScript signin protections to prevent non-emails and non-matching passwords from registering
- Renamed event tab to buy

#### Currently work in progress/not working:
1. Google maps API not working, when demoing in other HTML libraries it works but angular requires an API key
  -This is not provided or avaliable with our UF emails
2. Sell tab is not in ngModel so it will need a slight rework
3. Search bar will search for zipcodes and show avaliable spots based on distance from the zipcode
4. Successful login will remove login and registration and present a logout button

#### Bugs encountered and Status:
1. Google Maps API not displaying (WIP)
2. Login doesn't route to main page after successful login (FIXXED!)

# Back End
#### Rodrigo Avila Merchan

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
