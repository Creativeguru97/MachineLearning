import numpy as np
from functions import *

class ReLu:
    def __init__(self):
        self.mask = None #An instance variable. True / False

    def forward(self, x):
        self.mask = (x <= 0)
        out = x.copy()
        out[self.mask] = 0 #out gonna be 0, in case of self.mask is true.

        return out

    def backward(self, dout):
        #out gonna be 0, in case of self.mask is true.
        #Otherwise, what??????????????? just will be copied??
        dout[self.mask] = 0
        dx = dout

        return dx

"""x = np.array([
    [1.0, -0.5],
    [-2.0, 3.0]
    ])
print(x)

mask = (x <= 0)
print(mask)"""
