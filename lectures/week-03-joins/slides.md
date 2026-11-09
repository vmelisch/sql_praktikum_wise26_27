---
theme: tud-db
title: "Week 3: Joins"
layout: cover
---

# Week 3: Joins

Data Management Lab, Winter Semester 2026/27

---
layout: two-cols-grid
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { FADED, markColor, outside, tintKeys } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // an order and the customer it belongs to share a colour in their c_id chips
  tintKeys(root)

  tl.step()
    // click 1: the implicit join
    .fadeIn('.implicit')
    .step()
    // click 2: the explicit join
    .fadeIn('.explicit')
    .step()
    // click 3: both use the same join condition, in WHERE or in ON: it in
    // blue, the rest of both queries faded
    .to(outside(root, ':is(.implicit, .explicit)', '.mark-cond'), { opacity: FADED, duration: 0.4 })
    .to(...markColor('.mark-cond', 'blue'), '<')
    .step()
})
</script>

# Introduction

::grid::

<div class="col-span-2">

## Motivation

- Goal: Combine multiple tables into one (usually by a primary and a foreign key)<br>e.g., *I want to see each order together with the customer’s name and city*

<div class="join-row bullet-indent mt-2">
<div class="inputs">
<div>

[Orders]{.table-caption}
| id | amount | c_id |
| --- | --- | --- |
| 1 | 250 | 3 |
| 2 | 99 | 1 |
| 3 | 450 | 2 |

</div>
<JoinOp />
<div>

[Customers]{.table-caption}
| c_id | name | city |
| --- | --- | --- |
| 1 | Alice | Berlin |
| 2 | Bob | Munich |
| 3 | Charlie | Hamburg |

</div>
<FlowArrow />
</div>
<div>

[Goal]{.table-caption}
| id | amount | name | city |
| --- | --- | --- | --- |
| 1 | 250 | Charlie | Hamburg |
| 2 | 99 | Alice | Berlin |
| 3 | 450 | Bob | Munich |

</div>
</div>
</div>

<div class="implicit">

## Implicit Join

- Use `{sql} WHERE` clause to filter Cartesian product

</div>

<div class="explicit">

## Explicit Join Syntax

- Use `{sql} JOIN` clause

</div>

<div class="implicit bullet-indent">

```sql
SELECT orders.id, amount, name, city
FROM orders, customers
WHERE ⟦cond:orders.c_id = customers.c_id⟧;
```

</div>

<div class="explicit">

<div class="bullet-indent">

```sql
SELECT orders.id, amount, name, city
FROM orders
JOIN customers ON ⟦cond:orders.c_id = customers.c_id⟧;
```

</div>

- Pairs rows that evaluate to `{sql} true` in the `{sql} ON` clause

</div>

---
layout: default
---

# Taxonomy

## Categorization by

- **Match Condition**: `{sql} ON`, `{sql} USING`, `{sql} NATURAL`, `{sql} CROSS`
- **Row Preservation**: `{sql} INNER`, `{sql} LEFT`, `{sql} RIGHT`, `{sql} FULL`
- **Subquery Reference**: Regular, `{sql} LATERAL`

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { FADED, markColor, outside } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // a query's join condition in blue and its comment(s) shown, the rest of
  // the query faded, like Slidev's line highlighting
  const condition = (q: string) => tl
    .to(outside(root, q, `${q} .mark-cond, ${q} .mark-why`), { opacity: FADED, duration: 0.4 })
    .to(...markColor(`${q} .mark-cond`, 'blue'), '<')
    .fadeIn(`${q} .mark-why`, {}, '<')

  tl.step()
  // click 1: the condition of the introduction's join
  condition('.q-orders')
    .step()
    // click 2: how the condition is evaluated
    .fadeIn('.evaluation')
    .step()
    // click 3: a condition on a range of dates…
    .fadeIn('.q-events')
    .step()
  // click 4: …and what it means
  condition('.q-events')
    .step()
    // click 5: a condition between two rows of the same table (a self join)…
    .to('.q-events', { opacity: 0, duration: 0.4 })
    .fadeIn('.q-students', {}, '<')
    .step()
  // click 6: …and what it means
  condition('.q-students')
    .step()
})
</script>

# Taxonomy: Match Condition (1)

## 1.1 `{sql} ON` Clause

- Define explicit condition --> most flexible
- Syntax: `{sql} ON <condition>`

<div class="q-orders bullet-indent">

```sql
SELECT orders.id, amount, name, city
FROM orders
JOIN customers ON ⟦cond:orders.c_id = customers.c_id⟧;  ⟦why:-- each order with its customer⟧
```

</div>

<div class="evaluation">

- Evaluated for every (left row, right row) pair
- If condition is `{sql} true` --> pair becomes a result row
- Must be a Boolean expression. Usually `{sql} =`, but any condition is valid.

</div>

<div class="stack bullet-indent">
<div class="q-events">

```sql
SELECT e.name, ev.event_name, ev.event_date
FROM employees e
JOIN events ev ON ⟦cond:ev.event_date⟧
⟦cond:BETWEEN e.hire_date AND e.leave_date⟧;            ⟦why:-- events during the employment⟧
```

</div>
<div class="q-students">

```sql
SELECT a.name AS student_a,
       b.name AS student_b,
       a.score, b.score
FROM students a
JOIN students b ON ⟦cond:a.id < b.id⟧                   ⟦why:-- each pair only once⟧
     ⟦cond:AND ABS(a.score - b.score) <= 10⟧;           ⟦why:-- scores at most 10 apart⟧
```

</div>
</div>

<style>
/* The two example conditions take turns in one spot. */
.stack {
  display: grid;
}
.stack > * {
  grid-area: 1 / 1;
}
</style>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { chip, column, TINT } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  // the column both tables share, in purple chips as the "same" name in the
  // text (in the output too, where it appears only once)
  for (const th of column(slide.value!, 'c_id').head)
    chip(th).style.backgroundColor = TINT.purple

  tl.step()
    // click 1: USING with the tables it joins
    .fadeIn('.using-row')
    .step()
    // click 2: SELECT * (the magic-move's {at:2}): the shared column appears
    // only once
    .fadeIn('.using-out')
    .step()
})
</script>

# Taxonomy: Match Condition (2)

## 1.2 `{sql} USING` Clause

- Shorthand when both tables share a column with the [*same*]{.shared} name (≙ `{sql} ON t1.col = t2.col`)
- Syntax: `{sql} USING (column)`

<div class="using-row bullet-indent">
<div>

````md magic-move {at:2}
```sql
SELECT orders.id, amount, name, city
FROM orders
JOIN customers USING (c_id);
```
```sql
SELECT *
FROM orders
JOIN customers USING (c_id);
```
````

</div>
<div class="flex items-start gap-8">
<div>

[Orders]{.table-caption}
| id | amount | c_id |
| --- | --- | --- |
| 1 | 250 | 3 |
| 2 | 99 | 1 |
| 3 | 450 | 2 |

</div>
<div>

[Customers]{.table-caption}
| c_id | name | city |
| --- | --- | --- |
| 1 | Alice | Berlin |
| 2 | Bob | Munich |
| 3 | Charlie | Hamburg |

</div>
</div>
</div>

<div class="using-out mt-2">

- The shared column appears only once in the output (with `{sql} ON`, once from each table)

<div class="bullet-indent">

[Output]{.table-caption}
| c_id | id | amount | name | city |
| --- | --- | --- | --- | --- |
| 3 | 1 | 250 | Charlie | Hamburg |
| 1 | 2 | 99 | Alice | Berlin |
| 2 | 3 | 450 | Bob | Munich |

</div>
</div>

<style>
/* The USING query, with the two tables it joins to its right. */
.using-row {
  display: flex;
  align-items: flex-start;
  gap: 48px;
}
</style>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { chip, chips, column, TINT, tintIn } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  const head = (table: string, name: string) => column(root.querySelector(table)!, name).head
  // the column both tables share from the start, in purple chips as on the
  // USING slide
  for (const th of head('.natural-data', 'c_id'))
    chip(th).style.backgroundColor = TINT.purple
  // the customers' column renamed at click 2, its width kept, so the shorter
  // name doesn't shift the tables beside it
  const [renamed] = head('.customers', 'customer')
  renamed.style.minWidth = `${renamed.offsetWidth}px`
  // then the column named alike by accident, in red chips: in both tables
  // and in the output
  const clash = chips([renamed, ...head('.orders', 'name'), ...head('.out-empty', 'name')])

  tl.step()
    // click 1: the join on data: only c_id is shared, so it is the whole
    // condition, and every order finds its customer
    .fadeIn('.natural-data')
    .step()
    // click 2: customer is renamed to name: now name is shared too, the
    // product's name is compared with the customer's, and no row matches
    .textSwap(clash[0], 'name', { duration: 0.5 })
    .fromTo(...tintIn(clash, 'red'), '<')
    .to('.out-ok', { opacity: 0, duration: 0.4 }, '<')
    .fadeIn('.out-empty', {}, '<')
    .fadeIn('.pitfall', {}, '<')
    .step()
})
</script>

# Taxonomy: Match Condition (3)

## 1.3 `{sql} NATURAL` Clause

- Matches on all columns with the same name in both tables
- Syntax: `{sql} NATURAL JOIN`

  ```sql
  SELECT orders.id, amount, name, city
  FROM orders
  NATURAL JOIN customers;
  ```

<div class="natural-data join-row bullet-indent mt-2">
<div class="inputs">
<div class="orders">

[Orders]{.table-caption}
| id | amount | c_id | name |
| --- | --- | --- | --- |
| 1 | 250 | 3 | Laptop |
| 2 | 99 | 1 | Mouse |
| 3 | 450 | 2 | Monitor |

</div>
<JoinOp />
<div class="customers">

[Customers]{.table-caption}
| c_id | customer | city |
| --- | --- | --- |
| 1 | Alice | Berlin |
| 2 | Bob | Munich |
| 3 | Charlie | Hamburg |

</div>
<FlowArrow />
</div>
<div class="stack">
<div class="out-ok">

[Output]{.table-caption}
| id | amount | name | city |
| --- | --- | --- | --- |
| 1 | 250 | Laptop | Hamburg |
| 2 | 99 | Mouse | Berlin |
| 3 | 450 | Monitor | Munich |

</div>
<div class="out-empty">

[Output]{.table-caption}
| id | amount | name | city |
| --- | --- | --- | --- |

[0 rows]{.table-footer}

</div>
</div>
</div>

<div class="pitfall mt-2">

- Watch out for columns that share a name by accident: once `customer` is renamed to `name`, it is compared with the product’s `name`, and no row matches

</div>

<style>
/* The output before and after the rename take turns in one spot (as in
   week 1). */
.stack {
  display: grid;
}
.stack > * {
  grid-area: 1 / 1;
}
</style>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: every order paired with every customer
    .fadeIn('.product')
    .step()
    // click 2: the comma in FROM does the same
    .fadeIn('.same-as')
    .step()
})
</script>

# Taxonomy: Match Condition (4)

<div class="aside product">

[Output: 3 × 3 rows]{.table-caption}
| id | amount | name | city |
| --- | --- | --- | --- |
| 1 | 250 | Alice | Berlin |
| 1 | 250 | Bob | Munich |
| 1 | 250 | Charlie | Hamburg |
| 2 | 99 | Alice | Berlin |
| 2 | 99 | Bob | Munich |
| 2 | 99 | Charlie | Hamburg |
| 3 | 450 | Alice | Berlin |
| 3 | 450 | Bob | Munich |
| 3 | 450 | Charlie | Hamburg |

</div>

## 1.4 `{sql} CROSS` Clause

- Produces Cartesian product
- Syntax: `{sql} CROSS JOIN`

  ```sql
  SELECT orders.id, amount, name, city
  FROM orders
  CROSS JOIN customers;
  ```

<div class="same-as">

- Same as:

  ```sql
  SELECT orders.id, amount, name, city
  FROM orders, customers;
  ```

</div>

---
layout: two-cols-header
columns: 56fr 44fr
---

# Taxonomy: Row Preservation (1)

::left::

## General

- Use join types to decide what happens to unmatched rows

<div v-click="1" class="types mt-4">

| Join Type | Unmatched rows from *left* table | Unmatched rows from *right* table |
| --- | --- | --- |
| `{sql} INNER JOIN` | [Discarded]{.discarded} | [Discarded]{.discarded} |
| `{sql} LEFT JOIN` | [Kept\*]{.kept} | [Discarded]{.discarded} |
| `{sql} RIGHT JOIN` | [Discarded]{.discarded} | [Kept\*]{.kept} |
| `{sql} FULL JOIN` | [Kept\*]{.kept} | [Kept\*]{.kept} |

[\* the other table’s columns are filled with `{sql} NULL`]{.table-footer}

</div>

::right::

<div v-click="2" class="venns">
<JoinVenn type="inner" />
<JoinVenn type="left" />
<JoinVenn type="right" />
<JoinVenn type="full" />
</div>

<style>
/* each join type on one line (the inline code keeps its spaces, so it
   wraps there unless told not to) */
.types td:first-child code {
  white-space: pre;
}
.venns {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 18px 32px;
}
</style>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide } from 'slidev-addon-gsap'
import { tintKeys } from './tints'

const slide = useSlide()
// orders and customers that find a partner share a colour in their c_id chips
onMounted(() => tintKeys(slide.value!, { 1: 'teal', 3: 'purple' }))
</script>

# Taxonomy: Row Preservation (2)

<div class="aside">
<JoinVenn type="inner" />
</div>

## 2.1 `{sql} INNER JOIN` Clause

- Returns the rows where both tables have matching values according to the join condition
- Syntax: `{sql} INNER JOIN` or simply `{sql} JOIN`

<div class="bullet-indent">

```sql
SELECT orders.id, amount, orders.c_id, name, city
FROM orders
INNER JOIN customers ON orders.c_id = customers.c_id;
```

</div>

<div class="join-row bullet-indent mt-4">
<div class="inputs">
<div>

[Orders]{.table-caption}
| id | amount | c_id |
| --- | --- | --- |
| 1 | 250 | 3 |
| 2 | 99 | 1 |
| 3 | 450 | 4 |

</div>
<JoinOp type="inner" />
<div>

[Customers]{.table-caption}
| c_id | name | city |
| --- | --- | --- |
| 1 | Alice | Berlin |
| 2 | Bob | Munich |
| 3 | Charlie | Hamburg |

</div>
<FlowArrow />
</div>
<div class="result">

[Inner Join]{.table-caption}
| id | amount | c_id | name | city |
| --- | --- | --- | --- | --- |
| 1 | 250 | 3 | Charlie | Hamburg |
| 2 | 99 | 1 | Alice | Berlin |

</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { chips, markColor, tintIn, tintKeys } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // orders and customers that find a partner share a colour in their c_id chips
  tintKeys(root, { 1: 'teal', 3: 'purple' })
  const nulls = chips([...root.querySelectorAll<HTMLElement>('.result td')].filter(td => td.textContent!.trim() === 'NULL'))

  tl.step()
    // click 1: the left table, the one LEFT JOIN keeps all rows of
    .to(...markColor('.mark-left', 'teal'))
    .fadeIn('.mark-why-left', {}, '<')
    .step()
    // click 2: the right table, which only adds its matching rows
    .to(...markColor('.mark-right', 'blue'))
    .fadeIn('.mark-why-right', {}, '<')
    .step()
    // click 3: the right table's columns, NULL for the order without a customer
    .to(...markColor('.mark-right-cols', 'blue'))
    .fadeIn('.mark-why-null', {}, '<')
    .fromTo(...tintIn(nulls, 'blue'), '<')
    .step()
})
</script>

# Taxonomy: Row Preservation (3)

<div class="aside">
<JoinVenn type="left" />
</div>

## 2.2 `{sql} LEFT JOIN` Clause

- Returns all rows from the [left table]{.kept-side} and the matching rows from the [right table]{.match-side}
- Non-matching right-side values are filled with NULLs
- Syntax: `{sql} LEFT JOIN`

<div class="bullet-indent">

```sql
SELECT orders.id, amount, orders.c_id, ⟦right-cols:name, city⟧
FROM ⟦left:orders⟧                       ⟦why-left:-- Left table⟧
LEFT JOIN ⟦right:customers⟧               ⟦why-right:-- Right table⟧
ON orders.c_id = customers.c_id;  ⟦why-null:-- no matching customer: NULLs⟧
```

</div>

<div class="join-row bullet-indent mt-4">
<div class="inputs">
<div>

[Orders]{.table-caption}
| id | amount | c_id |
| --- | --- | --- |
| 1 | 250 | 3 |
| 2 | 99 | 1 |
| 3 | 450 | 4 |

</div>
<JoinOp type="left" />
<div>

[Customers]{.table-caption}
| c_id | name | city |
| --- | --- | --- |
| 1 | Alice | Berlin |
| 2 | Bob | Munich |
| 3 | Charlie | Hamburg |

</div>
<FlowArrow />
</div>
<div class="result">

[Left Join]{.table-caption}
| id | amount | c_id | name | city |
| --- | --- | --- | --- | --- |
| 1 | 250 | 3 | Charlie | Hamburg |
| 2 | 99 | 1 | Alice | Berlin |
| 3 | 450 | 4 | `{sql} NULL` | `{sql} NULL` |

</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { chips, markColor, tintIn, tintKeys } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // orders and customers that find a partner share a colour in their c_id chips
  tintKeys(root, { 1: 'teal', 3: 'purple' })
  const nulls = chips([...root.querySelectorAll<HTMLElement>('.result td')].filter(td => td.textContent!.trim() === 'NULL'))

  tl.step()
    // click 1: the left table, which RIGHT JOIN only takes matching rows from
    .to(...markColor('.mark-left', 'blue'))
    .fadeIn('.mark-why-left', {}, '<')
    .step()
    // click 2: the right table, the one it keeps all rows of
    .to(...markColor('.mark-right', 'teal'))
    .fadeIn('.mark-why-right', {}, '<')
    .step()
    // click 3: the left table's columns, NULL for the customer without an
    // order (c_id too: it is the order's c_id)
    .to(...markColor('.mark-left-cols', 'blue'))
    .fadeIn('.mark-why-null', {}, '<')
    .fromTo(...tintIn(nulls, 'blue'), '<')
    .step()
})
</script>

# Taxonomy: Row Preservation (4)

<div class="aside">
<JoinVenn type="right" />
</div>

## 2.3 `{sql} RIGHT JOIN` Clause

- Returns all rows from the [right table]{.kept-side} and the matching rows from the [left table]{.match-side}
- Non-matching left-side values are filled with NULLs
- Syntax: `{sql} RIGHT JOIN`

<div class="bullet-indent">

```sql
SELECT ⟦left-cols:orders.id, amount, orders.c_id⟧, name, city
FROM ⟦left:orders⟧                       ⟦why-left:-- Left table⟧
RIGHT JOIN ⟦right:customers⟧              ⟦why-right:-- Right table⟧
ON orders.c_id = customers.c_id;  ⟦why-null:-- no matching order: NULLs⟧
```

</div>

<div class="join-row bullet-indent mt-4">
<div class="inputs">
<div>

[Orders]{.table-caption}
| id | amount | c_id |
| --- | --- | --- |
| 1 | 250 | 3 |
| 2 | 99 | 1 |
| 3 | 450 | 4 |

</div>
<JoinOp type="right" />
<div>

[Customers]{.table-caption}
| c_id | name | city |
| --- | --- | --- |
| 1 | Alice | Berlin |
| 2 | Bob | Munich |
| 3 | Charlie | Hamburg |

</div>
<FlowArrow />
</div>
<div class="result">

[Right Join]{.table-caption}
| id | amount | c_id | name | city |
| --- | --- | --- | --- | --- |
| 1 | 250 | 3 | Charlie | Hamburg |
| 2 | 99 | 1 | Alice | Berlin |
| `{sql} NULL` | `{sql} NULL` | `{sql} NULL` | Bob | Munich |

</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide } from 'slidev-addon-gsap'
import { tintKeys } from './tints'

const slide = useSlide()
// orders and customers that find a partner share a colour in their c_id chips
onMounted(() => tintKeys(slide.value!, { 1: 'teal', 3: 'purple' }))
</script>

# Taxonomy: Row Preservation (5)

<div class="aside">
<JoinVenn type="full" />
</div>

## 2.4 `{sql} FULL JOIN` Clause

- Returns all rows from both tables, matching where possible, and filling missing sides with `{sql} NULL`
- Syntax: `{sql} FULL JOIN`

<div class="bullet-indent">

```sql
SELECT orders.id, amount, orders.c_id, name, city
FROM orders
FULL JOIN customers
ON orders.c_id = customers.c_id;
```

</div>

<div class="join-row bullet-indent mt-4">
<div class="inputs">
<div>

[Orders]{.table-caption}
| id | amount | c_id |
| --- | --- | --- |
| 1 | 250 | 3 |
| 2 | 99 | 1 |
| 3 | 450 | 4 |

</div>
<JoinOp type="full" />
<div>

[Customers]{.table-caption}
| c_id | name | city |
| --- | --- | --- |
| 1 | Alice | Berlin |
| 2 | Bob | Munich |
| 3 | Charlie | Hamburg |

</div>
<FlowArrow />
</div>
<div class="result">

[Full Join]{.table-caption}
| id | amount | c_id | name | city |
| --- | --- | --- | --- | --- |
| 1 | 250 | 3 | Charlie | Hamburg |
| 2 | 99 | 1 | Alice | Berlin |
| 3 | 450 | 4 | `{sql} NULL` | `{sql} NULL` |
| `{sql} NULL` | `{sql} NULL` | `{sql} NULL` | Bob | Munich |

</div>
</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import type { Color } from './tints'
import { FADED, markColor, outside } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // the comments of the walk-through, in order: each stays hidden until its
  // click, so it must not be faded in with the rest before then
  const comments = ['.mark-why-each', '.mark-why-ref', '.mark-why-order, .mark-why-limit', '.mark-why-on']
  // step i of the walk-through: `marks` in their colour and the i-th comment
  // shown, the rest of the query faded, like Slidev's line highlighting
  const focus = (i: number, marks: string, color: Color) => tl
    .to(outside(root, '.lateral', [marks, ...comments.slice(i)].join(', ')), { opacity: FADED, duration: 0.4 })
    .to(marks, { opacity: 1, duration: 0.4 }, '<')
    .to(...markColor(marks, color), '<')
    .fadeIn(comments[i], {}, '<')

  tl.step()
    // click 1: the task
    .fadeIn('.example')
    .step()
    // click 2: without the "two most expensive", a plain LEFT JOIN does it
    .fadeIn('.simpler')
    .step()
    // click 3: with them, a LATERAL subquery per customer
    .fadeIn('.lateral')
    .to(...markColor('.mark-lateral', 'red'), '<')
    .step()
  // click 4: the left table: the subquery runs once per customer row
  focus(0, '.mark-outer', 'purple')
    .to('.simpler', { opacity: FADED, duration: 0.4 }, '<')
    .step()
  // click 5: it refers to that row, c, which only LATERAL allows (red, as
  // LATERAL and week 2's correlated subqueries)
  focus(1, '.mark-corr, .mark-lateral', 'red')
    .step()
  // click 6: of c's orders, the two most expensive
  focus(2, '.mark-top', 'teal')
    .step()
  // click 7: the join condition: none left to check, the subquery already
  // picked c's orders
  focus(3, '.mark-on', 'blue')
    .step()
})
</script>

# Taxonomy: Subquery Reference (1)

## General

- Joining table with **correlated subquery** requires `{sql} LATERAL` keyword
- Syntax: `{sql} LEFT JOIN LATERAL`
- Idea: For each row of the left table, evaluate the correlated subquery and join the result back to that row.

<div class="example">

- Example: *List each customer along with their two most expensive orders.*

</div>

<div class="queries bullet-indent">
<div class="lateral" data-morph="lateral-query">

```sql
SELECT c.*, top_orders.id, top_orders.amount
FROM ⟦outer:customers c⟧          ⟦why-each:-- for each customer c …⟧
LEFT JOIN ⟦lateral:LATERAL⟧ (
  SELECT o.id, o.amount
  FROM orders o
  WHERE ⟦corr:o.c_id = c.c_id⟧   ⟦why-ref:-- … take c’s orders⟧
  ⟦top:ORDER BY o.amount DESC⟧  ⟦why-order:-- most expensive first⟧
  ⟦top:LIMIT 2⟧                 ⟦why-limit:-- only two of them⟧
) AS top_orders
⟦on:ON true⟧;                  ⟦why-on:-- join all of them to c⟧
```

</div>
<div class="simpler self-center">

```sql
SELECT c.*, o.id, o.amount
FROM customers c
LEFT JOIN orders o
ON o.c_id = c.c_id;
```

*Simpler: List each customer along with ~~their two most expensive~~ orders.*

</div>
</div>

<style>
/* The LATERAL query, and the simpler join without it to its right. */
.queries {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  column-gap: 48px;
}
.simpler s {
  color: var(--db-text);
}
</style>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { ACCENT, markColor } from './tints'

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: the subquery refers to c, which it cannot see: the reference in
    // red with a squiggle, and PostgreSQL's error message
    .to(...markColor('.mark-bad', 'red'))
    .to('.mark-bad', { textDecorationColor: ACCENT.red, duration: 0.4 }, '<')
    .fadeIn('.error', {}, '<')
    .to(...markColor('.mark-err', 'red'), '<')
    .step()
})
</script>

# Taxonomy: Subquery Reference (2)

## Why do we even need the `{sql} LATERAL` keyword?

<div class="bullet-indent">
<div data-morph="lateral-query">

```sql
SELECT c.*, top_orders.id, top_orders.amount
FROM customers c
LEFT JOIN (
  SELECT o.id, o.amount
  FROM orders o
  WHERE o.c_id = ⟦bad:c.c_id⟧
  ORDER BY o.amount DESC
  LIMIT 2
) AS top_orders
ON true;
```

</div>
<div class="error mt-4">

```text
⟦err:ERROR:  invalid reference to FROM-clause entry for table "c"⟧
LINE 6:   WHERE o.c_id = c.c_id
                         ^
DETAIL:  There is an entry for table "c", but it cannot be referenced from this part of the query.
HINT:  To reference that table, you must mark this subquery with LATERAL.
```

</div>
</div>

<style>
/* psql's message is wider than any query: a size smaller, so its longest line
   fits. */
.error {
  --slidev-code-font-size: calc(9 * var(--db-pt));
}
</style>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { chips, rows, text, tintIn } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // an order's id, as a chip: in orders (column 0) and in both outputs
  // (column 3)
  const order = (id: string) => chips([
    ...rows(root, '.orders').filter(r => text(r, 0) === id).map(r => r.cells[0]),
    ...rows(root, '.outs').filter(r => text(r, 3) === id).map(r => r.cells[3]),
  ])
  const bob = chips(rows(root, '.outs').filter(r => text(r, 1) === 'Bob').map(r => r.cells[1]))

  tl.step()
    // click 1: the plain LEFT JOIN: every order of every customer
    .fadeIn('.plain')
    .step()
    // click 2: LATERAL: per customer only the two most expensive orders
    // (teal); Alice's third one is cut off by LIMIT 2 (red)
    .fadeIn('.top2')
    .fromTo(...tintIn([...order('5'), ...order('4'), ...order('1')], 'teal'), '<')
    .fromTo(...tintIn(order('2'), 'red'), '<')
    .step()
    // click 3: Bob, who has no orders, is kept by LEFT JOIN … ON true
    .fadeIn('.keep-bob')
    .fromTo(...tintIn(bob, 'purple'), '<')
    .step()
})
</script>

# Taxonomy: Subquery Reference (3)

<div class="aside orders">

[Orders]{.table-caption}
| id | amount | c_id |
| --- | --- | --- |
| 1 | 250 | 3 |
| 2 | 99 | 1 |
| 3 | 450 | 4 |
| 4 | 120 | 1 |
| 5 | 300 | 1 |

</div>

## Example on data

- *List each customer along with their two most expensive orders.*

<div class="outs bullet-indent">
<div class="plain">

[Simpler: `{sql} LEFT JOIN orders o`]{.table-caption}
| c_id | name | city | id | amount |
| --- | --- | --- | --- | --- |
| 3 | Charlie | Hamburg | 1 | 250 |
| 1 | Alice | Berlin | 2 | 99 |
| 1 | Alice | Berlin | 4 | 120 |
| 1 | Alice | Berlin | 5 | 300 |
| 2 | Bob | Munich | `{sql} NULL` | `{sql} NULL` |

</div>
<div class="top2">

[`{sql} LEFT JOIN LATERAL (… LIMIT 2)`]{.table-caption}
| c_id | name | city | id | amount |
| --- | --- | --- | --- | --- |
| 1 | Alice | Berlin | 5 | 300 |
| 1 | Alice | Berlin | 4 | 120 |
| 2 | Bob | Munich | `{sql} NULL` | `{sql} NULL` |
| 3 | Charlie | Hamburg | 1 | 250 |

</div>
</div>

<div class="keep-bob">

- `{sql} LEFT JOIN LATERAL … ON true` keeps customers without orders; `{sql} CROSS JOIN LATERAL` and `{sql} FROM customers c, LATERAL (…)` drop them

</div>

<style>
/* The two outputs side by side, lined up at the top. */
.outs {
  display: flex;
  align-items: flex-start;
  gap: 28px;
}
</style>

---
layout: default
---

<script setup lang="ts">
import type { JoinNode } from './joins'

// customers ⟕ orders first, then its result ⟖ shipments
const sequential: JoinNode = { op: 'right', left: { op: 'left', left: 'customers', right: 'orders' }, right: 'shipments' }
// the parentheses join orders ⟖ shipments first, then customers ⟕ that
const nested: JoinNode = { op: 'left', left: 'customers', right: { op: 'right', left: 'orders', right: 'shipments' } }
</script>

# Join Order with Multiple Consecutive Joins (1)

## Join Order

- Rule of Thumb: Joins are processed **sequentially from top to bottom**<br>i.e. *result from the first join becomes the left input for the second join*

<div class="order">
<div class="bullet-indent" data-morph="order-seq">

```sql
SELECT *
FROM customers c
LEFT JOIN orders o ON o.c_id = c.c_id
RIGHT JOIN shipments s ON s.order_id = o.id;
```

</div>
<JoinTree :tree="sequential" />
<div v-click="1" class="across">

- Parentheses overwrite the natural order

</div>
<div v-click="2" class="bullet-indent" data-morph="order-nested">

```sql
SELECT *
FROM customers c
LEFT JOIN (
  orders o
  RIGHT JOIN shipments s
  ON s.order_id = o.id
) ON o.c_id = c.c_id;
```

</div>
<JoinTree v-click="2" :tree="nested" />
</div>

<style>
/* Each query with its join tree to the right; the trees share a column. */
.order {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
  column-gap: 64px;
}
.order > .across {
  grid-column: 1 / -1;
}
</style>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { chips, rows, text, tintIn } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  // shipment 2, of order 3, which has no customer: only the RIGHT JOIN keeps
  // it (its id, as a chip, in shipments and in the first output)
  const ship2 = chips([
    ...rows(root, '.shipments').filter(r => text(r, 0) === '2').map(r => r.cells[0]),
    ...rows(root, '.out-seq').filter(r => text(r, 2) === '2').map(r => r.cells[2]),
  ])
  // Alice and Bob, who have no shipped order: only the outer LEFT JOIN keeps
  // them (their names, as chips, in customers and in the second output)
  const unshipped = (r: HTMLTableRowElement, col: number) => ['Alice', 'Bob'].includes(text(r, col))
  const customers = chips([
    ...rows(root, '.customers').filter(r => unshipped(r, 1)).map(r => r.cells[1]),
    ...rows(root, '.out-nested').filter(r => unshipped(r, 0)).map(r => r.cells[0]),
  ])

  tl.step()
    // click 1: top to bottom, the RIGHT JOIN comes last: it keeps every
    // shipment, and Alice and Bob are lost
    .fadeIn('.out-seq')
    .fromTo(...tintIn(ship2, 'purple'), '<')
    .step()
    // click 2: with the parentheses, the LEFT JOIN comes last: it keeps every
    // customer, and shipment 2 is lost
    .fadeIn('.out-nested')
    .fromTo(...tintIn(customers, 'teal'), '<')
    .step()
    // click 3: what follows
    .fadeIn('.conclusion')
    .step()
})
</script>

# Join Order with Multiple Consecutive Joins (2)

<div class="aside inputs-stack">
<div class="customers">

[Customers]{.table-caption}
| c_id | name |
| --- | --- |
| 1 | Alice |
| 2 | Bob |
| 3 | Charlie |

</div>
<div>

[Orders]{.table-caption}
| id | c_id |
| --- | --- |
| 1 | 3 |
| 2 | 1 |
| 3 | 4 |

</div>
<div class="shipments">

[Shipments]{.table-caption}
| id | order_id |
| --- | --- |
| 1 | 1 |
| 2 | 3 |

</div>
</div>

## Same joins, different order, different result

<div class="order-out bullet-indent">
<div data-morph="order-seq">

```sql
SELECT c.name, o.id AS o_id, s.id AS s_id
FROM customers c
LEFT JOIN orders o ON o.c_id = c.c_id
RIGHT JOIN shipments s ON s.order_id = o.id;
```

</div>
<div class="out-seq">

[Output]{.table-caption}
| name | o_id | s_id |
| --- | --- | --- |
| Charlie | 1 | 1 |
| `{sql} NULL` | `{sql} NULL` | 2 |

</div>
<div data-morph="order-nested">

```sql
SELECT c.name, o.id AS o_id, s.id AS s_id
FROM customers c
LEFT JOIN (
  orders o
  RIGHT JOIN shipments s
  ON s.order_id = o.id
) ON o.c_id = c.c_id;
```

</div>
<div class="out-nested">

[Output]{.table-caption}
| name | o_id | s_id |
| --- | --- | --- |
| Charlie | 1 | 1 |
| Bob | `{sql} NULL` | `{sql} NULL` |
| Alice | `{sql} NULL` | `{sql} NULL` |

</div>
</div>

<div class="conclusion mt-2">

::takeaway
With outer joins, the join order changes the result
::

</div>

<style>
/* The input tables stacked in the top-right corner. */
.inputs-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* Each query with its output to the right. */
.order-out {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: start;
  gap: 12px 32px;
}
</style>

---
layout: default
---

# Summary

<div class="table-w summary">

| Category | Variants | Decides |
| --- | --- | --- |
| Match Condition | `{sql} ON`, `{sql} USING`, `{sql} NATURAL`, `{sql} CROSS` | which (left row, right row) pairs match |
| Row Preservation | `{sql} INNER`, `{sql} LEFT`, `{sql} RIGHT`, `{sql} FULL` | whether unmatched rows are kept, filled up with `{sql} NULL` |
| Subquery Reference | Regular, `{sql} LATERAL` | whether a subquery may refer to the tables to its left |

</div>

<div class="h-4" />

::takeaway
A join pairs the rows that meet its condition; the join type decides what happens to the rest, and with outer joins, so does the order of the joins.
::
