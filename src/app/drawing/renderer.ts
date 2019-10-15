import dateFormat from 'dateformat';
import { DATE_FORMAT } from '../constants/sizes';
import { EventMetadata } from '../model/event-metadata';

export function render(canvas: HTMLCanvasElement, width: number, height: number, model: EventMetadata): HTMLCanvasElement {
  console.log(dateFormat(model.date, DATE_FORMAT));

  canvas.height = height;
  canvas.width = width;

  drawBackground(canvas.getContext('2d'), model.backgroundUrl);

  return canvas;
}

function drawBackground(ctx: CanvasRenderingContext2D, imageUrl: string) {
  const image = new Image();
  image.onload = () => {
    const canvasRatio = ctx.canvas.width / ctx.canvas.height;
    const imageRatio = image.width / image.height;
    if (imageRatio > canvasRatio) {
      const delta = imageRatio * ctx.canvas.height - ctx.canvas.width;
      ctx.drawImage(image, delta / -2, 0, ctx.canvas.width + delta / 2, ctx.canvas.height);
    } else {
      const delta = imageRatio * ctx.canvas.width - ctx.canvas.height;
      ctx.drawImage(image, 0, delta / -2, ctx.canvas.width, ctx.canvas.height + delta / 2);
    }
  };
  image.src = imageUrl;
}

