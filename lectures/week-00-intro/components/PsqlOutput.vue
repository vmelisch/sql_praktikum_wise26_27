<script setup lang="ts">
const props = defineProps<{
  variant?: 'movies-all' | 'movies-between'
  text?: string
}>()

const outputs: Record<string, string> = {
  'movies-all': ` id |          title          | canceled | revenue 
----+-------------------------+----------+---------
  1 | Secret Life of Penguins | f        |    1000
  2 | Big Explosions VII      | t        |        
  3 | Murder in SQL City      | f        |     500
(3 rows)`,
  'movies-between': ` id | title                   | canceled | revenue 
----+-------------------------+----------+--------
  1 | Secret Life of Penguins | f        |    1000 
  3 | Murder in SQL City      | f        |     500 
(2 rows)`
}
</script>

<template>
  <pre class="psql-output font-mono text-[11px] leading-[15px] p-2 bg-[#f8f9fa] border border-[#e2e8f0] rounded text-[#4c4f69] my-2 select-text overflow-x-auto">{{ (variant && outputs[variant]) || text }}</pre>
</template>

<style scoped>
.psql-output {
  margin: 6px 0;
  white-space: pre;
  width: 100%;
  box-sizing: border-box;
}
</style>
