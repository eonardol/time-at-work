import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  timestampList: Array<any>;
  timeAtWork: String; 

  constructor() {
    this.timestampList = new Array();
    this.timeAtWork = "--:--";
    setInterval(() => { this.calculateTimeAtWork() }, 499);
  }

  ngOnInit() {
  }

  addTimestamp() {
    var m = moment();

    this.timestampList.push({
      "time": m.format("HH:mm"),
      "date": m
    });
    this.calculateTimeAtWork();
  }

  changeTimestamp($event, t) {
    t.date.set("hour", t.time.substring(0,2));
    t.date.set("minute", t.time.substring(3));
    this.calculateTimeAtWork();
  }

  deleteTimestamp(index) {
    this.timestampList.splice(index, 1);
    this.calculateTimeAtWork();
  }

  calculateTimeAtWork() {
    let t1, t2 = null;
    let ms = 0;
    for (let i = 0; i < this.timestampList.length; i = i +2 ){
      t1 = this.timestampList[i];
      t2 = this.timestampList[i+1];
      if (t2) {
        ms += t2.date.diff(t1.date);
      } else {
        ms += moment().diff(t1.date);
      }
    }
    
    if (ms > 0) {
      var d = moment.duration(ms);
      this.timeAtWork = ("0" + Math.floor(d.asHours())).slice(-2) + moment.utc(ms).format(":mm:ss");
    } else if (ms < 0) {
      this.timeAtWork = "??:??";
    } else {
      this.timeAtWork = "--:--";
    }

  }
}
