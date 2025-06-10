import numpy as np
import time
from config import *

def genetic_algorithm(mutation_func, crossover_func, selection_func, fitness_func,
                      mutation_rate, elitism_rate=1, pop_size=POP_SIZE, gens=GENS,
                      x_min=X_MIN, x_max=X_MAX, dim=DIM):

    start_time = time.time()

    pop = np.random.uniform(x_min, x_max, (pop_size, dim))
    history = []
    best_individuals_per_epoch = []
    full_data = [] 

    for iteration in range(gens):
        scores = np.array([fitness_func(ind) for ind in pop])

        for ind, score in zip(pop, scores):
            full_data.append(ind.tolist() + [float(score)])

        elite_n = int(elitism_rate)
        elite_indices = scores.argsort()[:elite_n]
        elites = pop[elite_indices]

        best_score = scores[elite_indices[0]]
        best_individual = elites[0]
        history.append(best_score)
        best_individuals_per_epoch.append(best_individual.tolist())

        new_pop = list(elites)

        while len(new_pop) < pop_size:
            p1, p2 = selection_func(pop, scores), selection_func(pop, scores)
            c1, c2 = crossover_func(p1, p2) if np.random.rand() < CROSS_RATE else (p1.copy(), p2.copy())
            m1 = mutation_func(c1, mutation_rate)
            m2 = mutation_func(c2, mutation_rate)
            new_pop.extend([m1, m2])

        pop = np.array(new_pop[:pop_size])
        pop = np.clip(pop, x_min, x_max)

    final_scores = np.array([fitness_func(ind) for ind in pop])
    best_solution = pop[np.argmin(final_scores)]

    elapsed_time = time.time() - start_time
    print(f"Czas wykonania algorytmu: {elapsed_time:.2f} sekundy")

    return best_solution, history, best_individuals_per_epoch, full_data
