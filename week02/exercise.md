# Exercise 1: Better Scores
_Goal: basic handling of JavaScript arrays_

Develop a small JavaScript program to manage the scores of the exams you had in your Bachelor's degree. You should:
 
- Define an array with all your scores in chronological order. For the moment:
  - Embed the scores directly in the source code.
  - Ignore the course name, credits, and date.
  - Ignore the 30L.
- Duplicate the array, but:
  - Eliminate the two lowest-ranking scores.
  - Add two new scores, in the end, equal to the (rounded) average of the existing scores.
- Print both arrays, comparing the scores before and after the "improvement," and showing the averages in both cases.

# Exercise 2: My Courses' List
_Goal: basic handling of JavaScript strings_

Develop a small JS program to manage the list of your courses.

- Define the names of your courses as a comma-separated list.
  - For instance: "Web Applications I, Computer Architectures, Data Science and Database Technology, Computer network technologies and services, Information systems security, Software engineering, System and device programming."
- Parse the string and create an array containing the names, one name per array position.
  - Beware: no extra spaces should be present.
- Create a second array by computing the acronyms of the courses as the initial letters of the name. Acronyms should be all-capital letters.
  - For example, Computer Architectures -> CA.
- Print the resulting list of acronyms and full course names.
  - Extra: in alphabetical order of acronym.

# Exercise 3: Transcript
_Goal: managing a simple data structure as an array of objects_.

Using JavaScript objects manage a list of objects that include information about the exams.

Each exam will contain:

- Course code
- Course ame
- Credits
- Score (number between 18 and 30, plus a Boolean for the honors)
- Date

Define a constructor function `Exam` to create a new object.

Define a constructor function `ExamList`, with the following methods: 

- `add(exam)` // pass a fully-constructed `Exam` object
- `find(courseCode)` // returns the matching Exam
- `afterDate(date)` // returns an ExamList with the subset of Exams after the given date
- `listByDate()` // returns an array of Exams, sorted by increasing date
- `listByScore()` // idem, by decreasing score
- `average()` // return the average value (weighted by credits)

## Now with functional programming
Implement the methods of `ExamList` using functional programming methods.
