<script setup lang="ts">
// QR code of this lecture's slides on GitHub Pages, for the cover. The path is
// the code for URL, generated once (error correction Q, so it survives a
// projector), drawn as one stroke per run of dark modules. If the URL changes,
// regenerate it with segno (pip install segno):
//   segno.make(URL, error='q').save(f, kind='svg', border=0)  -> the path's d
const URL = 'https://vmelisch.github.io/sql_praktikum_wise26_27/week-02-subqueries/'
const SIZE = 41
const D = 'M0 0.5h7m2 0h1m5 0h5m2 0h2m5 0h1m2 0h1m1 0h7m-41 1h1m5 0h1m2 0h1m3 0h2m1 0h2m3 0h1m1 0h1m1 0h2m1 0h1m1 0h1m3 0h1m5 0h1m-41 1h1m1 0h3m1 0h1m4 0h2m1 0h1m2 0h3m1 0h1m1 0h1m1 0h1m3 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-41 1h1m1 0h3m1 0h1m1 0h3m1 0h1m2 0h1m4 0h2m5 0h4m1 0h1m1 0h1m1 0h3m1 0h1m-41 1h1m1 0h3m1 0h1m3 0h1m3 0h1m2 0h1m1 0h4m1 0h3m2 0h1m4 0h1m1 0h3m1 0h1m-41 1h1m5 0h1m1 0h2m3 0h1m2 0h2m2 0h1m1 0h4m3 0h2m1 0h1m1 0h1m5 0h1m-41 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-33 1h1m1 0h1m1 0h1m1 0h1m2 0h1m2 0h2m4 0h1m4 0h2m-32 1h2m3 0h1m2 0h3m1 0h1m5 0h2m1 0h3m2 0h1m6 0h2m1 0h1m-37 1h4m3 0h1m5 0h1m1 0h4m2 0h1m1 0h1m2 0h2m2 0h2m1 0h2m2 0h3m-40 1h6m2 0h2m1 0h1m1 0h1m2 0h1m5 0h2m1 0h2m2 0h2m2 0h1m2 0h4m-41 1h3m1 0h2m6 0h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m5 0h4m1 0h1m1 0h1m-37 1h4m1 0h3m4 0h2m2 0h1m1 0h1m4 0h1m3 0h1m3 0h1m1 0h2m3 0h2m-40 1h1m1 0h2m4 0h5m1 0h6m1 0h1m1 0h1m2 0h1m2 0h3m1 0h1m2 0h1m1 0h2m-41 1h2m1 0h1m2 0h2m2 0h1m1 0h2m1 0h3m1 0h2m3 0h1m2 0h1m3 0h1m1 0h3m1 0h2m1 0h1m-41 1h1m3 0h1m3 0h1m1 0h1m2 0h1m2 0h1m1 0h1m1 0h5m1 0h2m4 0h3m2 0h1m1 0h2m-41 1h2m2 0h5m1 0h1m2 0h2m5 0h2m2 0h1m2 0h3m1 0h1m1 0h2m2 0h1m1 0h1m-39 1h3m1 0h1m7 0h3m1 0h2m1 0h4m3 0h1m2 0h2m1 0h3m1 0h1m1 0h2m-38 1h2m1 0h2m3 0h1m3 0h1m1 0h1m2 0h1m2 0h1m1 0h3m2 0h2m3 0h2m1 0h1m1 0h1m-39 1h3m4 0h1m2 0h3m1 0h8m3 0h2m3 0h1m1 0h1m2 0h1m1 0h1m-37 1h1m2 0h1m1 0h1m1 0h1m1 0h1m1 0h4m3 0h1m2 0h4m3 0h2m1 0h1m2 0h1m1 0h1m-38 1h1m1 0h1m4 0h2m1 0h1m4 0h3m1 0h1m1 0h2m2 0h3m1 0h1m2 0h2m4 0h1m-41 1h2m3 0h4m1 0h1m1 0h2m1 0h1m6 0h3m1 0h2m1 0h1m1 0h1m1 0h1m3 0h1m2 0h1m-40 1h1m1 0h1m1 0h1m1 0h3m5 0h1m3 0h1m1 0h2m1 0h1m1 0h3m1 0h4m6 0h1m-41 1h1m2 0h2m1 0h1m1 0h1m1 0h2m1 0h5m1 0h2m2 0h2m3 0h1m3 0h1m1 0h1m2 0h1m2 0h1m-40 1h2m1 0h1m2 0h1m2 0h3m1 0h5m3 0h3m2 0h2m2 0h1m1 0h3m1 0h1m1 0h2m-41 1h1m1 0h2m2 0h3m2 0h1m3 0h2m1 0h1m1 0h1m2 0h9m1 0h2m2 0h4m-41 1h2m1 0h1m7 0h1m1 0h1m1 0h3m3 0h4m1 0h1m1 0h1m1 0h3m1 0h4m1 0h1m-40 1h5m1 0h1m1 0h2m1 0h3m2 0h4m14 0h2m-35 1h2m1 0h2m1 0h1m4 0h2m2 0h3m1 0h1m6 0h3m1 0h5m2 0h1m1 0h1m-41 1h2m1 0h8m3 0h1m3 0h3m1 0h2m1 0h1m1 0h1m3 0h1m1 0h1m2 0h3m1 0h1m-39 1h3m3 0h1m1 0h2m1 0h1m5 0h2m5 0h1m1 0h1m1 0h1m3 0h2m1 0h1m1 0h1m-40 1h3m1 0h1m1 0h2m1 0h1m1 0h1m2 0h1m2 0h3m1 0h1m1 0h2m2 0h1m2 0h7m2 0h1m-32 1h2m6 0h1m1 0h2m2 0h4m1 0h1m1 0h2m1 0h1m3 0h3m1 0h1m-41 1h7m3 0h1m2 0h2m2 0h4m2 0h1m3 0h4m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m-41 1h1m5 0h1m3 0h1m1 0h1m1 0h4m4 0h1m1 0h2m1 0h1m2 0h3m3 0h2m1 0h2m-41 1h1m1 0h3m1 0h1m2 0h3m3 0h1m3 0h1m3 0h1m1 0h1m1 0h1m3 0h6m1 0h1m1 0h1m-41 1h1m1 0h3m1 0h1m2 0h1m2 0h3m4 0h1m3 0h3m2 0h1m2 0h2m2 0h4m-39 1h1m1 0h3m1 0h1m1 0h1m6 0h6m2 0h1m1 0h5m1 0h3m2 0h1m1 0h1m1 0h1m-41 1h1m5 0h1m1 0h2m1 0h3m1 0h3m1 0h5m4 0h1m1 0h1m1 0h1m1 0h1m2 0h1m-38 1h7m6 0h1m1 0h1m3 0h4m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h1m3 0h1'
</script>

<template>
  <a class="qr" :href="URL">
    <svg class="qr-code" :viewBox="`-2 -2 ${SIZE + 4} ${SIZE + 4}`" shape-rendering="crispEdges" aria-label="QR code of the slides">
      <path :d="D" stroke="currentColor" />
    </svg>
    <b class="qr-text">Follow the slides</b>
  </a>
</template>

<style scoped>
/* the label as a caption under the code */
.qr {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  color: var(--db-text-soft);
  text-decoration: none;
  border: none;
}
.qr-text {
  font-size: var(--db-fs-small);
}
/* 2 modules of white around the code (its quiet zone, on top of the slide's white) */
.qr-code {
  width: 140px;
  height: 140px;
  color: var(--db-navy);
  background: #fff;
}
</style>
