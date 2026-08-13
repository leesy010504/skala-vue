<template>
  <div class="base-dashboard-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.base-dashboard-card {
  background: var(--surface-muted);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid var(--border);
}
</style>
