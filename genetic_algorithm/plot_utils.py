# genetic_algorithm/plot_utils.py

import os
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
from datetime import datetime

def create_plot_folder(folder='plots'):
    if not os.path.exists(folder):
        os.makedirs(folder)
    return folder

def plot_fitness_surface(fitness_func, x_min, x_max, resolution=100,
                         folder='plots', fitness_name='fitness',
                         best_solution=None, best_score=None):
    
    x = np.linspace(x_min, x_max, resolution)
    y = np.linspace(x_min, x_max, resolution)
    X, Y = np.meshgrid(x, y)
    Z = np.zeros_like(X)

    for i in range(resolution):
        for j in range(resolution):
            Z[i, j] = fitness_func([X[i, j], Y[i, j]])

    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.plot_surface(X, Y, Z, cmap='viridis', edgecolor='none')

    if best_solution is not None and best_score is not None:
        ax.scatter(
            best_solution[0],
            best_solution[1],
            best_score,
            color='red',
            s=50,
            label='Best solution'
        )
        ax.legend()

    title = f'Fitness function surface: {fitness_name}'
    if best_score is not None:
        title += f"\nBest score: {best_score:.4f}"

    ax.set_title(title)
    ax.set_xlabel('X1')
    ax.set_ylabel('X2')
    ax.set_zlabel('Fitness')

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    create_plot_folder(folder)
    filename = f"{folder}/{fitness_name}_surface_{timestamp}.png"
    plt.savefig(filename)
    plt.close(fig)

    return filename
