import numpy as np
import matplotlib.pylab as plt
from mpl_toolkits.mplot3d import Axes3D

def numerical_diff(f, x):
    h = 1e-4 #0.0001
    return (f(x+h) - f(x-h)) / (2*h)



def function_2(x):#We expect an numpy array as input
    return x[0]**2 + x[1]**2
    #Or np.sum(x**2)

# def function_tmp1(x0):
#     #derivative against x0, and held x1 as a constant
#     return x0*x0 + 4.0 ** 2.0
#
# def function_tmp2(x1):
#     #derivative against x0, and held x1 as a constant
#     return 3.0**2.0 + x1*x1
#
# print(numerical_diff(function_tmp1, 3.0))
# print(numerical_diff(function_tmp2, 4.0))


# Gradient implimentation
def numerical_gradient(f, x):
        h = 1e-4 #0.0001
        grad = np.zeros_like(x) #Generate an array that has same shape as x, but elements are all 0.
        # print(x.size)

        # At first loop, calsulate derivative against x[0]
        #At second, against x[1]
        for i in range(x.size):
            tmp_val = x[i]
            # print("x[i]: " + str(x[i]))

            #Calculate f(x+h)
            x[i] = tmp_val + h
            fxh1 = f(x)
            # print("fxh1: " + str(fxh1))

            #Calculate f(x-h)
            x[i] = tmp_val - h
            fxh2 = f(x)
            # print("fxh2: " + str(fxh2))

            grad[i] = (fxh1 - fxh2) / (2*h)#Calculate actual derivative at here!
            # print("grad[i]: "  +str(grad[i]))
            # print("------------------")
            x[i] = tmp_val #Revert the x value to the original
        return grad

# print(numerical_gradient(function_2, np.array([3.0, 4.0])))#[6. 8.]
# print(numerical_gradient(function_2, np.array([0.0, 2.0])))#[0. 4.]
# print(numerical_gradient(function_2, np.array([3.0, 0.0])))#[6. 0.]



#Gradient descent implimentation !!!!!!!!!!
#f: A function we want to optimize
#init_x: initial value of x
#We can set default value to arguments like below.
def gradient_descent(f, init_x, lr = 0.01, iteration = 100):
    x = init_x

    for i in range(iteration):
        grad = numerical_gradient(f, x)
        x -= lr * grad # x = x - lr * grad

    return x



#----- Testing the gradient_descent function!!!!! -----
x = np.array([-3.0, 4.0])
GD = gradient_descent(function_2, init_x = x, lr = 0.1, iteration = 100)

print(GD)#[-6.11110793e-10  8.14814391e-10]
#It's almost [0, 0]!!! Success!!!



#--- Bad exsample ---
#Too big learning late
x = np.array([-3.0, 4.0])
GD = gradient_descent(function_2, init_x = x, lr = 10.0, iteration = 100)

print(GD)#[-2.58983747e+13 -1.29524862e+12]
#It goes far away from minimum value of the function.


#Too small learning late
x = np.array([-3.0, 4.0])
GD = gradient_descent(function_2, init_x = x, lr = 1e-10, iteration = 100)

print(GD)#[-2.99999994  3.99999992]
#Almost no change
