---
theme: tud-db
title: "Week 2: Subqueries"
layout: cover
---

# Week 2: Subqueries

Data Management Lab, Winter Semester 2026/27

---
layout: two-cols-grid
columns: 1fr 190px
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { markColor, markReset } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const bullet = (n: number) => `.using > ul > li:nth-child(${n})`
  // the first bullet's words for the two statements: its 1st and 2nd SELECT
  const innerWord = `${bullet(1)} code:nth-of-type(1)`
  const outerWord = `${bullet(1)} code:nth-of-type(2)`
  const inner = '.query .mark-isel, .query .mark-inner'
  // the original colours, read before anything is recoloured
  const resetSelects = markReset(slide.value!, `.query .mark-osel, ${innerWord}, ${outerWord}`)
  const resetInner = markReset(slide.value!, inner)

  tl.step()
    // click 1: naïve step 1, compute the average on its own
    .fadeIn('.naive > h2, .naive > ol > li:nth-child(1)')
    .step()
    // click 2: naïve step 2, paste that number into the filter
    .fadeIn('.naive > ol > li:nth-child(2)')
    .step()
    // click 3: a subquery does both at once: an inner SELECT within an outer
    // SELECT, coloured alike in the bullet and the query
    .fadeIn(`.using > h2, ${bullet(1)}`)
    .fadeIn('.query', {}, '<')
    .to(...markColor(`.query .mark-osel, ${outerWord}`, 'red'))
    .to(...markColor(`.query .mark-isel, ${innerWord}`, 'teal'), '<')
    .step()
    // click 4: the inner query runs first and passes its result on
    .fadeIn(bullet(2))
    .to(...resetSelects, '<')
    .to(...markColor(inner, 'teal'), '<')
    .step()
    // click 5: the parentheses it needs, in yellow in the query and the
    // bullet; the inner query plain again
    .fadeIn(bullet(3))
    .to(...resetInner, '<')
    .to(...markColor(`.query .mark-paren, ${bullet(3)} code`, 'yellow'), '<')
    .step()
})
</script>

# Introduction (1)

::grid::

<div>

## Motivation

- Goal: Find employees earning above company average salary
- Challenge: Average salary is a dynamic value subject to table updates

<div class="naive">

## Naïve approach

1. Calculate average

   ```sql
   SELECT AVG(salary) FROM employees; -- yields 4900
   ```

2. Filter employees accordingly

   ```sql
   SELECT name FROM employees WHERE salary > 4900;
   ```

</div>
</div>

<div class="table-w">

[employees]{.table-caption}
| name | salary |
| --- | --- |
| Daniel Krueger | 4867 |
| Sofia Weber | 6074 |
| Lukas Brandt | 3854 |
| Amelie Fischer | 5291 |
| Jonas Hartmann | 4414 |

</div>

<div class="using">

## Using subqueries

- Use inner `{sql} SELECT` statement nested within an outer `{sql} SELECT`, `{sql} INSERT`, `{sql} UPDATE`, or `{sql} DELETE` statement
- Inner query is executed first and passes result to outer query
- Must be enclosed in parentheses `( )`

</div>

<div class="query">

```sql
⟦osel:SELECT⟧ name
FROM employees
WHERE salary > ⟦paren:(⟧
  ⟦isel:SELECT⟧⟦inner: AVG(salary)⟧
  ⟦inner:FROM employees⟧
⟦paren:)⟧;
```

</div>

---
layout: two-cols-grid
columns: 1fr 190px
morph:
  duration: 0.9
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  tl.step()
  // clicks 1–3: one result shape per click, each with an example query
  for (const i of [1, 2, 3])
    tl.fadeIn(`.taxonomy ol ol > li:nth-child(${i})`).step()
  // click 4: why the shape matters, and the clauses a subquery can sit in
  tl.fadeIn('.where').step()
})
</script>

# Introduction (2)

::grid::

<div class="taxonomy">

## Taxonomy

- Categorization by **Result Shape** and **Execution Logic**

1. Subquery Result Shape
   1. **Scalar Subquery**: Returns scalar value (shape: $1 \times 1$)
      ```sql
      SELECT AVG(salary) FROM employees;
      ```
   2. **Column / Row Subquery**: Returns a column (shape: $N \times 1$) or a row (shape: $1 \times M$)
      ```sql
      SELECT salary * 12 FROM employees;
      ```
   3. **Derived Tables**: Returns table (shape: $N \times M$)
      ```sql
      SELECT name, salary FROM employees WHERE name LIKE 'A%';
      ```

</div>

<div class="table-w">

[employees]{.table-caption}
| name | salary |
| --- | --- |
| Daniel Krueger | 4867 |
| Sofia Weber | 6074 |
| Lukas Brandt | 3854 |
| Amelie Fischer | 5291 |
| Jonas Hartmann | 4414 |

</div>

<div class="where">

::takeaway
Result shape decides where (`{sql} SELECT`, `{sql} WHERE`, `{sql} FROM`, `{sql} HAVING`, `{sql} JOIN`) a subquery can be used
::

</div>

<div class="where map" data-morph="skeleton">

```sql
SELECT column
FROM table
JOIN table ON condition
WHERE condition
GROUP BY column
HAVING condition;
```

</div>

---
layout: two-cols-grid
columns: 1fr auto
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: the first clause a scalar subquery can sit in
    .fadeIn('.in-select')
    .step()
    // click 2: the example query
    .fadeIn('.in-select .slidev-code-wrapper')
    .step()
    // click 3: its output
    .fadeIn('.output')
    .step()
})
</script>

# 1. Scalar Subqueries (1)

::grid::

<div>

## General

- Returns single value (shape: $1 \times 1$) e.g., `{sql} 42`, `{sql} 3.14`, `{sql} 'Amelie Fischer'`
- Used in: `{sql} SELECT`, `{sql} WHERE`, `{sql} HAVING`
- Treated as a constant by the outer query during execution

</div>

<div class="map" data-morph="skeleton">

```sql {1,4,6}
SELECT column
FROM table
JOIN table ON condition
WHERE condition
GROUP BY column
HAVING condition;
```

</div>

<div class="in-select">

## 1.1 In `SELECT` Clause

- Extend the projection
- Example: *Comparing individual salary against average salary.*

  ```sql
  SELECT
    name,
    salary - (SELECT AVG(salary) FROM employees) AS diff
  FROM employees;
  ```

</div>

<div class="output">

[Output]{.table-caption}
| name | salary | diff |
| --- | --- | --- |
| Daniel Krueger | 4867 | -33 |
| Sofia Weber | 6074 | 1174 |
| Lukas Brandt | 3854 | -1046 |
| Amelie Fischer | 5291 | 391 |
| Jonas Hartmann | 4414 | -486 |

</div>

---
layout: two-cols-grid
columns: 1fr auto
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { markColor } from './tints'

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: the WHERE example
    .fadeIn('.in-where .slidev-code-wrapper')
    .step()
    // click 2: the subquery is just a value, 4900, which makes the output easy
    // to check
    .to(...markColor('.in-where .mark-sub', 'teal'))
    .fadeIn('.in-where .brace', {}, '<')
    .fadeIn('.out-where', {}, '<')
    .step()
    // click 3: HAVING, and the departments the employees belong to
    .fadeIn('.in-having')
    .fadeIn('.employees', {}, '<')
    .step()
    // click 4: the HAVING example and its output
    .fadeIn('.in-having .slidev-code-wrapper')
    .fadeIn('.out-having', {}, '<')
    .step()
})
</script>

# 1. Scalar Subqueries (2)

::grid::

<div class="in-where">

## 1.2 In `WHERE` Clause

- **Dynamic filtering** of rows
- Standard operators: `{sql} =`, `{sql} <>`, `{sql} <`, `{sql} <=`, `{sql} >`, `{sql} >=`
- Example: *Find employees with above average salary.*

  ```sql
  SELECT name, salary
  FROM employees
  WHERE salary > ⟦sub:(SELECT AVG(salary) FROM employees)⟧;
  ```

  <div class="brace" style="--from: 15; --len: 35"><span>4900</span></div>

</div>

<div class="out-where">

[Output]{.table-caption}
| name | salary |
| --- | --- |
| Sofia Weber | 6074 |
| Amelie Fischer | 5291 |

</div>

<div class="in-having">

## 1.3 In `HAVING` Clause

- **Dynamic filtering** of aggregated groups
- Example: *Find departments with below average salary.*

  ```sql
  SELECT dep_id, AVG(salary) AS average
  FROM employees
  GROUP BY dep_id
  HAVING AVG(salary) <
    (SELECT AVG(salary) FROM employees);
  ```

</div>

<div class="flex items-start gap-3">
<div class="employees">

[employees]{.table-caption}
| name | salary | dep_id |
| --- | --- | --- |
| Daniel Krueger | 4867 | 268 |
| Sofia Weber | 6074 | 192 |
| Lukas Brandt | 3854 | 451 |
| Amelie Fischer | 5291 | 192 |
| Jonas Hartmann | 4414 | 268 |

</div>
<div class="out-having">

[Output]{.table-caption}
| dep_id | average |
| --- | --- |
| 268 | 4640.5 |
| 451 | 3854 |

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
    // click 1: column subqueries and the operators that take them
    .fadeIn('.column')
    .step()
    // click 2: the example, first with a fixed list of departments; at
    // click 3 the list becomes a subquery (the magic-move's {at:3})
    .fadeIn('.example')
    .step()
})
</script>

# 2. Column / Row Subqueries (1)

<div class="aside">
<div>

[departments]{.table-caption}
| id | location |
| --- | --- |
| 268 | Dresden |
| 192 | Berlin |
| 451 | Cologne |
| 144 | Munich |

</div>
<div class="map">

```sql {4}
SELECT column
FROM table
JOIN table ON condition
WHERE condition
GROUP BY column
HAVING condition;
```

</div>
</div>

## General

- Returns a column (shape: $N \times 1$) or a row (shape: $1 \times M$)
- Used in: `{sql} WHERE`

<div class="column">

## 2.1 Column Subqueries within `WHERE` Clause

- Check membership within a dynamic list
- Key operators
  - `{sql} IN` / `{sql} NOT IN`: Is the value part of the set?
  - `{sql} ANY` / `{sql} SOME`: Compare the value to at least one element of the set (e.g., `{sql} > ANY` means “greater than the minimum”)
  - `{sql} ALL`: Compare the value to every element in the set (e.g., `{sql} > ALL` means “greater than the maximum”)
  - `{sql} EXISTS`: Check if at least one row is returned

</div>

<div class="example">

- Example: *Find all employees working outside Berlin.*

  ````md magic-move {at:3}
  ```sql
  SELECT name FROM employees
  WHERE dep_id IN (268, 451, 144);
  ```
  ```sql
  SELECT name FROM employees
  WHERE dep_id IN (SELECT id FROM departments WHERE location <> 'Berlin');
  ```
  ````

</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import { clear, DEPT, TINT } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const rows = [...slide.value!.querySelectorAll<HTMLTableRowElement>('.employees tbody tr')]
  const text = (row: HTMLTableRowElement, col: number) => row.cells[col].textContent!.trim()
  // the subquery's row: Daniel's (dep_id, role); and the other employees whose
  // (dep_id, role) equals it, in his department's colour. Lukas shares only
  // the role, so he stays clear.
  const daniel = rows.find(r => text(r, 0) === 'Daniel Krueger')!
  const [depId, role] = [text(daniel, 2), text(daniel, 1)]
  const others = rows.filter(r => r !== daniel && text(r, 2) === depId && text(r, 1) === role)
  const tint = TINT[DEPT[depId]]
  const fill = (cells: HTMLElement[]) =>
    tl.fromTo(cells, { backgroundColor: clear(tint) }, { backgroundColor: tint, duration: 0.4 })

  tl.step()
  // click 1: the magic-move's {at:1}, one scalar subquery per column
  // collapsing into a single row subquery
  tl.step()
  // click 2: what the subquery returns, (268, 'Developer')
  fill([daniel.cells[1], daniel.cells[2]])
  tl.step()
  // click 3: the other rows that equal it in both columns
  fill(others.flatMap(r => [r.cells[1], r.cells[2]]))
  tl.step()
})
</script>

# 2. Column / Row Subqueries (2)

<div class="aside employees">

[employees]{.table-caption}
| name | role | dep_id |
| --- | --- | --- |
| Daniel Krueger | Developer | 268 |
| Sofia Weber | Manager | 192 |
| Lukas Brandt | Developer | 451 |
| Amelie Fischer | Analyst | 192 |
| Jonas Hartmann | Developer | 268 |

</div>

## 2.2 Row Subqueries within `WHERE` Clause

- Compares several columns at once
- Comparison typically using `{sql} =`
- Example: *Find everyone with the same role in the same department as Daniel Krueger.*

  ````md magic-move {at:1}
  ```sql
  SELECT name FROM employees
  WHERE dep_id = (
      SELECT dep_id FROM employees
      WHERE name = 'Daniel Krueger')
    AND role = (
      SELECT role FROM employees
      WHERE name = 'Daniel Krueger');
  ```
  ```sql
  SELECT name FROM employees
  WHERE (dep_id, role) = (
    SELECT dep_id, role FROM employees
    WHERE name = 'Daniel Krueger');
  ```
  ````

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: derived tables in FROM
    .fadeIn('.in-from')
    .step()
    // click 2: the example query
    .fadeIn('.in-from .slidev-code-wrapper')
    .step()
})
</script>

# 3. Derived Tables (1)

<div class="aside">
<div>

[employees]{.table-caption}
| name | salary | dep_id |
| --- | --- | --- |
| Daniel Krueger | 4867 | 268 |
| Sofia Weber | 6074 | 192 |
| Lukas Brandt | 3854 | 451 |
| Amelie Fischer | 5291 | 192 |
| Jonas Hartmann | 4414 | 268 |

</div>
<div class="map">

```sql {2,3}
SELECT column
FROM table
JOIN table ON condition
WHERE condition
GROUP BY column
HAVING condition;
```

</div>
</div>

## General

- Returns a table (shape: $N \times M$) used for pre-processing
- Used in: `{sql} FROM`, `{sql} JOIN`
- **Must have an alias** (`{sql} AS table_name`)

<div class="in-from">

## 3.1 In `FROM` Clause

- Aggregates can't be nested, e.g., `{sql} AVG(AVG(salary))`
- Example: *Average of the department averages.*

  ```sql
  SELECT AVG(avg_salary) FROM (
    SELECT dep_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dep_id
  ) AS dept_avg;
  ```

</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlide, useTl } from 'slidev-addon-gsap'
import type { Tint } from './tints'
import { clear, DEPT, markColor, markReset, TINT } from './tints'

const tl = useTl()
const slide = useSlide()

onMounted(() => {
  const root = slide.value!
  const rows = (table: string) => [...root.querySelectorAll<HTMLTableRowElement>(`${table} tbody tr`)]
  const text = (row: HTMLTableRowElement, col: number) => row.cells[col].textContent!.trim()
  // the parts of the query that are dimmed in turn: the inner query (lines
  // 4–6), the join condition (the last line but its `) AS d`), and the rest
  const lines = [...root.querySelectorAll<HTMLElement>('.slidev-code-wrapper .line')]
  const inner = lines.slice(3, 6)
  const alias = lines[6].querySelector<HTMLElement>('.mark-alias')!
  const on = [...lines[6].children].filter(c => c !== alias) as HTMLElement[]
  const outer = [...lines.slice(0, 3), alias]
  const parts = [...outer, ...inner, ...on]
  // the marks' original colours, read before anything is recoloured
  const resetInner = markReset(root, '.mark-inner')
  const resetOn = markReset(root, '.mark-on')
  // the rows of the join, e ⋈ d = e JOIN d, tinted in their department's
  // colour while the join condition is shown; each with the column its dep_id
  // is in
  const tinted: [HTMLTableRowElement, Tint][] = [
    ...rows('.e-end').map(r => [r, DEPT[text(r, 2)]] as [HTMLTableRowElement, Tint]),
    ...rows('.d-end').map(r => [r, DEPT[text(r, 0)]] as [HTMLTableRowElement, Tint]),
    ...rows('.joined').map(r => [r, DEPT[text(r, 2)]] as [HTMLTableRowElement, Tint]),
  ]
  // each row's own background (its zebra stripe, or none), read once up front:
  // once tweens exist, they leave their own inline colours on the rows
  const own = new Map(tinted.map(([r]) => [r, getComputedStyle(r).backgroundColor]))
  // a row without its tint: its stripe, or if it has none, the tint at zero
  // alpha (so a fade doesn't pass through grey)
  const plain = (r: HTMLTableRowElement, t: Tint) => {
    const stripe = own.get(r)!
    return stripe === 'rgba(0, 0, 0, 0)' ? clear(TINT[t]) : stripe
  }

  tl.step()
    // click 1: the whole query
    .fadeIn('.slidev-code-wrapper')
    .step()
    // click 2: only the inner query, in teal, and the table it returns: d
    .to([...outer, ...on], { opacity: 0.3, duration: 0.4 })
    .to(...markColor('.mark-inner', 'teal'), '<')
    .fadeIn('.d-start', {}, '<')
    .step()
    // click 3: only the join condition, in red. d makes room, employees comes
    // down beside it, and e ⋈ d gives each employee the row of d with its
    // dep_id, i.e. its department's average; the rows that belong together
    // share their department's colour. (Each morph starts where the timeline
    // ends, so these play one after the other.)
    .to(inner, { opacity: 0.3, duration: 0.4 })
    .to(on, { opacity: 1, duration: 0.4 }, '<')
    .to(...resetInner, '<')
    .to(...markColor('.mark-on', 'red'), '<')
    .morph('.d-start', '.d-end', { duration: 0.6 })
    .morph('.top .employees', '.e-end', { duration: 0.6 })
    .fadeIn('.joins')
  for (const [r, t] of tinted)
    tl.fromTo(r, { backgroundColor: plain(r, t) }, { backgroundColor: TINT[t], duration: 0.4 }, '<')
  tl.step()
    // click 4: the whole query again, plain, and its output where employees was
    .to(parts, { opacity: 1, duration: 0.4 })
    .to(...resetOn, '<')
    .fadeIn('.top .output', {}, '<')
  // (immediateRender off, or these would paint the tint at build time)
  for (const [r, t] of tinted)
    tl.fromTo(r, { backgroundColor: TINT[t] }, { backgroundColor: plain(r, t), duration: 0.4, immediateRender: false }, '<')
  tl.step()
})
</script>

# 3. Derived Tables (2)

<div class="aside top">
<div class="employees">

[employees e]{.table-caption}
| name | salary | dep_id |
| --- | --- | --- |
| Daniel Krueger | 4867 | 268 |
| Sofia Weber | 6074 | 192 |
| Lukas Brandt | 3854 | 451 |
| Amelie Fischer | 5291 | 192 |
| Jonas Hartmann | 4414 | 268 |

</div>
<div class="output">

[Output]{.table-caption}
| name | diff |
| --- | --- |
| Daniel Krueger | 226.5 |
| Sofia Weber | 391.5 |
| Lukas Brandt | 0 |
| Amelie Fischer | -391.5 |
| Jonas Hartmann | -226.5 |

</div>
</div>

## 3.2 In `JOIN` Clause

- Example: *Comparing individual salary against department average salary.*

  ```sql
  SELECT e.name, e.salary - d.avg_salary AS diff
  FROM employees e
  JOIN (
    ⟦inner:SELECT dep_id, AVG(salary) AS avg_salary⟧
    ⟦inner:FROM employees⟧
    ⟦inner:GROUP BY dep_id⟧
  ⟦alias:) AS d⟧ ON ⟦on:e.dep_id = d.dep_id⟧;
  ```

<div class="flex items-start gap-4 pl-[1.9em]">
<div class="stack">
<div class="e-end">

[employees e]{.table-caption}
| name | salary | dep_id |
| --- | --- | --- |
| Daniel Krueger | 4867 | 268 |
| Sofia Weber | 6074 | 192 |
| Lukas Brandt | 3854 | 451 |
| Amelie Fischer | 5291 | 192 |
| Jonas Hartmann | 4414 | 268 |

</div>
<div class="d-start">

[d]{.table-caption}
| dep_id | avg_salary |
| --- | --- |
| 268 | 4640.5 |
| 192 | 5682.5 |
| 451 | 3854 |

</div>
</div>
<div class="joins sym">

$\bowtie$

</div>
<div class="d-end">

[d]{.table-caption}
| dep_id | avg_salary |
| --- | --- |
| 268 | 4640.5 |
| 192 | 5682.5 |
| 451 | 3854 |

</div>
<div class="joins sym">

$=$

</div>
<div class="joins joined">

[e JOIN d]{.table-caption}
| name | salary | dep_id | avg_salary |
| --- | --- | --- | --- |
| Daniel Krueger | 4867 | 268 | 4640.5 |
| Sofia Weber | 6074 | 192 | 5682.5 |
| Lukas Brandt | 3854 | 451 | 3854 |
| Amelie Fischer | 5291 | 192 | 5682.5 |
| Jonas Hartmann | 4414 | 268 | 4640.5 |

</div>
</div>

<style>
/* Tables that take turns in one spot: employees and later the output in the
   top-right corner; below the query, d until employees comes down into its
   place. Each hugs its table, so a morph moves it without stretching it. */
.top, .stack {
  display: grid;
}
.top > *, .stack > * {
  grid-area: 1 / 1;
  justify-self: start;
  align-self: start;
}
.top > .output {
  justify-self: end;
}
/* ⋈ and =, between the tables at the height of their rows' middle */
.sym {
  align-self: center;
  font-size: 1.5em;
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
  // click 1: the correlated variant, which refers to the outer row
  tl.step().fadeIn('.taxonomy ol ol > li:nth-child(2)').step()
})
</script>

# Correlated Subqueries

<div class="taxonomy">

## Taxonomy

- Categorization by **Result Shape** and **Execution Logic**

2. Execution Logic
   1. **Uncorrelated**: Inner query is independent of the outer query. It runs once. *<-- What we saw so far*

      ```sql
      SELECT name FROM employees
      WHERE salary > (SELECT AVG(salary) FROM employees);
      ```

      *Who earns more than the average of the **entire company**?*

      <div class="h-2" />

   2. **Correlated**: Inner query references columns from outer query. Evaluated once for every row of the outer query.

      ```sql
      SELECT e1.name FROM employees e1
      WHERE e1.salary > (
        SELECT AVG(e2.salary) FROM employees e2
        WHERE e2.dep_id = e1.dep_id
      );
      ```

      *Who earns more than the average of **their department**?*

</div>

---
layout: default
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePos, useSlide, useTl, useTwo } from 'slidev-addon-gsap'
import type { Tint } from './tints'
import { ACCENT, clear, DEPT, TINT } from './tints'

const ORDINAL = ['1st', '2nd', '3rd', '4th', '5th']

const tl = useTl()
const two = useTwo()
const pos = usePos() // also registers the '.sel@anchor' resolver the arrows need
const slide = useSlide()

onMounted(() => {
  const rows = (table: string) => [...slide.value!.querySelectorAll<HTMLTableRowElement>(`${table} tbody tr`)]
  const dep = (row: HTMLTableRowElement) => row.cells[2].textContent!.trim()
  const outer = rows('.e1')
  const inner = rows('.e2')
  // each row's own background (its zebra stripe, or none), read once up
  // front: once tweens exist, they leave their own inline colours on the rows
  const own = new Map([...outer, ...inner].map(r => [r, getComputedStyle(r).backgroundColor]))
  // a row's background with tint t; without one, its own stripe, or if it has
  // none, `like` at zero alpha (so a fade doesn't pass through grey)
  const bg = (row: HTMLElement, t: Tint | null, like: Tint) => {
    if (t)
      return TINT[t]
    const stripe = own.get(row)!
    return stripe === 'rgba(0, 0, 0, 0)' ? clear(TINT[like]) : stripe
  }

  let lit: (Tint | null)[] = inner.map(() => null) // e2's tints after the last run
  tl.step()
  outer.forEach((row, i) => {
    // one run per outer row, in its department's colour: the run's arrow
    // stands left of e2 (in run order, labelled above its tip) and scans all
    // of it, while the e2 rows of that department, the ones it averages, light up
    const t = DEPT[dep(row)]
    const dx = -32 - 48 * (outer.length - 1 - i)
    const scan = two.mkArrow(pos('.e2 tbody@tl')[0].add(dx, 0), pos('.e2 tbody@bl')[0].add(dx, 0), {
      stroke: ACCENT[t],
      linewidth: 2,
      text: { text: `${ORDINAL[i]} run`, at: 0, offset: [0, -12], size: 12, fill: '#4c4d4d' },
    })
    // click i+1: outer row i+1 is current
    tl.fromTo(row, { backgroundColor: bg(row, null, t) }, { backgroundColor: TINT[t], duration: 0.4 })
      .from(scan, { end: 0, duration: 0.6 }, '<')
    // (an e2 row gets several tweens; immediateRender off, or each would paint
    // its start colour at build time and the last one would show at click 0)
    const next = inner.map(r => (dep(r) === dep(row) ? t : null))
    inner.forEach((r, j) => {
      if (next[j] !== lit[j])
        tl.fromTo(r, { backgroundColor: bg(r, lit[j], next[j] ?? lit[j]!) }, { backgroundColor: bg(r, next[j], lit[j] ?? next[j]!), duration: 0.4, immediateRender: false }, '<')
    })
    lit = next
    tl.step()
  })
  // last click: e2 goes back to plain, and the repeated colours get their name
  tl.fadeIn('.repeat')
  inner.forEach((r, j) => {
    if (lit[j])
      tl.fromTo(r, { backgroundColor: TINT[lit[j]!] }, { backgroundColor: bg(r, null, lit[j]!), duration: 0.4, immediateRender: false }, '<')
  })
  tl.step()
})
</script>

# Performance of Correlated Subqueries (1)

## Complexity

- Worst case runtime complexity: $O(N^2)$
- **Outer Query** scans through $N$ rows. Each row triggers the **Inner Query** scanning its own set of $N$ rows.

<div class="flex items-center gap-12 pl-[1.9em]">
<div>

```sql
SELECT e1.name FROM employees e1
WHERE e1.salary > (
  SELECT AVG(e2.salary) FROM employees e2
  WHERE e2.dep_id = e1.dep_id
);
```

</div>
<div class="repeat max-w-[330px]">

::takeaway{label="Repeated work"}
Each department's average is computed again for every one of its employees
::

</div>
</div>

<div class="flex items-start justify-between pl-[1.9em]">
<div class="e1">

[employees e1]{.table-caption}
| name | salary | dep_id |
| --- | --- | --- |
| Daniel Krueger | 4867 | 268 |
| Sofia Weber | 6074 | 192 |
| Lukas Brandt | 3854 | 451 |
| Amelie Fischer | 5291 | 192 |
| Jonas Hartmann | 4414 | 268 |

</div>
<div class="e2">

[employees e2]{.table-caption}
| name | salary | dep_id |
| --- | --- | --- |
| Daniel Krueger | 4867 | 268 |
| Sofia Weber | 6074 | 192 |
| Lukas Brandt | 3854 | 451 |
| Amelie Fischer | 5291 | 192 |
| Jonas Hartmann | 4414 | 268 |

</div>
</div>

---
layout: two-cols-header
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'
import { markColor } from './tints'

const tl = useTl()
onMounted(() => {
  tl.step()
    // click 1: both select the same column from the same table
    .to(...markColor('.mark-outer', 'purple'))
    .step()
    // click 2: both filter on the same comparison
    .to(...markColor('.mark-where', 'yellow'))
    .step()
    // click 3: the per-row average becomes the grouped derived table
    .to(...markColor('.mark-agg', 'teal'))
    .step()
    // click 4: the correlation predicate becomes the join condition
    .to(...markColor('.mark-corr', 'red'))
    .step()
    // click 5: what that buys
    .fadeIn('.once')
    .step()
})
</script>

# Performance of Correlated Subqueries (2)

## Alternatives to Correlated Subqueries

::left::

- Correlated Subquery

  ```sql
  ⟦outer:SELECT e1.name FROM employees e1⟧
  ⟦where:WHERE e1.salary >⟧ (
    ⟦agg:SELECT AVG(e2.salary) FROM employees e2⟧
    WHERE ⟦corr:e2.dep_id = e1.dep_id⟧
  );
  ```

<div class="once mt-6">

::takeaway
With `{sql} GROUP BY`, each department's average is computed only once
::

</div>

::right::

- Equivalent with `{sql} JOIN` (Hash Joins: $O(N)$)

  ```sql
  ⟦outer:SELECT e.name⟧
  ⟦outer:FROM employees e⟧
  JOIN (
    ⟦agg:SELECT dep_id, AVG(salary) AS avg_salary⟧
    ⟦agg:FROM employees⟧
    ⟦agg:GROUP BY dep_id⟧
  ) AS d
  ON ⟦corr:e.dep_id = d.dep_id⟧
  ⟦where:WHERE e.salary >⟧ d.avg_salary;
  ```

---
layout: default
---

# Summary

<div class="table-w summary">

| Shape | Subquery | Used in | Used with |
| --- | --- | --- | --- |
| $1 \times 1$ | Scalar | `{sql} SELECT`, `{sql} WHERE`, `{sql} HAVING` | `{sql} =`, `{sql} <>`, `{sql} <`, `{sql} <=`, `{sql} >`, `{sql} >=` |
| $N \times 1$ | Column | `{sql} WHERE` | `{sql} IN`, `{sql} ANY` / `{sql} SOME`, `{sql} ALL`, `{sql} EXISTS` |
| $1 \times M$ | Row | `{sql} WHERE` | `{sql} =` |
| $N \times M$ | Derived table | `{sql} FROM`, `{sql} JOIN` | an alias (`{sql} AS name`) |

</div>

<div class="h-4" />

::takeaway
Uncorrelated subqueries run once. Correlated ones run once per outer row and can often be rewritten as a `{sql} JOIN`.
::
