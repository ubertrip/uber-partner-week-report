import axios from 'axios';
import moment from 'moment';

export default {
  name: "Main",
  created: function () {
    this.refresh(true);
  },

  methods: {
    onChange: function (e) {
      this.refresh(false);
    },

    refresh: function (isCreated = false, notification = false) {
      const min = 1550;
      const days = 5;

      this.totalEarn = min * days * this.drivers;

      axios.get('https://partners.uber.com/p3/fleet-manager/csrf-token').then(({data}) => {
        axios.post(`https://partners.uber.com/p3/fleet-manager/_rpc?rpc=${isCreated ? 'getCurrentStatementWithHistory' : 'getDriverStatementSummary'}`, { // getDriverStatementSummary
          statementUuid: this.statement,
        }, {
          headers: {
            'x-csrf-token': data,
          }
        }).then(({data: {data: {payments, statements}}}) => {
          // netFares

          if (isCreated) {
            this.statements = statements.map(p => ({
              value: p.uuid,
              label: `${moment(p.startAt).format('DD.MM.YYYY')} - ${moment(p.endAt).format('DD.MM.YYYY')}`,
            }));

            if (this.statements.length && isCreated) {
              this.statement = this.statements[0].value;
            }
          }

          let netFares = 0;
          let cashCollected = 0;
          let netPayout = 0;
          this.incentives = 0;
          this.additional = 0;

          payments.forEach(driver => {
            const miscPayment = driver.miscPayment !== null ? parseFloat(driver.miscPayment) : 0; // возврат денег
            this.additional += miscPayment;
            this.incentives += driver.incentives !== null ? parseFloat(driver.incentives) : 0; // бонусы

            netFares += driver.netFares !== null ? parseFloat(driver.netFares) : 0; // общая сумма
            netFares += miscPayment; // доп выплата плюсуем к основной

            cashCollected += driver.cashCollected !== null ? parseFloat(driver.cashCollected) : 0; // нал
            netPayout += driver.netPayout !== null ? parseFloat(driver.netPayout) : 0; // безнал
          });


          if (notification && this.netFares !== netFares) {
            const diff = netFares - this.netFares;
            const msg = `New earn: ${diff.toFixed(2)}`;

            if (Notification.permission === "granted") {
              new Notification(msg);
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                  new Notification(msg);
                }
              });
            }
          }

          this.netFares = netFares;
          this.cashCollected = cashCollected;
          this.netPayout = netPayout;

          this.totalPercentEarn = ((this.netFares + this.additional) / this.totalEarn * 100).toFixed(2);

          setTimeout(() => this.refresh(false, true), 25000);
        }).catch(err => console.log(err));


      }).catch(err => console.log(err));
    },
  },

  data: function () {
    return {
      netFares: 0,
      cashCollected: 0,
      netPayout: 0,
      totalEarn: 0,
      drivers: 6,
      totalPercentEarn: 0,
      additional: 0,
      statements: [],
      statement: '',
      incentives: 0,
    }
  }
}