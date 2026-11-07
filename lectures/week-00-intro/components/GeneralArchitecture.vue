<script setup lang="ts">
const props = withDefaults(defineProps<{
  showFocus?: boolean
}>(), {
  showFocus: true
})
</script>

<template>
  <div class="general-architecture flex justify-center items-center my-auto">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 940 375"
      width="100%"
      class="general-arch-svg"
      style="max-height: 400px; font-family: 'Noto Sans', sans-serif;"
    >
      <defs>
        <!-- Arrow markers -->
        <marker id="arrow-blk" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
        </marker>
        <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1f8299" />
        </marker>
      </defs>

      <!-- Big Outer Frame: Query Processor (Y=30 to 310, height=280, centered on Y=170) -->
      <rect x="130" y="30" width="530" height="280" rx="4" fill="none" stroke="#475569" stroke-width="2" />

      <!-- Horizontal dashed line dividing Compile Time & Runtime (Y=170) -->
      <line x1="40" y1="170" x2="740" y2="170" stroke="#94a3b8" stroke-width="2" stroke-dasharray="8 6" />

      <!-- "Query Processor" watermark text in lower-left area -->
      <text x="145" y="215" class="fs-xl fw-bold fill-muted" opacity="0.85">Query Processor</text>

      <!-- LEFT: Query & Result (Centered at X=65) -->
      <text x="65" y="92" class="fs-lg fw-bold fill-red text-center">Query</text>
      <line x1="65" y1="106" x2="65" y2="238" stroke="#334155" stroke-width="2" marker-end="url(#arrow-blk)" />
      <text x="65" y="258" class="fs-lg fw-bold fill-gold text-center">Result</text>

      <!-- Arrow: Query -> Box entrance (Centered at X=110, Y=92; Clean 12px gap to box border at X=130) -->
      <path d="M 102 89 h 9 v -4 l 7 7 l -7 7 v -4 h -9 z" fill="#ffffff" stroke="#ea4f30" stroke-width="1.8" />

      <!-- TOP ROW: CTS Steps (Visual center Y=92) -->
      <!-- Col 1: Parsing to Logical Query Plan (Centered at X=185) -->
      <g class="fill-faded fs-sm text-center">
        <text x="185" y="76">Parsing to</text>
        <text x="185" y="92">Logical</text>
        <text x="185" y="108">Query Plan</text>
      </g>

      <!-- Arrow: Col 1 -> Col 2 (Centered at X=240, Y=92) -->
      <path d="M 232 89 h 9 v -4 l 7 7 l -7 7 v -4 h -9 z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.6" />

      <!-- Col 2: Access and Integrity Control (Centered at X=295) -->
      <g class="fill-faded fs-sm text-center">
        <text x="295" y="76">Access and</text>
        <text x="295" y="92">Integrity</text>
        <text x="295" y="108">Control</text>
      </g>

      <!-- Arrow: Col 2 -> Query Opt Box (Centered at X=347, Y=92; Clean 5px gap to Query Opt box at X=360) -->
      <path d="M 339 89 h 9 v -4 l 7 7 l -7 7 v -4 h -9 z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.6" />

      <!-- Query Optimization Sub-box (X=360 to 645, width=285, Y=38 to 124, height=86; Midpoint X=502.5) -->
      <rect x="360" y="38" width="285" height="86" rx="3" fill="#ffffff" stroke="#ea4f30" stroke-width="2" />
      <text x="502.5" y="54" class="fs-md fw-bold fill-red text-center">Query Optimization</text>

      <!-- Curly bracket under "Query Optimization" heading (Tip at X=502.5, Y=69) -->
      <path d="M 380 64 h 115 c 3 0 6 2 7 5 c 1 -3 4 -5 7 -5 h 116" fill="none" stroke="#ea4f30" stroke-width="1.5" />

      <!-- Col 3: Logical Plan Rewrite (Centered at X=430, Y=104) -->
      <g class="fill-red fs-sm fw-semi text-center">
        <text x="430" y="88">Logical</text>
        <text x="430" y="104">Plan</text>
        <text x="430" y="120">Rewrite</text>
      </g>

      <!-- Arrow: Rewrite -> Transformation (Centered at X=502.5, Y=104) -->
      <path d="M 494.5 101 h 9 v -4 l 7 7 l -7 7 v -4 h -9 z" fill="#ffffff" stroke="#ea4f30" stroke-width="1.6" />

      <!-- Col 4: Plan Transformation (Centered at X=575, Y=104) -->
      <g class="fill-red fs-sm fw-semi text-center">
        <text x="575" y="88">Plan</text>
        <text x="575" y="104">Trans-</text>
        <text x="575" y="120">formation</text>
      </g>

      <!-- Arrow DOWN: Plan Transformation -> QEP (Centered at X=575, Y=135; Clean 4px gap to both boxes) -->
      <path d="M 572 128 v 8 h -4 l 7 6 l 7 -6 h -4 v -8 z" fill="#ffffff" stroke="#475569" stroke-width="1.6" />

      <!-- QEP Box (Centered on Y=170: Y=146 to 194, height=48; X=505 to 645, width=140; Center X=575) -->
      <rect x="505" y="146" width="140" height="48" rx="3" fill="#ffffff" stroke="#994781" stroke-width="2.5" />
      <g class="fill-purple fs-base fw-bold text-center">
        <text x="575" y="159">Query</text>
        <text x="575" y="171">Execution</text>
        <text x="575" y="183">Plan (QEP)</text>
      </g>

      <!-- Arrow DOWN: QEP -> Plan Parameterization (Centered at X=575, Y=212; Clean 11px gap from QEP box) -->
      <path d="M 572 205 v 8 h -4 l 7 6 l 7 -6 h -4 v -8 z" fill="#ffffff" stroke="#475569" stroke-width="1.6" />

      <!-- BOTTOM ROW: RTS Steps (Visual center Y=248, Right to Left) -->
      <!-- Col 4: Plan Parameterization (Centered at X=575) -->
      <g class="fill-gold fs-sm fw-semi text-center">
        <text x="575" y="243">Plan Para-</text>
        <text x="575" y="259">meterization</text>
      </g>

      <!-- Arrow LEFT: Parameterization -> Code Gen (Centered at X=502.5, Y=248) -->
      <path d="M 510.5 245 h -9 v -4 l -7 7 l 7 7 v -4 h 9 z" fill="#ffffff" stroke="#b48300" stroke-width="1.6" />

      <!-- Col 3: Code Generation (Centered at X=430) -->
      <g class="fill-gold fs-sm fw-semi text-center">
        <text x="430" y="243">Code</text>
        <text x="430" y="259">Generation</text>
      </g>

      <!-- Arrow LEFT: Code Gen -> Execution Control (Centered at X=362.5, Y=248) -->
      <path d="M 370.5 245 h -9 v -4 l -7 7 l 7 7 v -4 h 9 z" fill="#ffffff" stroke="#b48300" stroke-width="1.6" />

      <!-- Col 2: Execution Control (Centered at X=295) -->
      <g class="fill-gold fs-sm fw-semi text-center">
        <text x="295" y="243">Execution</text>
        <text x="295" y="259">Control</text>
      </g>

      <!-- Arrow LEFT: Execution Control -> Result Provisioning (Centered at X=240, Y=248) -->
      <path d="M 248 245 h -9 v -4 l -7 7 l 7 7 v -4 h 9 z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.6" />

      <!-- Col 1: Result Provisioning (Centered at X=185) -->
      <g class="fill-faded fs-sm text-center">
        <text x="185" y="243">Result</text>
        <text x="185" y="259">Provisioning</text>
      </g>

      <!-- Arrow LEFT: Result Provisioning -> Result (Centered at X=110, Y=248; Clean 12px gap to box border at X=130) -->
      <path d="M 118 245 h -9 v -4 l -7 7 l 7 7 v -4 h 9 z" fill="#ffffff" stroke="#b48300" stroke-width="1.8" />

      <!-- RIGHT ANNOTATIONS: Exactly symmetric around Y=170 (Gap to dashed line = 22px, Height = 110px) -->
      <!-- Upper Bracket: CTS (Y=38 to 148, tip at Y=93) -->
      <path d="M 675 38 h 6 c 4 0 7 4 7 8 v 39 c 0 4 4 8 8 8 c -4 0 -8 4 -8 8 v 39 c 0 4 -3 8 -7 8 h -6" fill="none" stroke="#ea4f30" stroke-width="1.8" />
      <g class="fill-red fs-sm fw-semi text-left">
        <text x="708" y="89">Logical DB Processor/</text>
        <text x="708" y="106">Compile Time System (CTS)</text>
      </g>

      <!-- Dashed line annotations: Equidistant (7px) above and below Y=170 -->
      <text x="708" y="163" class="fs-base fw-bold fill-slate text-left">Query Compile Time</text>
      <text x="708" y="187" class="fs-base fw-bold fill-slate text-left">Query Runtime</text>

      <!-- Lower Bracket: RTS (Y=192 to 302, tip at Y=247) -->
      <path d="M 675 192 h 6 c 4 0 7 4 7 8 v 39 c 0 4 4 8 8 8 c -4 0 -8 4 -8 8 v 39 c 0 4 -3 8 -7 8 h -6" fill="none" stroke="#b48300" stroke-width="1.8" />
      <g class="fill-gold fs-sm fw-semi text-left">
        <text x="708" y="243">Physical DB Processor/</text>
        <text x="708" y="260">Runtime System (RTS)</text>
      </g>

      <!-- "Our focus" Callout (Animated) -->
      <g v-if="props.showFocus" class="focus-group">
        <g class="text-center">
          <text x="450" y="344" class="fs-md fw-bold fill-teal">Our</text>
          <text x="450" y="360" class="fs-md fw-bold fill-teal">focus</text>
        </g>
        <line x1="452" y1="330" x2="500" y2="200" stroke="#1f8299" stroke-width="2.2" marker-end="url(#arrow-teal)" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.general-architecture {
  width: 100%;
}
.general-arch-svg {
  display: block;
}
.general-arch-svg text {
  font-family: 'Noto Sans', sans-serif !important;
}
.fs-xs { font-size: 11px !important; }
.fs-sm { font-size: 13px !important; }
.fs-base { font-size: 14px !important; }
.fs-md { font-size: 15px !important; }
.fs-lg { font-size: 16px !important; }
.fs-xl { font-size: 28px !important; }

.fw-normal { font-weight: 400 !important; }
.fw-semi { font-weight: 600 !important; }
.fw-bold { font-weight: 700 !important; }

.text-center { text-anchor: middle !important; }
.text-left { text-anchor: start !important; }

.fill-faded { fill: #94a3b8 !important; }
.fill-muted { fill: #475569 !important; }
.fill-red { fill: #ea4f30 !important; }
.fill-gold { fill: #b48300 !important; }
.fill-purple { fill: #994781 !important; }
.fill-slate { fill: #64748b !important; }
.fill-teal { fill: #1f8299 !important; }
</style>