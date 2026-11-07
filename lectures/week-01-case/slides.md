---
theme: tud-db
title: "Week 1: CASE Expressions"
layout: cover
---

# Week 1: CASE Expressions

Practical Course: SQL, Winter Semester 2026/27

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  // click 1: the example query (it moves on to the next slide)
  tl.step().fadeIn('.query').step()
})
</script>

# CASE Expressions (1)

## Conditionally map values

- Like a `switch` (in Python `{python} match`): maps each case to its own value
- The first matching `{sql} WHEN` wins
- Optional `{sql} ELSE` as default; without it, the result is `{sql} NULL`
- All results must have compatible types

<div class="bullet-indent mt-3">
<div class="query w-fit" data-morph="case-query">

```sql
SELECT title,
    revenue,
    CASE
        WHEN revenue >= 750 THEN 'block buster'
        WHEN revenue <  750 THEN 'flop'
        ELSE 'unknown'
    END AS success
FROM movies;
```

</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import type { Color } from './tints'
import { FADED, markColor, outside, tintIn } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // output cell in row r, column c (1-based)
  const cell = (r: number, c: number) => `.output tbody tr:nth-child(${r}) td:nth-child(${c})`
  // one part of the query in its colour and its comment shown, the rest faded
  // like Slidev's line highlighting (comments of earlier clicks too, but not
  // the ones still `hidden` for later clicks). A part highlighted earlier keeps
  // its colour; one faded earlier comes back.
  const focus = (mark: string, comment: string, color: Color, hidden = '') => tl
    .to(outside(root, '.query', [mark, comment, hidden].filter(Boolean).join(', ')), { opacity: FADED, duration: 0.4 })
    .to(mark, { opacity: 1, duration: 0.4 }, '<')
    .to(...markColor(mark, color), '<')
    .fadeIn(comment, {}, '<')

  tl.step()
    // click 1: what the query returns
    .fadeIn('.output')
    .step()
  // click 2: the WHEN arms, and the rows whose revenue one of them matches
  focus('.mark-when', '.mark-why-when', 'teal', '.mark-why-else, .mark-why-alias')
    .fromTo(...tintIn(`${cell(1, 2)}, ${cell(1, 3)}, ${cell(3, 2)}, ${cell(3, 3)}`, 'teal'), '<')
    .step()
  // click 3: ELSE takes the row neither arm matches: NULL >= 750 and
  // NULL < 750 are both unknown
  focus('.mark-else', '.mark-why-else', 'red', '.mark-why-alias')
    .fromTo(...tintIn(`${cell(2, 2)}, ${cell(2, 3)}`, 'red'), '<')
    .step()
  // click 4: the alias names the output column
  focus('.mark-alias', '.mark-why-alias', 'purple')
    .fromTo(...tintIn('.output th:nth-child(3)', 'purple'), '<')
    .step()
})
</script>

# CASE Expressions (2)

<div class="query w-fit" data-morph="case-query">

```sql
SELECT title,
    revenue,
    CASE
        ⟦when:WHEN revenue >= 750 THEN 'block buster'⟧  ⟦why-when:-- Distinguish different cases⟧
        ⟦when:WHEN revenue <  750 THEN 'flop'⟧
        ⟦else:ELSE 'unknown'⟧                           ⟦why-else:-- Default branch (NULL >= 750 is UNKNOWN)⟧
    END ⟦alias:AS success⟧                               ⟦why-alias:-- Use column alias for meaningful output name!⟧
FROM movies;
```

</div>

<div class="output mt-3">

[Output]{.table-caption}
| title | revenue | success |
| --- | --- | --- |
| Secret Life of Penguins | 1000 | block buster |
| Big Explosions IIV | `{sql} NULL` | unknown |
| Murder in SQL City | 500 | flop |

</div>

---
layout: two-cols-grid
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { FADED, markColor, outside } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // a form's condition parts in blue, the rest of its query faded
  const conditions = (code: string) => tl
    .to(outside(root, code, '.mark-cond'), { opacity: FADED, duration: 0.4 })
    .to(...markColor(`${code} .mark-cond`, 'blue'), '<')

  tl.step()
    // click 1: the general form's query
    .fadeIn('.general-code')
    .step()
  // click 2: a whole boolean expression in each arm
  conditions('.general-code')
    .step()
    // click 3: the simple form
    .fadeIn('.simple')
    .step()
    // click 4: its query
    .fadeIn('.simple-code')
    .step()
  // click 5: one operand after CASE, tested against a constant in each arm
  conditions('.simple-code')
    .step()
})
</script>

# Two versions of CASE

::grid::

<div>

## General form

- Arbitrary boolean expressions in each `{sql} WHEN`-arm, e.g. `{sql} revenue IS NULL`

</div>

<div class="simple">

## Shorthand/simple form

- Compares one expression against a list of values
- Equality only, so `{sql} WHEN NULL` never matches

</div>

<div class="general-code bullet-indent">

```sql
SELECT title,
    revenue,
    CASE
        WHEN ⟦cond:revenue >= 750⟧
            THEN 'block buster'
        WHEN ⟦cond:revenue <  750⟧
            THEN 'flop'
        ELSE 'unknown'
    END AS success
FROM movies;
```

</div>

<div class="simple-code bullet-indent">

```sql
SELECT title,
    revenue,
    CASE ⟦cond:release_type⟧
        WHEN ⟦cond:'cinema'⟧
            THEN 200 * count_cinemas
        WHEN ⟦cond:'digital'⟧
            THEN 0
    END AS logistics_cost
FROM movies;
```

</div>

---
layout: default
codeSize: "calc(10 * var(--db-pt))"
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { FADED, markColor, outside, tintIn } from './tints'

const tl = useTl()
const slide = useSlide()
onMounted(() => {
  const root = slide.value!
  // the bookings' payment cells of one type, e.g. pay('online')
  const payments = [...root.querySelectorAll<HTMLElement>('.bookings tbody td:nth-child(2)')]
  const pay = (type: string) => payments.filter(td => td.textContent!.trim() === type)
  // an output column, header included
  const col = (c: number) => `.output :is(th, td):nth-child(${c})`

  tl.step()
    // click 1: the query
    .fadeIn('.query')
    .step()
    // click 2: its output
    .fadeIn('.output')
    .step()
    // click 3: the pivot: each payment type becomes a column of its own, which
    // counts the bookings of that type per title. The type and its column in
    // the query in colour, the rest of the query faded (but not the comments,
    // still hidden for clicks 4 and 5).
    .to(outside(root, '.query', '.mark-online, .mark-register, .mark-voucher, .mark-why-null, .mark-why-sum'), { opacity: FADED, duration: 0.4 })
    .to(...markColor('.mark-online', 'blue'), '<')
    .to(...markColor('.mark-register', 'red'), '<')
    .to(...markColor('.mark-voucher', 'purple'), '<')
    .fromTo(...tintIn(pay('online'), 'blue'), '<')
    .fromTo(...tintIn(pay('register'), 'red'), '<')
    .fromTo(...tintIn(pay('voucher'), 'purple'), '<')
    .fromTo(...tintIn(col(2), 'blue'), '<')
    .fromTo(...tintIn(col(3), 'red'), '<')
    .fromTo(...tintIn(col(4), 'purple'), '<')
    .step()
    // click 4: why that works: without ELSE, a CASE gives NULL for the other
    // payments, and COUNT skips NULLs
    .fadeIn('.mark-why-null')
    .step()
    // click 5: the counterexample: SUM instead of COUNT. SUM of only NULLs is
    // NULL, so the 0s become NULLs (two output tables, identical but for those
    // cells, take turns in one spot)
    .to('.mark-count', { opacity: 1, duration: 0.4 })
    .textSwap('.mark-count', 'SUM', { duration: 0.4 }, '<')
    .to('.out-count', { opacity: 0, duration: 0.4 }, '<')
    .fadeIn('.out-sum', {}, '<')
    .fadeIn('.mark-why-sum', {}, '<')
    .step()
    // click 6: PostgreSQL's shorthand for a conditional aggregate
    .fadeIn('.shorthand')
    .step()
})
</script>

# CASE Expressions (3)

<div class="aside bookings">

[bookings]{.table-caption}
| title | payment |
| --- | --- |
| Secret Life of Penguins | online |
| Murder in SQL City | register |
| Secret Life of Penguins | voucher |
| Big Explosions IIV | register |
| Secret Life of Penguins | online |
| Murder in SQL City | online |

</div>

## Often used for conditional aggregation

- E.g. sum/count all bookings of a certain type
- Also usable to pivot a dataset!

<div class="shorthand">

- PostgreSQL shorthand: `{sql} COUNT(*) FILTER (WHERE payment = 'online')`

</div>

<div class="bullet-indent">
<div class="query mt-3">

```sql
SELECT title,
    ⟦count:COUNT⟧(CASE WHEN payment = ⟦online:'online'⟧ THEN 1 END) AS ⟦online:online_bookings⟧,
    ⟦count:COUNT⟧(CASE WHEN payment = ⟦register:'register'⟧ THEN 1 END) AS ⟦register:local_bookings⟧,
    ⟦count:COUNT⟧(CASE WHEN payment = ⟦voucher:'voucher'⟧ THEN 1 END) AS ⟦voucher:voucher_bookings⟧
FROM bookings    ⟦why-null:-- no ELSE: other payments give NULL, which COUNT skips⟧
GROUP BY title;  ⟦why-sum:-- but the SUM of only NULLs is NULL, not 0⟧
```

</div>
<div class="output mt-3">

[Output]{.table-caption}

<div class="stack">
<div class="out-count">

| title | online_bookings | local_bookings | voucher_bookings |
| --- | --- | --- | --- |
| Big Explosions IIV | 0 | 1 | 0 |
| Murder in SQL City | 1 | 1 | 0 |
| Secret Life of Penguins | 2 | 0 | 1 |

</div>
<div class="out-sum">

| title | online_bookings | local_bookings | voucher_bookings |
| --- | --- | --- | --- |
| Big Explosions IIV | `{sql} NULL` | 1 | `{sql} NULL` |
| Murder in SQL City | 1 | 1 | `{sql} NULL` |
| Secret Life of Penguins | 2 | `{sql} NULL` | 1 |

</div>
</div>
</div>
</div>

<style>
/* COUNT is retyped as SUM at click 5. Shiki splits the word into two spans, so
   the whole mark is retyped, and the mark carries the function colour itself
   (as Slidev colours code: through --shiki-light) so the new text keeps it. */
.mark-count {
  --shiki-light: #1e66f5;
}
/* The COUNT and the SUM output take turns in one spot (click 5). */
.stack {
  display: grid;
}
.stack > * {
  grid-area: 1 / 1;
}
</style>

<!--
null im count wird ignoriert
implizit null
gegenbeispiel LIMIT/OFFSET
gegenbeispiel SUM()

visualisierung/benchmarking ist da

CASE wird auf jede Zeile aus dem FROM angewendet
-->

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  // click 1: a query built from nothing but expressions; at click 2 (the
  // magic-move's {at:2}) one of them unfolds into a CASE with expressions inside
  tl.step().fadeIn('.template').step()
})
</script>

# Expressions in general

- Expressions are one of the fundamental building blocks of SQL
  - Constants, column references, function calls, aggregates, scalar subqueries, … and many more!
- `{sql} CASE` is itself an expression, so it can be nested in other expressions!

<div class="template bullet-indent mt-3">

````md magic-move {at:2}
```sql
SELECT <expression>,
    <expression>,
    <expression> AS success
FROM <expression>
WHERE <expression>;
```
```sql
SELECT <expression>,
    <expression>,
    CASE
        WHEN <expression> THEN <expression>
        WHEN <expression> THEN <expression>
        ELSE <expression>
    END AS success
FROM <expression>
WHERE <expression>;
```
````

</div>

<!--
bogen zu anderen programmiersprachen schlagen?

expression statt movies
-->

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { ACCENT, markColor } from './tints'

const tl = useTl()
onMounted(() => {
  // the part of a query that is an error: red, with an editor-style squiggle,
  // and the comment that says why
  const error = (mark: string, comment: string) => tl
    .to(...markColor(mark, 'red'))
    .to(mark, { textDecorationColor: ACCENT.red, duration: 0.4 }, '<')
    .fadeIn(comment, {}, '<')

  tl.step()
    // click 1: an integer as the WHERE condition…
    .fadeIn('.bool-bad')
    .step()
  // click 2: …is an error
  error('.mark-not-bool', '.mark-why-bool')
    .step()
    // click 3: the fix, a cast to boolean (the comment stays where it is: both
    // versions have it in the same column)
    .to('.bool-bad', { opacity: 0, duration: 0.4 })
    .fadeIn('.bool-fix', {}, '<')
    .to(...markColor('.mark-fix-bool', 'teal'), '<')
    .step()
    // click 4: an aggregate in WHERE…
    .fadeIn('.agg-bad')
    .step()
  // click 5: …is an error too
  error('.mark-agg', '.mark-why-agg')
    .step()
    // click 6: the fix: group, and filter the groups with HAVING (the comment
    // stays where it is, as at click 3)
    .to('.agg-bad', { opacity: 0, duration: 0.4 })
    .fadeIn('.agg-fix', {}, '<')
    .to(...markColor('.mark-fix-agg', 'teal'), '<')
    .step()
    // click 7: a CASE with a scalar subquery as the grouping key…
    .fadeIn('.valid')
    .step()
    // click 8: …is fine
    .fadeIn('.mark-why-valid')
    .step()
})
</script>

# Not all expressions are equal

## There are always special cases to keep in mind:

<div class="bullet-indent">

<div class="stack">
<div class="bool-bad">

```sql
SELECT *
FROM movies
WHERE ⟦not-bool:revenue⟧;             ⟦why-bool:-- WHERE expects a Boolean expression!⟧
```

</div>
<div class="bool-fix">

```sql
SELECT *
FROM movies
WHERE ⟦fix-bool:revenue::bool⟧;       -- WHERE expects a Boolean expression!
```

</div>
</div>

<div class="stack mt-4">
<div class="agg-bad">

```sql
SELECT *
FROM movies
WHERE ⟦agg:sum(revenue)⟧ > 10;   ⟦why-agg:-- Aggregate expressions can only go in SELECT and HAVING clauses⟧
```

</div>
<div class="agg-fix">

```sql
SELECT title FROM movies
GROUP BY title
⟦fix-agg:HAVING sum(revenue) > 10⟧;  -- Aggregate expressions can only go in SELECT and HAVING clauses
```

</div>
</div>

<div class="valid mt-4">

```sql
SELECT sum(revenue)
FROM movies
GROUP BY CASE
    WHEN (SELECT sum(revenue) FROM movies) = 1000
        THEN title
    ELSE release_type
END;                       ⟦why-valid:-- Completely valid!⟧
```

</div>

</div>

<style>
/* The broken query and its fix take turns in one spot; their identical lines
   overlap exactly, so only the change shows. */
.stack {
  display: grid;
}
.stack > * {
  grid-area: 1 / 1;
}
</style>
