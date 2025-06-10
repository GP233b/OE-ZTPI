import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { HomeService } from '../../services/home/home.service';
import { GeneticAlgorithmRequest } from '../../models/genetic-algorithm-request.model';
import { CommonModule } from '@angular/common';
import { GeneticAlgorithmResponse } from '../../models/genetic-algorithm-response.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgxEchartsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  lineChartOptions!: EChartsCoreOption;
  updateOptions!: EChartsCoreOption;
  dataT: [number, number][] = [];
  fullData: number[] = [];
  currentIndex = 0;
  timer: any;

  heatmapOptions!: EChartsCoreOption;

  showChart = false;
  isLoading = false;

  form: FormGroup;

  mutationOptions = ['single_point_mutation', 'two_point_mutation', 'boundary_mutation', 'gaussian_mutation'];
  crossoverOptions = ['one_point_crossover', 'two_point_crossover', 'uniform_crossover', 'granular_crossover'];
  selectionOptions = ['tournament_selection', 'roulette_wheel_selection', 'elitist_selection'];
  fitnessOptions = ['schwefel', 'sphere', 'rastrigin', 'hypersphere', 'hyperellipsoid', 'ackley', 'michalewicz']

  data: GeneticAlgorithmResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
  ) {
    this.form = this.fb.group({
      mutation: ['single_point_mutation', Validators.required],
      crossover: ['one_point_crossover', Validators.required],
      selection: ['tournament_selection', Validators.required],
      fitness: ['schwefel', Validators.required],
      mutation_rate: [0.1, [Validators.required, Validators.min(0.1), Validators.max(1)]],
      elitism_rate: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      pop_size: [100, [Validators.required, Validators.min(1)]],
      gens: [50, [Validators.required, Validators.min(1)]],
      x_min: [-500, Validators.required],
      x_max: [500, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const requestData: GeneticAlgorithmRequest = {
        ...this.form.value,
        dim: 2
      }
      this.homeService.runGeneticAlgorithm(requestData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.data = response;

          this.showHeatmapChart(this.data.full_data, this.data.best_solution[0], this.data.best_solution[1])

          this.showLineChartFromEpochs(this.data.history);

        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  findClosestIndex(arr: number[], val: number): number {
    let closestIndex = 0;
    let minDiff = Infinity;
    arr.forEach((item, idx) => {
      const diff = Math.abs(item - val);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    return closestIndex;
  }
  
  showHeatmapChart(rawData: number[][], bestX: number, bestY: number): void {
    const quantized = this.quantizeRawData(rawData as [number,number,number][], 15);
    const { xData, yData, data } = this.generateDataFromInput(quantized);
    const bestXIndex = this.findClosestIndex(xData, bestX);
    const bestYIndex = this.findClosestIndex(yData, bestY);

    this.heatmapOptions = {
      title: {
        text: 'Heatmap',
      },
      tooltip: {},
      grid: {
        left: 40,
        right: 140,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: xData.map((x: number) => x.toFixed(0)),
      },
      yAxis: {
        type: 'category',
        data: yData.map((y: number) => y.toFixed(0)),
      },
      visualMap: {
        type: 'piecewise',
        min: Math.min(...data.map(d => d[2])),
        max: Math.max(...data.map(d => d[2])),
        left: 'right',
        top: 'center',
        calculable: true,
        realtime: false,
        splitNumber: 8,
        inRange: {
          color: [
            '#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
            '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026',
          ],
        },
      },
      series: [
        {
          name: 'Data',
          type: 'heatmap',
          data: data,
          emphasis: {
            itemStyle: {
              borderColor: '#333',
              borderWidth: 0,
            },
          },
          progressive: 1000,
          animation: false,
        },
        {
        name: 'Best Solution',
        type: 'scatter',
        data: [[bestXIndex, bestYIndex]],
        symbolSize: 15,
        itemStyle: {
          color: 'black',
          borderColor: 'yellow',
          borderWidth: 2,
        },
        tooltip: {
          formatter: `Best: (${bestX.toFixed(2)}, ${bestY.toFixed(2)})`
        },
        z: 10,
      }
      ],
    };

    this.showChart = true;
  }

  quantizeRawData(rawData: [number, number, number][], resolution: number = 10) {
    const bucketMap = new Map<string, { sum: number, count: number }>();

    for (const [x, y, z] of rawData) {
      const qx = Math.round(x / resolution) * resolution;
      const qy = Math.round(y / resolution) * resolution;
      const key = `${qx},${qy}`;

      if (!bucketMap.has(key)) {
        bucketMap.set(key, { sum: z, count: 1 });
      } else {
        const entry = bucketMap.get(key)!;
        entry.sum += z;
        entry.count += 1;
      }
    }

    const quantizedData: [number, number, number][] = [];

    for (const [key, { sum, count }] of bucketMap.entries()) {
      const [qxStr, qyStr] = key.split(',');
      const qx = Number(qxStr);
      const qy = Number(qyStr);
      quantizedData.push([qx, qy, sum / count]);
    }

    return quantizedData;
  }


  generateDataFromInput(data: [number, number, number][]) {
    const xVals = data.map(d => d[0]);
    const yVals = data.map(d => d[1]);
    const zVals = data.map(d => d[2]);

    const xData = Array.from(new Set(xVals)).sort((a, b) => a - b);
    const yData = Array.from(new Set(yVals)).sort((a, b) => a - b);

    const xIndexMap = new Map<number, number>();
    xData.forEach((val, idx) => xIndexMap.set(val, idx));

    const yIndexMap = new Map<number, number>();
    yData.forEach((val, idx) => yIndexMap.set(val, idx));

    const transformedData: [number, number, number][] = data.map(([x, y, z]) => {
      const xi = xIndexMap.get(x)!;
      const yi = yIndexMap.get(y)!;
      return [xi, yi, z];
    });

    return { xData, yData, data: transformedData };
  }


  showLineChartFromEpochs(z: number[]) {
    this.dataT = [];
    this.fullData = z;
    this.currentIndex = 0;

    this.lineChartOptions = {
      title: {
        text: 'Results across the epochs',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const p = params[0];
          return 'Epoch: ' + p.data[0] + '<br/>Value: ' + p.data[1];
        },
      },
      xAxis: {
        type: 'value',
        name: 'Epochs',
      },
      yAxis: {
        type: 'value',
        name: 'Values',
      },
      series: [
        {
          name: 'Value of',
          type: 'line',
          data: this.dataT,
          showSymbol: true,
          animation: true,
        },
      ],
    };

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      if (this.currentIndex < this.fullData.length) {
        this.dataT.push([this.currentIndex, this.fullData[this.currentIndex]]);
        this.currentIndex++;

        this.updateOptions = {
          series: [
            {
              data: this.dataT,
            },
          ],
        };
      } else {
        clearInterval(this.timer);
      }
    }, 100);
  }
}

