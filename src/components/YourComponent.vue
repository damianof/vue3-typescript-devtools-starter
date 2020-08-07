<template>
  <div class="component-wrapper">
    <div class="head">
      <div class="header-and-logo">
        <img src="icon-32.png" width="24" height="24" title="Logo" />
        <h1>Your Component</h1>
      </div>
      <h5>{{ msg }}</h5>
      <div>[{{ items.length }}]</div>
      <div class="item" v-for="(item, index) in items" :key="index">
        <span>{{ item.name }}</span>
        <span>{{ item.value }}</span>
        <span>{{ item.id }}</span>
        <span>{{ item.localName }}</span>
        <span>{{ item.className }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Your Component',
    components: {},
    props: {
      msg: String,
      items: Array
    },
    setup(props: any) {
      return {}
    }
  }
</script>
