import { Component, ViewContainerRef, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sprite-picker',
  templateUrl: './sprite-picker.component.html',
  styleUrls: ['./sprite-picker.component.scss']
})
export class SpritePickerComponent implements OnInit {
  @Input()
  sprite: string;
  @Input()
  @Output()
  spriteChange = new EventEmitter();

  open = false;
  openPosition = [0, 0];
  spriteRange = new Array(807).fill(0).map((x, i) => {
    const s = (i + 1) + "";
    return s.padStart(3, "0");
  });

  constructor(public viewContainerRef: ViewContainerRef) {
    this.spriteRange.push("800a");
    this.spriteRange.push("800b");
    this.spriteRange.push("800c");
  }

  ngOnInit() {
  }

  openEditor(event) {
    this.openPosition = [event.pageX, event.pageY];
    this.open = true;
  }

  closeEditor() { this.open = false; }
  selectSprite(value) {
    this.sprite = value;
    this.spriteChange.emit(this.sprite);
    this.closeEditor();
  }
}
