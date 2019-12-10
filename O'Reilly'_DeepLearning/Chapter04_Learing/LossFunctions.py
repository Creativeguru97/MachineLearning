import numpy as np

def mean_squared_error(y, t):
    return 0.5 * np.sum((y - t) ** 2)

#We set 2 as an answer for now
t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
print("Mean squared error !!!")
print( mean_squared_error(np.array(y), np.array(t)) )

y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0]
print( mean_squared_error(np.array(y), np.array(t)) )
print("")


def cross_entropy_error(y, t):
    #Adding Arbitrary tiny value to not to generate -infinity
    #-log(0) is going to be -infinity.
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))

t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
print("Cross entropy error !!!")
print( cross_entropy_error(np.array(y), np.array(t)) )

y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0]
print( cross_entropy_error(np.array(y), np.array(t)) )
print("")
