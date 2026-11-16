---
theme: tud-db
title: "Week 4: Set Operations"
layout: cover
---

# Week 4: Set Operations

Data Management Lab, Winter Semester 2026/27

<SlidesQr class="cover-qr" />

---
layout: default
---

# Introduction

## General

- Implement standard mathematical set operations ($\cup$, $\cap$, $-$)
- Operates on rows

<div v-click>

## Flavors

<div class="flavors">
<div>

1. Operating on a single SQL statement --> `{sql} DISTINCT`, `{sql} DISTINCT ON`

</div>
<Dedupe />
<div>

2. Combining multiple query outputs --> `{sql} UNION`, `{sql} INTERSECT`, `{sql} EXCEPT`

</div>
<div class="flex gap-4"><Venn op="union" :width="78" /><Venn op="intersect" :width="78" /><Venn op="except" :width="78" /></div>
</div>
</div>

---
layout: section-num
num: 1
---

# Operating on a single SQL statement

e.g., `{sql} DISTINCT`, `{sql} DISTINCT ON`

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { chips, TINT, tintIn } from './setops'

const orders = [[1, 'Anna', 'Apple'], [2, 'Ben', 'Banana'], [3, 'Anna', 'Apple'], [4, 'Clara', 'Apple'], [5, 'Ben', 'Banana']]
const out1 = [['Apple'], ['Banana']]
const out2 = [['Anna', 'Apple'], ['Ben', 'Banana'], ['Clara', 'Apple']]

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1 (the first query is there from the start): only `product` is
    // selected, so only it decides what is a duplicate: the other columns step
    // back, equal products share a colour, and each colour becomes one output row
    .fadeIn('.out1')
    .to('.orders :is(.c1, .c2)', { opacity: 0.3, duration: 0.4 }, '<')
    .fromTo(...tintIn(chips('.orders', [1, 3, 4], 3), 'teal'), '<')
    .fromTo(...tintIn(chips('.orders', [2, 5], 3), 'purple'), '<')
    .step()
    // click 2: now (customer, product) decides, and Clara's Apple is its own row
    .fadeIn('.q2')
    .to('.orders .c2', { opacity: 1, duration: 0.4 }, '<')
    .fromTo(...tintIn(chips('.orders', [1, 3], 2), 'teal'), '<')
    .fromTo(...tintIn(chips('.orders', [2, 5], 2), 'purple'), '<')
    .fromTo(...tintIn(chips('.orders', [4], 2), 'yellow'), '<')
    .to(chips('.orders', [4], 3), { backgroundColor: TINT.yellow, duration: 0.4 }, '<')
    .step()
    // click 3: the same queries with GROUP BY (the code magic-moves at click 3)
    .fadeIn('.same-as')
    .step()
})
</script>

# Duplicate Removal (1)

## 1.1 `DISTINCT`

- Goal: Remove duplicate rows from the final output based on all selected columns
- Duplicate ≙ two rows have exact same values in every column
- `{sql} NULL` values are considered equal

<div class="same-as">

- Same as `{sql} GROUP BY` over all selected columns

</div>

<div class="pipeline mt-3">
<DbTable class="orders" caption="Orders" :head="['id', 'customer', 'product']" :rows="orders" />
<FlowArrow />
<div class="group" style="gap: 36px">
<div class="q1">
<div class="code-room" style="--lines: 3; --cols: 23">

````md magic-move {at:3}
```sql
SELECT DISTINCT product
FROM orders;
```
```sql
SELECT product
FROM orders
GROUP BY product;
```
````

</div>
<DbTable class="out1" caption="Output" :head="['product']" :rows="out1" :tints="['teal', 'purple']" />
</div>
<div class="q2">
<div class="code-room" style="--lines: 3; --cols: 33">

````md magic-move {at:3}
```sql
SELECT DISTINCT customer, product
FROM orders;
```
```sql
SELECT customer, product
FROM orders
GROUP BY customer, product;
```
````

</div>
<DbTable caption="Output" :head="['customer', 'product']" :rows="out2" :tints="['teal', 'purple', 'yellow']" />
</div>
</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { chips, tintIn } from './setops'

const head = ['id', 'customer', 'product']
const orders = [[1, 'Anna', 'Apple'], [2, 'Ben', 'Banana'], [3, 'Anna', 'Orange'], [4, 'Clara', 'Orange'], [5, 'Ben', 'Apple'], [6, 'Anna', 'Banana']]
const kept = [[1, 'Anna', 'Apple'], [2, 'Ben', 'Banana'], [4, 'Clara', 'Orange']]
// where each Orders row (r1…r6) ends up once sorted by customer, id
const sortedIndex = [0, 3, 1, 5, 4, 2]

const tl = useTl()
const slide = useSlide()
onMounted(() => {
  // the zebra shades of the first and the second row
  const zebra = [...slide.value?.querySelectorAll<HTMLElement>('.orders :is(.r1, .r2)') ?? []]
    .map(row => getComputedStyle(row).backgroundColor)
  tl.step()
    // click 1: the query has no ORDER BY yet. DISTINCT ON (customer) makes the
    // rows of a customer duplicates of each other: one colour per customer, and
    // under the query the question which of them is kept (without an order, any
    // of them)
    .fromTo(...tintIn(chips('.orders', [1, 3, 6], 2), 'teal'))
    .fromTo(...tintIn(chips('.orders', [2, 5], 2), 'purple'), '<')
    .fromTo(...tintIn(chips('.orders', [4], 2), 'yellow'), '<')
    .fadeIn('.ask', {}, '<')
    .step()
    // click 2: the answer takes the question's place: ORDER BY customer, id
    // (the code magic-moves the line in and highlights it at the same click)
    .fadeOut('.ask', { duration: 0.3 })
    .step()
    // click 3: the rows move into that order, each taking the zebra shade of
    // its new place. The move is in row heights (yPercent), not px: a slide
    // that is preloaded while the one before it is shown is hidden, and its
    // rows measure 0px.
    .to('.orders tbody tr', {
      yPercent: (i: number) => (sortedIndex[i] - i) * 100,
      backgroundColor: (i: number) => zebra[sortedIndex[i] % 2],
      duration: 0.7,
      ease: 'power2.inOut',
    })
    .step()
    // click 4: DISTINCT ON (customer) keeps the first row of each customer
    .to('.orders :is(.r3, .r5, .r6)', { opacity: 0.3, duration: 0.4 })
    .fadeIn('.to-out', {}, '<')
    .fadeIn('.out', {}, '<')
    .step()
})
</script>

# Duplicate Removal (2)

## 1.2 `DISTINCT ON`<sup>*</sup>

- Goal: Remove duplicate rows given specified columns that serve as the duplication key
- Only the columns listed in `{sql} DISTINCT ON` determine what counts as a duplicate
- Must use `{sql} ORDER BY` starting with the `{sql} DISTINCT ON` expressions so that the kept row becomes predictable

<div class="pipeline mt-3">
<DbTable class="orders" caption="Orders" :head="head" :rows="orders" />
<FlowArrow />
<div class="code-room" style="--lines: 6">

````md magic-move {at:2}
```sql
SELECT DISTINCT ON (customer)
  customer,
  product,
  id
FROM orders;
```
```sql {6|6|1}
SELECT DISTINCT ON (customer)
  customer,
  product,
  id
FROM orders
ORDER BY customer, id;
```
````

<div class="under-code ask" style="--after: 5">

::takeaway{label="Question"}
Which row should be returned for each unique customer?
::

</div>
</div>
<FlowArrow class="to-out" />
<DbTable class="out" caption="Output" :head="head" :rows="kept" :tints="['teal', 'purple', 'yellow']" :tint-cols="[2]" />
</div>

<div class="footnote">*PostgreSQL only</div>

---
layout: section-num
num: 2
---

# Combining multiple query outputs

e.g., `{sql} UNION`, `{sql} INTERSECT`, `{sql} EXCEPT`

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  tl.step()
    .fadeIn('.rules')
    .step()
    // click 2: INTERSECT binds first, so B ∩ C forms one operand…
    .fadeIn('.example')
    .fadeIn('.s-bc', {}, '<')
    .fadeIn('.v3-bc', {}, '<')
    .step()
    // click 3: …and UNION joins A with it
    .fadeIn('.s-all')
    .fadeIn('.v3-a', {}, '<')
    .fadeIn('.eq', {}, '<')
    .step()
})
</script>

# Set Operations (1)

## Overview

- Goal: Combine outputs of multiple SQL statements into a single result set
- Three operations: `{sql} UNION`, `{sql} INTERSECT`, `{sql} EXCEPT`

<div class="rules mt-3 pl-[1.1em]">

1. Must have the same number of columns
2. Matching is done by column position, not by name
3. Columns must have compatible data types
4. `{sql} UNION` and `{sql} EXCEPT` associate left-to-right, but `{sql} INTERSECT` binds more tightly than those other two

</div>

<div class="example mt-3">

- Example:

<div class="pipeline bullet-indent" style="gap: 40px">
<div class="code-scope">

```sql
SELECT ... FROM A
UNION
SELECT ... FROM B
INTERSECT
SELECT ... FROM C;
```

<Scope class="s-bc" :from="3" :to="5" />
<Scope class="s-all" :from="1" :to="5" kind="dash" color="teal" :inset="9" />
</div>
<div class="eq">

≙ $A \cup (B \cap C)$

</div>
<Venn3 />
</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { bothIn, chips, tintIn } from './setops'

const head = ['id', 'name']
// the chips of the names in the given rows of an input table
const names = (table: string, ...rows: number[]) => chips(table, rows, 2)
const eu = [[1, 'Anna'], [2, 'Ben'], [3, 'Clara']]
const us = [[1, 'Ben'], [2, 'David'], [3, 'Emma']]
const union = [['Anna'], ['Ben'], ['Clara'], ['David'], ['Emma']]
const unionAll = [['Anna'], ['Ben'], ['Clara'], ['Ben'], ['David'], ['Emma']]

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: colour each name by where it occurs (as in the Venn diagram),
    // then the UNION result: every colour, Ben only once
    .fromTo(...tintIn(names('.eu', 1, 3), 'teal'))
    .fromTo(...bothIn(`${names('.eu', 2)}, ${names('.us', 1)}`), '<')
    .fromTo(...tintIn(names('.us', 2, 3), 'purple'), '<')
    .fadeIn('.to-res')
    .fadeIn('.res1', {}, '<')
    .step()
    // click 2: UNION ALL (the code magic-moves at click 2) keeps both Bens
    .fadeIn('.res2')
    .step()
})
</script>

# 2. Set Operations (2)

## 2.1 `UNION`

- Math: $A \cup B$
- SQL: Returns all rows from both queries, removing duplicates
- `{sql} NULL` values are considered equal
- `{sql} UNION ALL` variant: keep duplicates

<Venn op="union" class="absolute left-[740px] top-[110px]" />

<div class="pipeline mt-4">
<div class="group inputs">
<DbTable class="eu" caption="customers_eu" :head="head" :rows="eu" />
<DbTable class="us" caption="customers_us" :head="head" :rows="us" />
</div>
<FlowArrow />
<div>

````md magic-move {at:2}
```sql
SELECT name FROM customers_eu
UNION
SELECT name FROM customers_us;
```
```sql
SELECT name FROM customers_eu
UNION ALL
SELECT name FROM customers_us;
```
````

</div>
<FlowArrow class="to-res" />
<div class="group">
<DbTable class="res1" caption="UNION" code :head="['name']" :rows="union" :tints="['teal', 'both', 'teal', 'purple', 'purple']" />
<DbTable class="res2" caption="UNION ALL" code :head="['name']" :rows="unionAll" :tints="['teal', 'both', 'teal', 'both', 'purple', 'purple']" />
</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { bothIn, chips, tintIn } from './setops'

const head = ['id', 'name']
// the chips of the names in the given rows of an input table
const names = (table: string, ...rows: number[]) => chips(table, rows, 2)
const eu = [[1, 'Anna'], [2, 'Anna'], [3, 'Ben'], [4, 'Clara']]
const us = [[1, 'Anna'], [2, 'Anna'], [3, 'Ben'], [4, 'David'], [5, 'Ben']]

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: colour each name by where it occurs; INTERSECT keeps the names
    // in both, once each
    .fromTo(...bothIn(`${names('.eu', 1, 2, 3)}, ${names('.us', 1, 2, 3, 5)}`))
    .fromTo(...tintIn(names('.eu', 4), 'teal'), '<')
    .fromTo(...tintIn(names('.us', 4), 'purple'), '<')
    .fadeIn('.to-res')
    .fadeIn('.res1', {}, '<')
    .step()
    // click 2: INTERSECT ALL pairs equal rows one to one; the second US Ben has
    // no partner left, so only min(1, 2) = 1 Ben is kept
    .to(names('.us', 5), { '--both': 0, duration: 0.4 })
    .fromTo(...tintIn(names('.us', 5), 'purple'), '<')
    .fadeIn('.res2', {}, '<')
    .step()
})
</script>

# 2. Set Operations (3)

## 2.2 `INTERSECT`

- Math: $A \cap B$
- SQL: Returns only rows that appear in both query results, removing duplicates
- `{sql} INTERSECT ALL` variant: keep duplicates (supported in PostgreSQL)
  - Each matching row appears min(count in A, count in B) times

<Venn op="intersect" class="absolute left-[744px] top-[100px]" />

<div class="pipeline mt-4">
<div class="group inputs">
<DbTable class="eu" caption="customers_eu" :head="head" :rows="eu" />
<DbTable class="us" caption="customers_us" :head="head" :rows="us" />
</div>
<FlowArrow />
<div>

````md magic-move {at:2}
```sql
SELECT name FROM customers_eu
INTERSECT
SELECT name FROM customers_us;
```
```sql
SELECT name FROM customers_eu
INTERSECT ALL
SELECT name FROM customers_us;
```
````

</div>
<FlowArrow class="to-res" />
<div class="group">
<DbTable class="res1" caption="INTERSECT" code :head="['name']" :rows="[['Anna'], ['Ben']]" :tints="['both', 'both']" />
<DbTable class="res2" caption="INTERSECT ALL" code :head="['name']" :rows="[['Anna'], ['Anna'], ['Ben']]" :tints="['both', 'both', 'both']" />
</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { bothIn, chips, tintIn } from './setops'

const head = ['id', 'name']
// the chips of the names in the given rows of an input table
const names = (table: string, ...rows: number[]) => chips(table, rows, 2)
const eu = [[1, 'Anna'], [2, 'Anna'], [3, 'Ben'], [4, 'Clara'], [5, 'Emma']]
const us = [[1, 'Anna'], [2, 'Ben'], [3, 'David']]

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: colour each name by where it occurs; EXCEPT keeps the names
    // only in customers_eu
    .fromTo(...bothIn(`${names('.eu', 1, 2, 3)}, ${names('.us', 1, 2)}`))
    .fromTo(...tintIn(names('.eu', 4, 5), 'teal'), '<')
    .fromTo(...tintIn(names('.us', 3), 'purple'), '<')
    .fadeIn('.to-res')
    .fadeIn('.res1', {}, '<')
    .step()
    // click 2: EXCEPT ALL cancels rows pairwise; the second Anna has no
    // partner in customers_us, so 2 − 1 = 1 Anna stays (the sum under the
    // result tables)
    .to(names('.eu', 2), { '--both': 0, duration: 0.4 })
    .fromTo(...tintIn(names('.eu', 2), 'teal'), '<')
    .fadeIn('.sum', {}, '<')
    .fadeIn('.res2', {}, '<')
    .step()
})
</script>

# 2. Set Operations (4)

## 2.3 `EXCEPT`

- Math: $A - B = \lbrace x \in A \mid x \notin B \rbrace$
- SQL: Returns rows from the first query that are not present in the<br>second, removing duplicates
- `{sql} EXCEPT ALL` variant: keep duplicates (supported in PostgreSQL)

<Venn op="except" class="absolute left-[697px] top-[83px]" />

<div class="pipeline mt-4">
<div class="group inputs">
<DbTable class="eu" caption="customers_eu" :head="head" :rows="eu" />
<DbTable class="us" caption="customers_us" :head="head" :rows="us" />
</div>
<FlowArrow />
<div>

````md magic-move {at:2}
```sql
SELECT name FROM customers_eu
EXCEPT
SELECT name FROM customers_us;
```
```sql
SELECT name FROM customers_eu
EXCEPT ALL
SELECT name FROM customers_us;
```
````

</div>
<FlowArrow class="to-res" />
<div class="group">
<DbTable class="res1" caption="EXCEPT" code :head="['name']" :rows="[['Clara'], ['Emma']]" :tints="['teal', 'teal']" />
<DbTable class="res2" caption="EXCEPT ALL" code :head="['name']" :rows="[['Anna'], ['Clara'], ['Emma']]" :tints="['teal', 'teal', 'teal']" />
<div class="under-tables sum"><span class="table-footer">2 × Anna <span class="not-italic">−</span> 1 × Anna = 1 × Anna</span></div>
</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  tl.step()
    .fadeIn('.limit-row')
    .step()
    // click 2: the shaded lines are what LIMIT 10 applies to
    .fadeIn('.limit-row .scope')
    .step()
    .fadeIn('.paren')
    .step()
})
</script>

# Clauses after Set Operations

## Binding order

- `{sql} ORDER BY` and `{sql} LIMIT` bind to the entire combined result
- Other clauses bind to the individual `{sql} SELECT` query

<div class="limit-row pipeline bullet-indent mt-4" style="gap: 40px">
<div class="code-scope">

```sql
SELECT name FROM customers_eu
UNION
SELECT name FROM customers_us
LIMIT 10;
```

<Scope :from="1" :to="3" color="teal" label="LIMIT 10" />
</div>
<div class="text-[1.3em]">≙</div>
<div class="code-scope">

```sql
(SELECT name FROM customers_eu
UNION
SELECT name FROM customers_us)
LIMIT 10;
```

<Scope :from="1" :to="3" color="teal" label="LIMIT 10" />
</div>
</div>

<div class="paren mt-4">

- Parentheses overrule natural order

<div class="bullet-indent mt-3">
<div class="code-scope">

```sql
SELECT name FROM customers_eu
UNION
(SELECT name FROM customers_us
LIMIT 10);
```

<Scope :from="3" :to="3" color="teal" label="LIMIT 10" label-side="right" />
</div>
</div>
</div>
