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

## 📁 Folder `plots/`

Folder `plots/` zawiera **wykresy generowane automatycznie przez backend** przy każdym uruchomieniu algorytmu.

### Co zawiera:

- **Trójwymiarowy wykres funkcji celu (fitness surface)** z zaznaczoną najlepszą znalezioną wartością (czerwona kropka).
- Nazwa pliku zawiera nazwę funkcji celu.
- Format pliku: `.png`.

### Zasady działania:

- Folder jest **czyszczony automatycznie przed wygenerowaniem nowego wykresu**, dzięki czemu zawiera **tylko jeden aktualny obraz**.
- Wykres jest tworzony przez backend i zapisywany przy każdym wywołaniu endpointu `/api/run`.

### Przykłady wykresów:

![schwefel_surface](https://github.com/user-attachments/assets/7015997f-6268-4423-b3c0-3159614268d4)

![ackley_surface](https://github.com/user-attachments/assets/28636198-ef4b-4bea-8ea1-88d44ba3ab3d)

![michalewicz_surface](https://github.com/user-attachments/assets/2d13eeda-c289-42b3-beea-14db1a14580b)


# Genetic Algorithm Frontend

![image](https://github.com/user-attachments/assets/4c732075-9572-4a51-a88e-f7916db10dbd)

![image](https://github.com/user-attachments/assets/27295f94-9d5e-4438-bd9f-65065b935cd5)

![image](https://github.com/user-attachments/assets/9cb82bee-c1ce-4c19-9f50-7d8ff5e2cea3)

![image](https://github.com/user-attachments/assets/3ce0e400-1f28-4139-926b-733cbe09f710)

![image](https://github.com/user-attachments/assets/5dc0c962-cdd1-414a-92b4-1e43b809f9a5)

![image](https://github.com/user-attachments/assets/08087c38-5519-4b46-8c63-0407d75b75d9)

