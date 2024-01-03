import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IgraphData } from 'src/app/classes/interfaces';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss'],
})
export class DoughnutGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @Input('data') data!: IgraphData;
  options: ChartOptions<'doughnut'> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      tooltip: {
        backgroundColor: '#3e3d65',
        boxPadding: 8,
        padding: 10,
        borderColor: '#212134',
        borderWidth: 0.2,
        bodyColor: 'rgb(254, 221, 147)',
        callbacks: {
          label: (context) => '₹' + context.formattedValue,
        },
      },
    },
  };

  centerText = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const ctx = chart.ctx;
      const xCoor =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCoor =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 2;
      ctx.save();
      ctx.font = '30px';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`text`, xCoor, yCoor);
      ctx.restore();
    },
  };
  constructor() {}

  ngOnInit(): void {}

  refresh() {
    this.chart.chart?.update();
  }
}
