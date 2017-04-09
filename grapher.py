import numpy as np
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt

folderToSave = "output_confidence_graphs"

def plotCalculatedAverages():
	filename = 	"calculated_output_averages.txt"

	with open(filename) as f:
	    lines = f.read().splitlines()

	x = [float(i) for i in lines[2:]]

	mu, sigma = 100, 15

	# the histogram of the data
	n, bins, patches = plt.hist(x, 500)

	# add a 'best fit' line
	y = mlab.normpdf( bins, mu, sigma)
	l = plt.plot(bins, y, 'r--', linewidth=1)


	plt.axis([0, 1, 0, 150])
	plt.grid(True)

	plt.xlabel('average confidence per video')
	plt.ylabel('Number of occurances')	
	plt.title('Calculated Algorithm: Histogram of Average Confidence/video \n vs Number of Occurances (out of 10,000)')	
	plt.savefig(folderToSave+"/calculated_output_averages.png")
	plt.show()


def plotCalculatedDiff():
	filename = 	"calculated_output_diff.txt"

	with open(filename) as f:
	    lines = f.read().splitlines()

	x = [float(i) for i in lines[2:]]

	mu, sigma = 100, 15

	# the histogram of the data
	n, bins, patches = plt.hist(x, 500)

	# add a 'best fit' line
	y = mlab.normpdf( bins, mu, sigma)
	l = plt.plot(bins, y, 'r--', linewidth=1)


	plt.axis([0, 1, 0, 150])
	plt.grid(True)

	plt.xlabel('Difference in (avg_student_conf - avg_video_conf) per video')
	plt.ylabel('Number of occurances')	
	plt.title('Calculated Algorithm: Histogram of Confidence Difference/video \n vs Number of Occurances (out of 10,000)')	
	plt.savefig(folderToSave+"/calculated_output_diff.png")
	plt.show()


def plotRandomAverages():
	filename = 	"random_output_averages.txt"

	with open(filename) as f:
	    lines = f.read().splitlines()

	x = [float(i) for i in lines[2:]]

	mu, sigma = 100, 15

	# the histogram of the data
	n, bins, patches = plt.hist(x, 500)

	# add a 'best fit' line
	y = mlab.normpdf( bins, mu, sigma)
	l = plt.plot(bins, y, 'r--', linewidth=1)


	plt.axis([0, 1, 0, 150])
	plt.grid(True)

	plt.xlabel('average confidence per video')
	plt.ylabel('Number of occurances')	
	plt.title('Random Algorithm: Histogram of Average Confidence/video \n vs Number of Occurances (out of 10,000)')	
	plt.savefig(folderToSave+"/random_output_averages.png")
	plt.show()

def plotRandomDiff():
	filename = 	"random_output_diff.txt"

	with open(filename) as f:
	    lines = f.read().splitlines()

	x = [float(i) for i in lines[2:]]

	mu, sigma = 100, 15

	# the histogram of the data
	n, bins, patches = plt.hist(x, 500)

	# add a 'best fit' line
	y = mlab.normpdf( bins, mu, sigma)
	l = plt.plot(bins, y, 'r--', linewidth=1)


	plt.axis([0, 1, 0, 150])
	plt.grid(True)

	plt.xlabel('Difference in (avg_student_conf - avg_video_conf) per video')
	plt.ylabel('Number of occurances')	
	plt.title('Random Algorithm: Histogram of Confidence Difference/video \n vs Number of Occurances (out of 10,000)')	
	plt.savefig(folderToSave+"/random_output_diff.png")
	plt.show()


plotRandomDiff()
plotRandomAverages()
plotCalculatedDiff()
plotCalculatedAverages()