export class localSearchQuery {
  get() {
    return this.searchQuery;
  }
  set(value) {
    this.$emit("update:search-query", value);
  }
}
