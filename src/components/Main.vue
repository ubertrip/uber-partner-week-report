<template>
  <div class="ut-app">

    <div>
      <select v-model="statement" @change="onChange">
        <option v-for="option in statements" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <table>
      <tr>
        <td>Водителей:</td>
        <td><b>{{drivers}}</b></td>
      </tr>

      <tr>
        <td>Всего:</td>
        <td><b>{{netFares.toFixed(2)}}</b> грн</td>
      </tr>

      <tr>
        <td>Получено наличными:</td>
        <td><b>{{cashCollected.toFixed(2)}}</b> грн</td>
      </tr>

      <tr>
        <td>Чистая сумма оплаты:</td>
        <td><b>{{netPayout.toFixed(2)}}</b> грн</td>
      </tr>

      <tr>
        <td>Доп. выплаты, возвраты: </td>
        <td><b>{{additional.toFixed(2)}}</b> грн</td>
      </tr>

      <tr>
        <td>Промоакции:</td>
        <td><b>{{incentives.toFixed(2)}}</b> грн</td>
      </tr>

      <tr>
        <td>Прибыль партнера 60%:</td>
        <td><b style="color: green;">{{(netFares * 0.6 + incentives * 0.3).toFixed(2)}}</b> грн</td>
      </tr>

      <tr>
        <td>Прибыль водителей 40%:</td>
        <td><b style="color: red;">{{(netFares * 0.4 + incentives * 0.7).toFixed(2)}}</b> грн</td>
      </tr>
    </table>

    <div>
      План выполнен на: <b :class="{'progress-low': totalPercentEarn < 70, 'progress-mid': totalPercentEarn >= 70 && totalPercentEarn <= 89, 'progress-ok':  totalPercentEarn >= 90}">{{totalPercentEarn}}%</b> <progress :value="totalPercentEarn" max="100">
      План {{totalPercentEarn}}%
    </progress> <br>
      <i v-if="totalEarn-netFares > 0" style="color: red;">Недостача: {{(totalEarn-netFares).toFixed(2)}} грн<br></i>
      <i style="color: green;" v-if="totalEarn-netFares <= 0">Недостача: нет</i>
    </div>
  </div>
</template>

<script src="./main.js"></script>

<style scoped lang="scss">
  .ut-app {
    background: #f1f1f1;
    border: 1px dashed #333;
    padding: 10px 15px;

    table {
      width: auto;
    }

    .table td, .table th, table td, table th {
      padding: 0;
    }

    .progress {
      &-low {
        color: red;
      }

      &-mid {
        color: orange;
      }

      &-ok {
        color: forestgreen;
      }
    }
  }
</style>