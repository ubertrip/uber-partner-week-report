import Vue from 'vue';
import Main from './components/Main.vue';

const appContainerId = 'uber-trip-ext';

console.log(Main);

setTimeout(() => {
  insertContainer(appContainerId);
  init();
}, 0);

function init() {
  new Vue({
    el: `#${appContainerId}`,
    template: `<Main/>`,
    components: {
      Main,
    },
    data() {
      return {}
    },
  });
}


function insertContainer(id) {
  const conatiner = document.createElement('div');
  conatiner.setAttribute('id', id);
  document.body.insertBefore(conatiner, document.body.firstChild);
}