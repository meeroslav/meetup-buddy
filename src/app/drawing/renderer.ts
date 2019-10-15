import dateFormat from 'dateformat';
import { DATE_FORMAT } from '../constants/sizes';
import { EventMetadata } from '../model/event-metadata';

export function render(canvas: HTMLCanvasElement, width: number, height: number, model: EventMetadata): HTMLCanvasElement {
  console.log(dateFormat(model.date, DATE_FORMAT));

  console.log(width, height);

  canvas.height = height;
  canvas.width = width;

  drawBackground(canvas.getContext('2d'), model.backgroundUrl);

  return canvas;
}

function drawBackground(ctx: CanvasRenderingContext2D, imageUrl: string) {
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };
  image.src = imageUrl;
}

