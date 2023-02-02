import os
import numpy as np
import copy
import math
from collections import Counter
import random

from PIL import Image


n_output_images = 50

output_folder = "./noisy_images/"
os.makedirs(output_folder, exist_ok=True)

image = np.array(Image.open("image_bis.png").convert("RGBA"))


# r = list(range(n_output_images))
# masks = np.random.choice(r, size=image.shape[:2], p=np.ones(n_output_images) / n_output_images)

# for i in range(n_output_images):
#     image_i = copy.deepcopy(image)
#     image[:, :, -1] = (masks == i).astype(int) * 255
#     img = Image.fromarray(image)
#     img.save(os.path.join(output_folder, "{}.png".format(i)))


nsquares = 500
x, y = image.shape[:2]
size = math.ceil(np.sqrt((x * y) / nsquares))

n_x = math.ceil(x / size)
n_y = math.ceil(y / size)

list_squares = list(range(nsquares))
random.shuffle(list_squares)
n_square_per_day = int(nsquares / n_output_images)
print("n_squares_per_day", n_square_per_day)
total_mask= np.zeros(image.shape[:2])
for image_i in range(n_output_images):
    squares_indexes = list_squares[image_i * n_square_per_day: (image_i + 1) * n_square_per_day]
    mask = np.zeros(image.shape[:2])
    for index in squares_indexes:
        i = math.floor(index / n_y)
        j = index % n_y
        # print(index, i, j)
        mask[size * i: size* ( i+1 ),  size * j: size* ( j+1 )] = 1
    new_img = copy.deepcopy(image)
    new_img[:, :, -1] = mask.astype(int) * 255
    img = Image.fromarray(new_img)
    img.save(os.path.join(output_folder, "{}.png".format(image_i)))
    total_mask += mask.astype(int) * 255

import matplotlib.pyplot as plt
plt.imshow(total_mask)
plt.savefig("test.png")



