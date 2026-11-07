<script setup lang="ts">
const props = withDefaults(defineProps<{
  annotated?: boolean
}>(), { annotated: false })
</script>

<template>
  <div class="query-plan-tree-wrapper flex justify-center items-center">
    <!-- Unannotated Tree (Slide 12) -->
    <svg
      v-if="!props.annotated"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 155"
      width="250"
      height="155"
      class="qpt-svg"
    >
      <!-- Top stub from Result table -->
      <line x1="75" y1="2" x2="75" y2="14" class="tree-line" />

      <!-- Gamma: symbol centered at X=75, subscript starts at X=88 -->
      <text x="75" y="28" class="tree-sym">γ</text>
      <text x="88" y="29" class="tree-sub">SUM(S_Qty); A_Name</text>

      <!-- Line Gamma -> Sigma -->
      <line x1="75" y1="34" x2="75" y2="48" class="tree-line" />

      <!-- Sigma: symbol centered at X=75, subscript starts at X=88 -->
      <text x="75" y="62" class="tree-sym">σ</text>
      <text x="88" y="63" class="tree-sub">S_Date &gt;= '2021-01-01'</text>

      <!-- Line Sigma -> Bowtie -->
      <line x1="75" y1="68" x2="75" y2="84" class="tree-line" />

      <!-- Join Bowtie: centered at X=75, Y=92 -->
      <g transform="translate(75, 92)">
        <path d="M -7 -6 L 0 0 L -7 6 Z M 7 -6 L 0 0 L 7 6 Z" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linejoin="round" />
        <text x="13" y="4" class="tree-sub">S_Anr = A_Anr</text>
      </g>

      <!-- Branches from Bowtie to leaves -->
      <line x1="67" y1="100" x2="35" y2="124" class="tree-line" />
      <line x1="83" y1="100" x2="115" y2="124" class="tree-line" />

      <!-- Leaves -->
      <text x="35" y="142" class="tree-leaf">Sales</text>
      <text x="115" y="142" class="tree-leaf">Article</text>
    </svg>

    <!-- Annotated Tree (Slide 13) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 760 370"
      width="760"
      height="370"
      class="qpt-svg"
    >
      <defs>
        <marker id="arrow-dashed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
        </marker>
      </defs>

      <!-- === THE TREE (Axis at X=550) === -->
      <!-- Top stub -->
      <line x1="550" y1="75" x2="550" y2="100" class="tree-line" />

      <!-- Gamma: symbol at X=550, Y=118 -->
      <text x="550" y="118" class="tree-sym">γ</text>
      <text x="564" y="119" class="tree-sub">SUM(S_Qty); A_Name</text>

      <!-- Line Gamma -> Sigma -->
      <line x1="550" y1="126" x2="550" y2="154" class="tree-line" />

      <!-- Sigma: symbol at X=550, Y=172 -->
      <text x="550" y="172" class="tree-sym">σ</text>
      <text x="564" y="173" class="tree-sub">S_Date &gt;= '2021-01-01'</text>

      <!-- Line Sigma -> Bowtie -->
      <line x1="550" y1="180" x2="550" y2="216" class="tree-line" />

      <!-- Join Bowtie: centered at X=550, Y=228 -->
      <g transform="translate(550, 228)">
        <path d="M -8 -7 L 0 0 L -8 7 Z M 8 -7 L 0 0 L 8 7 Z" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linejoin="round" />
        <text x="14" y="4" class="tree-sub">S_Anr = A_Anr</text>
      </g>

      <!-- Branches from Bowtie (550, 238) to leaves -->
      <line x1="540" y1="239" x2="495" y2="284" class="tree-line" />
      <line x1="560" y1="239" x2="605" y2="284" class="tree-line" />

      <!-- Leaves -->
      <text x="495" y="306" class="tree-leaf">Sales</text>
      <text x="605" y="306" class="tree-leaf">Article</text>

      <!-- === ANNOTATIONS & QUESTIONS === -->
      <!-- 1. Question: Which Join Order? (Above tree) -->
      <rect x="445" y="15" width="210" height="44" class="q-box" />
      <text x="550" y="37" class="q-text">… Which Join Order?</text>

      <!-- 2. Join Operator Choices & Box -->
      <text x="215" y="180" class="choice-text">Sort-Merge Join?</text>
      <text x="215" y="210" class="choice-text">Nested-loop Join?</text>
      <text x="215" y="240" class="choice-text">Hash Join?</text>

      <!-- Box: Which Join Operator? -->
      <rect x="230" y="202" width="190" height="44" class="q-box" />
      <text x="325" y="224" class="q-text">Which Join Operator?</text>

      <!-- Dashed arrow pointing to Bowtie -->
      <line x1="420" y1="224" x2="536" y2="228" class="dashed-arrow" marker-end="url(#arrow-dashed)" />

      <!-- 3. Scan Operator Choices & Box -->
      <text x="190" y="316" class="choice-text">Sequential Scan?</text>
      <text x="190" y="346" class="choice-text">Index Scan?</text>

      <!-- Box: Which Scan Operator? -->
      <rect x="205" y="313" width="195" height="44" class="q-box" />
      <text x="302.5" y="335" class="q-text">Which Scan Operator?</text>

      <!-- Dashed arrow pointing to Sales -->
      <line x1="400" y1="335" x2="470" y2="310" class="dashed-arrow" marker-end="url(#arrow-dashed)" />
    </svg>
  </div>
</template>

<style scoped>
.qpt-svg {
  display: block;
}
.qpt-svg text {
  font-family: 'Noto Sans', sans-serif !important;
}
.tree-sym {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 19px !important;
  font-weight: 700 !important;
  fill: #1e293b !important;
  text-anchor: middle !important;
}
.tree-sub {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  fill: #334155 !important;
  text-anchor: start !important;
}
.tree-leaf {
  font-size: 15px !important;
  font-weight: 600 !important;
  fill: #1e293b !important;
  text-anchor: middle !important;
}
.tree-line {
  stroke: #64748b !important;
  stroke-width: 1.6 !important;
  stroke-linecap: round !important;
}

.q-box {
  fill: #f0fdf4 !important;
  stroke: #84cc16 !important;
  stroke-width: 1.8 !important;
  rx: 8px !important;
}
.q-text {
  font-size: 15px !important;
  font-weight: 600 !important;
  fill: #3f6212 !important;
  text-anchor: middle !important;
}
.choice-text {
  font-size: 14px !important;
  fill: #94a3b8 !important;
  text-anchor: end !important;
}
.dashed-arrow {
  stroke: #334155 !important;
  stroke-width: 1.6 !important;
  stroke-dasharray: 5 4 !important;
  fill: none !important;
}
</style>