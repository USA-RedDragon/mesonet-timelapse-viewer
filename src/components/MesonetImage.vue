<template>
  <div class="mesonet-image">
    <img :src="images[imageIndex[0]-1]" alt="Mesonet Image" />
    <Slider
        v-model="imageIndex"
        :max="images.length"
        :min="1"
        :step="1"
        class="mt-4" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';

import { Slider } from '@/components/ui/slider'

export default {
  props: {
    kind: {
      type: String,
      required: true,
    },
  },
  components: {
    Slider,
  },
  data: function() {
    return {
      images: [] as string[],
      imageIndex: [1],
      refreshTimer: null as ReturnType<typeof setInterval> | null,
    };
  },
  mounted() {
    // Refresh every 5 minutes
    this.fetchData();
    this.refreshTimer = setInterval(() => {
      this.fetchData();
    }, 5 * 60 * 1000);
  },
  unmounted() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  },
  methods: {
    fetchData() {
      // The list.txt is a newline (\n) separated list of filenames available
      // in the S3 bucket
      axios.get(`https://s3.mcswain.dev/mesonet-${this.kind}/list.txt`)
        .then(response => {
          const newImages: string[] = [];
          for (const filename of response.data.split('\n')) {
            if (filename.trim()) {
              newImages.unshift(`https://s3.mcswain.dev/mesonet-${this.kind}/${filename}`);
            }
          }
          this.images = newImages;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          console.log(`${this.kind} Images loaded:`, this.images);
        });
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>
