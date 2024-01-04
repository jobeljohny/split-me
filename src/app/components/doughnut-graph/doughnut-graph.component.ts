import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Graphs } from 'src/app/classes/constants';
import {
  generalOption as generalChartOption,
  getNewDraw,
} from 'src/app/classes/graph-essantials';
import { IgraphData } from 'src/app/classes/interfaces';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss'],
})
export class DoughnutGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @Input('data') data!: IgraphData;
  options: ChartOptions<'doughnut'> = generalChartOption;

  constructor() {}
  centerText = {
    id: 'centerText',
    beforeDraw: (chart: any) => {},
  };

  updateCenterText() {
    const textSet = this.data.centerText.split('|');
    this.centerText = {
      id: 'centerText',
      beforeDraw: getNewDraw(textSet),
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
