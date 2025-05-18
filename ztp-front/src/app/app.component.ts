import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgxEchartsDirective, NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, HeatmapChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart, 
  GridComponent, 
  CanvasRenderer, 
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxEchartsModule],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ztp-front';

}
