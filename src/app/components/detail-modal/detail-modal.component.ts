import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  DoughnutEntries,
  IContributors,
  IgraphData,
  IgraphType,
} from 'src/app/classes/interfaces';
import { DetailsService } from 'src/app/services/details.service';
import { ChartData, ChartOptions } from 'chart.js';
import { gradientColors } from 'src/app/constants/color-constants';
import { DoughnutGraphComponent } from '../doughnut-graph/doughnut-graph.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent {
  @ViewChild('graph') private graph!:DoughnutGraphComponent;


  dataSourceMap: IContributors[];
  dataMatTable: any;
  nameAmountMap: DoughnutEntries[];
  dishAmountMap: DoughnutEntries[];

  //chart data
  graphs: IgraphType[] = [
    { index: 0, graph: 'Cost Contribution Breakdown' },
    { index: 0, graph: 'Dish Proportion Breakdown' },
  ];
  currentGraph: number = 0;
  graphData: IgraphData;
  doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    private details: DetailsService
  ) {
    this.dataSourceMap = this.details.generateDataSourceMap();
    this.dataMatTable = new MatTableDataSource(this.dataSourceMap);
    this.nameAmountMap = this.details.getNameAmountDistribution();
    this.dishAmountMap = this.details.getDishAmountDistribution();
    this.graphData = this.populateGraphData();
  }

  viewSummary() {
    //   this.details.generateIndividualSummary();
    //   this.dialog.open(SummaryModalComponent, {
    //     width: '1140px',
    //   });
  }

  populateGraphData() {
    return {
      chartData: {
        labels: this.nameAmountMap.map((entry) => entry.item),
        datasets: [
          {
            data: this.nameAmountMap.map((entry) => entry.value),
            backgroundColor: gradientColors.slice(0, this.nameAmountMap.length),
            borderColor: '#00000000',
            offset: 16,
          },
        ],
      },
      centerText: 'random',
    };
  }

  slideGraph() {
    this.currentGraph = 1 - this.currentGraph;
    if (this.currentGraph == 0) {
      this.graphData.chartData.labels = this.nameAmountMap.map(
        (entry) => entry.item
      );
      this.graphData.chartData.datasets[0].data = this.nameAmountMap.map(
        (entry) => entry.value
      );
    } else {
      this.graphData.chartData.labels = this.dishAmountMap.map(
        (entry) => entry.item
      );
      this.graphData.chartData.datasets[0].data = this.dishAmountMap.map(
        (entry) => entry.value
      );
    }
   this.graph.refresh();
  }
}
