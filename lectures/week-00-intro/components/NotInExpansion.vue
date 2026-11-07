<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  clicks?: number
}>(), {
  clicks: 0
})

const step = computed(() => Number(props.clicks) || 0)
</script>

<template>
  <div class="not-in-code font-mono my-1 pl-4">
    <div class="code-line">
      <span class="num">200</span> <span class="kw">NOT IN</span> <span class="col">revenue</span> <span class="arrow">&rarr;</span> <span class="cst">NULL</span> <span class="paren">(</span><span class="cst">UNKNOWN</span><span class="paren">)</span>
    </div>
    <div v-show="step >= 2" class="code-line">
      <span class="op">=</span> <span class="num">200</span> <span class="op">&lt;&gt;</span> <span class="num">1000</span> <span class="kw">AND</span> <span class="num">200</span> <span class="op">&lt;&gt;</span> <span class="cst">NULL</span> <span class="kw">AND</span> <span class="num">200</span> <span class="op">&lt;&gt;</span> <span class="num">500</span>
    </div>
    <div v-show="step >= 3" class="code-line">
      <span class="op">=</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="cst">TRUE</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">AND</span>&nbsp;&nbsp;&nbsp;<span class="cst">UNKNOWN</span>&nbsp;&nbsp;&nbsp;<span class="kw">AND</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="cst">TRUE</span>
    </div>
    <div v-show="step >= 4" class="code-line">
      <span class="op">=</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="cst">UNKNOWN</span> <span class="paren">(</span><span class="cst">NULL</span><span class="paren">)</span>
    </div>
  </div>
</template>

<style scoped>
.not-in-code {
  font-family: var(--slidev-code-font-family, 'Fira Code', monospace);
  font-size: var(--slidev-code-font-size, 14.66px);
  font-weight: 400;
  line-height: 1.45;
  white-space: pre;
  font-variant-ligatures: none;
}
.code-line {
  white-space: pre;
}
.kw { color: #8839ef; font-weight: 400; }
.op { color: #179299; font-variant-ligatures: none; }
.num { color: #059669; }
.cst { color: #fe640b; }
.col { color: #4c4f69; }
.arrow { color: #8839ef; }
.paren { color: #6c6f85; }
</style>
