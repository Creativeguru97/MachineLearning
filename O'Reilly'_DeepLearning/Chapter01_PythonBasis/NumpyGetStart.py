import numpy as np

x = np.array([1.0, 2.0, 3.0])
# print(x)

A = np.array([[1, 2], [3, 4]])
# print(A)
A.shape
A.dtype

B = np.array([[3, 0], [0, 6]])
# print(A+B)
# print(A*B)

C = np.array([10, 20])
# print(A*C)

D = np.array([[51, 55], [14, 19], [0, 4]])
# print(D)
# print(D[0])
# print(D[0][1])
#
# for row in D:
#     print(row)

d = D.flatten()#Convert D to 1 dimentional array
# print(d)
#
# print(d[np.array([0, 2, 4])])#Take arbitrary index content

print(d > 15)
print(d[d>15])
