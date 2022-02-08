<script lang="ts" setup>
import { ref, defineExpose, onMounted } from "vue";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = (window as any).pdfjsWorker;
import pdfData from "../pdf.json";
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const p = pdfjs.getDocument(`https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf`);
  p.promise.then(async (pdf) => {
    const el = canvasRef.value;
    if (null === el) return;
    const canvasContext = el.getContext("2d");
    if (!canvasContext) return;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const { width, height } = viewport;
    el.width = width;
    el.height = height;
    // canvasContext.imageSmoothingEnabled=true
    page.render({
      viewport,
      canvasContext,
    });
  });
});

defineExpose({ canvasRef });
</script>

<template>
  <canvas ref="canvasRef" style="width: 100%;"></canvas>
</template>

<style lang="scss">
// canvas   {
//     image-rendering: pixelated;
// }
</style>
