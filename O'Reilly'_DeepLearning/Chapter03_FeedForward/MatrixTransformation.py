import numpy as np

#---N dimention array practice ---
# A = np.array([1.0, 2.0, 3.0, 4.0])
# print(A)
#
# print(np.ndim(A))#Take number of dimention the array contain.
# print(A.shape)#Check the matrix shape
# print(A.shape[0])
# print("----------------")
#
# B = np.array([[1, 2], [3, 4], [5, 6]])#theee by two matricies
# print(B)
# print(np.ndim(B))#Take number of dimention the array contain.
# print(B.shape)#Check the matrix(the array) shape


#---Matrix transformation practice !---
#------Same shape matricies element wise---
# A = np.array([
#     [1, 2],
#     [3, 4]
#     ])
# print(A.shape)
#
# B = np.array([
#     [5, 6],
#     [7, 8]
#     ])
# print(B.shape)
#
# print(np.dot(A, B))#What a simple coding....
# print("----------------")#What a simple coding....


#------Different shape matricies element wise---
# A = np.array([
#     [1, 2, 3],
#     [4, 5, 6]
#     ])
# print(A.shape)
# print(A.shape[0])
# print(A.shape[1])
#
# B = np.array([
#     [1, 2],
#     [3, 4],
#     [5, 6]
#     ])
# print(B.shape)
#
# print(np.dot(A, B))#What a simple coding....
# print("----------------")#What a simple coding....


#------Be careful the shape of two matrix---
# A = np.array([
#     [1, 2, 3],
#     [4, 5, 6]
#     ])
# print(A.shape)
#
# B = np.array([
#     [1, 2],
#     [3, 4]
#     ])
# print(B.shape)
#
# print(np.dot(A, B))#What a simple coding....
# print("----------------")#What a simple coding....


#---Matrix and 1d array
A = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
    ])
print(A.shape)

B = np.array(
    [7, 8]
    )
print(B.shape)

print(np.dot(A, B))#What a simple coding....
print("----------------")#What a simple coding....
