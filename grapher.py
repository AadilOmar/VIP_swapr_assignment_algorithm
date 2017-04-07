import numpy as np
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt

#change filename based on what data we want to use

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

plt.xlabel('average confidence per video')
plt.ylabel('# occurances')
plt.title('Histogram of average or average diff')
plt.axis([0, 1, 0, 200])
plt.grid(True)

plt.show()