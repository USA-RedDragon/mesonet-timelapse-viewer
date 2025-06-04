<template>
  <div>
    <div class="info">
      <MesonetCard kind="dewd" />
      <MesonetCard kind="qdiv" />
      <MesonetCard kind="relh" />
      <MesonetCard kind="ta9m" />
      <MesonetCard kind="tair" />
      <MesonetCard kind="tdew" />
      <MesonetCard kind="thte" />
    </div>
  </div>
</template>

<script lang="ts">
import MesonetCard from '@/components/MesonetCard.vue';

export default {
  components: {
    MesonetCard,
  },
  created() {},
  mounted() {},
  unmounted() {},
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.info {
  -webkit-column-count: 4;
  -moz-column-count: 4;
  column-count: 4;
}

.info > div {
  break-inside: avoid;
}

.info > div:not(:first-child) {
  margin-top: 1em;
}

@media (max-width: 2100px) {
  .info {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }
}
@media (max-width: 1200px) {
  .info {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .info {
    -moz-column-count: 1;
    -webkit-column-count: 1;
    column-count: 1;
  }
}
</style>
