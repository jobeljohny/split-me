export class ImageProcessor {
  private canvas!: HTMLCanvasElement;

  constructor() {}

  async loadImage(file: Blob): Promise<void> {
    return new Promise((resolve, reject) => {
      this.canvas = document.createElement('canvas');
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const image = new Image();
        image.onload = () => {
          this.createCanvas(image);
          resolve();
        };

        image.src = event.target.result;
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  private createCanvas(image: HTMLImageElement): void {
    const ctx = this.canvas.getContext('2d');

    if (ctx) {
      const borderThickness = 64;
      this.canvas.width = image.width * 1.6 + borderThickness;
      this.canvas.height = image.height * 1.6 + borderThickness;
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = borderThickness;
      ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.drawImage(
        image,
        borderThickness / 2,
        borderThickness / 2,
        image.width * 1.6,
        image.height * 1.6
      );
      const imgData = ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      //this.blurARGB(imgData.data, 0.5);
      //this.dilate(imgData.data);
      // this.invertColors(imgData.data)
      this.thresholdFilter(imgData.data, 0.6);
      ctx.putImageData(imgData, 0, 0);
    } else {
      console.error('Unable to get 2D context for canvas');
    }
  }

  thresholdFilter(pixels: Uint8ClampedArray, level: number) {
    if (level === undefined) {
      level = 0.5;
    }
    const thresh = Math.floor(level * 255);
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      let val;
      if (gray >= thresh) {
        val = 255;
      } else {
        val = 0;
      }
      pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
    }
  }

  //Gaussian blur - NOISE REMOVAL
  private blurRadius: number = -1;
  private blurKernelSize: number = 0;
  private blurKernel: Int32Array = new Int32Array(0);
  private blurMult = new Array(this.blurKernelSize);

  private buildBlurKernel(r: number) {
    let radius = (r * 3.5) | 0;
    radius = radius < 1 ? 1 : radius < 248 ? radius : 248;

    if (this.blurRadius !== radius) {
      this.blurRadius = radius;
      this.blurKernelSize = (1 + this.blurRadius) << 1;
      this.blurKernel = new Int32Array(this.blurKernelSize);
      this.blurMult = new Array(this.blurKernelSize);
      for (let l = 0; l < this.blurKernelSize; l++) {
        this.blurMult[l] = new Int32Array(256);
      }

      let bk, bki;
      for (let i = 1, radiusi = radius - 1; i < radius; i++) {
        bki = radiusi * radiusi;
        this.blurKernel[radius + i] = this.blurKernel[radiusi] = bki;

        const bm = this.blurMult[radius + i];
        const bmi = this.blurMult[radiusi--];

        for (let j = 0; j < 256; j++) {
          bm[j] = bmi[j] = bki * j;
        }
      }

      bk = this.blurKernel[radius] = radius * radius;
      const bm = this.blurMult[radius];
      for (let k = 0; k < 256; k++) {
        bm[k] = bk * k;
      }
    }
  }

  blurARGB(pixels: Uint8ClampedArray, radius: number) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const numPackedPixels = width * height;
    const argb = new Int32Array(numPackedPixels);
    for (let j = 0; j < numPackedPixels; j++) {
      argb[j] = this.getARGB(pixels, j);
    }
    let sum, cr, cg, cb, ca;
    let read, ri, ym, ymi, bk0;
    const a2 = new Int32Array(numPackedPixels);
    const r2 = new Int32Array(numPackedPixels);
    const g2 = new Int32Array(numPackedPixels);
    const b2 = new Int32Array(numPackedPixels);
    let yi = 0;
    this.buildBlurKernel(radius);
    let x, y, i;
    let bm;
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        cb = cg = cr = ca = sum = 0;
        read = x - this.blurRadius;
        if (read < 0) {
          bk0 = -read;
          read = 0;
        } else {
          if (read >= width) {
            break;
          }
          bk0 = 0;
        }
        for (i = bk0; i < this.blurKernelSize; i++) {
          if (read >= width) {
            break;
          }
          const c = argb[read + yi];
          bm = this.blurMult[i];
          ca += bm[(c & -16777216) >>> 24];
          cr += bm[(c & 16711680) >> 16];
          cg += bm[(c & 65280) >> 8];
          cb += bm[c & 255];
          sum += this.blurKernel[i];
          read++;
        }
        ri = yi + x;
        a2[ri] = ca / sum;
        r2[ri] = cr / sum;
        g2[ri] = cg / sum;
        b2[ri] = cb / sum;
      }
      yi += width;
    }
    yi = 0;
    ym = -this.blurRadius;
    ymi = ym * width;
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        cb = cg = cr = ca = sum = 0;
        if (ym < 0) {
          bk0 = ri = -ym;
          read = x;
        } else {
          if (ym >= height) {
            break;
          }
          bk0 = 0;
          ri = ym;
          read = x + ymi;
        }
        for (i = bk0; i < this.blurKernelSize; i++) {
          if (ri >= height) {
            break;
          }
          bm = this.blurMult[i];
          ca += bm[a2[read]];
          cr += bm[r2[read]];
          cg += bm[g2[read]];
          cb += bm[b2[read]];
          sum += this.blurKernel[i];
          ri++;
          read += width;
        }
        argb[x + yi] =
          ((ca / sum) << 24) |
          ((cr / sum) << 16) |
          ((cg / sum) << 8) |
          (cb / sum);
      }
      yi += width;
      ymi += width;
      ym++;
    }
    this.setPixels(pixels, argb);
  }

  //INVERSION
  invertColors(pixels: Uint8ClampedArray) {
    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i] ^ 255; // Invert Red
      pixels[i + 1] = pixels[i + 1] ^ 255; // Invert Green
      pixels[i + 2] = pixels[i + 2] ^ 255; // Invert Blue
    }
  }

  //DILATION
  dilate(pixels: Uint8ClampedArray) {
    let currIdx = 0;
    const maxIdx = pixels.length ? pixels.length / 4 : 0;
    const out = new Int32Array(maxIdx);
    let currRowIdx, maxRowIdx, colOrig, colOut, currLum;

    let idxRight, idxLeft, idxUp, idxDown;
    let colRight, colLeft, colUp, colDown;
    let lumRight, lumLeft, lumUp, lumDown;

    while (currIdx < maxIdx) {
      currRowIdx = currIdx;
      maxRowIdx = currIdx + this.canvas.width;
      while (currIdx < maxRowIdx) {
        colOrig = colOut = this.getARGB(pixels, currIdx);
        idxLeft = currIdx - 1;
        idxRight = currIdx + 1;
        idxUp = currIdx - this.canvas.width;
        idxDown = currIdx + this.canvas.width;

        if (idxLeft < currRowIdx) {
          idxLeft = currIdx;
        }
        if (idxRight >= maxRowIdx) {
          idxRight = currIdx;
        }
        if (idxUp < 0) {
          idxUp = 0;
        }
        if (idxDown >= maxIdx) {
          idxDown = currIdx;
        }
        colUp = this.getARGB(pixels, idxUp);
        colLeft = this.getARGB(pixels, idxLeft);
        colDown = this.getARGB(pixels, idxDown);
        colRight = this.getARGB(pixels, idxRight);

        //compute luminance
        currLum =
          77 * ((colOrig >> 16) & 0xff) +
          151 * ((colOrig >> 8) & 0xff) +
          28 * (colOrig & 0xff);
        lumLeft =
          77 * ((colLeft >> 16) & 0xff) +
          151 * ((colLeft >> 8) & 0xff) +
          28 * (colLeft & 0xff);
        lumRight =
          77 * ((colRight >> 16) & 0xff) +
          151 * ((colRight >> 8) & 0xff) +
          28 * (colRight & 0xff);
        lumUp =
          77 * ((colUp >> 16) & 0xff) +
          151 * ((colUp >> 8) & 0xff) +
          28 * (colUp & 0xff);
        lumDown =
          77 * ((colDown >> 16) & 0xff) +
          151 * ((colDown >> 8) & 0xff) +
          28 * (colDown & 0xff);

        if (lumLeft > currLum) {
          colOut = colLeft;
          currLum = lumLeft;
        }
        if (lumRight > currLum) {
          colOut = colRight;
          currLum = lumRight;
        }
        if (lumUp > currLum) {
          colOut = colUp;
          currLum = lumUp;
        }
        if (lumDown > currLum) {
          colOut = colDown;
          currLum = lumDown;
        }
        out[currIdx++] = colOut;
      }
    }
    this.setPixels(pixels, out);
  }

  viewImage(): void {
    if (this.canvas) {
      this.canvas.toBlob((blob) =>
        window.open(URL.createObjectURL(blob!), '_blank')
      );
    } else {
      console.error('Canvas not created. Image not loaded.');
    }
  }

  getImage() {
    return this.canvas;
  }

  //HELPER FUNCTIONS

  private getARGB(data: Uint8ClampedArray, i: number) {
    const offset = i * 4;
    return (
      ((data[offset + 3] << 24) & 0xff000000) |
      ((data[offset] << 16) & 0x00ff0000) |
      ((data[offset + 1] << 8) & 0x0000ff00) |
      (data[offset + 2] & 0x000000ff)
    );
  }

  private setPixels(pixels: Uint8ClampedArray, data: Int32Array) {
    let offset = 0;
    for (let i = 0, al = pixels.length; i < al; i++) {
      offset = i * 4;
      pixels[offset + 0] = (data[i] & 0x00ff0000) >>> 16;
      pixels[offset + 1] = (data[i] & 0x0000ff00) >>> 8;
      pixels[offset + 2] = data[i] & 0x000000ff;
      pixels[offset + 3] = (data[i] & 0xff000000) >>> 24;
    }
  }
}
