import sys, os
sys.path.append(os.pardir) #Import parent directory to use functions in "common" directory
import numpy as np
import matplotlib.pylab as plt
from common.functions import softmax, cross_entropy_error


# This function from Thier github repository
def numerical_gradient(f, x):
    h = 1e-4 # 0.0001
    grad = np.zeros_like(x)

    it = np.nditer(x, flags=['multi_index'], op_flags=['readwrite'])
    while not it.finished:
        idx = it.multi_index
        tmp_val = x[idx]
        x[idx] = tmp_val + h
        fxh1 = f(x) # f(x+h)

        x[idx] = tmp_val - h
        fxh2 = f(x) # f(x-h)
        grad[idx] = (fxh1 - fxh2) / (2*h)

        x[idx] = tmp_val # 値を元に戻す
        it.iternext()

    return grad


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



class simpleNet:
    def __init__(this):
        this.W = np.random.randn(2, 3)#Generate 2*3 weight values using Gaussian distribution.

    def predict(this, x):#x: inputs
        return np.dot(x, this.W)

    def loss(this, x, t):#x: inputs, t: labels
        z = this.predict(x)
        y = softmax(z)#Imported function from common directory
        loss = cross_entropy_error(y, t)
        return loss



net = simpleNet()
print(net.W)

x = np.array([0.6, 0.9])
p = net.predict(x)
print("Output: " + str(p))

print("index of max in the output: " + str(np.argmax(p)))

t = np.array([0, 0, 1])#labels
print(net.loss(x, t))

f = lambda w: net.loss(x, t)

dw = numerical_gradient(f, net.W)
print(dw)
