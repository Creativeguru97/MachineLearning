def stepFunction(x):
    if(x) > 0:
        return 1
    else:
        return 0
#This way of impliment is looks easy, but we can't use this for NUmpy array.
#So...we write like

import numpy as np
x = np.array([-1.0, 1.0, 2.0])
print(x)
y = x > 0
print(y)#Generate array of boolean statement
