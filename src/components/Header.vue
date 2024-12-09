<template>
    <header class="flex flex-col h-full px-6 py-8">
        <router-link to="/" class="mb-10">
            <div class="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" class="w-10"/>
                <div>
                    <h2 class="text-xl font-bold uppercase">Sneakers</h2>
                    <p class="text-slate-400">Магазин кроссовок</p>
                </div>
            </div>
        </router-link>

        <ul class="flex flex-col gap-6 mt-4">
            <router-link to="/favorites">
                <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                    <img src="/heart.svg" alt="Favorites"/>
                    <span>Закладки</span>
                </li>
            </router-link>

            <li
                @click="() => emit('openDrawer')"
                class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
            >
                <img src="/cart.svg" alt="Cart"/>
                <b>{{ totalPrice }} руб.</b>
            </li>

            <router-link to="/profile">
                <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                    <img src="/profile.svg" alt="Profile"/>
                    <span>Профиль</span>
                </li>
            </router-link>
            <li class="flex items-center align-bottom cursor-pointer gap-3 text-gray-500">
                <Online/>
            </li>
        </ul>
    </header>
</template>

<script setup>
import Online from "@/components/Online.vue";

defineProps({
    totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>
