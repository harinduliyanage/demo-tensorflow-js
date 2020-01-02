import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as bodyPix from '@tensorflow-models/body-pix';
import {ModelConfig} from '@tensorflow-models/body-pix/dist/body_pix_model';

@Component({
  selector: 'app-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.scss']
})
export class SegmentationComponent implements OnInit {

  @ViewChild('video', {static: true})
  video: ElementRef<HTMLVideoElement>;
  modelLoading: boolean;
  model: any;

  constructor() {
  }

  ngOnInit() {
    this.modelLoading = true;
    this.webcam_start();
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
          this.loadAndPredict();
        };
      });
  }

  public async loadAndPredict() {
    const config: ModelConfig = {
      architecture: 'ResNet50',
        outputStride: 32,
        quantBytes: 2
    };

    this.model = await bodyPix.load(config);

    const segmentation = await this.model.segmentMultiPerson(this.video.nativeElement, {
      flipHorizontal: true,
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      maxDetections: 10,
      scoreThreshold: 0.2,
      nmsRadius: 20,
      minKeypointScore: 0.3,
      refineSteps: 10
    });
    console.log(segmentation.data);
  }
}
