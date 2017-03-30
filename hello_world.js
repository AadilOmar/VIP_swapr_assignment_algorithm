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
		// console.log(this.array[i])
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

//creates and returns a list of n students with unique studentIds, and random confidences. (for simplicity, studentname and student id is the same)
function createStudents(n){
	// console.log(n)
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
			console.log("updating grid: found the assignment that needs to be updated", newGrade)						
			grid.array[i].grades.push()
		}
	}
}

// add logic here to pop item with best confidence, add current user confidence,
// and push the assignment in its correctly sorted place in the grid
function getNextAssignment(student){
	student_confidence = student.confidence
	student_id = student.student_id

	assignment_to_pop = null
	smallest_confidence_difference = avg_student_confidence

	for (i = 0; i < grid.array.length; i++){
	// for (assignment in grid.array){
		assignment = grid.array[i]
		// console.log("assignment: ", assignment)

		total_confidence = 0.0
		
		avg_assignment_confidence = 0

		// for (grade in assignment.grades){
		for (j = 0; j < assignment.grades.length; j++){
			grade = assignment.grades[j]
			// console.log("current grade: ", grade)
			total_confidence += grade.confidence
		}
		total_confidence += student.confidence
		avg_assignment_confidence = total_confidence / (assignment.grades.length + 1)

		confidence_difference = (Math.abs(avg_assignment_confidence - avg_student_confidence))
		if (confidence_difference <= smallest_confidence_difference && assignment.grades.length < m && assignment.student_id != student.student_id){
			// console.log("found smaller difference", confidence_difference, smallest_confidence_difference)
			smallest_confidence_difference = confidence_difference
			assignment_to_pop = assignment
		}
		// console.log("avg conficende", avg_assignment_confidence)
	}
	return assignment_to_pop
}



global.m = 3
n = 25

arr = createStudents(n)
students = createStudents(n)[0]
global.avg_student_confidence = createStudents(n)[1]

// console.log(avg_student_confidence)

global.grid = initGrid(m, n, students)

random_student1 = students[3]
console.log("Student 1:",random_student1)
assignment = getNextAssignment(random_student1)
// console.log(assignment)
updateGrid(assignment, random_student1)


random_student2 = students[5]
console.log("Student 2:",random_student2)
assignment = getNextAssignment(random_student2)
// console.log(assignment)
updateGrid(assignment, random_student2)



