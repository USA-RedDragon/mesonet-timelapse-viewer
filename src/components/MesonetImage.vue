<template>
  <div class="mesonet-image">
    <img :src="images.at(-1)" alt="Mesonet Image" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  props: {
    kind: {
      type: String,
      required: true,
    },
  },
  components: {},
  data: function() {
    return {
      images: [] as string[],
    };
  },
  mounted() {
    // The list.txt is a newline (\n) separated list of filenames available
    // in the S3 bucket
    axios.get(`https://s3.mcswain.dev/mesonet-${this.kind}/list.txt`)
      .then(response => {
        for (const filename of response.data.split('\n')) {
          if (filename.trim()) {
            this.images.push(`https://s3.mcswain.dev/mesonet-${this.kind}/${filename}`);
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
