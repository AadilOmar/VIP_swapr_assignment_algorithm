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

	this.isComplete = function(){
		videosGraded = 0
		for (i = 0; i < n; i++){
			videosGraded += this.array[i].grades.length
		}
		// console.log("is complete? ", videosGraded == m * n)		
		return (videosGraded == m * n)
		// console.log("aprewporewp", videosGraded)
	}

	//prints the grid nicely - to see where the grades are being inputted
	this.printNicely = function(){
		for (i = 0; i < n; i++){
			gradeExists = false
			assignment = this.array[i]
			gradeRepresentation = "Index "+i+":: " 
			for (j = 0; j < m; j++){
				if (assignment.grades[j] != undefined){
					gradeRepresentation += "[" + assignment.grades[j].student_id// + "- confidence: " + assignment.grades[j].confidence + "], "					
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

// add logic here to pop item with best confidence, add current user confidence,
// and push the assignment in its correctly sorted place in the grid
//passes in student object and boolean rnadom_assignment(to randomly get next assignment, or calculate it)
function getNextAssignment(student, random_assignment){
	
	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	}

	//check how many assignments the current student has graded - if he has graded m already, return null
	numAssignmentsGraded = 0;
	for (t = 0; t < grid.array.length; t++) {
		assignment = grid.array[t]
		for (v = 0; v < assignment.grades.length; v++) {
			if (assignment.grades[v].student_id == student.student_id) {
				numAssignmentsGraded++
			}
		}
	}
	if (numAssignmentsGraded === m) {
		return null
	}

	student_confidence = student.confidence
	student_id = student.student_id

	assignment_to_pop = null
	smallest_confidence_difference = avg_student_confidence

	//if we want each assginment to be graded once before we move on to using confidences to find assginments, choose the first asssignment we see that doesn't have a grade
	for (i = 0; i < grid.array.length; i++){
		assignment = grid.array[i]
		if (assignment.grades.length === 0){
			return assignment
		}			
	}

	if (random_assignment){
		
		//creates array [0,1,2,3,4....n-1]
		indexArr = Array.apply(null, {length: n}).map(Number.call, Number)
		shuffle(indexArr)
		// console.log(indexArr)

		for (i = 0; i < grid.array.length; i++){

			assignment = grid.array[indexArr[i]]
			hasGraded = false;
	        for (k = 0; k < assignment.grades.length; k++) {
	            if (assignment.grades[k].student_id === student.student_id) {
					hasGraded = true
	            }
	        }
	        if (assignment.grades.length < m && assignment.student_id !== student.student_id && !hasGraded){
	        	return assignment
	        }

		}
	}

	else{

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
	        //make the current assignment we are at the assignment we want to get 
			if (confidence_difference <= smallest_confidence_difference
				&& assignment.grades.length < m
				&& assignment.student_id !== student.student_id
				&& !hasGraded){
				// console.log("found smaller difference", confidence_difference, smallest_confidence_difference)
				smallest_confidence_difference = confidence_difference
				assignment_to_pop = assignment
			}
		}
	}
	return assignment_to_pop
}


//returns list of average confidence per video (if there are n videos, returns list of size n)
function calculateAverage(){
	// combined_average_video_confidence = 0
	average_confidence_list = []
	for(i = 0; i < grid.array.length; i++) {
		curr_video = grid.array[i]
		sum_video_confidence = 0
		for(j = 0; j < curr_video.grades.length; j++) {
			grade = curr_video.grades[j]
			sum_video_confidence += grade.confidence
		}
		average_video_confidence = sum_video_confidence / curr_video.grades.length
		average_confidence_list.push(average_video_confidence)
	}		
	// return combined_average_video_confidence /= grid.array.length
	// return calculateAverage
	return average_confidence_list
}


/*
 * This is going to simulate x simulations, and print output  
 */



global.m = 3
global.n = 10
num_simulations = 100

//do we want to output the differences of average_video_confidence - average_student_confidence
//or simply output the average_video_confidence
output_average_difference = false

//do we want random assignment, or calculated assignment?
random_assignment = false

//list of average_conf per video across the number of simulations
total_average_confidence_arr = []

for (times = 0; times < num_simulations; times++){

	arr = createStudents(n)
	students = createStudents(n)[0]
	global.avg_student_confidence = createStudents(n)[1]

	// console.log("avg student confidence: ",avg_student_confidence)

	global.grid = initGrid(m, n, students)

	//number of total gradings by students we want to simulate
	//if we put this at a number close to or smaller than n*m, some videos will not have the total m grades. Some grades will be empty
	numGradingsToSimulate = 300

	numGradingsMade = 0

	//simulates students grading assignments
	for (s = 0; s < numGradingsToSimulate; s++) {
		if (numGradingsMade == m*n){
			// console.log("at simulation number ", s, " all videos have been completely graded")
			break
		}
		//gets a random number from 1 to numGradingsToSimulate (to index into the list of students)
		index = Math.floor(Math.random() * (n));
		random_student = students[index]

		// console.log("Student " + index + ": ", random_student)
		assignment = getNextAssignment(random_student, random_assignment)
		if (assignment === null) {
			// console.log("Assignment returned was null")
			continue
		}
		updateGrid(assignment, random_student)
		numGradingsMade += 1
	}

	// console.log(grid.isComplete())


	averages = calculateAverage()
	// console.log(averages)

	if (output_average_difference){
		for (i = 0; i < averages.length; i++){
			averages[i] = Math.abs(averages[i] - avg_student_confidence)
		}
	}

	total_average_confidence_arr = total_average_confidence_arr.concat(averages)
}

if (output_average_difference){
	console.log("DIFFERENCE OF AVERAGE CONFIDENCE - AVERAGE STUDENT CONFIDENCE PER VIDEO")
}
else{
	console.log("AVERAGE STUDENT CONFIDENCE PER VIDEO")
}
for (i = 0; i < total_average_confidence_arr.length; i++){
	console.log(total_average_confidence_arr[i])
}




/*
 * NOTES
 *
 * when we don't actively try to fill in the first row first, what happens is that the rows start filling up from the bottom: 
 	the last assignment fills up completely, then the second last, then the third last ...
 
 * When we do actively try to fill in the first rows of the grades (make sure that each assignment has atleast one grade before calculating confidences), 
 	it seems that the assignments that are chosen are more spread out 
 *

It is possible for the grid to be unsatisfiable(cant fill completely), such as in this case, where each student has graded 3 videos, except student4. However,
Student4 cannot grade the only remaining video left because he has already graded the current video. This occurs in approx 1/x cases where n=10,m=3

Index 0:: [student3[student5[student1
Index 1:: [student9[student2[student6
Index 2:: [student9[student4
Index 3:: [student8[student2[student1
Index 4:: [student2[student8[student3
Index 5:: [student4[student1[student9
Index 6:: [student7[student5[student0
Index 7:: [student0[student3[student8
Index 8:: [student0[student7[student6
Index 9:: [student5[student7[student6




 */ 
