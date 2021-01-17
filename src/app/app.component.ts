import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'my-web-worker-app';
  selectedColour: string;
  result: any;
  colourArr = ['#9999ff', '#00aaff', '#008000', '#b33c00', '#663300', '#cc3399'];
  isBusy = false;
  cpuWorker: any;

  constructor() {
    this.intializeWorker();
  }

  intializeWorker() {
    if (typeof Worker !== 'undefined') {
      if (!this.cpuWorker) {
        this.cpuWorker = new Worker('./worker/cpu.worker',
          { type: "module" });
      }
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your 
      // program still executes correctly.
    }
  }

  cpuIntensiveWork() {
    this.cpuWorker.postMessage('Message from main thread.');
    // listen back from worker
    this.cpuWorker.addEventListener('message', ({ data }) => {
      this.result = data;
    });
  }

  changeColor(color: string) {
    this.selectedColour = color;
  }

}
