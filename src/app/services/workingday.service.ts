import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import * as moment from 'moment';

import { DexieService } from './dexie.service';
import {WorkingDay} from '../models/workingday';


@Injectable()
export class WorkingDayService {

  constructor() {
  }

  getTimestampsOfDay(day: string) {
    let wd = new WorkingDay();
    wd.id = day;
    wd.timestamps = new Array();
    if (localStorage.getItem(day)) {
      let array = JSON.parse(localStorage.getItem(day));
      console.log(array)
      let item = null;
      for (let i = 0; i < array.length; i++) { 
        item = {
          date: moment(array[i])
        }
        item.time = item.date.format("HH:mm");
        wd.timestamps.push(item);
      }
    }
    return wd;
  }

  addOrUpdate(wd: WorkingDay) {
    let array = new Array();
    for (let i = 0; i < wd.timestamps.length; i++) {
      array.push(wd.timestamps[i].date.valueOf());
    }
    localStorage.setItem(wd.id, JSON.stringify(array));
  }
}