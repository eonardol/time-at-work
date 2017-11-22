import { Component, OnInit } from '@angular/core';
import {WorkingDay} from '../models/workingday';
import {WorkingDayService} from '../services/workingday.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentDay: string;
  workingDay: WorkingDay
  timeAtWork: string; 

  constructor(private workingDayService: WorkingDayService) {
    this.currentDay = moment().format("YYYYMMDD");
    
    this.workingDay = this.workingDayService.getTimestampsOfDay(this.currentDay);
    
    this.timeAtWork = "--:--";
    setInterval(() => { this.calculateTimeAtWork() }, 499);
  }

  ngOnInit() {
  }

  addTimestamp() {
    var m = moment();

    this.workingDay.timestamps.push({
      "time": m.format("HH:mm"),
      "date": m
    });
    this.calculateTimeAtWork();
    this.upateWorkingDay();
  }

  changeTimestamp($event, t) {
    t.date.set("hour", t.time.substring(0,2));
    t.date.set("minute", t.time.substring(3));
    this.calculateTimeAtWork();
    this.upateWorkingDay();
  }

  deleteTimestamp(index) {
    this.workingDay.timestamps.splice(index, 1);
    this.calculateTimeAtWork();
    this.upateWorkingDay();
  }

  upateWorkingDay() {
    this.workingDayService.addOrUpdate(this.workingDay);
  }

  calculateTimeAtWork() {
    let t1, t2 = null;
    let ms = 0;
    for (let i = 0; i < this.workingDay.timestamps.length; i = i +2 ){
      t1 = this.workingDay.timestamps[i];
      t2 = this.workingDay.timestamps[i+1];
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
