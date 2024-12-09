<template>
  <div class="flex flex-col flex-1 gap-4 justify-between">
    <CartItem
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
    />
  </div>
</template>

<script>
import CartItem from './CartItem.vue'

export default {
  components: {
    CartItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
