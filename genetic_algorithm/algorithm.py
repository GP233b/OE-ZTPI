import numpy as np
import time
from config import *
from genetic_algorithm.evaluation import schwefel
from genetic_algorithm.mutation import *
from genetic_algorithm.crossover import *
from genetic_algorithm.selection import *


# Zaktualizowana funkcja genetyczna z pomiarem czasu i zapisem wykresu co 50 iteracji
def genetic_algorithm(mutation_function, crossover_function, selection_function, mutation_rate, elitism_rate=1, pop_size=POP_SIZE, gens=GENS, x_min=X_MIN, x_max=X_MAX, dim=DIM):
    start_time = time.time()  # Rozpoczęcie pomiaru czasu
    
    mutation_func = globals()[mutation_function]
    crossover_func = globals()[crossover_function]
    selection_func = globals()[selection_function]

    pop = np.random.uniform(x_min, x_max, (pop_size, dim))
    history = []
    
    for iteration in range(gens):
        scores = np.array([schwefel(ind) for ind in pop])
        best_score = np.min(scores)
        history.append(best_score)
        
        best_individual_idx = np.argmin(scores)
        best_individual = pop[best_individual_idx]

        new_pop = [best_individual]
        
        for _ in range(int(pop_size // 2 - elitism_rate)):
            p1, p2 = selection_func(pop, scores), selection_func(pop, scores)
            c1, c2 = crossover_func(p1, p2) if np.random.rand() < CROSS_RATE else (p1, p2)
            new_pop.extend([mutation_func(c1, mutation_rate), mutation_func(c2, mutation_rate)])

        pop = np.array(new_pop)
    
    best_solution = pop[np.argmin([schwefel(ind) for ind in pop])]
    
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Czas wykonania algorytmu: {elapsed_time:.2f} sekundy")

    return best_solution