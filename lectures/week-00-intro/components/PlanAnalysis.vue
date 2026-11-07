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
  <div class="plan-analysis">
    <!-- Query Box -->
    <div class="code-card query-card">
      <div class="code-line"><span class="kw">EXPLAIN</span></div>
      <div class="code-line"><span class="kw">SELECT</span> u.DisplayName,</div>
      <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">CASE</span></div>
      <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">WHEN</span> current_timestamp - u.CreationDate &gt; <span class="str">'15 years'</span>::<span class="type">interval</span></div>
      <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">THEN</span> <span class="str">'newbie'</span></div>
      <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">ELSE</span> <span class="str">'veteran'</span></div>
      <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">END</span> <span class="kw">AS</span> user_age</div>
      <div class="code-line"><span class="kw">FROM</span> users u;</div>
    </div>

    <!-- Query Plan Box (Revealed on Step >= 1) -->
    <div class="plan-wrapper" :class="{ 'is-revealed': activeStep >= 1 }">
      <div class="code-card plan-card">
        <div class="code-line plan-header">QUERY PLAN</div>
        <div class="code-line plan-divider">---------------------------------------------------------------</div>
        <div class="code-line">
          <span class="hl-box" :class="{ 'is-active': activeStep >= 2 }">Seq Scan on users u</span>
          <span class="hl-cost">&nbsp;&nbsp;(cost=0.00..1710.50 rows=40325 width=41)</span>
        </div>
        <div class="code-line"><span class="rows-count">(1 row)</span></div>

        <!-- SVG Arrow pointing to Seq Scan bottom edge -->
        <svg class="overlay-svg" viewBox="0 0 680 92" preserveAspectRatio="none">
          <defs>
            <marker id="arrow-amber-plan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
            </marker>
          </defs>
          <g class="arrow-anim" :class="{ 'is-visible': activeStep >= 2 }">
            <path d="M 220 92 L 105 68" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-amber-plan)" />
          </g>
        </svg>
      </div>

      <!-- Callout badge (Revealed on Step >= 2) -->
      <div class="callout-container" :class="{ 'is-visible': activeStep >= 2 }">
        <div class="callout-badge">
          <span class="callout-icon">💡</span>
          <span class="callout-text">Case expressions are computed on-the-fly!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plan-analysis {
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.query-card {
  max-width: 680px;
}

.plan-wrapper {
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.35s ease;
  pointer-events: none;
}

.plan-wrapper.is-revealed {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.plan-card {
  max-width: 680px;
}

.code-line {
  white-space: pre;
}

.kw {
  color: #8839ef;
  font-weight: normal;
}

.str {
  color: #40a02b;
}

.type {
  color: #179299;
}

.plan-header {
  font-weight: 600;
  color: #4c4f69;
}

.plan-divider {
  color: #9ca3af;
}

.rows-count {
  color: #7c7f93;
}

.hl-cost {
  color: #6c6f85;
}

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

.callout-container {
  display: flex;
  justify-content: center;
  max-width: 680px;
  margin-top: 10px;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.3s ease;
}

.callout-container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.callout-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #f59e0b;
  background: #fffbeb;
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
}

.callout-icon {
  font-size: 14px;
}

.callout-text {
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
}
</style>
