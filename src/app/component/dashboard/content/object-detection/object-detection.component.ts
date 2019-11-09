import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as cocoSSD from '@tensorflow-models/coco-ssd';


@Component({
  selector: 'app-object-detection',
  templateUrl: './object-detection.component.html',
  styleUrls: ['./object-detection.component.scss']
})
export class ObjectDetectionComponent implements OnInit {

  @ViewChild('video', {static: true})
  video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit() {
    this.webcam_start();
    this.predictWithCocoModel();
  }

  webcam_start() {
    const videoElements = this.video.nativeElement;
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {facingMode: 'user', }
      })
      .then(stream => {
        videoElements.srcObject = stream;
        videoElements.onloadedmetadata = () => {
          videoElements.play();
        };
      });
  }

  public async predictWithCocoModel() {
    const model = await cocoSSD.load('lite_mobilenet_v2');
    this.detectFrame(this.video.nativeElement, model);
  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  }
  renderPredictions = predictions => {
    const canvas = this.canvas.nativeElement;

    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Fonts
    const font = '16px sans-serif';
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.drawImage(this.video.nativeElement, 0, 0, 300, 300);
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Bounding box
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      // Label background
      ctx.fillStyle = '#00FFFF';
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });
    predictions.forEach(prediction => {

      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      ctx.fillStyle = '#000000';
      ctx.fillText(prediction.class, x, y);
    });
  }
}
