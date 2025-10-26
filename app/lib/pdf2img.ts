// app/lib/pdf2img.ts
export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
  }
  
  // app/lib/pdf2img.ts
  let pdfjsLib: any = null;
  let loadPromise: Promise<any> | null = null;
  
  async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;
  
    loadPromise = import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
  
      pdfjsLib = pdfjs;
      return pdfjs;
    });
  
    return loadPromise;
  }
  
  /**
   * Convert the first page of a PDF file to a PNG image.
   */
  export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
    if (!file) {
      return { imageUrl: "", file: null, error: "No file provided" };
    }
  
    try {
      const lib = await loadPdfJs();
  
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
  
      if (pdf.numPages < 1) {
        return { imageUrl: "", file: null, error: "PDF has no pages" };
      }
  
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 4 });
  
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
  
      if (!context) {
        return { imageUrl: "", file: null, error: "Failed to get canvas context" };
      }
  
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
  
      await page.render({ canvasContext: context, viewport }).promise;
  
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
            return;
          }
  
          const imageFile = new File([blob], file.name.replace(/\.pdf$/i, ".png"), {
            type: "image/png",
          });
  
          resolve({ imageUrl: URL.createObjectURL(blob), file: imageFile });
        }, "image/png", 1.0);
      });
    } catch (err: any) {
      return { imageUrl: "", file: null, error: err.message || String(err) };
    }
  }
  
  export default convertPdfToImage;
  