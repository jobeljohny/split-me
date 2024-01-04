import { Component, ViewChild } from '@angular/core';
import { Graphs } from 'src/app/classes/constants';
import {
  DoughnutEntries,
  IgraphData,
  IgraphType,
} from 'src/app/classes/interfaces';
import { DetailsService } from 'src/app/services/details.service';
import { DoughnutGraphComponent } from '../doughnut-graph/doughnut-graph.component';
import { getCurrencyString } from 'src/app/classes/commons';
import { gradientColors } from 'src/app/constants/color-constants';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss'],
})
export class GraphContainerComponent {
  @ViewChild('graph') private graph!: DoughnutGraphComponent;
  nameAmountMap: DoughnutEntries[];
  dishAmountMap: DoughnutEntries[];
  //chart data
  graphs: IgraphType[] = [
    { name: Graphs.COST_CONTRIBUTION, title: 'Cost Contribution Breakdown' },
    { name: Graphs.DISH_PROPOTION, title: 'Dish Proportion Breakdown' },
  ];
  currentGraph: number = 0;
  graphData: IgraphData;
  constructor(private details: DetailsService) {
    this.nameAmountMap = this.details.getNameAmountDistribution();
    this.dishAmountMap = this.details.getDishAmountDistribution();
    this.graphData = this.populateGraphData();
  }
  slideGraph() {
    this.currentGraph = 1 - this.currentGraph;
    if (this.currentGraph == 0) {
      this.setChartData(this.nameAmountMap, 'Total Expense');
    } else {
      this.setChartData(this.dishAmountMap, 'Culinary Total');
    }
    this.graphData.graph = this.graphs[this.currentGraph];
    this.graph.refresh();
  }
  setChartData(map: DoughnutEntries[], centerTitle: string) {
    const labels = map.map((entry) => entry.item);
    const amounts = map.map((entry) => entry.value);
    this.graphData.chartData.labels = labels;
    this.graphData.chartData.datasets[0].data = amounts;
    this.graphData.centerText =
      centerTitle +
      '|' +
      getCurrencyString(amounts.reduce((sum, num) => sum + num, 0));
  }
  populateGraphData(): IgraphData {
    const amounts = this.nameAmountMap.map((entry) => entry.value);
    return {
      graph: this.graphs[this.currentGraph],
      chartData: {
        labels: this.nameAmountMap.map((entry) => entry.item),
        datasets: [
          {
            hoverOffset: 70,
            data: amounts,
            backgroundColor: gradientColors.slice(0, this.nameAmountMap.length),
            borderColor: '#00000000',
            offset: 20,
          },
        ],
      },
      centerText:
        'Total Expense|' +
        getCurrencyString(amounts.reduce((sum, num) => sum + num, 0)),
    };
  }
}
