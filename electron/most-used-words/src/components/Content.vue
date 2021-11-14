<template>
  <v-container fluid>
    <v-form value lazy-validation>
      <v-file-input
        :clearable="false"
        @click:append="handleSubtitleFileOpening"
        append-icon="mdi-folder-open-outline"
        color="inputBorder"
        dense
        full-width
        height="1"
        multiple
        outlined
        placeholder="Open Subtitle Files"
        prepend-icon=""
        single-line
        small-chips
        v-model="files"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip v-if="index < 3" color="filePill" label small>
            {{ text }}
          </v-chip>
          <span
            v-else-if="index === 3"
            class="overline grey--text text--darken-1 mx-2"
          >
            +{{ files.length - 3 }} File(s)
          </span>
        </template>
      </v-file-input>
      <v-text-field
        append-icon="mdi-magnify"
        color="inputBorder"
        dense
        outlined
        placeholder="Search Words"
        v-model="search"
        validate-on-blur
      ></v-text-field>
      <v-data-table
        :footer-props="{
          ['disable-items-per-page']: true,
          ['items-per-page-options']: [itemsPerPage],
          ['page-text']: '',
          ['show-current-page']: true,
          ['show-first-last-page']: true,
        }"
        :headers="[
          { text: 'Word', value: 'name' },
          { text: 'Occurrences', align: 'end', value: 'occurrences' },
        ]"
        :items-per-page="itemsPerPage"
        :items="words"
        :page="page"
        :search="search"
        @update:page="handlePageChange"
        disable-sort
        show-first-last-page
      ></v-data-table>
    </v-form>
  </v-container>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data: function () {
    return {
      itemsPerPage: 5,
      files: [],
      search: "",
      words: [],
      page: 1,
    };
  },
  methods: {
    handleSubtitleFileOpening() {
      const subtitlesPaths = this.files.map((file) => file.path);

      ipcRenderer.send("PARSE_SUBTITLES", subtitlesPaths);
      ipcRenderer.on("SUBTITLES_WORDS", (event, data) => {
        this.words = data;
        console.log(this.words);
      });
    },
    handlePageChange(page) {
      this.page = page;
    },
  },
  watch: {
    search: function () {
      this.page = 1;
    },
  },
};
</script>

<style>
</style>