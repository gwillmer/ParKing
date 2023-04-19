package main

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"errors"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

var jwtKey = []byte("secret_key_yall")

type Register struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	PhoneNumber uint   `json:"phoneNumber"`
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Listing struct {
	Email       string
	Address     string `json:"address"`
	ZipCode     uint   `json:"zipCode"`
	State       string `json:"state"`
	Size        string `json:"size"`
	StartDate   string `json:"startDate"`
	EndDate     string `json:"endDate"`
	Description string `json:"description"`
}

type User struct {
	ID          uint
	PhoneNumber uint   `gorm:"column:phonenumber"`
	FirstName   string `gorm:"column:firstName"`
	LastName    string `gorm:"column:lastName"`
	Email       string
	Password    string
}

type ProfileResponse struct {
	ID          uint   `json:"id"`
	PhoneNumber uint   `json:"phone_number"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string `json:"email"`
}

type ParkingSpot struct {
	ID          uint
	Address     string `gorm:"column:address"`
	ZipCode     uint   `gorm:"column:zipCode"`
	State       string `gorm:"column:state"`
	Size        string `gorm:"column:size"`
	StartDate   string `gorm:"column:startDate"`
	EndDate     string `gorm:"column:endDate"`
	Description string `gorm:"column:description"`
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "user"
}

func (ParkingSpot) TableName() string {
	return "parkingspot"
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func auth() gin.HandlerFunc {

	return func(c *gin.Context) {
		var authHeader = c.Request.Header.Get("Authorization")
		substrings := strings.Split(authHeader, " ")
		tokenFromHeader := substrings[1]
		claims := jwt.MapClaims{}
		_, err := jwt.ParseWithClaims(tokenFromHeader, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtKey), nil
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")

		} else {
			c.Next()
		}

	}
}

func main() {
	dsn := "root:@tcp(127.0.0.1:3306)/parking?charset=utf8mb4&parseTime=True&loc=Local"
	r := gin.Default()

	config := cors.DefaultConfig()

	config.AllowHeaders = []string{"Authorization", "content-type"}
	config.AllowOrigins = []string{"http://localhost:4200"}
	r.Use(cors.New(config))

	//Register page endpoint
	r.POST("/register", func(c *gin.Context) {
		var registerData Register

		// Bind JSON Data to Object
		err := c.BindJSON(&registerData)
		checkIfDataRecievedFromRegisterPage(registerData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		// hash the password
		hashPass, err := HashPassword(registerData.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		var user User
		// db connection
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		user = User{FirstName: registerData.FirstName, LastName: registerData.LastName,
			Email: registerData.Email, Password: hashPass, PhoneNumber: registerData.PhoneNumber}
		db.Create(&user) // pass pointer of data to Create
		checkPostToDataBase()
		// create jwt to login
		expirationTime := time.Now().Add(30000 * time.Minute)
		// Create the JWT claims, which includes the username and expiry time
		claims := &Claims{
			Email: registerData.Email,
			RegisteredClaims: jwt.RegisteredClaims{
				// In JWT, the expiry time is expressed as unix milliseconds
				ExpiresAt: jwt.NewNumericDate(expirationTime),
			},
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		// Create the JWT string
		tokenString, err := token.SignedString(jwtKey)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Success",
			"id":      user.ID,
			"jwt":     tokenString,
		})
	})

	//Login page endpoint
	r.POST("/login", func(c *gin.Context) {
		var loginData Login
		var user User

		// Bind JSON Data to Object
		err := c.BindJSON(&loginData)
		checkIfDataRecievedFromLoginPage(loginData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		db.First(&user, "email = ?", loginData.Email)
		checkHash := CheckPasswordHash(loginData.Password, user.Password)
		if checkHash == true {
			expirationTime := time.Now().Add(5 * time.Minute)
			// Create the JWT claims, which includes the username and expiry time
			claims := &Claims{
				Email: loginData.Email,
				RegisteredClaims: jwt.RegisteredClaims{
					// In JWT, the expiry time is expressed as unix milliseconds
					ExpiresAt: jwt.NewNumericDate(expirationTime),
				},
			}
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
			// Create the JWT string
			tokenString, err := token.SignedString(jwtKey)
			if err != nil {
				c.JSON(http.StatusInternalServerError, "")
			}
			c.JSON(http.StatusOK, gin.H{
				"message": "Success",
				"jwt":     tokenString,
			})
		} else {
			c.JSON(http.StatusInternalServerError, "")
		}
	})

	//Sell page endpoint
	r.POST("/special-events", func(c *gin.Context) {
		var listingData Listing
		// Bind JSON Data to Object
		err := c.BindJSON(&listingData)
		checkIfDataRecievedFromSellPage(listingData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		var pSpot ParkingSpot
		// db connection
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		pSpot = ParkingSpot{Address: listingData.Address, ZipCode: listingData.ZipCode,
			State: listingData.State, Size: listingData.Size, StartDate: listingData.StartDate,
			EndDate: listingData.EndDate, Description: listingData.Description}
		db.Create(&pSpot) // pass pointer of data to Create
		// create jwt to login
		expirationTime := time.Now().Add(30000 * time.Minute)
		// Create the JWT claims, which includes the username and expiry time
		claims := &Claims{
			Email: listingData.Email,
			RegisteredClaims: jwt.RegisteredClaims{
				// In JWT, the expiry time is expressed as unix milliseconds
				ExpiresAt: jwt.NewNumericDate(expirationTime),
			},
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		// Create the JWT string
		tokenString, err := token.SignedString(jwtKey)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Success",
			"id":      pSpot.ID,
			"jwt":     tokenString,
		})
	})

	r.GET("/user-session", auth(), func(c *gin.Context) {

		c.JSON(http.StatusOK, gin.H{
			"message": "Success",
		})
	})

	r.Run()

	r.GET("/profile", func(c *gin.Context) {
		// Get the JWT token from the Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "missing Authorization header"})
			return
		}

		// Parse the JWT token and get the email from it
		token, err := jwt.ParseWithClaims(authHeader, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid JWT token"})
			return
		}
		claims, ok := token.Claims.(*Claims)
		if !ok || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid JWT token"})
			return
		}

		// Query the database for the user with the given email
		var user User
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to connect to database"})
			return
		}
		result := db.Where("email = ?", claims.Email).First(&user)
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		} else if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query database"})
			return
		}

		// Return the user's profile information
		c.JSON(http.StatusOK, gin.H{
			"id":          user.ID,
			"phoneNumber": user.PhoneNumber,
			"firstName":   user.FirstName,
			"lastName":    user.LastName,
			"email":       user.Email,
		})
	})

}

// Middleware function to authenticate the user's JWT token
func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil {
			c.JSON(http.StatusUnauthorized, "")
			c.Abort()
		}
		if !token.Valid {
			c.JSON(http.StatusUnauthorized, "")
			c.Abort()
		}
	}
}

// Function to extract the user's email from the JWT token
func getEmailFromToken(tokenString string) (string, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return "", err
	}
	if !token.Valid {
		return "", errors.New("Invalid token")
	}
	return claims.Email, nil
}

func checkIfDataRecievedFromSellPage(spot Listing) {
	if spot.Address != "" && spot.ZipCode != 0 {
		fmt.Println("Address and zipcode were recieved.")
	} else {
		fmt.Println("Error: Address and zipcode were not recieved.")
	}

	if spot.State != "" {
		fmt.Println("State was received.")
	} else {
		fmt.Println("Error: State was not recieved.")
	}

	if spot.Size != "" {
		fmt.Println("Size was received.")
	} else {
		fmt.Println("Error: Size was not recieved.")
	}

	if spot.StartDate != "" && spot.EndDate != "" {
		fmt.Println("Start and end dates were recieved.")
	} else {
		fmt.Println("Error: Start and end dates were not recieved.")
	}

	if spot.Description != "" {
		fmt.Println("Description was recieved.")
	} else {
		fmt.Println("Error: Description was not recieved.")
	}
}

// Unit test: checks if register fields populated from gathering info from the webpage
func checkIfDataRecievedFromRegisterPage(user Register) {
	//Names
	if user.FirstName != "" && user.LastName != "" {
		fmt.Println("First and last names were recieved.")
	} else {
		fmt.Println("Error: First and last names have not been recieved.")
	}

	//Email and password
	if user.Email != "" && user.Password != "" {
		fmt.Println("Email and password was recieved.")
	} else {
		fmt.Println("Error: Email and password was not recieved.")
	}

	//Phone number
	if user.PhoneNumber != 0 {
		fmt.Println("Phone number was recieved.")
	} else {
		fmt.Println("Error: Phone number was not recieved")
	}
}

// Unit test: checks if login fields populated from gathering info from the webpage
func checkIfDataRecievedFromLoginPage(user Login) {
	//Email and password
	if user.Email != "" && user.Password != "" {
		fmt.Println("Email and password was recieved.")
	} else {
		fmt.Println("Error: Email and password was not recieved.")
	}
}

// Unit test: checks if data was sent to the database, executes if there are no errors
func checkPostToDataBase() {
	fmt.Println("Successful addition of a user to database.")
}

/*func generateParkingsSpots() {
	records, error := readData("data.csv")
	if error != nil {
		log.Fatal(error)
	}
	for _, record := range records {
		spot := ParkingSpot{
			User: User{
				FirstName: record[0],
				LastName:  record[1],
				Email:     record[2],
			},
			ZipCode:       record[3],
			Address:       record[4],
			City:          record[5],
			State:         record[6],
			Dollars:       record[7],
			Cents:         record[8],
			Availibility:  record[9],
			TimeAvailable: record[10],
		}
		testSpot(spot)
	}
}*/

func testSpot(spot ParkingSpot) {
	printAddress(spot)
	fmt.Println()
	//printAvailability(spot)
	fmt.Println()
}

func readData(fileName string) ([][]string, error) {

	f, err := os.Open(fileName)

	if err != nil {
		return [][]string{}, err
	}

	defer f.Close()

	r := csv.NewReader(f)

	// skip first line
	if _, err := r.Read(); err != nil {
		return [][]string{}, err
	}

	records, err := r.ReadAll()

	if err != nil {
		return [][]string{}, err
	}

	return records, nil
}

func printAddress(spot ParkingSpot) {
	fmt.Println("Parking Address:")
	fmt.Println(spot.Address)
	//fmt.Println(spot.City, ", ", spot.State, " ", spot.ZipCode)
}

/*func printAvailability(spot ParkingSpot) {
	intVar, err := strconv.Atoi(spot.Availibily)
	if err != nil {
		fmt.Println("Error during conversion.")
		return
	}
	fmt.Println("Availability:")
	if intVar == 0 {
		fmt.Println("This parking spot is not available.")
	} else if intVar == 1 {
		fmt.Println("This parking spot is available.")
	} else {
		fmt.Println("Error with this parking spot's availability.")
	}
}*/
