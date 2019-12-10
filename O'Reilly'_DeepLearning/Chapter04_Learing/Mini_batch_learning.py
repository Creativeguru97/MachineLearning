import sys, os
sys.path.append(os.pardir) #Import parent directory
import numpy as np
import pickle
from dataset.mnist import load_mnist

#Call the imported mnist dataset.
#At first time it take few minutes to call.
(x_train, t_train), (x_test, t_test) = \
    load_mnist(normalize=True, one_hot_label=True)

print(x_train.shape) #(60000, 784)
print(t_train.shape)#(60000, 10)
