# def stepFunction(x):
#     if(x) > 0:
#         return 1
#     else:
#         return 0
# #This way of impliment is looks easy, but we can't use this for NUmpy array.
# #So...we write like
#
# import numpy as np
# x = np.array([-1.0, 1.0, 2.0])
# print(x)
# y = x > 0#Generate array of boolean statement
# print(y)
#
# #Buuut, what we really want is an array of int.
# y = y.astype(np.int)#Convert to arbitrary data type.
# print(y)

# ↓

import numpy as np
import matplotlib.pylab as plt

def stepFunction(x):
    return np.array(x > 0, dtype = np.int)

x = np.arange(-5.0, 5.0, 0.1)#Generate values -5.0 to 5.0 every 0.1
y = stepFunction(x)
plt.plot(x, y)
plt.ylim(-0.1, 1.1)#Limit displayed y value range
plt.show()
