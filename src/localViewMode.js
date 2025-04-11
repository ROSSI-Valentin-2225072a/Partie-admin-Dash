export class localViewMode {
  get() {
    return this.viewMode;
  }
  set(value) {
    this.$emit("update:view-mode", value);
  }
}
