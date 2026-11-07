<template>
  <div class="movies-table-box">
    <p class="caption-wrapper">
      <span class="table-caption">movies</span>
    </p>
    <table class="movies-tbl">
      <thead>
        <tr>
          <th class="th-id">id</th>
          <th class="th-title">title</th>
          <th class="th-canceled">canceled</th>
          <th class="th-revenue">revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-id">1</td>
          <td class="td-title">Secret Life of Penguins</td>
          <td class="td-canceled"><span class="cst-bool">FALSE</span></td>
          <td class="td-revenue">1000</td>
        </tr>
        <tr>
          <td class="td-id">2</td>
          <td class="td-title">Big Explosions VII</td>
          <td class="td-canceled"><span class="cst-bool">TRUE</span></td>
          <td class="td-revenue"><span class="cst-null">NULL</span></td>
        </tr>
        <tr>
          <td class="td-id">3</td>
          <td class="td-title">Murder in SQL City</td>
          <td class="td-canceled"><span class="cst-bool">FALSE</span></td>
          <td class="td-revenue">500</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.movies-table-box {
  width: 100%;
}
.caption-wrapper {
  margin: 0 0 4px 0;
}
.table-caption {
  font-family: var(--slidev-code-font-family, 'Fira Code', monospace);
  font-size: 11px;
  font-weight: 600;
  color: #334155;
}
.movies-tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
  font-family: 'Noto Sans', sans-serif;
  border-top: 1px solid #cbd5e1;
  border-bottom: 1px solid #cbd5e1;
}
.movies-tbl th {
  padding: 4px 8px;
  font-weight: 700;
  color: #1e293b;
  border-bottom: 1px solid #cbd5e1;
  background-color: transparent;
}
.movies-tbl td {
  padding: 4px 8px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
}
.movies-tbl tbody tr:nth-child(even) {
  background-color: #f8fafc;
}
.th-id, .td-id {
  text-align: center;
  width: 32px;
}
.th-title, .td-title {
  text-align: left;
}
.th-canceled, .td-canceled {
  text-align: center;
  width: 75px;
}
.th-revenue, .td-revenue {
  text-align: right;
  width: 65px;
}
.cst-bool {
  font-family: var(--slidev-code-font-family, 'Fira Code', monospace);
  font-size: 11px;
  color: #fe640b;
}
.cst-null {
  font-family: var(--slidev-code-font-family, 'Fira Code', monospace);
  font-size: 11px;
  color: #fe640b;
}
</style>
