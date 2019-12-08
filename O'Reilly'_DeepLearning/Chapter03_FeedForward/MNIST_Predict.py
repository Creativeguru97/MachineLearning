import sys, os
sys.path.append(os.pardir) #Import parent directory
import numpy as np
import pickle
from dataset.mnist import load_mnist
from common.functions import sigmoid, softmax


def getData():
    #Call the imported mnist dataset.
    #At first time it take few minutes to call.
    (x_train, t_train), (x_test, t_test) = \
        load_mnist(flatten=True, normalize=True, one_hot_label=False)
    return x_test, t_test

def init_network():
    #Import sample weight and bius parameters in pickle file.
    #The parameters is stored as dictionary data.
    with open("sample_weight.pkl", "rb") as f:
        network = pickle.load(f)
    return network

def predict(network, x):
    #Access the parameters and store them in variables.
    W1, W2, W3 = network["W1"], network["W2"], network["W3"]
    b1, b2, b3 = network["b1"], network["b2"], network["b3"]
    a1 = np.dot(x, W1)+b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2)+b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3)+b3
    y = softmax(a3)

    return y


#----- Here we go -----
x, t = getData()#Get tesing images and the labels
network = init_network()
W1, W2, W3 = network["W1"], network["W2"], network["W3"]
# print(x.shape)
# print(x[0].shape)
# print(x[0])
# print(W1.shape)
# print(W2.shape)
# print(W3.shape)


accuracy_count = 0

#----- Feed image one by one -----
for i in range(len(x)):
    y = predict(network, x[i])
    p = np.argmax(y)#Get an index contain biggest value.

    #If the index is identical with label value.
    #This is kind of black box because we're using the sample_weight.
    #I think the output layer has 10 nodes, which means y is 10 length list array.
    #And It compare the index and testing image's label.
    if p == t[i]:
        accuracy_count += 1

print("Percentage: " + str( (float(accuracy_count) / len(x)) * 100) + "% !!!!!")

accuracy_count = 0

#----- Batch processing version -----
batch_size = 100
for i in range(0, len(x), batch_size): #(start, stop, step / inclement)
    x_batch = x[i:i+batch_size]
    y_batch = predict(network, x_batch)
    p = np.argmax(y_batch, axis=1) #Get index of max, per every one element
    #Check every index and label 100 images at once, and count them.
    accuracy_count += np.sum(p == t[i:i+batch_size])

print("Percentage: " + str( (float(accuracy_count) / len(x)) * 100) + "% !!!!!")
