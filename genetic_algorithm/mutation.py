import numpy as np
from config import X_MIN, X_MAX

def boundary_mutation(individual, rate):
    individual = np.array(individual, copy=True)
    if np.random.rand() < rate:
        idx = np.random.randint(len(individual))
        individual[idx] = X_MIN if np.random.rand() < 0.5 else X_MAX
    return individual

def single_point_mutation(individual, rate):
    individual = np.array(individual, copy=True)
    if np.random.rand() < rate:
        idx = np.random.randint(len(individual))
        individual[idx] = np.random.uniform(X_MIN, X_MAX)
    return individual

def two_point_mutation(individual, rate):
    individual = np.array(individual, copy=True)
    if np.random.rand() < rate:
        idx1, idx2 = np.random.choice(len(individual), 2, replace=False)
        individual[idx1], individual[idx2] = individual[idx2], individual[idx1]
    return individual

def gaussian_mutation(individual, rate, sigma=20):
    individual = np.array(individual, copy=True)
    if np.random.rand() < rate:
        idx = np.random.randint(len(individual))
        individual[idx] += np.random.normal(0, sigma)
        individual[idx] = np.clip(individual[idx], X_MIN, X_MAX)
    return individual
