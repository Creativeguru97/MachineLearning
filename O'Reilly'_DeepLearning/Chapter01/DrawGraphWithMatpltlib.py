import numpy as np
import matplotlib.pyplot as plt

#--- Simple sin funciton graph---
# #Create data
# x = np.arange(0, 6, 0.1)
# #(min, max, step)
# y = np.sin(x)
#
# #Draw graph
# plt.plot(x, y)
# plt.show()

#--- Sin & cos funciton graph---
# #Create data
x = np.arange(0, 6, 0.1)
y1 = np.sin(x)
y2 = np.cos(x)

# #Draw graph
plt.plot(x, y1, label="sin")
plt.plot(x, y2, linestyle="--", label="cos")

#Put labels on axis
plt.xlabel("x")
plt.ylabel("y")

#Put title
plt.title("sin & cos")
plt.legend()#labeling two plot elements
plt.show()
