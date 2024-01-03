import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData } from 'chart.js';
import { getCurrencyString } from 'src/app/classes/commons';
import {
  DoughnutEntries,
  IContributors,
  IgraphData,
  IgraphType,
} from 'src/app/classes/interfaces';
import { gradientColors } from 'src/app/constants/color-constants';
import { DetailsService } from 'src/app/services/details.service';
import { DoughnutGraphComponent } from '../doughnut-graph/doughnut-graph.component';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent {
  @ViewChild('graph') private graph!: DoughnutGraphComponent;

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
    private dialog: MatDialog,
    private details: DetailsService
  ) {
    this.dataSourceMap = this.details.generateDataSourceMap();
    this.dataMatTable = new MatTableDataSource(this.dataSourceMap);
    this.nameAmountMap = this.details.getNameAmountDistribution();
    this.dishAmountMap = this.details.getDishAmountDistribution();

    this.graphData = this.populateGraphData();
  }

  viewSummary() {
    this.details.generateIndividualSummary();
    this.dialog.open(SummaryModalComponent, {
      width: '1140px',
    });
  }

  populateGraphData() {
    const amounts = this.nameAmountMap.map((entry) => entry.value);
    return {
      chartData: {
        labels: this.nameAmountMap.map((entry) => entry.item),
        datasets: [
          {
            data: amounts,
            backgroundColor: gradientColors.slice(0, this.nameAmountMap.length),
            borderColor: '#00000000',
            offset: 20,
          },
        ],
      },
      centerText: 'Total Expense|'+getCurrencyString(amounts.reduce((sum, num) => sum + num, 0)),
    };
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

  slideGraph() {
    this.currentGraph = 1 - this.currentGraph;
    if (this.currentGraph == 0) {
      this.setChartData(this.nameAmountMap,'Total Expense');
    } else {
      this.setChartData(this.dishAmountMap,'Culinary Total');
    }

    this.graph.refresh();
  }
}
