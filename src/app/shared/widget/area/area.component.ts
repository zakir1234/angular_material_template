import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  chartOptions: {} | any;
  highcharts = Highcharts;
  @Input() data: [] | any;

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area',
        inverted: true,
      },
      title: {
        text: 'Sample Data',
        align: 'center',
      },
      accessibility: {
        keyboardNavigation: {
          seriesNavigation: {
            mode: 'serialize',
          },
        },
      },
      tooltip: {
        pointFormat: '&#8226; {series.name}: <b>${point.y} B</b>',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: [
        {
          name: 'Alibaba',
          data: [11.44, 14.89, 21.4, 34.03, 51.52, 70.49, 94.46, 129.44],
        },
        {
          name: 'Meta (Facebook)',
          data: [11.49, 17.08, 26.88, 39.94, 55.01, 69.65, 84.17, 117.93],
        },
      ],
    };

    HC_exporting(Highcharts);
  }
}
