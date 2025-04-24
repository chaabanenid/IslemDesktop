import { Component, OnInit, ViewChild } from "@angular/core";
import { emailSentBarChart, monthlyEarningChart, radarChart } from "./data";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "../../../core/services/event.service";

import { ConfigService } from "../../../core/services/config.service";

import { ChartType } from "../../chart/apex/apex.model";
import { barChart, lineAreaChart, lineBarChart } from "../../chart/apex/data";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  isVisible: string;
  radarChart: ChartType;

  barChart: ChartType;
  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string;
  totalEntities;
  totalRelationShip;
  totalReports;
  totalObservable;
  lineAreaChart;
  lineBarChart;
  threats;

  @ViewChild("content") content;
  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private eventService: EventService,

    private dashbordService: DashboardService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Charts" },
      { label: "Apex charts", active: true },
    ];

    /**
     * Fethches the chart data
     */

    /**
     * horizontal-vertical layput set
     */
    const attribute = document.body.getAttribute("data-layout");

    this.isVisible = attribute;
    const vertical = document.getElementById("layout-vertical");
    if (vertical != null) {
      vertical.setAttribute("checked", "true");
    }
    if (attribute == "horizontal") {
      const horizontal = document.getElementById("layout-horizontal");
      if (horizontal != null) {
        horizontal.setAttribute("checked", "true");
      }
    }

    /**
     * Fetches the data
     */
    this.fetchData();
  }

  ngAfterViewInit() {
  
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.getRadarChartData();
    this.radarChart = radarChart;
    this.getBarChartData();
    this.lineAreaChart = lineAreaChart;
    this.lineBarChart = lineBarChart;
    this.getLineChart();
    this.getThreadsReport();

    this.barChart = barChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = "year";
    this.configService.getConfig().subscribe((data) => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
    this.dashbordService.getTotalEntities().subscribe((data) => {
      this.totalEntities = data.data.stixDomainObjectsNumber;
      this.totalEntities.icon = "bx bx-data";
    });
    this.dashbordService.getTotalRelationShip().subscribe((data) => {
      this.totalRelationShip = data.data.stixCoreRelationshipsNumber;
      this.totalRelationShip.icon = "bx bx-git-branch";
    });
    this.dashbordService.getTotalReports().subscribe((data) => {
      this.totalReports = data.data.stixDomainObjectsNumber;
      this.totalReports.icon = "bx bx-file";
    });
    this.dashbordService.getTotalObservable().subscribe((data) => {
      console.log("dataaaaaaaaaa", data);
      this.totalObservable = data.data.stixCyberObservablesNumber;
      this.totalObservable.icon = "bx bx-show";
    });
  }
  getBarChartData() {
    const value = [];
    const names = [];
    this.dashbordService.BarChartData().subscribe((res) => {
      res.data.stixCoreRelationshipsDistribution.map((r) => {
        value.push(r.value);
        names.push(r.entity.name);
      });
      barChart.series = [
        {
          data: value,
        },
      ];
      barChart.xaxis = {
        categories: names,
      };
    });
  }
  getRadarChartData() {
    const data = [];
    const colors = [
      "rgb(239, 83, 80)",
      "rgb(236, 64, 122)",
      "rgb(171, 71, 188)",
      "rgb(126, 87, 194)",
      "rgb(92, 107, 192)",
      "rgb(66, 165, 245)",
    ];
    this.dashbordService.radarChartData().subscribe((res) => {
      for (
        let i = 0;
        i < res.data.stixCyberObservablesDistribution.length;
        i++
      ) {
        const val = res.data.stixCyberObservablesDistribution[i];
        const tab = [];
        for (
          let j = 0;
          j < res.data.stixCyberObservablesDistribution.length;
          j++
        ) {
          tab[j] = 0;
        }
        tab[i] = val.value;
        tab[i + 1] = val.value;

        data.push({ data: tab, label: val.label });
      }
      radarChart.datasets = [];
      for (let i = 0; i < data.length; i++) {
        radarChart.datasets.push({
          ...data[i],
          backgroundColor: "rgb(251, 210, 209)",
          borderColor: colors[i],
          pointBackgroundColor: colors[i],
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
        });
      }
    });
  }
  getLineChart() {
    const labels = [];
    const value = [];

    this.dashbordService.lineChartData().subscribe((res) => {
      res.data.stixDomainObjectsTimeSeries.map((r) => {
        value.push(r.value);
        labels.push(r.date.substring(0, 8));
      });
      lineAreaChart.labels = labels;
      lineAreaChart.datasets.push({
        label: "data",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(85, 110, 230, 0.2)",
        borderColor: "#556ee6",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#556ee6",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#556ee6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value,
      });
    });
  }
  getThreadsReport() {
    this.dashbordService.threadReport().subscribe((res) => {
      console.log("threts", res);
      this.threats = res.data.stixDomainObjects?.edges.map((r) => r.node);
      console.log("tttt", this.threats);
    });
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  tranferNumbers(numb: number) {
    let res;
    numb >= 1000000
      ? (res = Math.round((numb / 1000000) * 100) / 100 + "M")
      : numb >= 1000
      ? (res = Math.round((numb / 1000) * 100) / 100 + "K")
      : (res = numb);
    return res;
  }

  weeklyreport() {
    this.isActive = "week";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: "Series B",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: "Series C",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
    ];
  }

  monthlyreport() {
    this.isActive = "month";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: "Series B",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: "Series C",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
    ];
  }

  yearlyreport() {
    this.isActive = "year";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: "Series B",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: "Series C",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
    ];
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast("changeLayout", layout);
  }

  //bar

  // bread crumb items
  breadCrumbItems: Array<{}>;
}
