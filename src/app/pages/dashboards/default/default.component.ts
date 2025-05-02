import { Component, OnInit, ViewChild } from "@angular/core";
import { emailSentBarChart, monthlyEarningChart, radarChart } from "./data";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "../../../core/services/event.service";

import { ConfigService } from "../../../core/services/config.service";

import { ChartType } from "../../chart/apex/apex.model";
import { barChart, lineAreaChart, lineBarChart } from "../../chart/apex/data";
import { DashboardService } from "../../services/dashboard.service";
import { forkJoin } from 'rxjs';

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
  totalEntities:any = {};
  totalIncidents: any = {};
  totalLeaveRequest: any = {};
  totalPaySheet: any = {};
  lineAreaChart;
  lineBarChart;
  threats;
  selectedCategory = 'incident'; 

  @ViewChild("content") content;
  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private eventService: EventService,

    private dashbordService: DashboardService
  ) { }

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
   
    this.lineAreaChart = lineAreaChart;
    this.lineBarChart = lineBarChart;
    this.getLineChart('incident');
    this.getThreadsReport();

    this.barChart = barChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = "year";
    this.configService.getConfig().subscribe((data) => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });

    // this.dashbordService.getTotalEntities().subscribe((data) => {

    //   this.totalEntities = data.data.stixDomainObjectsNumber;
    //   this.totalEntities.icon = "bx bx-data";
    // });
    forkJoin({
      incidents: this.dashbordService.getTotalIncident(),
      leaveRequests: this.dashbordService.getTotalLeaveRequests(),
      paySheets: this.dashbordService.getTotalRelationPaySheet(),
    }).subscribe(({ incidents, leaveRequests, paySheets }) => {
      this.totalIncidents.count = incidents.total;
      this.totalIncidents.icon = 'bx bx-git-branch';

      this.totalLeaveRequest.count = leaveRequests.total;
      this.totalLeaveRequest.icon = 'bx bx-file';

      this.totalPaySheet.count = paySheets.total;
      this.totalPaySheet.icon = 'bx bx-show';

      console.log("hello"+this.totalIncidents.count)

      this.totalEntities.count =
        this.totalIncidents.count +
        this.totalLeaveRequest.count +
        this.totalPaySheet.count;
      this.totalEntities.icon = 'bx bx-data';

      this.getBarChartData();
    });

  }
  getBarChartData() {
    const value = [];
    const names = ['Incidents', 'Leave Requests', 'Pay Sheets']

      barChart.series = [
        {
          name: 'Total Records',
          data: [this.totalIncidents.count,this.totalLeaveRequest.count,this.totalPaySheet.count],
        },
      ];
      barChart.xaxis = {
        categories: names,
      };
   
  }
  getRadarChartData() {
    console.log("helooooooooooooo")
    const data = [];
    const labels: string[] = [];
    const values: number[] = [];
    const colors = [
      "rgb(239, 83, 80)",
      "rgb(236, 64, 122)",
      "rgb(171, 71, 188)",
      "rgb(126, 87, 194)",
      "rgb(92, 107, 192)",
      "rgb(66, 165, 245)",
    ];
  
    this.dashbordService.radarChartDataByCategory().subscribe((res) => {
      console.log("ressssssss",res)

      const categories = res.data;
  
      labels.push(...categories.map((c) => c._id || 'Unknown'));
      values.push(...categories.map((c) => c.count));
  
      this.radarChart.labels = labels;
      this.radarChart.datasets = [{
        label: "Incidents by Category",
        data: values,
        backgroundColor: "rgba(92, 107, 192, 0.3)",
        borderColor: "rgb(92, 107, 192)",
        pointBackgroundColor: "rgb(171, 71, 188)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
      }];
    });
  }
  
  getLineChart(category: string) {
    const labels: string[] = [];
    const values: number[] = [];
  
    this.dashbordService.lineChartData(category).subscribe((res) => {
      const sortedData = res.data.sort((a, b) => a.date.localeCompare(b.date));
  
      sortedData.forEach((r) => {
        labels.push(r.date); // e.g., "2025-05-02T13"
        values.push(r.value);
      });
  
      this.lineAreaChart = {
        labels: labels,
        datasets: [
          {
            label: `${category} activity by hour`,
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(85, 110, 230, 0.2)",
            borderColor: "#556ee6",
            pointBorderColor: "#556ee6",
            pointBackgroundColor: "#fff",
            data: values,
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value: number) {
                  return value.toLocaleString(); // e.g., 1,000 instead of 1000
                },
              },
            },
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 12,
              },
            },
          },
        },
      };
    });
  }
  
  onCategoryChange() {
    this.getLineChart(this.selectedCategory);
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
