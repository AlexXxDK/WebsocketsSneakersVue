<script setup>

import { onMounted, onUnmounted, ref } from "vue";

const usersOnline = ref(0)

let socket;

onMounted(() => {
    socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.users !== undefined) {
            updateUsersCount(data.users);
        }
    };

    socket.onclose = () => {
        console.warn('WebSocket connection closed');
    };
});

onUnmounted(() => {
    if (socket) socket.close();
});

const updateUsersCount = (users) => {
    const step = (users - usersOnline.value) / 100;
    const interval = setInterval(() => {
        if (Math.abs(usersOnline.value - users) < Math.abs(step)) {
            usersOnline.value = users;
            clearInterval(interval);
        } else {
            usersOnline.value += step;
        }
    }, 10);
}

</script>

<template>
<div class='flex-row justify-center align-bottom'>
    <div class="text-center">Пользователей онлайн: </div>
    <div class="font-bold text-2xl text-center">{{ Math.round(usersOnline) }}</div>
</div>
</template>

<style scoped>

</style>