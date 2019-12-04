# import numpy as np

#Element wise with Scalar and Numpy array elements
# t = np.array([1.0, 2.0, 3.0])
# print(1.0 + t)



import numpy as np
import matplotlib.pylab as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))#It work even if receives a Numpy array

x = np.arange(-5.0, 5.0, 0.1)#Generate values -5.0 to 5.0 every 0.1
y = sigmoid(x)
plt.plot(x, y)
plt.ylim(-0.1, 1.1)#Limit displayed y value range
plt.show()
