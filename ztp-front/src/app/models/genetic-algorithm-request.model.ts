export interface GeneticAlgorithmRequest {
  mutation: string;    // Mutation type (e.g., 'basic_mutation')
  crossover: string;   // Crossover type (e.g., 'single_point_crossover')
  selection: string;   // Selection type (e.g., 'tournament_selection')
  mutation_rate: number;    // Mutation rate (e.g., 0.01)
  elitism_rate: number;     // Elitism rate (e.g., 0.1)
  pop_size: number;         // Population size (e.g., 100)
  gens: number;             // Number of generations (e.g., 50)
  x_min: number;            // Minimum value for x (e.g., -500)
  x_max: number;            // Maximum value for x (e.g., 500)
  dim: number;              // Dimension (e.g., 10)
  fitness: string;          // fitness function i.e. schwefel
}