<template>
  <div class="flex h-screen">
    <div class="w-64 h-full bg-white border-r border-slate-200 shadow-lg fixed left-0 top-0">
      <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    </div>

    <div class="flex-1 ml-64 p-10">
      <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, watch, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + parseFloat(item.price), 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>
