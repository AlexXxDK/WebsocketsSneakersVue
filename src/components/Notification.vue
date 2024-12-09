<template>
  <transition name="fade">
    <div v-if="visible" class="notification">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: String,
    duration: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
