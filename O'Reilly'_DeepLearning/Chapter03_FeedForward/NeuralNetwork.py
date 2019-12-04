import numpy as np


#Let's impliment actual NN!!!!!
#Values are arbitrary at this moment

#----- Input layer to hidden layer1 -----#
X = np.array([1.0, 0.5])
W1 = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
B1 = np.array([0.1, 0.2, 0.3])

A1 = np.dot(X, W1) + B1

def sigmoid(x):
    return 1 / (1 + np.exp(-x))#It work even if receives a Numpy array

Z1 = sigmoid(A1) #This is hidden layer1 output!!!!
# print(A1)
# print(Z1)

#----- hidden layer1 to hidden layer2 -----#
W2 = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
B2 = np.array([0.1, 0.2])

A2 = np.dot(Z1, W2) + B2
Z2 = sigmoid(A2)
# print(A2)
# print(Z2)

#----- hidden layer2 to hidden layer3 -----#
W3 = np.array([[0.1, 0.3], [0.2, 0.4]])
B3 = np.array([0.1, 0.2])

def identity_function(x):
    return x

A3 = np.dot(Z2, W3) + B3
Y = identity_function(A3) #Y = A3

print(Y)
#----- Done!!! -----#


#-------------------------------------------------------------
#More polished way to build
#-------------------------------------------------------------

def init_network():
    network = {}

    #to be continued...
