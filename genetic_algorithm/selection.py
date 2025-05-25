import numpy as np

def elitist_selection(pop, scores, num_best=1):
    best_indices = np.argsort(scores)[:num_best]
    return pop[best_indices]

def roulette_wheel_selection(pop, scores):
    fitness = 1 / (scores + 1e-6)  
    probabilities = fitness / np.sum(fitness)
    selected_idx = np.random.choice(len(pop), p=probabilities)
    return pop[selected_idx]

def tournament_selection(pop, scores, k=3):
    selected = np.random.choice(len(pop), k, replace=False)
    best_idx = min(selected, key=lambda i: scores[i])
    return pop[best_idx]
