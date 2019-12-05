import numpy as np

# a = np.array([0.3, 2.9, 4.0])
#
# exp_a = np.exp(a)
# print(exp_a)
# #[1.34985881, 18.17414537, 54.59815003]
#
# sum_exp_a = np.sum(exp_a)
# print(sum_exp_a)
# #74.1221542102: 1.34985881 + 18.17414537 + 54.59815003
#
# y = exp_a / sum_exp_a
# print(y)

#[0.01821127 0.24519181 0.73659691]

# def softmax(a):
#     exp_a = np.exp(a)
#     sum_exp_a = np.sum(exp_a)
#     y = exp_a / sum_exp_a
#     return y


# ----- Over flow problem -----
#We using exponential formula here, so when the inputs are big value like 1000 or 10000
#exp(a) gonna be almost infinitely large.

a = np.array([1010, 1000, 990])

def softmax(a):
    exp_a = np.exp(a)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

print(softmax(a)) #[nan, nan, nan]

#To prevent that, we need tweak the formula a little bit.
#Which is, ninus the max of input value from each input value.

a = np.array([1010, 1000, 990])

def softmax(a):
    c = np.max(a)#Take the max of the a: np.array
    y = np.exp(a - c) / np.sum(np.exp(a - c))#Ninus each element by max of the them
    return y

print(softmax(a))#[9.99954600e-01 4.53978686e-05 2.06106005e-09]
