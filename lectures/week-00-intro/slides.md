---
theme: tud-db
title: "Week 0: Intro"
layout: cover
addons:
  - gsap
---

# Week 0: Intro

Data Management Lab, Winter Semester 2026/27

---
layout: two-cols-header
columns: 42fr 58fr
---

# Organization

::left::

## Who?

<div class="person-card">
  <img src="/images/staff_2.jpg" alt="Jannis Kowalick" />
  <div class="person-info">
    <span class="person-name">Jannis Kowalick</span>
    <span class="person-sub">jannis.kowalick@tu-dresden.de</span>
  </div>
</div>

<div class="person-card">
  <div class="no-photo"></div>
  <div class="person-info">
    <span class="person-name">Vincent Melisch</span>
    <span class="person-sub">vincent.melisch@tu-dresden.de</span>
  </div>
</div>

<div class="person-card">
  <img src="/images/staff_1.png" alt="Rico Bergmann" />
  <div class="person-info">
    <span class="person-name">Rico Bergmann</span>
    <span class="person-sub">rico.bergmann1@tu-dresden.de</span>
  </div>
</div>

- Please contact us via the **OPAL course**!

::right::

## For whom?

- Module **INF-25-Ba-P-DM: Data Management Lab**
- Practice sessions, 4 SWS
- Responsible: Prof. Dr. Dirk Habich, Chair of Databases

## When & Where?

- **When**: Every Tuesday, 2nd period (9:20 – 10:50 Uhr)
  - 11 weeks of content + this introduction
- **Where**: APB-E010

---
layout: two-cols-header
columns: 55fr 45fr
---

# Organization

::left::

## Main Focus

- **Advanced SQL functionalities**
  - Correlated subqueries, CTEs
  - Analytical functions (window functions, GROUPING SETS, …)
  - SQL extensions (e.g. text & binary functions, JSON)
- **Practical SQL experience**
  - Write your own non-trivial SQL queries!
- **Gain an understanding of database systems**
  - Work with PostgreSQL
  - Learn about database internals (focus on query optimization)

## Soft Skills

- Experimental design and evaluation
- Data visualization & performance interpretation

::right::

## Format

- **Practical course**
  - Not a lecture!
  - No exercises!
  - Focus on **independent and self-driven work**!

---
layout: two-cols-header
columns: 1fr 1fr
---

# Organization

## Grading

::takeaway{label="Admission to the oral exam" color="red"}
At least **80%** of the course work points. Below that, the course is failed.
::

<div class="h-[11px]" />

::left::

## Course work (40%)

- Weekly task sheet with SQL tasks
- Solved in **groups of 3**, formed by you
- Due next Tuesday, **9:19 a.m.**, before the lecture
- Written in Overleaf with LaTeX
- Graded: attendance, work in class, submission

::right::

## Oral exam (60%)

- End of semester, 30 min per group
- SQL tasks like the task sheets

## Questions

- Forum for questions on tasks
- FAQ hours if needed

---
layout: section-num
num: 1
---

# Why SQL?

From 1970 to modern data systems

---
layout: default
---

# Why SQL?

<div class="aside" style="width: 340px">

<div class="history-grid">
  <div class="history-item">
    <img src="/images/codd.jpg" alt="Edgar F. Codd" />
    <span class="history-caption"><b>Edgar F. Codd</b><br/>(1923–2003)<br/>Relational Model<br/>Turing Award 1981</span>
  </div>
  <div class="history-item">
    <img src="/images/boyce.jpg" alt="Raymond F. Boyce" />
    <span class="history-caption"><b>Raymond F. Boyce</b><br/>(1946–1974)<br/>Co-inventor of SQL</span>
  </div>
  <div class="history-item">
    <img src="/images/chamberlin.jpg" alt="Donald D. Chamberlin" />
    <span class="history-caption"><b>Donald Chamberlin</b><br/>(* 1944)<br/>Co-inventor of SQL</span>
  </div>
</div>

</div>

## SQL is old

- Early versions date back to the **1970s** (System R / SEQUEL)
- Based on Edgar F. Codd's seminal **relational model** from 1970

## However:

- Relational databases are still at the core of most business processes
- SQL remains as a universal data access language
- You already know about `{sql} SELECT`, `{sql} FROM`, `{sql} WHERE`, `{sql} GROUP BY`, and `{sql} HAVING`
- **But: SQL has a lot more to offer!**

---
layout: two-cols-header
columns: 1fr 1fr
---

# SQL is subject to lots of criticism …

::left::

## In the community

- Criticized for syntax quirks, lack of composability, and impedance mismatch

<div class="flex flex-col gap-3 mt-3">
  <img src="/images/against_sql_1.png" alt="Against SQL" class="rounded border border-gray-300 shadow-sm max-h-[140px] object-contain" />
  <img src="/images/against_sql_2.png" alt="Community criticism" class="rounded border border-gray-300 shadow-sm max-h-[130px] object-contain" />
</div>

<span class="text-xs text-gray-500 mt-1 block">Source: scattered-thoughts.net/writing/against-sql</span>

::right::

## In research

- Ongoing proposals for cleaner, more composable alternatives

<div class="flex flex-col gap-3 mt-3">
  <img src="/images/sql_plus_plus.png" alt="SQL++" class="rounded border border-gray-300 shadow-sm max-h-[110px] object-contain" />
  <img src="/images/critique_modern_sql.png" alt="A Critique of Modern SQL" class="rounded border border-gray-300 shadow-sm max-h-[110px] object-contain" />
</div>

<div class="text-xs text-gray-500 mt-2 space-y-1">
  <div>• M. Carey et al.: <i>“SQL++: We Can Finally Relax”</i> (ICDE’24)</div>
  <div>• T. Neumann & V. Leis: <i>“A Critique of Modern SQL and a Proposal Towards a Simple and Expressive Query Language”</i> (CIDR’24)</div>
</div>

---
layout: two-cols-header
columns: 55fr 45fr
---

# … but still not going anywhere

::left::

## The Lingua Franca of Data

- Despite recurring waves of criticism and "NoSQL" hypes, SQL consistently wins out
- Modern data warehouses, streaming systems, and lakehouses all converge back onto SQL engines
- Query optimizers are decades ahead in tuning declarative SQL execution

<div class="mt-4">
  <img src="/images/what_goes_around.png" alt="What Goes Around Comes Around paper" class="rounded border border-gray-300 shadow-sm" />
  <span class="text-xs text-gray-500 mt-1 block">M. Stonebraker and A. Pavlo: <i>“What Goes Around Comes Around… and Around…”</i> (SIGMOD’24)</span>
</div>

::right::

<div class="flex flex-col items-center">
  <img src="/images/sql_dominance.png" alt="DB engines ranking" class="max-h-[360px] object-contain rounded border border-gray-300 shadow-sm" />
  <span class="text-xs text-gray-500 mt-1">DB-Engines Ranking: SQL engines dominate industry adoption</span>
</div>

---
layout: two-cols-header
columns: 52fr 48fr
---

# What to expect in this course?

::left::

## Weekly practical tasks

- You will receive a task sheet each week
- Practice the use of advanced SQL features **independently**
- Build your own queries, measure their performance, and visualize it
- Write a short protocol of your experiments and results, **interpret your results!**

::right::

<div class="table-w">

[Course Roadmap]{.table-caption}
| Week | Content |
| :---: | :--- |
| **0** | **Introduction + Ternary Logic (NULL)** |
| 1 | CASE, Benchmarking, Visualization |
| 2 | Subqueries |
| 3 | Advanced Joins |
| 4 | Set Operations |
| 5 | CTEs |
| 6 | Advanced Grouping |
| 7 | Window Functions |
| 8 | JSON |
| 9 | Time, Text & Binary Functions |
| 10 | DML Constraints |
| 11 | Stored Procedures and Triggers |

</div>

---
layout: section-num
num: 2
---

# Database Internals

Architecture, query optimization, and execution engines

---
layout: default
clicks: 1
---

# General Architecture

<GeneralArchitecture :show-focus="$clicks >= 1" />

---
layout: two-cols-header
columns: 42fr 58fr
---

# Query Optimizer

::left::

## SQL Query (What?)

```sql
SELECT A_Name, SUM(S_Qty)
FROM Article, Sales
WHERE A_Anr = S_Anr
  AND S_Date >= '2021-01-01'
GROUP BY A_Name;
```

<div class="mt-3 p-2.5 rounded bg-emerald-50 border border-emerald-400 text-emerald-800 text-xs font-semibold flex items-center justify-between">
  <span>YES, but HOW do we get there (efficiently)?</span>
  <span class="text-base text-emerald-600 font-bold">➔</span>
</div>

::right::

<QueryPlanSlide12 />

---
layout: default
---

# Query Optimizer

<div class="flex justify-center items-center -mt-12">
  <QueryPlanTree :annotated="true" />
</div>

---
layout: two-cols-header
columns: 50fr 50fr
---

# Query Optimizer

::left::

## Textbook Architecture

- Full exploration of all possible query plans
- Dynamic programming to reduce computational overhead
- Cost model approximates effort to compute query result with a specific plan
- Central input to cost model: cardinality estimates
- Cardinality = number of tuples produced by an operator
- Postgres: approximate enumerator (genetic optimizer) if plan space becomes too large

::right::

<OptimizerArch />

---
layout: two-cols-header
columns: 44fr 56fr
clicks: 1
---

# Execution Engine

::left::

<VolcanoTree :show-callout="$clicks >= 1" />

::right::

<div v-show="$clicks === 0">

## Iterator-based Execution

- Each node provides an iterator interface
- `next()` function computes a new tuple
- Each call provides a single tuple
- Usual implementation:
  1. Fetch tuple from child node
  2. Perform node-specific computation
  3. Provide mutated tuple to parent node

</div>

<div v-show="$clicks >= 1" class="mt-14 p-4 rounded-lg border border-gray-300 bg-white/80 shadow-sm max-w-[420px]">

```python
while left_child.has_next():
    l = left_child.next()
    right_child.reset()
    while right_child.has_next():
        r = right_child.next()
        if l == r:
            yield join_tuple(l, r)
```

</div>

---
layout: section-num
num: 3
---

# EXPLAIN

Peeking at DB internals

---
layout: two-cols-header
columns: 55fr 45fr
clicks: 1
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTl } from 'slidev-addon-gsap'

const tl = useTl()
onMounted(() => {
  // click 1: the code block opens above the pgMustard figure and pushes it
  // down (one image, same size), then the code fades in once it's clear
  tl.step()
    .to('.code-reveal', { gridTemplateRows: '1fr', duration: 0.6, ease: 'power2.inOut' })
    .fadeIn('.code-output', { duration: 0.4 }, '<0.35')
    .fadeIn('.explain-vs-analyze', { duration: 0.4 }, '<')
    .step()
})
</script>

# EXPLAIN in a nutshell

::left::

## Basic Usage

<div class="text-sm space-y-1">

- Just prefix any SQL query with `{sql} EXPLAIN`
- Retrieves the execution plan of the query
- 1 row = 1 operator (most of the time)
- Decent overview of operators: [pgMustard](https://www.pgmustard.com/docs/explain)

</div>

<div class="explain-vs-analyze mt-4">

## <span class="whitespace-nowrap">EXPLAIN vs. EXPLAIN ANALYZE</span>

<div class="text-sm space-y-1">

- `{sql} EXPLAIN` only displays the query plan
- `{sql} EXPLAIN ANALYZE` also executes the query
- Allows to compare the optimizer’s assumptions to reality

</div>

</div>

::right::

<!-- Grid rows 0fr -> 1fr opens the code block without measuring it, so the
     figure below slides down at its own size, also when entering at click 1. -->
<div class="code-reveal">
  <div class="code-output text-xs">

```sql
stats=# EXPLAIN SELECT * FROM posts;

QUERY PLAN
--------------------------------------------------
Seq Scan on posts
  (cost=0.00..12319.76 rows=91976 width=1015)
(1 row)
```

  </div>
</div>

<div class="pg-figure">
  <img src="/images/pgmustard.png" alt="pgMustard EXPLAIN tool" class="rounded border border-gray-300 shadow-sm max-h-[140px] w-auto" />
  <span class="text-xs text-gray-500 mt-1 block">Visualizing plans with tools like <a href="https://www.pgmustard.com/docs/explain" target="_blank">pgmustard.com/docs/explain</a></span>
</div>

---
layout: default
clicks: 3
---

# Example

<ExplainExample :step="$clicks" />

---
layout: default
clicks: 2
---

# Plan Analysis

<PlanAnalysis :step="$clicks" />

---
layout: section-num
num: 4
---

# Ternary Logic

Three-valued logic (3VL) and NULL semantics

---
layout: default
clicks: 2
---

# Introduction to Ternary Logic

<div class="aside" style="width: 380px">

<MoviesTable />

<div v-show="$clicks >= 2" class="mt-4">
  <PsqlOutput variant="movies-all" />
</div>

</div>

## Example: Movie Database

- Create the table
  ```sql
  CREATE TABLE movies (
    id       INTEGER PRIMARY KEY
             GENERATED ALWAYS AS IDENTITY,
    title    TEXT,
    canceled BOOLEAN,
    revenue  BIGINT
  );
  ```

<div v-show="$clicks >= 1">

  ```sql
  INSERT INTO movies (title, canceled, revenue)
  VALUES
    ('Secret Life of Penguins', FALSE, 1000),
    ('Big Explosions VII',      TRUE,  NULL),
    ('Murder in SQL City',      FALSE, 500);
  ```

</div>

<div v-show="$clicks >= 2">

- Show output
  ```sql
  SELECT * FROM movies;
  ```

</div>

---
layout: default
clicks: 2
---

# Ternary Logic and Aggregate Functions

<div class="aside" style="width: 380px">

<MoviesTable />

</div>

## Example: AVG

- Guess the result
  ```sql
  SELECT AVG(revenue) FROM movies;
  ```

<div v-show="$clicks >= 1">

- Result:
  ```
    avg   
  -------
   750.00
  (1 row)
  ```

</div>

<div v-show="$clicks >= 2">

- Rule: Aggregate functions only consider non-`NULL` column values
  - Examples: `SUM`, `AVG`, `MIN`, `MAX`

</div>

---
layout: default
clicks: 2
---

# Ternary Logic and Count

<div class="aside" style="width: 380px">

<MoviesTable />

</div>

## Count on column

- Example:
  ```sql
  SELECT COUNT(revenue) AS cnt FROM movies;
  ```

<div v-show="$clicks >= 1">

- Result: 2
- Rule: Only considers rows with a non-`NULL` value in that column

</div>

<div v-show="$clicks >= 2">

## Count on whole table

- Example:
  ```sql
  SELECT COUNT(*) AS cnt FROM movies;
  ```
- Returns 3
- Rule: Counts all rows of a table

</div>

---
layout: default
---

# Ternary Logic and Logical Operators

<div class="truth-tables">

<div class="table-w">

[AND]{.table-caption}
| A | B | A AND B | Comment |
| :---: | :---: | :---: | :--- |
| `TRUE` | `NULL` | `NULL` | Unknown |
| `FALSE` | `NULL` | `FALSE` | Guaranteed false |
| `NULL` | `NULL` | `NULL` | Unknown |

</div>

<div class="table-w">

[OR]{.table-caption}
| A | B | A OR B | Comment |
| :---: | :---: | :---: | :--- |
| `TRUE` | `NULL` | `TRUE` | Guaranteed true |
| `FALSE` | `NULL` | `NULL` | Unknown |
| `NULL` | `NULL` | `NULL` | Unknown |

</div>

</div>

<div class="h-4" />

::takeaway{label="Interpretation" color="blue"}
`NULL` is `UNKNOWN` (e.g., `TRUE AND UNKNOWN = UNKNOWN`)
::

---
layout: default
clicks: 2
---

# Ternary Logic and Predicates (1)

<div class="aside" style="width: 380px">

<MoviesTable />

<div v-show="$clicks >= 1" class="mt-4">
  <PsqlOutput variant="movies-between" />
</div>

</div>

## Comparisons

- Examples: `=`, `<>`, `<`, `>`, `<=`, `>=`
- Produces `NULL` (`UNKNOWN`) when compared to `NULL`
  - $\to$ Rows are filtered out by `WHERE`, `JOIN`, or `HAVING` clauses
    ```sql
    SELECT * FROM movies
    WHERE revenue BETWEEN 0 AND 5000;
    ```

<div v-show="$clicks >= 2">

- Null-Safe Equality `<=>` (e.g., MySQL, MariaDB)
  - Usually: `NULL = NULL` $\to$ `NULL` (`UNKNOWN`)
  - Starship Operator:
    `NULL <=> NULL` $\to$ `TRUE`, `5 <=> NULL` $\to$ `FALSE`

</div>

---
layout: default
clicks: 4
---

# Ternary Logic and Predicates (2)

<div class="aside" style="width: 380px">

<MoviesTable />

</div>

## Membership Predicates (IN)

- Example: `<value> IN revenue`
  - `500 IN revenue` $\to$ `TRUE`
  - `200 IN revenue` $\to$ `NULL` (`UNKNOWN`)
- Produces `TRUE` if `<value>` is in revenue, `NULL` (`UNKNOWN`) else

<div v-show="$clicks >= 1" class="mt-3">

## Membership Predicates (NOT IN)

- Example: `<value> NOT IN revenue`
<NotInExpansion :clicks="$clicks" />

<div v-show="$clicks >= 4">

- Always produces `NULL` (`UNKNOWN`)

</div>

</div>

---
layout: default
---

# Ternary Logic and Predicates (3)

<div class="aside" style="width: 380px">

<MoviesTable />

</div>

## NULL Predicate (IS / IS NOT)

- Used to reliably check for `NULL` values
- Example:
  ```sql
  SELECT COUNT(*) AS cnt FROM movies
  WHERE revenue IS NOT NULL;
  ```
- Result: 2

---
layout: default
clicks: 1
---

# Working with NULL values

<div class="aside" style="width: 380px">

<MoviesTable />

</div>

## COALESCE

- Returns a specified value if the expression is `NULL`
- Example:
  ```sql
  SELECT AVG(COALESCE(revenue, -300)) FROM movies;
  ```

<div v-show="$clicks >= 1">

- Result: (1000 + (-300) + 500) / 3 = 400

</div>

---
layout: section-num
num: 5
---

# Self Study

Setup and hands-on preparation

---
layout: two-cols-header
columns: 58fr 42fr
---

# Next Steps

::left::

## 1. Install PostgreSQL

- Follow official instructions at [postgresql.org/download](https://www.postgresql.org/download/)
- Any modern version ($\ge$ 15) is suitable

## 2. Solve the Murder Mystery

- Visit [mystery.knightlab.com](https://mystery.knightlab.com/)
- Brush up on `{sql} SELECT`, `{sql} FROM`, `{sql} WHERE`, `{sql} GROUP BY`, and `{sql} HAVING`
- *The Murder Mystery assignment is for practice and not graded*

## 3. Set up the Stats Benchmark

- Download `stats_dump.pg` from <span class="whitespace-nowrap">[Zenodo (record 19131189)](https://zenodo.org/records/19131189)</span>
- Import it into your local PostgreSQL installation for upcoming assignments

::right::

<div class="flex flex-col items-center mt-2">
  <img src="/images/murder_mystery.png" alt="SQL Murder Mystery" class="rounded border border-gray-300 shadow-md max-h-[300px] object-contain" />
  <span class="text-xs text-gray-500 mt-2">SQL Murder Mystery: Practice foundational SQL querying</span>
</div>
