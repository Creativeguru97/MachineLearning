import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))#It work even if receives a Numpy array


def ReLU(x):
    return np.maximum(0, x) #Take larger value o or x. Just like max(0, x) in JavaScript !!!


def softmax(a):
    c = np.max(a)#Take the max of the a: np.array
    y = np.exp(a - c) / np.sum(np.exp(a - c))#Ninus each element by max of the them
    return y

def mean_squared_error(y, t):
    return 0.5 * np.sum((y - t) ** 2)
