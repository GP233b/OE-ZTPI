import numpy as np

def schwefel(x):
    return 418.9829 * len(x) - sum(xi * np.sin(np.sqrt(abs(xi))) for xi in x)

def sphere(x):
    return sum(xi**2 for xi in x)

def rastrigin(x):
    A = 10
    return A * len(x) + sum((xi**2 - A * np.cos(2 * np.pi * xi)) for xi in x)

def hypersphere(x):
    return sum(xi**2 for xi in x)

def hyperellipsoid(x):
    return sum(sum(x[j]**2 for j in range(i + 1)) for i in range(len(x)))

def ackley(x, a=20, b=0.2, c=2 * np.pi):
    n = len(x)
    sum_sq = sum(xi**2 for xi in x)
    sum_cos = sum(np.cos(c * xi) for xi in x)
    return -a * np.exp(-b * np.sqrt(sum_sq / n)) - np.exp(sum_cos / n) + a + np.e

def michalewicz(x, m=10):
    return -sum(np.sin(xi) * (np.sin((xi**2 * (i + 1)) / np.pi))**(2 * m) for i, xi in enumerate(x))
