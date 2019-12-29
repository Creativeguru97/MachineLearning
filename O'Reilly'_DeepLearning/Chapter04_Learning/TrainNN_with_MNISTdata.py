import sys, os
sys.path.append(os.pardir) #Import parent directory to use functions in "common" directory
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from TwoLayerNetModule import TwoLayerNet

(x_train, t_train), (x_test, t_test) = \
    load_mnist(flatten=True, normalize=True, one_hot_label=True)


#Hyper parameters!
iteration = 10000
train_size = x_train.shape[0]#Number of training image: 60000
batch_size = 100
learning_rate = 0.01

network = TwoLayerNet(input_size = 784, hidden_size = 50, output_size = 10)
#At the same time, it generate W1, b1, W2, b2 matrices based on the three numbers above


train_loss_list = []

#To make the graph on matplotlib later
train_accuracy_list = []
test_accuracy_list = []

#On SGD, we randomly pick out 100 images from 60000 images.
#So, we need to iterate that 60000 / 100 = 600 times!
#The reason we're using max function at here is for in case we don't use mini-batching.
iteration_per_epoch = max(train_size / batch_size, 1)#600


for i in range(iteration):#10000 times
    #Obtain mini batch

    #Choose 100 index number of image from 0 to train_size(In this case, 60000)
    # np.random.choice(data size, sample size)
    batch_mask = np.random.choice(train_size, batch_size)
    #batch_mask contains all the 100 index numbers

    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    #Calculate gradient
    gradient = network.numerical_gradient(x_batch, t_batch)

    #Renew the weight parameters
    for key in ("W1", "b1", "W2", "b2"):
        #This is the numpy power! Very short writing to renew all the weight parameters.
        network.parameters[key] = network.parameters[key] - learning_rate * gradient[key]
        # print("training on going...")

    # Log of the learning pass
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)


    if i % iteration_per_epoch == 0:
        print(" ")
        print("--- " + str(i) + "epoch ---")
        print(" ")

    #Testing each time
    train_accuracy = network.accuracy(x_train, t_train)
    test_accuracy = network.accuracy(x_test, t_test)
    train_accuracy_list.append(train_accuracy)
    test_accuracy_list.append(test_accuracy)
    print("Train accuracy: " + str(train_accuracy))
    print("Test accuracy: " + str(test_accuracy))
    print(" ")
