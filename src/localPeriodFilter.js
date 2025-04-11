export class localPeriodFilter {
  get() {
    return this.periodFilter;
  }

  set(value) {
    this.$emit("change-period", value);
  }
}
