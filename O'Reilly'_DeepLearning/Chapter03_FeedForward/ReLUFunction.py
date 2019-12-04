# import numpy as np

#Element wise with Scalar and Numpy array elements
# t = np.array([1.0, 2.0, 3.0])
# print(1.0 + t)



import numpy as np
import matplotlib.pylab as plt

def ReLU(x):
    return np.maximum(0, x) #Take larger value o or x. Just like max(0, x) in JavaScript !!!

x = np.arange(-5.0, 5.0, 0.1)#Generate values -5.0 to 5.0 every 0.1
y = ReLU(x)
plt.plot(x, y)
plt.ylim(-1.1, 5.1)#Limit displayed y value range
plt.show()
