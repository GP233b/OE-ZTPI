import numpy as np

def one_point_crossover(parent1, parent2):
    point = np.random.randint(1, len(parent1))
    child1 = np.concatenate((parent1[:point], parent2[point:]))
    child2 = np.concatenate((parent2[:point], parent1[point:]))
    return child1, child2

def two_point_crossover(parent1, parent2):
    point1, point2 = sorted(np.random.randint(1, len(parent1), 2))
    child1 = np.concatenate((parent1[:point1], parent2[point1:point2], parent1[point2:]))
    child2 = np.concatenate((parent2[:point1], parent1[point1:point2], parent2[point2:]))
    return child1, child2

def uniform_crossover(parent1, parent2):
    mask = np.random.randint(0, 2, len(parent1))
    child1 = np.where(mask, parent1, parent2)
    child2 = np.where(mask, parent2, parent1)
    return child1, child2

def granular_crossover(parent1, parent2, grain_size=2):
    size = len(parent1)
    child1, child2 = parent1.copy(), parent2.copy()
    for i in range(0, size, grain_size):
        if np.random.rand() < 0.5:
            child1[i:i+grain_size], child2[i:i+grain_size] = parent2[i:i+grain_size], parent1[i:i+grain_size]
    return child1, child2
