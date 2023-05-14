import { Component, DoCheck, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  inputText = '';
  outputText = '';

  outputObject: any = {};

  processInput(): void {
    const inputArray = this.inputText.split('\n');
    // const outputObject: any = {};
    this.outputObject = {};
    for (let i = 0; i < inputArray.length; i++) {
      const line = inputArray[i].trim();
      if (line !== '') {
        const [keyValue, value] = line.split(':');
        const key = keyValue
          .trim()
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, '-');
        const valueFormatted = value ? value.trim() : '';
        this.outputObject[key] = valueFormatted;
      }
    }
    this.outputText = JSON.stringify(this.outputObject, null, 2);
  }

  copyToClipboard() {
    console.log('copyToClipboard');
    console.log(this.outputObject);

    const outputText = JSON.stringify(this.outputObject);
    const element = document.createElement('textarea');
    element.value = outputText;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  }

  clearInput() {
    this.inputText = '';
  }

  isObjEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

}
