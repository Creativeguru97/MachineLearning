import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))#It work even if receives a Numpy array

def sigmoid_grad(x):
    return (1.0 - sigmoid(x)) * sigmoid(x)#Derivative of the sigmoid function


def ReLU(x):
    return np.maximum(0, x) #Take larger value o or x. Just like max(0, x) in JavaScript !!!


def softmax(a):
    c = np.max(a)#Take the max of the a: np.array
    y = np.exp(a - c) / np.sum(np.exp(a - c))#Ninus each element by max of the them
    return y

def mean_squared_error(y, t):
    return 0.5 * np.sum((y - t) ** 2)

def cross_entropy_error(y, t):
    #Adding Arbitrary tiny value to not to generate -infinity
    #-log(0) is going to be -infinity.
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))

    # if y.ndim == 1:
    #     t = t.reshape(1, t.size)
    #     y = y.reshape(1, y.size)
    #
    # # 教師データがone-hot-vectorの場合、正解ラベルのインデックスに変換
    # if t.size == y.size:
    #     t = t.argmax(axis=1)
    #
    # batch_size = y.shape[0]
    # return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size
