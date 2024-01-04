import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ChartOptions, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Graphs } from 'src/app/classes/constants';
import {
  generalOption as generalChartOption,
  getNewDraw,
} from 'src/app/classes/graph-essantials';
import { IndividualSummary } from 'src/app/classes/individual-summary';
import { IgraphData } from 'src/app/classes/interfaces';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss'],
})
export class DoughnutGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  contextMenuPosition = { x: 0, y: 0 };

  @Input('data') data!: IgraphData;
  options: ChartOptions<'doughnut'> = generalChartOption;
  user: IndividualSummary;
  centerText = {
    id: 'centerText',
    beforeDraw: (chart: any) => {},
  };
  constructor(private details: DetailsService) {
    this.user = this.details.individualSummaries[0];
  }

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

  displayUser(event: ChartEvent) {
    const e = event.native as PointerEvent;
    this.contextMenuPosition.x = e.clientX - (window.innerWidth - 1200) / 2;
    this.contextMenuPosition.y = e.clientY - (window.innerHeight - 600) / 2;

    if (this.menuTrigger != null) {
      this.menuTrigger.openMenu();
    }
  }

  chartClicked({
    active,
    event,
  }: {
    active?: any[];
    event?: ChartEvent;
  }): void {
    if (
      this.data.graph.name == Graphs.COST_CONTRIBUTION &&
      active &&
      active.length > 0
    ) {
      const user = this.data.chartData.labels?.[active[0].index];
      this.user = this.details.individualSummaries.find((summary)=>summary.name == user)!;
      this.displayUser(event!);
    }
  }

  refresh() {
    this.chart.chart?.update();
    this.updateCenterText();
  }
}
