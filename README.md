Swapr's Get-Next-Assignment Simulation


This repository simulates the getNextAssignment() function of the Georia Tech VIP Data-driven-education's Swapr team.


The simulation simulates the creation of students (where each student has a confidence score of how confident we are of their accurate peer-grading), the submissions of videos, and the peer-grading of the videos(the assignment) by the students. 


Two heuristics of retreiving the next assignment are compared in the simulation:
	1) Random assiginment - each time a student asks for an assignment to grade, a random assignment is given for him to grade, regardless of the confidence of the video or the student grading
	2) Calculated assignment - when a student asks for an assignment to grade, the algorithm finds the next assignment such that the average grade_confidence of the video with that student's confidence moves closer to the average confidences of all the students.


Simulation:
	-This simulation of classroom size=10 and num_peer_grades_per_video=3 was run 1,000 times to simulate 10,000 videos being submitted and graded 
	-The outputs were generated, and plotted    