/*
 * creating grid of size m(cols) x n(rows)
 * m is the max amount of grades an assignment can receive
 * n is the number of assgignments
 */
function Grid(m, n, students) {
	assignmentName = "Assignment 1"
	this.array = new Array(n)//zeros(m,n)
	for(i = 0; i < n; i++) {
		currentStudent = students[i]
		this.array[i] = new Assignment(assignmentName, m, currentStudent.student_id)
	}

	//prints the grid nicely - to see where the grades are being inputted
	this.printNicely = function(){
		for (i = 0; i < n; i++){
			gradeExists = false
			assignment = this.array[i]
			gradeRepresentation = "Index "+i+":: " 
			for (j = 0; j < m; j++){
				if (assignment.grades[j] != undefined){
					gradeRepresentation += "[" + assignment.grades[j].student_id + "- confidence: " + assignment.grades[j].confidence + "], "					
					gradeExists = true
				}
			}
			if (!gradeExists){
				gradeRepresentation += "[]"
			}
			console.log(gradeRepresentation)						
		}
	}
}

/*
 * name is the name of the assignment - for each grid, the name of the assignment would be the same
 * student_id is the id unique to each student (this should prob be id of the assignment, but let us assume ofr simplicity sake that this is the student's id)
 */
function Assignment(name, m, student_id) {
	this.name = name;
	this.student_id = student_id;
	this.grades = [] //array of Grade objects - empty to start off with
}

function Student(name, student_id, confidence) {
	this.name = name; 
	this.student_id = student_id;
	this.confidence = confidence
}

//a grade consists of the score given to the assignment (out of 100), the confidence of the student giving the score, and the student id giving the score
function Grade(student_id, score, confidence){
	this.student_id = student_id
	this.score = score
	this.confidence = confidence
}

function initGrid(m, n, students){
	grid = new Grid(m, n, students);
	return grid
}

//creates and returns a list of n students with unique studentIds, and random confidences. (for simplicity, studentname and student id is the same) (starts with student 0 ...)
function createStudents(n){
	studentArray = []
	studentConstant = "student"
	total_confidence_score = 0.0
	for (i = 0; i < n; i++){
		studentName = studentConstant + i
		confidence = parseFloat(Math.random(.1,.9).toFixed(2))
		total_confidence_score += confidence
		studentArray[i] = new Student(studentName, studentName, confidence)
	}
	avg_confidence_for_students = total_confidence_score / n
	return [studentArray, avg_confidence_for_students]
}

function updateGrid(assignment, student_giving_score){
	for (i=0; i<grid.array.length; i++){
		if (grid.array[i] == assignment){
			score = parseFloat(Math.random(40, 100).toFixed(2))
			newGrade = new Grade(student_giving_score.student_id, score ,student_giving_score.confidence)
			// console.log("updating grid: found the assignment that needs to be updated", newGrade)						
			grid.array[i].grades.push(newGrade)
		}
	}
}

//do we want to check to make sure that a students is not grading another students's assignment twice?

// add logic here to pop item with best confidence, add current user confidence,
// and push the assignment in its correctly sorted place in the grid
function getNextAssignment(student, finishRow1First){
	numTotalGrades = 0;

	for (t = 0; t < grid.array.length; t++) {
		assignment = grid.array[t]
		for (v = 0; v < assignment.grades; v++) {
			if (assignment.grades[v].student_id === student.student_id) {
				numTotalGrades++
			}
		}
	}

	if (numTotalGrades === m) {
		return null
	}

	student_confidence = student.confidence
	student_id = student.student_id

	assignment_to_pop = null
	smallest_confidence_difference = avg_student_confidence

	//if we want each assginment to be graded once before we move on to using confidences to find assginments, choose the first asssignment we see that doesn't have a grade
	if (finishRow1First){
		for (i = 0; i < grid.array.length; i++){
			assignment = grid.array[i]
			if (assignment.grades.length === 0){
				console.log("sawer")
				return assignment
			}			
		}
	}


	for (i = 0; i < grid.array.length; i++){
		assignment = grid.array[i]

		total_confidence = 0.0
		
		avg_assignment_confidence = 0

		for (j = 0; j < assignment.grades.length; j++){
			grade = assignment.grades[j]
			total_confidence += grade.confidence
		}
		total_confidence += student.confidence
		avg_assignment_confidence = total_confidence / (assignment.grades.length + 1)

		confidence_difference = (Math.abs(avg_assignment_confidence - avg_student_confidence))
		hasGraded = false;
        for (k = 0; k < assignment.grades.length; k++) {
            if (assignment.grades[k].student_id === student.student_id) {
				hasGraded = true
            }
        }

		if (confidence_difference <= smallest_confidence_difference
			&& assignment.grades.length < m
			&& assignment.student_id !== student.student_id
			&& !hasGraded){
			// console.log("found smaller difference", confidence_difference, smallest_confidence_difference)
			smallest_confidence_difference = confidence_difference
			assignment_to_pop = assignment
		}
	}
	return assignment_to_pop
}



global.m = 3
global.n = 10

arr = createStudents(n)
students = createStudents(n)[0]
global.avg_student_confidence = createStudents(n)[1]

console.log("avg student confidence: ",avg_student_confidence)

global.grid = initGrid(m, n, students)

//if this number is n * m, we should fill up the entire grid
numStudentsToSimulate = 50

//toggle this to see difference when we try to fill up the first row first vs we dont
finishRow1FirstHeuristic = true


//simulates students grading assignments
for (s = 0; s < numStudentsToSimulate; s++) {

	//gets a random number from 1 to numStudentsToSimulate (to index into the list of students)
	index = Math.floor(Math.random() * (n));
	random_student = students[index]

	console.log("Student " + index + ": ", random_student)
	assignment = getNextAssignment(random_student, finishRow1FirstHeuristic)
	if (assignment === null) {
		console.log("Assignment returned was null")
	}
	updateGrid(assignment, random_student)
	grid.printNicely()
	console.log("---------------------------")
}



/*
 * NOTES
 *
 * when we don't actively try to fill in the first row first, what happens is that the rows start filling up from the bottom: 
 	the last assignment fills up completely, then the second last, then the third last ...
 
 * When we do actively try to fill in the first rows of the grades (make sure that each assignment has atleast one grade before calculating confidences), 
 	it seems that the assignments that are chosen are more spread out 
 *
 */ 
