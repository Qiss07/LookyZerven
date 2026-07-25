/**
 * LSB Steganography: Hide and extract text messages in image pixel data.
 * Uses the least significant bit of each color channel (R, G, B) to store data.
 */

const DELIMITER = "<<END>>";

export function encodeMessage(
  imageData: ImageData,
  message: string
): ImageData {
  const fullMessage = message + DELIMITER;
  const binaryMessage = textToBinary(fullMessage);

  // Each pixel gives us 3 bits (R, G, B channels)
  const maxBits = imageData.data.length * 3 / 4; // only RGB, skip A
  if (binaryMessage.length > maxBits) {
    throw new Error(
      `Message too long. Max ~${Math.floor(maxBits / 8)} characters for this image.`
    );
  }

  const data = new Uint8ClampedArray(imageData.data);
  let bitIndex = 0;

  for (let i = 0; i < data.length && bitIndex < binaryMessage.length; i++) {
    // Skip alpha channel (every 4th byte)
    if (i % 4 === 3) continue;

    const bit = parseInt(binaryMessage[bitIndex], 2);
    data[i] = (data[i] & 0xfe) | bit; // Clear LSB and set new bit
    bitIndex++;
  }

  return new ImageData(data, imageData.width, imageData.height);
}

export function decodeMessage(imageData: ImageData): string {
  const data = imageData.data;
  let binaryString = "";

  for (let i = 0; i < data.length; i++) {
    if (i % 4 === 3) continue; // Skip alpha
    binaryString += (data[i] & 1).toString();
  }

  // Convert binary to text, checking for delimiter
  let result = "";
  for (let i = 0; i < binaryString.length; i += 8) {
    const byte = binaryString.slice(i, i + 8);
    if (byte.length < 8) break;
    const char = String.fromCharCode(parseInt(byte, 2));
    result += char;

    if (result.endsWith(DELIMITER)) {
      return result.slice(0, -DELIMITER.length);
    }
  }

  throw new Error("No hidden message found in this image.");
}

function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}

/**
 * Load an image file into ImageData via canvas.
 */
export function loadImageData(file: File): Promise<{
  imageData: ImageData;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        resolve({ imageData, width: img.width, height: img.height });
      };
      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

/**
 * Convert ImageData back to a downloadable PNG blob.
 */
export function imageDataToBlob(
  imageData: ImageData
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d")!;
    ctx.putImageData(imageData, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create image blob."));
      },
      "image/png"
    );
  });
}
