import sys, os
sys.path.append(os.pardir) #Import parent directory to use functions in "common" directory
import numpy as np
from dataset.mnist import load_mnist
from common.functions import sigmoid, softmax, cross_entropy_error

(x_train, t_train), (x_test, t_test) = \
    load_mnist(flatten=True, normalize=True, one_hot_label=True)


train_loss_list = []

#Hyper parameters
iteration = 10000
train_size = x_train.shape[0]#Number of training image
batch_size = 100
learning_rate = 0.01










#------Required functions and class below----------------


# This function from Thier github repository
def numerical_gradient(f, x):
    h = 1e-4 # 0.0001
    grad = np.zeros_like(x)

    # np.nditer: Efficient multi-dimensional iterator object to iterate over arrays.
    # Parameters:
        # op: The array(s) to iterate over. This time we use x for that.

        # flags: Flags to control the behavior of the iterator.
            # multi_index causes a multi-index, or a tuple of indices
                                    # with one per iteration dimension, to be tracked.

        # op_flags: This is a list of flags for each operand.
                        # At minimum, one of readonly, readwrite, or writeonly must be specified.
    it = np.nditer(x, flags=['multi_index'], op_flags=['readwrite'])
    while not it.finished:
        idx = it.multi_index
        tmp_val = x[idx]
        x[idx] = tmp_val + h
        fxh1 = f(x) # f(x+h)

        x[idx] = tmp_val - h
        fxh2 = f(x) # f(x-h)
        grad[idx] = (fxh1 - fxh2) / (2*h)

        x[idx] = tmp_val #Revert the x value to the original
        it.iternext()#What is this? I know what it means but can't find this reference.

    return grad


class TwoLayerNet:
    def __init__(this, input_size, hidden_size, output_size, weight_init_std = 0.01):
        this.parameters = {}
        this.parameters["W1"] = weight_init_std * np.random.randn(input_size, hidden_size)
            #Generate input_size * hidden_size random weight values using Gaussian distribution.
        this.parameters["b1"] = np.zeros(hidden_size)

        this.parameters["W2"] = weight_init_std * np.random.randn(hidden_size, output_size)
            #Generate hidden_size * output_size random weight values using Gaussian distribution.
        this.parameters["b2"] = np.zeros(output_size)


    def predict(this, x):#x: inputs
        W1, W2 = this.parameters["W1"], this.parameters["W2"]
        b1, b2 = this.parameters["b1"], this.parameters["b2"]

        a1 = np.dot(x, W1) + b1
        z1 = sigmoid(a1)
        a2 = np.dot(z1, W2) + b2
        y = softmax(a2)

        return y


    def loss(this, x, t):#x: inputs, t: labels
        y = this.predict(x)
        return cross_entropy_error(y, t)

    def accuracy(this, x, t):
        y = this.predict(x)
        y = np.argmax(y, axis = 1)
        t = np.argmax(t, axis = 1)

                                    #Number of images
        accuracy = np.sum(y == 1) / float(x.shape[0])
        return accuracy

    def numerical_gradient(this, x, t):
        loss_W = lambda W: this.loss(x, t)

        grads = {}
        grads["W1"] = numerical_gradient(loss_W, this.parameters["W1"])
        grads["b1"] = numerical_gradient(loss_W, this.parameters["b1"])#Really? Caldulate gradient of bias too?
        grads["W2"] = numerical_gradient(loss_W, this.parameters["W2"])
        grads["b2"] = numerical_gradient(loss_W, this.parameters["b2"])#Really? Caldulate gradient of bias too?
        return grads
