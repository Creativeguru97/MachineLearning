import sys, os
sys.path.append(os.pardir) #Import parent directory to use functions in "common" directory
import numpy as np
import pickle
from dataset.mnist import load_mnist

#Call the imported mnist dataset.
#At first time it take few minutes to call.
(x_train, t_train), (x_test, t_test) = \
    load_mnist(normalize=True, one_hot_label=True)

print(x_train.shape) #(60000, 784)
print(t_train.shape)#(60000, 10)


train_size = x_train.shape[0]
batch_size = 10
#Choose 10 index number of image from 0 to train_size(In this case, 60000)
# np.random.choice(data size, sample size)
batch_mask = np.random.choice(train_size, batch_size)


#Batch corresponding cross_entropy_error function
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    batch_size = y.shape[0] #1
    return -np.sum(t * np.log(y + 1e-7)) / batch_size

#In case labels are given as index like "2" or "7"...
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    batch_size = y.shape[0] #1

    #Generate an an array contains 0 to batch_size-1
    #if batch_size is, it gonna be like [0, 1, 2, 3, 4]
    #T contains the labels like [2, 7, 0, 9, 4]
    #So...
    #y[np.arrange(batch_size), t] will generate
    #[y[0, 2], y[1, 7], y[2, 0], y[3, 9], y[4, 4]]

    return -np.sum(np.log(y[np.arrange(batch_size), t] + 1e-7)) / batch_size
