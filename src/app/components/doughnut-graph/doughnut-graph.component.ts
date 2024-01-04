import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Graphs } from 'src/app/classes/constants';
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
    onHover: (event, chartElement) => {
      (<HTMLElement>event.native?.target).style.cursor = chartElement[0]
        ? 'pointer'
        : 'default';
    },

    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          color: 'whitesmoke',
          padding: 16,
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

  constructor() {}
  centerText = {
    id: 'centerText',
    beforeDraw: (chart: any) => {},
  };

  updateCenterText() {
    const textSet = this.data.centerText.split('|');
    this.centerText = {
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
        ctx.font = 'bold 20px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${textSet[1]}`, xCoor, yCoor - 16); //amount
        ctx.font = '16px Trebuchet MS';
        ctx.fillStyle = '#888d99';
        ctx.fillText(`${textSet[0]}`, xCoor, yCoor + 12); //title

        ctx.restore();
      },
    };
  }
  ngOnInit(): void {
    this.updateCenterText();
  }

  chartClicked({ active }: { active?: any[] }): void {
    if (
      this.data.graph.name == Graphs.COST_CONTRIBUTION &&
      active &&
      active.length > 0
    ) {
      const user = this.data.chartData.labels?.[active[0].index];
    }
  }

  refresh() {
    this.chart.chart?.update();
    this.updateCenterText();
  }
}
