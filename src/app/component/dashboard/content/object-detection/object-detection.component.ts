import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as cocoSSD from '@tensorflow-models/coco-ssd';
import {ModelConfig} from '@tensorflow-models/coco-ssd';


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

  modelLoading: boolean;
  model: any;

  constructor() { }

  ngOnInit() {
    this.modelLoading = true;
    this.webcam_start();
    this.loadCocoModel();
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

  webcam_stop() {
    const videoElements = this.video.nativeElement;
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {facingMode: 'user', }
      })
      .then(stream => {
        stream.stop();
      });
  }

  public async loadCocoModel() {
    const config: ModelConfig = {base: 'lite_mobilenet_v2', modelUrl: ''};
    this.model = await cocoSSD.load(config);
    this.modelLoading = false;
    this.predictWithCocoModel();
  }

  predictWithCocoModel() {
    this.detectFrame(this.video.nativeElement, this.model);
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
    canvas.width = 490;
    canvas.height = 360;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Fonts
    const font = '16px sans-serif';
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.drawImage(this.video.nativeElement, 0, 0, 490, 360);
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
