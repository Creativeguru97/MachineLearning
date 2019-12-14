import numpy as np

#A bad exsample
#1: 10e-50 is too tiny to handle in computer. It treated as 0.0 by rounding error.
#2: This formura can't find actual inclination of the f(x) at x.
#But between x and x+h.
def numerical_diff(f, x):
    h = 10e-50
    return (f(x+h) - f(x)) / h

#Fixed version!
def numerical_diff2(f, x):
    h = 1e-4 #0.0001
    return (f(x+h) - f(x-h)) / (2*h)
