#--- Very first perceptron with Python!!!---

# def AND(x1, x2):
#     w1, w2, theta = 0.5, 0.5, 0.7
#     weightedSum = x1*w1 + x2*w2
#     if weightedSum > theta:
#         return 1
#     elif weightedSum <= theta:
#         return 0
#
# print(AND(0,0)) #Output 0
# print(AND(0,1)) #Output 0
# print(AND(1,0)) #Output 0
# print(AND(1,1)) #Output 1


#--- Element wise with Numpy ---

# import numpy as np
# x = np.array([0, 1]) #inputs
# w = np.array([0.5, 0.5]) #weight
# b = -0.7 #bius
#
# print(np.sum(w*x)+b)


#--- First Perceptron with Numpy ---

import numpy as np
def Perceptron(x1, x2, logicType):
    x = np.array([x1, x2])
    if logicType == "AND":
        w = np.array([0.5, 0.5])
        b = -0.7
    elif logicType == "nAND":
        w = np.array([-0.5, -0.5])
        b = 0.7
    elif logicType == "OR":
        w = np.array([0.5, 0.5])
        b = -0.2
    else:
        print("Invalid logic type. Check it out :)")

    weightedSum = np.sum(w*x)+b
    if weightedSum > 0:
        return 1
    else:
        return 0

# print(Perceptron(0,0, "AND")) #Output 0
# print(Perceptron(0,1, "AND")) #Output 0
# print(Perceptron(1,0, "AND")) #Output 0
# print(Perceptron(1,1, "AND")) #Output 1

# print(Perceptron(0,0, "nAND")) #Output 1
# print(Perceptron(0,1, "nAND")) #Output 1
# print(Perceptron(1,0, "nAND")) #Output 1
# print(Perceptron(1,1, "nAND")) #Output 0

print(Perceptron(0,0, "OR")) #Output 0
print(Perceptron(0,1, "OR")) #Output 1
print(Perceptron(1,0, "OR")) #Output 1
print(Perceptron(1,1, "OR")) #Output 1
