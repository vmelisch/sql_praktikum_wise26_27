<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  step?: number
}>(), {
  step: 0
})

const activeStep = computed(() => Number(props.step) || 0)
</script>

<template>
  <div class="explain-example">
    <!-- Code Box with Overlay Highlights -->
    <div class="code-card">
      <div class="code-content">
        <div class="code-line"><span class="prompt">stats=#</span> <span class="kw">EXPLAIN</span></div>
        <div class="code-line"><span class="prompt">stats-#</span> <span class="kw">SELECT</span> *</div>
        <div class="code-line"><span class="prompt">stats-#</span> <span class="kw">FROM</span> posts p <span class="kw">JOIN</span> users u <span class="kw">ON</span> p.OwnerUserId = u.Id;</div>
        <div class="code-line">&nbsp;</div>
        <div class="code-line plan-header">QUERY PLAN</div>
        <div class="code-line plan-divider">----------------------------------------------------------------------------------------</div>
        <div class="code-line">
          Nested Loop <span class="hl-box hl-3" :class="{ 'is-active': activeStep >= 3 }">(cost=0.30..18998.79 rows=91976 width=1392)</span>
        </div>
        <div class="code-line">
          <span class="hl-box hl-1" :class="{ 'is-active': activeStep >= 1 }"><span class="arrow-sym">&nbsp;&nbsp;-&gt;&nbsp;&nbsp;</span></span>Seq Scan on posts p <span class="hl-cost">(cost=0.00..12319.76 rows=91976 width=1015)</span>
        </div>
        <div class="code-line">
          <span class="hl-box hl-1" :class="{ 'is-active': activeStep >= 1 }"><span class="arrow-sym">&nbsp;&nbsp;-&gt;&nbsp;&nbsp;</span></span>Memoize <span class="hl-cost">(cost=0.30..0.36 rows=1 width=377)</span>
        </div>
        <div class="code-line"><span class="indent-deep">Cache Key: p.owneruserid</span></div>
        <div class="code-line"><span class="indent-deep">Cache Mode: logical</span></div>
        <div class="code-line">
          <span class="indent-deeper"><span class="arrow-sym">-&gt;&nbsp;&nbsp;</span><span class="hl-box hl-2" :class="{ 'is-active': activeStep >= 2 }">Index Scan using users_pkey on users u</span></span> <span class="hl-cost">(cost=0.29..0.35 rows=1 width=377)</span>
        </div>
        <div class="code-line"><span class="indent-deepest">Index Cond: (id = p.owneruserid)</span></div>
        <div class="code-line"><span class="rows-count">(7 rows)</span></div>
      </div>

      <!-- SVG Overlay for Connecting Arrows -->
      <svg class="overlay-svg" viewBox="0 0 880 290" preserveAspectRatio="none">
        <defs>
          <marker id="arrow-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
          </marker>
        </defs>

        <!-- Arrow 1: Pointing to Indentation -->
        <g class="arrow-anim" :class="{ 'is-visible': activeStep >= 1 }">
          <path d="M 120 285 L 42 195" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-amber)" />
        </g>

        <!-- Arrow 2: Pointing to Operator Info. Ends on the bottom edge of the
             hl-2 box (measured at y 227.5–249.8 in these units); the
             head reaches ~1.2 units past the end, so its tip meets the border. -->
        <g class="arrow-anim" :class="{ 'is-visible': activeStep >= 2 }">
          <path d="M 440 285 L 329 250.2" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-amber)" />
        </g>

        <!-- Arrow 3: Pointing to Cost Estimates -->
        <g class="arrow-anim" :class="{ 'is-visible': activeStep >= 3 }">
          <path d="M 720 285 L 340 142" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-amber)" />
        </g>
      </svg>
    </div>

    <!-- 3 Observations Bottom Bar -->
    <div class="observations-grid">
      <div class="obs-card obs-1" :class="{ 'is-active': activeStep >= 1 }">
        <div class="obs-icon">1</div>
        <div class="obs-text">Inputs are expressed through indentation</div>
      </div>
      <div class="obs-card obs-2" :class="{ 'is-active': activeStep >= 2 }">
        <div class="obs-icon">2</div>
        <div class="obs-text">Some operators provide additional information</div>
      </div>
      <div class="obs-card obs-3" :class="{ 'is-active': activeStep >= 3 }">
        <div class="obs-icon">3</div>
        <div class="obs-text">These are the optimizer’s estimates</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.explain-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.code-card {
  position: relative;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  font-family: var(--slidev-code-font-family, 'Fira Code', monospace);
  font-size: 12px;
  line-height: 18px;
  color: #4c4f69;
}

.code-content {
  position: relative;
  z-index: 1;
}

.code-line {
  white-space: pre;
}

.prompt {
  color: #8839ef;
  font-weight: normal;
}

.kw {
  color: #8839ef;
  font-weight: normal;
}

.plan-header {
  color: #4c4f69;
  font-weight: 600;
}

.plan-divider {
  color: #9ca3af;
}

.arrow-sym {
  color: #179299;
  font-weight: normal;
}

.indent-deep {
  padding-left: 8ch;
  color: #6c6f85;
}

.indent-deeper {
  padding-left: 8ch;
}

.indent-deepest {
  padding-left: 14ch;
  color: #6c6f85;
}

.rows-count {
  color: #7c7f93;
}

.hl-cost {
  color: #6c6f85;
  margin-left: 4px;
}

/* Highlight boxes */
.hl-box {
  display: inline-block;
  padding: 0 4px;
  border-radius: 4px;
  border: 1.5px solid transparent;
  transition: all 0.3s ease;
}

.hl-box.is-active {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.12);
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.15);
}

.overlay-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.arrow-anim {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.arrow-anim.is-visible {
  opacity: 1;
}

/* Observations cards */
.observations-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  gap: 12px;
}

.obs-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  opacity: 0.35;
  transform: translateY(2px);
  transition: all 0.3s ease;
}

.obs-card.is-active {
  opacity: 1;
  transform: translateY(0);
  border-color: #f59e0b;
  background: #fffbeb;
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
}

.obs-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #d97706;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.obs-text {
  font-size: 12.5px;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.3;
}
</style>
