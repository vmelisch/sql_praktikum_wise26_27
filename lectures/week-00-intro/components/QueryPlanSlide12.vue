<script setup lang="ts">
import DbTable from './DbTable.vue'
</script>

<template>
  <div class="query-plan-slide12 flex flex-col items-center">
    <!-- 1. Result Table at Top -->
    <div class="result-table-box">
      <DbTable
        caption="Result"
        :head="['A_Name', 'SUM']"
        :rows="[['Article A', 12], ['Article B', 1]]"
      />
    </div>

    <!-- 2. Algebraic Operator Tree SVG -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 380 118"
      width="380"
      height="118"
      class="plan-tree-svg"
    >
      <!-- Top connector from Result table (X=170) -->
      <line x1="170" y1="0" x2="170" y2="10" class="tree-line" />

      <!-- Gamma Operator -->
      <text x="170" y="24" class="tree-sym">γ</text>
      <text x="183" y="25" class="tree-sub">SUM(S_Qty); A_Name</text>

      <!-- Line Gamma -> Sigma -->
      <line x1="170" y1="30" x2="170" y2="40" class="tree-line" />

      <!-- Sigma Operator -->
      <text x="170" y="54" class="tree-sym">σ</text>
      <text x="183" y="55" class="tree-sub">S_Date &gt;= '2021-01-01'</text>

      <!-- Line Sigma -> Bowtie -->
      <line x1="170" y1="60" x2="170" y2="72" class="tree-line" />

      <!-- Bowtie Join Operator -->
      <g transform="translate(170, 80)">
        <path d="M -7 -6 L 0 0 L -7 6 Z M 7 -6 L 0 0 L 7 6 Z" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linejoin="round" />
        <text x="13" y="4" class="tree-sub">S_Anr = A_Anr</text>
      </g>

      <!-- Branch to Sales table (left) -->
      <line x1="162" y1="88" x2="100" y2="116" class="tree-line" />

      <!-- Branch to Article table (right) -->
      <line x1="178" y1="88" x2="310" y2="116" class="tree-line" />
    </svg>

    <!-- 3. Attached Input Tables at Bottom -->
    <div class="flex items-start justify-between w-full max-w-[430px] -mt-1">
      <div class="flex flex-col items-center">
        <DbTable
          caption="Sales"
          :head="['…', 'S_Anr', 'S_Date', 'S_Qty']"
          :rows="[
            ['…', 1, '2020-09-20', 7],
            ['…', 1, '2021-01-17', 2],
            ['…', 1, '2021-02-21', 5],
            ['…', 2, '2021-02-22', 1],
            ['…', 1, '2021-03-07', 5]
          ]"
        />
      </div>

      <div class="flex flex-col items-center">
        <DbTable
          caption="Article"
          :head="['A_Anr', 'A_Name', '…']"
          :rows="[
            [1, 'Article A', '…'],
            [2, 'Article B', '…']
          ]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.query-plan-slide12 {
  width: 100%;
}
.plan-tree-svg {
  display: block;
  overflow: visible;
}
.tree-line {
  stroke: #475569;
  stroke-width: 1.5;
}
.tree-sym {
  font-family: 'Noto Sans', sans-serif;
  font-size: 19px;
  font-weight: 700;
  fill: #1e293b;
  text-anchor: middle;
}
.tree-sub {
  font-family: 'Noto Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  fill: #334155;
  text-anchor: start;
}
</style>
