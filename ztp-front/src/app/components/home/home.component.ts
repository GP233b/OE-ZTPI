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

  form: FormGroup;

  mutationOptions = ['single_point_mutation'];
  crossoverOptions = ['one_point_crossover', 'uniform_crossover'];
  selectionOptions = ['tournament_selection', 'roulette_selection'];

  data: GeneticAlgorithmResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
  ) {
    this.form = this.fb.group({
      mutation: ['single_point_mutation', Validators.required],
      crossover: ['one_point_crossover', Validators.required],
      selection: ['tournament_selection', Validators.required],
      mutation_rate: [0.01, [Validators.required, Validators.min(0), Validators.max(1)]],
      elitism_rate: [0.1, [Validators.required, Validators.min(0), Validators.max(1)]],
      pop_size: [100, [Validators.required, Validators.min(1)]],
      gens: [50, [Validators.required, Validators.min(1)]],
      x_min: [-500, Validators.required],
      x_max: [500, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const requestData: GeneticAlgorithmRequest = {
        ...this.form.value,
        dim: 2
      }
      this.homeService.runGeneticAlgorithm(requestData).subscribe({
        next: (response) => {
          this.data = response;

          this.showHeatmapChart(
            this.data.best_individuals.map(row => row[0]),
            this.data.best_individuals.map(row => row[1]),
            this.data.history
          )

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

  showHeatmapChart(x: number[], y: number[], z: number[]): void {
    const { data, xData, yData } = this.prepareHeatmapData(x, y, z);

    this.heatmapOptions = {
      tooltip: {},
      grid: {
        right: 140,
        left: 40,
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'category',
        data: yData,
      },
      visualMap: {
        type: 'piecewise',
        min: Math.floor(Math.min(...z)),
        max: Math.floor(Math.max(...z)),
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
          name: 'Noise Data',
          type: 'heatmap',
          data: data,
          emphasis: {
            itemStyle: {
              borderColor: '#333',
              borderWidth: 1,
            },
          },
          progressive: 1000,
          animation: false,
        },
      ],
    };

    this.showChart = true;
  }

  prepareHeatmapData(x: number[], y: number[], z: number[]) {
    const xData = Array.from(new Set(x)).sort((a, b) => a - b);
    const yData = Array.from(new Set(y)).sort((a, b) => a - b);

    const xIndexMap = new Map<number, number>();
    xData.forEach((val, idx) => xIndexMap.set(val, idx));
    const yIndexMap = new Map<number, number>();
    yData.forEach((val, idx) => yIndexMap.set(val, idx));

    const data = [];
    for (let i = 0; i < x.length; i++) {
      const xi = xIndexMap.get(x[i])!;
      const yi = yIndexMap.get(y[i])!;
      data.push([xi, yi, z[i]]);
    }

    return { data, xData, yData };
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

