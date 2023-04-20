![ParKing Logo](/parKingFull@3x.png)
# Front End
#### Sean Ferguson & Christopher Krause

Youtube Link: https://youtu.be/SOT3uScskcA

#### New and Updated features:
1. Added home page
2. Added login boolean
3. Added Google maps API with AGM/core
4. Assisted in MYSQL database and front end display
5. Recreated Cypress testing based on ngModel forms
6. Reworked Sell page to be compatible with MYSQL

#### Unit Testing with Cypress (recreated old testing):
- Recreated Listing Tests
  - Submits the form successfully

#### Description of New Implementations
- Home Page
  - Welcome to parking home page, including an about us tab, a scrolling image with mission statements, CEO and Founder pictures of the 3 memebers
  - "At ParKing, our mission is to revolutionize the way people park by providing a convenient and innovative platform for booking and listing available parking spaces in your area. Founded in 2023 by University of Florida students, we aim to simplify parking for our users by allowing them to get paid for land they already own or park closer to events they are attending. We offer short-term and long-term parking options to cater to our users' needs. Our goal is to streamline the parking process with a user-friendly interface and exceptional customer service, making parking stress-free and hassle-free. Join us in transforming the parking industry, one spot at a time."
- Login/logout boolean
  - When a valid user signs into ParKing, the login and register tabs are removed and a profile tab appears in the top right of the website
  - Signout located on the profile tab
- Google Maps API
  - Added an an interactive map to the Buy page
  - Implemnted using AGM/core which allowed for creating markers, information windows, and a zoom/pan feature on the map
- Modified Buy page
  - Updated HTMl to allow for database data to be displayed:
    - location
    - size
    - description
    - avaliability
    - image
- Reworked Sell
  - Last Sprint, sell would not update the database with new data
  - Fixed form and switched to div for easier transfer   

#### Currently work in progress/not working:
1. Checking out listings
2. Tieing users to specific spaces, listing or buying

#### Bugs encountered and Status:
1. Google Maps API not displaying on Sean and Rodrigo's computers

# Back End
#### Rodrigo Avila Merchan

### New and Updated features:
1. Implemented parking spot table for data gathering and data population from website
2. Implemented frontend and backend communication functionality, frontend and backend now talk to each other on every page except the home page

### Created Listing and Parking Spot Structures:
1. Implemented listing and parking spot structures in Go. The goal of these structures is to create instances of them and populate there respective fields based on the data gathered from the sell endpage.
2. Populated the structures variables with data acquired from the website
3. Implemented HTTP post to parking spot database table for the sell page
4. Implemented checking database table in order for that data to be displayed on the buy page after a listing is created.

### Sell Unit Testing
- Sell Listing Data Test
  -  Checks if listing object is populated with parking spot input data from sell endpage. Displays data if successful, else throws a not recieved error.
- Post Data Test
  - Checks if the parking spot listing data was posted onto the parking spot database table. Displays success message if no errors occur.

### Backend API
- Classes and interface
  - Claims struct 
  - Register struct
  - Login struct
  - Listing struct
  - User struct
  - ParkingSpot struct
  - Tabler interface
- Functions
  - func (User) TableName()
  - func (ParkingSpot) TableName()
  - func HashPassword()
  - func CheckPasswordHash()
  - func auth()
  - func main()
  - func checkIfDataRecievedFromRegisterPage()
  - func checkIfDataRecievedFromLoginPage()
  - func checkIfDataRecievedFromSellPage()
  - func checkPostToDataBase()
  - func generateParkingsSpots()
  - func testSpot()
  - func readData()
  - func printAddress()
  - func printAvailability()
