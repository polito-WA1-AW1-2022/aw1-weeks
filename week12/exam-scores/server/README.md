# `react-score-server`

The `react-scores-server` is the server-side app companion of [`react-scores`](https://github.com/polito-wa1-aw1-2021/react-scores). It presents some APIs to perform CRUD operations on a student's university exams.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List Courses__

URL: `/api/courses`

Method: GET

Description: Get all the courses that the student needs to pass.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing a course.
```
[{
    "code": "01TYMOV",
    "name": " Information systems security ",
    "CFU": 6
}, {
    "code": "02LSEOV",
    "name": " Computer architectures ",
    "CFU": 10
},
...
]
```

### __Get a Course (By Code)__

URL: `/api/courses/<code>`

Method: GET

Description: Get the course identified by the code `<code>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong code), or `500 Internal Server Error` (generic error).

Response body: An object, describing a single course.
```
{
    "code": "01TXYOV",
    "name": "Web Applications I",
    "CFU": 6
}
```

### __List Exams__

URL: `/api/exams`

Method: GET

Description: Get all the exams that the student already passed.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing an exam.
```
[{
    "code": "02LSEOV",
    "score": 25,
    "date": "2021-02-01"
},
...
]
```

### __Add a New Exam__

URL: `/api/exams`

Method: POST

Description: Add a new (passed) exam to the list of the student's exams.

Request body: An object representing an exam (Content-Type: `application/json`).
```
{
    "code": "01TXYOV",
    "score": 30,
    "date": "2021-05-04"
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error, e.g., when trying to insert an already existent exam). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_

### __Update an Exam__

URL: `/api/exams/<code>`

Method: PUT

Description: Update entirely an existing (passed) exam, identified by its code.

Request body: An object representing the entire exam (Content-Type: `application/json`).
```
{
    "code": "01TXYOV",
    "score": 31,
    "date": "2021-05-04"
}
```

Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_

### __Delete an Exam__

URL: `/api/exams/<code>`

Method: DELETE

Description: Delete an existing (passed) exam, identified by its code.

Request body: _None_

Response: `204 No Content` (success) or `503 Service Unavailable` (generic error).

Response body: _None_