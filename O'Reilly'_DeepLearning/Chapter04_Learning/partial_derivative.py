import numpy as np
import matplotlib.pylab as plt
from mpl_toolkits.mplot3d import Axes3D

def numerical_diff(f, x):
    h = 1e-4 #0.0001
    return (f(x+h) - f(x-h)) / (2*h)



def function_2(x):#We expect an numpy array as input
    return x[0]**2 + x[1]**2
    #Or np.sum(x**2)

def function_tmp1(x0):
    #derivative against x0, and held x1 as a constant
    return x0*x0 + 4.0 ** 2.0

def function_tmp2(x1):
    #derivative against x0, and held x1 as a constant
    return x0*x0 + 4.0 * 2.0

print(numerical_diff(function_tmp1, 3.0))



# def tangent_line(f, x):
#     d = numerical_diff1(f, x)
#     print(d)
#     y = f(x) - d * x
#     return lambda t: d*t + y
#
# x0 = np.arange(-2, 2.5, 0.25)
# x1 = np.arange(-2, 2.5, 0.25)
# X, Y = np.meshgrid(x0, x1)
#
# X = X.flatten()
# Y = Y.flatten()
#
#
# y = function_1(x)
# plt.xlabel("x")
# plt.ylabel("f(x)")
#
#
#
# # a0 = numerical_diff1(function_1, 5) #Actually: 0.2
# # a1 = numerical_diff1(function_1, 10)#Actually: 0.3
#
# plt.plot(x, y)
# plt.plot(x, y2)
# plt.show()
