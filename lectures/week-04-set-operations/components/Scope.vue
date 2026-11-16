<script setup lang="ts">
import { TINT } from '../setops'

// A box behind lines `from`–`to` of a code block, to show what belongs together
// (like parentheses). Put it after the code inside a <div class="code-scope">.
// `fill` tints the lines, `dash` outlines them; `inset` is how far the box reaches
// past the code sideways, so nested boxes can sit inside each other (up and down
// it reaches 4px less: see the style); `label` is a small tag on the box's
// top-right corner, or right of the box with label-side="right".
const props = withDefaults(defineProps<{
  from: number
  to: number
  kind?: 'fill' | 'dash'
  color?: 'teal' | 'yellow' | 'purple'
  inset?: number
  label?: string
  labelSide?: 'top' | 'right'
}>(), { kind: 'fill', color: 'yellow', inset: 4, label: '', labelSide: 'top' })
</script>

<template>
  <div
    class="scope"
    :class="[`scope--${props.kind}`, `scope--${props.color}`]"
    :style="{ '--from': props.from, '--to': props.to, '--inset': `${props.inset}px`, '--scope-tint': TINT[props.color] }"
  >
    <span v-if="props.label" class="scope__label" :class="`scope__label--${props.labelSide}`">{{ props.label }}</span>
  </div>
</template>

<style scoped>
/* Code lines start 8px into .code-scope (the wrapper's 4px margin plus the
   block's 4px top padding) and are font size × line height apart. A line
   already has about 4px of air above and below its letters, so up and down the
   box reaches 4px less than sideways: at the default inset it ends exactly at
   its lines and stays clear of the letters in the lines next to it. */
.scope {
  --lh: calc(var(--slidev-code-font-size) * var(--slidev-code-line-height));
  --inset-y: calc(var(--inset) - 4px);
  position: absolute;
  z-index: -1;
  left: calc(-1 * var(--inset));
  right: calc(-1 * var(--inset));
  top: calc(8px + (var(--from) - 1) * var(--lh) - var(--inset-y));
  height: calc((var(--to) - var(--from) + 1) * var(--lh) + 2 * var(--inset-y));
  border-radius: 4px;
}
.scope--teal { --scope: var(--db-accent1); }
.scope--yellow { --scope: var(--db-accent4); }
.scope--purple { --scope: var(--db-accent6); }
.scope--fill {
  background: var(--scope-tint);
}
.scope--dash {
  border: 1.5px dashed var(--scope);
}
.scope__label {
  position: absolute;
  right: 0;
  bottom: 100%;
  margin-bottom: 1px;
  padding: 0 4px;
  border-radius: 3px;
  background: var(--scope);
  color: #fff;
  font-family: var(--slidev-code-font-family);
  font-size: var(--db-fs-table);
  line-height: 1.4;
  white-space: nowrap;
}
.scope__label--right {
  right: auto;
  bottom: auto;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 0 0 6px;
}
</style>
