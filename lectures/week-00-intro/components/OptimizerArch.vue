<template>
  <div class="optimizer-arch-wrap">
    <svg viewBox="0 0 460 365" class="optimizer-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Arrowhead Marker Gray -->
        <marker id="opt-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
        </marker>
        <!-- Arrowhead Marker Dashed -->
        <marker id="opt-arrow-dashed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <!-- 1. SQL query input arrow -->
      <text x="80" y="32" class="opt-label-query">SQL query</text>
      <line x1="112" y1="40" x2="168" y2="88" stroke="#475569" stroke-width="2.2" marker-end="url(#opt-arrow)" />

      <!-- 2. Best query plan output arrow -->
      <line x1="292" y1="88" x2="352" y2="38" stroke="#475569" stroke-width="2.2" marker-end="url(#opt-arrow)" />
      <text x="362" y="30" class="opt-label-plan">Best query<tspan x="362" dy="16">plan</tspan></text>

      <!-- 3. Produce candidate plans loop -->
      <path d="M 145 106 C 85 90, 85 142, 140 128" fill="none" stroke="#475569" stroke-width="2.2" marker-end="url(#opt-arrow)" />
      <text x="82" y="104" class="opt-label-loop">
        <tspan x="82" dy="0">Produce</tspan>
        <tspan x="82" dy="15">candidate</tspan>
        <tspan x="82" dy="15">plans</tspan>
      </text>

      <!-- 4. Plan Enumerator Box -->
      <g class="opt-box">
        <rect x="145" y="90" width="170" height="46" rx="8" class="box-enumerator" />
        <text x="230" y="113" class="box-text">Plan Enumerator</text>
      </g>

      <!-- 5. Evaluate candidate plans down arrow -->
      <line x1="230" y1="136" x2="230" y2="182" stroke="#475569" stroke-width="2.2" marker-end="url(#opt-arrow)" />
      <text x="242" y="159" class="opt-label-eval">Evaluate candidate plans</text>

      <!-- 6. Cost Model Box -->
      <g class="opt-box">
        <rect x="145" y="184" width="170" height="46" rx="8" class="box-cost-model" />
        <text x="230" y="207" class="box-text">Cost Model</text>
      </g>

      <!-- 7. Costs derived from cardinalities (dashed arrow) -->
      <line x1="125" y1="298" x2="185" y2="236" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,4" marker-end="url(#opt-arrow-dashed)" />
      <text x="112" y="258" class="opt-label-costs">
        <tspan x="112" dy="0">Costs derived</tspan>
        <tspan x="112" dy="14">from cardinalities</tspan>
      </text>

      <!-- 8. Cardinalities derived from statistics (dashed curved arc) -->
      <path d="M 195 298 Q 270 252 336 298" fill="none" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,4" marker-end="url(#opt-arrow-dashed)" />
      <text x="345" y="265" class="opt-label-stats">
        <tspan x="345" dy="0">Cardinalities derived</tspan>
        <tspan x="345" dy="14">from statistics</tspan>
      </text>

      <!-- 9. Cardinality Estimates Box -->
      <g class="opt-box">
        <rect x="25" y="300" width="180" height="46" rx="8" class="box-cardinality" />
        <text x="115" y="323" class="box-text">Cardinality Estimates</text>
      </g>

      <!-- 10. Statistics Catalog Box -->
      <g class="opt-box">
        <rect x="255" y="300" width="180" height="46" rx="8" class="box-stats" />
        <text x="345" y="323" class="box-text">Statistics Catalog</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.optimizer-arch-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.optimizer-svg {
  width: 100%;
  max-width: 450px;
  height: auto;
  overflow: visible;
}

.box-enumerator {
  fill: #e05332 !important;
  stroke: #c84122 !important;
  stroke-width: 1.5px !important;
}

.box-cost-model,
.box-cardinality {
  fill: #97c674 !important;
  stroke: #7fae5c !important;
  stroke-width: 1.5px !important;
}

.box-stats {
  fill: #14839c !important;
  stroke: #0e6c82 !important;
  stroke-width: 1.5px !important;
}

.box-text {
  fill: #ffffff !important;
  font-family: inherit !important;
  font-size: 13.5px !important;
  font-weight: 600 !important;
  text-anchor: middle !important;
  dominant-baseline: central !important;
}

.opt-label-query {
  fill: #475569 !important;
  font-family: inherit !important;
  font-size: 13px !important;
  text-anchor: middle !important;
  font-weight: 500 !important;
}

.opt-label-plan {
  fill: #475569 !important;
  font-family: inherit !important;
  font-size: 13px !important;
  text-anchor: start !important;
  font-weight: 500 !important;
}

.opt-label-loop {
  fill: #475569 !important;
  font-family: inherit !important;
  font-size: 11.5px !important;
  text-anchor: end !important;
  line-height: 1.2 !important;
}

.opt-label-eval {
  fill: #475569 !important;
  font-family: inherit !important;
  font-size: 11.5px !important;
  text-anchor: start !important;
  dominant-baseline: central !important;
}

.opt-label-costs {
  fill: #64748b !important;
  font-family: inherit !important;
  font-size: 11px !important;
  text-anchor: end !important;
}

.opt-label-stats {
  fill: #64748b !important;
  font-family: inherit !important;
  font-size: 11px !important;
  text-anchor: start !important;
}
</style>
