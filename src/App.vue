<template>
  <div id="app">
    <YourComponent
      msg="Welcome to your Vue + TypeScript Dev Tools Component"
      :items="items"
    />
  </div>
</template>

<script lang="ts">
  import { useStore, IItem } from './store'
  import { MutationType } from './store/MutationType'
  import YourComponent from './components/YourComponent.vue'

  export default {
    name: 'Home',
    components: {
      YourComponent
    },
    setup() {
      const store = useStore()
      store.commit(MutationType.resetItems)
      const items: IItem[] = store.state.items
      console.log('items', items)
      window.onbeforeunload = () => {
        store.commit(MutationType.resetItems)
      }

      return {
        items
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    .component-wrapper .head {
      padding: 5px;

      .header-and-logo {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
        }
        h1 {
          font-size: 22px;
          margin: 0;
        }
      }

      .item {
        display: grid;
        grid-template-columns: 100px 100px 100px 100px auto;
        outline: solid 1px lightgray;
        margin-bottom: 5px;
        padding: 5px;
      }
    }
  }
</style>
