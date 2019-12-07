import sys, os
sys.path.append(os.pardir) #Import parent directory
import numpy as np
from dataset.mnist import load_mnist
from PIL import Image

#Call the imported mnist dataset.
#At first time it take few minutes to call.
(x_train, t_train), (x_test, t_test) = \
    load_mnist(flatten=True, normalize=False)

print(x_train.shape)#Training images
print(t_train.shape)#Training labels
print(x_test.shape)#Testing images
print(t_test.shape)#testing labels

def img_show(img):
    #Convet the image data of numpy array to PIL data object.
    pil_img = Image.fromarray(np.uint8(img))
    pil_img.show()

img = x_train[0]
label = t_train[0]
print(label) #5

print(img.shape) # (784,)
resizedImg = img.reshape(28, 28)
print(resizedImg.shape)# (28, 28)

# img_show(img)
img_show(resizedImg)
