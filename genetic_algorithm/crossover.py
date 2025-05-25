import numpy as np

def one_point_crossover(parent1, parent2):
    parent1 = np.array(parent1, dtype=float)
    parent2 = np.array(parent2, dtype=float)
    point = np.random.randint(1, len(parent1))
    child1 = np.concatenate((parent1[:point], parent2[point:]))
    child2 = np.concatenate((parent2[:point], parent1[point:]))
    return child1, child2

def two_point_crossover(parent1, parent2):
    parent1 = np.array(parent1, dtype=float)
    parent2 = np.array(parent2, dtype=float)
    point1, point2 = sorted(np.random.randint(1, len(parent1), 2))
    child1 = np.concatenate((parent1[:point1], parent2[point1:point2], parent1[point2:]))
    child2 = np.concatenate((parent2[:point1], parent1[point1:point2], parent2[point2:]))
    return child1, child2

def uniform_crossover(parent1, parent2):
    parent1 = np.array(parent1, dtype=float)
    parent2 = np.array(parent2, dtype=float)
    mask = np.random.randint(0, 2, len(parent1)).astype(bool)
    child1 = np.where(mask, parent1, parent2)
    child2 = np.where(mask, parent2, parent1)
    return child1, child2

def granular_crossover(parent1, parent2, grain_size=2):
    parent1 = np.array(parent1, dtype=float)
    parent2 = np.array(parent2, dtype=float)
    size = len(parent1)
    child1, child2 = parent1.copy(), parent2.copy()
    for i in range(0, size, grain_size):
        if np.random.rand() < 0.5:
            end = min(i + grain_size, size)
            child1[i:end], child2[i:end] = parent2[i:end], parent1[i:end]
    return child1, child2
