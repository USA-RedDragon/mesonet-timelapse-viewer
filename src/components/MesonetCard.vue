<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ kindTitle(kind) }}</CardTitle>
    </CardHeader>
    <CardContent>
      <MesonetImage :kind="kind" />
    </CardContent>
  </Card>
</template>

<script lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import MesonetImage from '@/components/MesonetImage.vue';

export default {
  props: {
    kind: {
      type: String,
      required: true,
    },
  },
  components: {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    MesonetImage,
  },
  data: function() {
    return {};
  },
  mounted() {},
  unmounted() {},
  methods: {},
  computed: {
    kindTitle() {
      const titles: Record<string, string> = {
        dewd: 'Dew Point Depression',
        qdiv: 'Moisture Convergence',
        relh: 'Relative Humidity',
        ta9m: '9m Air Temperature',
        tair: 'Air Temperature',
        tdew: 'Dew Point Temperature',
        thte: 'Theta-e',
      };
      return (kind: string) => titles[kind] || 'Unknown';
    },
  },
};
</script>

<style scoped>
</style>
