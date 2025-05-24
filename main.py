import genetic_algorithm
from genetic_algorithm.evaluation import schwefel

if __name__ == "__main__":
    print("brum")

def run_genetic_algorithm(mutation_function, crossover_function, selection_function, mutation_rate, elitism_rate, pop_size, gens, x_min, x_max, dim):
    best_solution = genetic_algorithm(mutation_function, crossover_function, selection_function, mutation_rate, elitism_rate, pop_size, gens, x_min, x_max, dim)
    print("Best solution:", best_solution)
    print("Score:", schwefel(best_solution))