<script setup lang="ts">
defineProps<{
  showCallout?: boolean
}>()
</script>

<template>
  <div class="volcano-wrap">
    <svg viewBox="0 0 390 340" class="volcano-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dark gray up-arrow -->
        <marker id="v-arrow-up" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
        </marker>
        <!-- Dark gray down-arrow -->
        <marker id="v-arrow-down" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
        </marker>
        <!-- Yellow curve arrow -->
        <marker id="v-arrow-yellow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
        </marker>
      </defs>

      <!-- 1. Client -->
      <text x="240" y="24" class="v-client-text">Client</text>

      <!-- 2. Request next tuple down arrow -->
      <line x1="240" y1="32" x2="240" y2="70" stroke="#334155" stroke-width="1.8" stroke-dasharray="4,3" marker-end="url(#v-arrow-down)" />
      <text x="248" y="44" class="v-req-tuple">
        <tspan x="248" dy="0">request next</tspan>
        <tspan x="248" dy="13">tuple</tspan>
      </text>

      <!-- 3. Aggregation Box -->
      <rect x="175" y="74" width="130" height="42" rx="8" class="v-box" />
      <text x="240" y="95" class="v-box-text">Aggregation</text>

      <!-- 4. Tuple flow: Join -> Aggregation -->
      <line x1="240" y1="164" x2="240" y2="122" stroke="#334155" stroke-width="2" marker-end="url(#v-arrow-up)" />

      <!-- 5. Nested-loop Join Box -->
      <rect x="175" y="164" width="130" height="46" rx="8" class="v-box" />
      <text x="240" y="187" class="v-box-text">
        <tspan x="240" y="179">Nested-loop</tspan>
        <tspan x="240" y="195">Join</tspan>
      </text>

      <!-- 6. Tuple flows: Scans -> Join -->
      <line x1="172" y1="256" x2="204" y2="216" stroke="#334155" stroke-width="2" marker-end="url(#v-arrow-up)" />
      <line x1="278" y1="256" x2="246" y2="216" stroke="#334155" stroke-width="2" marker-end="url(#v-arrow-up)" />

      <!-- 7. Sequential Scan Box -->
      <rect x="85" y="258" width="125" height="46" rx="8" class="v-box" />
      <text x="147.5" y="281" class="v-box-text">
        <tspan x="147.5" y="273">Sequential</tspan>
        <tspan x="147.5" y="289">Scan</tspan>
      </text>

      <!-- 8. Index Scan Box -->
      <rect x="245" y="258" width="125" height="46" rx="8" class="v-box" />
      <text x="307.5" y="281" class="v-box-text">Index Scan</text>

      <!-- 9. Yellow next() curved arrows -->
      <!-- Curve 1: Client -> Aggregation -->
      <path d="M 215 18 C 115 18, 115 95, 170 95" fill="none" stroke="#f59e0b" stroke-width="2.2" marker-end="url(#v-arrow-yellow)" />
      <text x="95" y="52" class="v-next-label">next()</text>

      <!-- Curve 2: Aggregation -> Join -->
      <path d="M 175 105 C 105 115, 105 187, 170 187" fill="none" stroke="#f59e0b" stroke-width="2.2" marker-end="url(#v-arrow-yellow)" />
      <text x="88" y="148" class="v-next-label">next()</text>

      <!-- Curve 3: Join -> Sequential Scan -->
      <path d="M 175 195 C 45 205, 45 281, 80 281" fill="none" stroke="#f59e0b" stroke-width="2.2" marker-end="url(#v-arrow-yellow)" />
      <text x="35" y="240" class="v-next-label">next()</text>

      <!-- 10. Callout lines from the join to the code box in the right column.
           The ends sit on the box's rounded top-left / bottom-left corners
           (box measured at x 420.6, y 57.5–245.7 in these units; 8px radius).
           pathLength = 6n + 3 makes the 3,3 dashes start and end on a dash,
           so neither end shows a gap. -->
      <g v-if="showCallout" class="v-callout-lines">
        <line x1="305" y1="174" x2="423" y2="60" pathLength="165" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3" />
        <line x1="305" y1="200" x2="423" y2="243.3" pathLength="123" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.volcano-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.volcano-svg {
  width: 100%;
  max-width: 380px;
  height: auto;
  overflow: visible;
}

.v-box {
  fill: #2fa581 !important;
  stroke: #1e7d61 !important;
  stroke-width: 1.5px !important;
}

.v-box-text {
  fill: #ffffff !important;
  font-family: inherit !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  text-anchor: middle !important;
  dominant-baseline: central !important;
}

.v-client-text {
  fill: #64748b !important;
  font-family: inherit !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
  text-anchor: middle !important;
  dominant-baseline: central !important;
}

.v-req-tuple {
  fill: #334155 !important;
  font-family: inherit !important;
  font-size: 10.5px !important;
  font-weight: 700 !important;
  font-style: italic !important;
  text-anchor: start !important;
}

.v-next-label {
  fill: #475569 !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-anchor: end !important;
}
</style>
