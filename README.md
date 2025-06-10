# Genetic Algorithm Backend

Backend projektu implementuje algorytm genetyczny w Pythonie oraz udostępnia go przez API REST oparte na Flasku. Pozwala na konfigurację różnych strategii mutacji, krzyżowania, selekcji oraz funkcji celu (fitness), co umożliwia testowanie i eksperymentowanie na różnych problemach optymalizacyjnych.

## Struktura i funkcjonalności

### 1. Algorytm genetyczny (`genetic_algorithm`)
- Inicjalizacja populacji losowych osobników w określonym zakresie wartości i wymiarze.
- Iteracyjna ocena populacji za pomocą wybranej funkcji fitness.
- Selekcja najlepszych osobników (elitism).
- Tworzenie nowej populacji przez selekcję, krzyżowanie i mutację.
- Zbieranie historii wyników i najlepszych osobników z każdego pokolenia.
- Zwracanie najlepszego rozwiązania oraz pełnych danych z przebiegu algorytmu.

### 2. Funkcje krzyżowania
- **One-point crossover** – krzyżowanie jednokrotne.
- **Two-point crossover** – krzyżowanie dwukrotne.
- **Uniform crossover** – mieszanie genów według losowej maski.
- **Granular crossover** – wymiana genów w "ziarnach" o określonym rozmiarze.

### 3. Funkcje mutacji
- **Boundary mutation** – losowa zmiana genu na wartość minimalną lub maksymalną.
- **Single-point mutation** – zmiana jednego genu na losową wartość z zakresu.
- **Two-point mutation** – zmiana dwóch genów na losowe wartości.
- **Gaussian mutation** – zmiana genu przez dodanie wartości z rozkładu normalnego.

### 4. Metody selekcji
- **Elitist selection** – wybór najlepszych osobników.
- **Roulette wheel selection** – wybór proporcjonalny do wartości fitness.
- **Tournament selection** – wybór najlepszego spośród losowo wybranej grupy.

### 5. Funkcje fitness
Zestaw standardowych benchmarków optymalizacyjnych:
- Schwefel
- Sphere
- Rastrigin
- Hypersphere
- Hyperellipsoid
- Ackley
- Michalewicz

### 6. Konfiguracja
Parametry algorytmu (populacja, pokolenia, współczynnik mutacji, zakres genów, wymiar) znajdują się w module `config.py`.

### 7. REST API
- Endpoint: `/api/run` (metoda POST)
- Przyjmuje parametry konfiguracji algorytmu (np. nazwy funkcji mutacji, krzyżowania, selekcji, fitness oraz wartości współczynników).
- Zwraca w formacie JSON:
  - Najlepsze znalezione rozwiązanie
  - Wartość funkcji fitness dla najlepszego rozwiązania
  - Historię najlepszych wyników z kolejnych pokoleń
  - Listę najlepszych osobników z każdego pokolenia
  - Pełne dane populacji (do analizy)

---

## Uruchomienie

1. Zainstaluj wymagane pakiety (np. Flask, numpy).
2. Skonfiguruj parametry w `config.py`.
3. Uruchom serwer Flask:
   ```bash
   python main.py

![image](https://github.com/user-attachments/assets/36aec483-1268-4974-ac76-20531d214faf)

![image](https://github.com/user-attachments/assets/33e55787-6fac-4b58-ba27-d9455f70e395)

![schwefel_surface_20250610_205429](https://github.com/user-attachments/assets/7015997f-6268-4423-b3c0-3159614268d4)

![ackley_surface](https://github.com/user-attachments/assets/28636198-ef4b-4bea-8ea1-88d44ba3ab3d)

![michalewicz_surface](https://github.com/user-attachments/assets/2d13eeda-c289-42b3-beea-14db1a14580b)
