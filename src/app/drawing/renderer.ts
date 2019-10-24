import dateFormat from 'dateformat';
import { DATE_FORMAT } from '../constants/sizes';
import { EventMetadata } from '../model/event-metadata';

export function render(width: number,
                       height: number,
                       model: EventMetadata,
                       id: string = 'file'): HTMLCanvasElement[] {
  const canvas = document.createElement('canvas');

  console.log(dateFormat(model.date, DATE_FORMAT));

  canvas.height = height;
  canvas.width = width;
  canvas.id = id;

  drawBackground(canvas.getContext('2d'), model.backgroundUrl);

  return [canvas];
}

function drawBackground(ctx: CanvasRenderingContext2D, imageUrl: string) {
  const image = new Image();
  image.onload = () => {
    const canvasRatio = ctx.canvas.width / ctx.canvas.height;
    const imageRatio = image.width / image.height;
    if (imageRatio > canvasRatio) {
      const delta = ctx.canvas.width - imageRatio * ctx.canvas.height;
      ctx.drawImage(image, delta / 2, 0, ctx.canvas.height * imageRatio, ctx.canvas.height);
    } else {
      const delta = ctx.canvas.height - ctx.canvas.width / imageRatio;
      ctx.drawImage(image, 0, delta / 2, ctx.canvas.width, ctx.canvas.width / imageRatio);
    }
  };
  image.src = imageUrl;
}

