package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

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
	Username    string `json:"username"`
	PhoneNumber uint   `json:"phoneNumber"`
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type User struct {
	ID          uint
	FirstName   string `gorm:"column:firstName"`
	LastName    string `gorm:"column:lastName"`
	Email       string
	Username    string `gorm:"column:username"`
	Password    string
	PhoneNumber uint `gorm:"column:phoneNumber"`
}

type ParkingSpot struct {
	User
	zipcode       string
	address       string
	city          string
	state         string
	dollars       string
	cents         string
	availibility  string
	timeAvailable string
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "user"
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
	dsn := "root:@tcp(127.0.0.1:3306)/parKing?charset=utf8mb4&parseTime=True&loc=Local"
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
			Email: registerData.Email, Password: hashPass, PhoneNumber: registerData.PhoneNumber, Username: registerData.Username}
		db.Create(&user) // pass pointer of data to Create
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

	r.GET("/user-session", auth(), func(c *gin.Context) {

		c.JSON(http.StatusOK, gin.H{
			"message": "Success",
		})
	})

	r.Run()
}

func generateParkingsSpots() {
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
			zipcode:       record[3],
			address:       record[4],
			city:          record[5],
			state:         record[6],
			dollars:       record[7],
			cents:         record[8],
			availibility:  record[9],
			timeAvailable: record[10],
		}
		testSpot(spot)
	}
}

func testSpot(spot ParkingSpot) {
	printAddress(spot)
	fmt.Println()
	printAvailability(spot)
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
	fmt.Println(spot.address)
	fmt.Println(spot.city, ", ", spot.state, " ", spot.zipcode)
}

func printAvailability(spot ParkingSpot) {
	intVar, err := strconv.Atoi(spot.availibility)

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
}
