# Introcept Backend API
## Version 0.0.0

## API Documentation

### The following things were used : 
    - NestJs as the main framework
    - A simple CSV as data storage
    - Class-validator and class-transformer for server-side validation
    - Nest based Interceptors and Exception filters for custome logging and error handling
    - Docker as a container tool
    - Jenkins for CI/CD pipeline 
    - Free tier of AWS as VPS for hosting the webapp

### Defaults:
	By default, these REST APIs will have the following responses format.
	If unstated, these guidelines are applicable for all the apis.

* **Default Response:**
	* Success:
	```javascript
  {
      "path": "path",
      "method": "METHOD",
      "statusCode": 200,
      "status": "Success",
      "timestamp": "Time of Request",
      "data": {
          some relevant data according to request
      }
  }
	```
	* Error:
	The following errors are expected:
    - 400 for Bad request or Validation Error
    - 404 for Not Found Exception
    - 500 for Internal Server Error
	```javascript
    {
      "path": "path",
      "method": "METHOD",
      "statusCode": RelevantStatusCode,
      "status": "Failure",
      "timestamp": "2020-06-13T21:01:31.789Z",
      "data": {
        error:"Error message"
      }
    }
	```




### 1.a Create Student
* **Url:** http://3.21.193.150:4000/api/student/
* **Request Header:**
	 contentType: 'application/json'
* **Request Body:**
	```javascript
  {
    "name":"name",
    "gender":"gender",
    "phone":9876543210,
    "email": "sager@adhmail.com",
    "nationality":"nationality",
    "dob":"03/04/2017",
    "educationbackground":"education",
    "preferredmodeofcontact":"prefer"
  }
	```

* **Response:**
	* Success:
	```javascript
    {
        "path": "/api/student/",
        "method": "POST",
        "statusCode": 200,
        "status": "Success",
        "timestamp": "2020-06-13T21:01:31.789Z",
        "data": {
            "id": 1592082091789,
            "name": "name",
            "gender": "gender",
            "phone": 123432,
            "email": "sager@adhmail.com",
            "nationality": "nationality",
            "dob": "03/04/2017",
            "educationbackground": "education",
            "preferredmodeofcontact": "prefer"
        }
    }

### 1.b Student Detail
* **Type:** GET
* **Url:** http://3.21.193.150:4000/api/student/1592078909047
* **Request Header:**
	 contentType: 'application/json'


* **Response:**
	* Success:
	```javascript
    {
        "path": "/api/student/1592069833279",
        "method": "GET",
        "statusCode": 200,
        "status": "Success",
        "timestamp": "2020-06-13T21:08:05.839Z",
        "data": {
            "id": 1592069833279,
            "name": "name",
            "gender": "gender",
            "phone": 123432,
            "email": "sager@adhmail.com",
            "nationality": "nationality",
            "dob": "03/04/2017",
            "educationbackground": "education",
            "preferredmodeofcontact": "prefer"
        }
    }
	```

### 1.c Get all Students
* **Type:** POST              (<===  Please notice it is a post request)
* **Url:** http://3.21.193.150:4000/api/student/all
* **Request Header:**
	 contentType: 'application/json'
* **Request Body:**
	```javascript
    {
      "refId":1592078909047 ,
      "numberOfStudents":4
    }
	```

* **Response:**
	* Success:
	```javascript
    {
        "path": "/api/student/all",
        "method": "POST",
        "statusCode": 200,
        "status": "Success",
        "timestamp": "2020-06-13T21:10:05.039Z",
        "data": [
            {
                "id": 1592069833279,
                "name": "name",
                "gender": "gender",
                "phone": 9876543210,
                "email": "radha@adhmail.com",
                "nationality": "nationality",
                "dob": "03/04/2017",
                "educationbackground": "education",
                "preferredmodeofcontact": "prefer"
            },
            {
                "id": 1592071959282,
                "name": "name",
                "gender": "gender",
                "phone": 9812343210,
                "email": "ram@adhmail.com",
                "nationality": "nationality",
                "dob": "03/04/2017",
                "educationbackground": "education",
                "preferredmodeofcontact": "prefer"
            },
            {
                "id": 1592072125616,
                "name": "name",
                "gender": "gender",
                "phone": 9833333210,
                "email": "rajes@adhmail.com",
                "nationality": "nationality",
                "dob": "03/04/2017",
                "educationbackground": "education",
                "preferredmodeofcontact": "prefer"
            }
        ]
    }
	```
  NOTE
	 Enters with id less than 'refId' will be returned. That means older entries than 'refId' will be returned"
   'numberOfStudents' is the number of entries.

## Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch
- Author - [Sagar Adhikari](https://www.linkedin.com/in/er-sagar-adhikari/)
