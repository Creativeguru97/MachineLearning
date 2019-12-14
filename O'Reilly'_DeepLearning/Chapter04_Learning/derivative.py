import numpy as np
import matplotlib.pylab as plt

#A bad exsample
# def numerical_diff0(f, x):
#     h = 10e-50
#     return (f(x+h) - f(x)) / h
#1: 10e-50 is too tiny to handle in computer. It treated as 0.0 by rounding error.
#2: This formura can't find actual inclination of the f(x) at x.
#But between x and x+h.

#Fixed version!
def numerical_diff1(f, x):
    h = 1e-4 #0.0001
    return (f(x+h) - f(x-h)) / (2*h)


# Example function to check our numerical differentiation
def function_1(x):
    return 0.01 * x**2 + 0.1*x

def tangent_line(f, x):
    d = numerical_diff1(f, x)
    print(d)
    y = f(x) - d * x
    return lambda t: d*t + y

x = np.arange(0.0, 20.0, 0.1) #Generate value 0 to 20 every 0.1
y = function_1(x)
plt.xlabel("x")
plt.ylabel("f(x)")

# tf = tangent_line(function_1, 5)
tf = tangent_line(function_1, 10)

y2 = tf(x)



# a0 = numerical_diff1(function_1, 5) #Actually: 0.2
# a1 = numerical_diff1(function_1, 10)#Actually: 0.3

plt.plot(x, y)
plt.plot(x, y2)
plt.show()
