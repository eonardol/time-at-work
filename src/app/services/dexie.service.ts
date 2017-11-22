import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('TIMEATWORK');
    this.version(1).stores({
      workingdays: '++id',
    });
  }
}