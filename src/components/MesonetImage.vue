<template>
  <div class="mesonet-image">
    <img :src="images.at(imageIndex-1)" alt="Mesonet Image" />
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
      imageIndex: 1,
    };
  },
  mounted() {
    // The list.txt is a newline (\n) separated list of filenames available
    // in the S3 bucket
    axios.get(`https://s3.mcswain.dev/mesonet-${this.kind}/list.txt`)
      .then(response => {
        for (const filename of response.data.split('\n')) {
          if (filename.trim()) {
            this.images.unshift(`https://s3.mcswain.dev/mesonet-${this.kind}/${filename}`);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        console.log(`${this.kind} Images loaded:`, this.images);
      });
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
</style>
