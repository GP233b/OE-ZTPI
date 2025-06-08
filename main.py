from flask import Flask, request, jsonify
from flask_cors import CORS
from genetic_algorithm.algorithm import genetic_algorithm
from genetic_algorithm.evaluation import schwefel
import genetic_algorithm.mutation as mutation
import genetic_algorithm.crossover as crossover
import genetic_algorithm.selection as selection

app = Flask(__name__)
CORS(app)

@app.route('/api/run', methods=['POST'])
def api_run_genetic_algorithm():
    data = request.get_json()

    try:
        mutation_name = data.get('mutation', 'single_point_mutation')
        crossover_name = data.get('crossover', 'single_point_crossover')
        selection_name = data.get('selection', 'tournament_selection')

        mutation_rate = float(data.get('mutation_rate', 0.01))
        elitism_rate = float(data.get('elitism_rate', 1))
        pop_size = int(data.get('pop_size', 100))
        gens = int(data.get('gens', 50))
        x_min = float(data.get('x_min', -500))
        x_max = float(data.get('x_max', 500))
        dim = int(data.get('dim', 10))

        mutation_func = getattr(mutation, mutation_name, None)
        crossover_func = getattr(crossover, crossover_name, None)
        selection_func = getattr(selection, selection_name, None)

        if not all([mutation_func, crossover_func, selection_func]):
            return jsonify({'error': 'Invalid function name(s) provided.'}), 400

        best_solution, history, best_individuals, full_data = genetic_algorithm(
            mutation_func,
            crossover_func,
            selection_func,
            mutation_rate,
            elitism_rate,
            pop_size,
            gens,
            x_min,
            x_max,
            dim
        )

        score = schwefel(best_solution)

        return jsonify({
            'best_solution': best_solution.tolist(),
            'score': score,
            'history': history,
            'best_individuals': best_individuals,
            'full_data': full_data 
        })


    except Exception as e:
        app.logger.exception("Algorithm execution error")
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
