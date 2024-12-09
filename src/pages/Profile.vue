<template>
  <div class="profile-page p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
    <div class="profile-header flex items-center justify-center">
      <div class="profile-picture text-center">
        <img
          :src="profilePicture"
          alt="Profile Picture"
          class="mx-auto rounded-full h-32 w-32 object-cover"
        />
      </div>
      <div class="profile-username text-center ml-6">
        <h2 class="text-2xl font-semibold">{{ username }}</h2>
      </div>
      <div class="edit-icon ml-auto">
        <button @click="showEditModal = true">
          <img src="plus.svg" /><i class="fas fa-cog text-2xl"></i>
        </button>
      </div>
    </div>

    <div class="profile-actions flex justify-center mt-6">
      <button class="btn-action" @click="openOrdersModal">Показать заказы</button>
    </div>

    <Modal v-model="showEditModal">
      <div class="edit-profile">
        <h2 class="text-xl mb-4">Редактировать профиль</h2>
        <div class="profile-picture text-center">
          <img
            :src="tempProfilePicture"
            alt="Profile Picture"
            class="mx-auto rounded-full h-24 w-24 object-cover"
          />
          <input type="file" @change="onFileChange" class="mt-4" />
        </div>
        <div class="profile-username text-center mt-4">
          <input
            v-model="tempUsername"
            type="text"
            placeholder="Введите ваш никнейм"
            class="mt-2 p-2 border rounded w-full"
          />
        </div>
        <div class="text-center mt-4">
          <button class="btn-confirm" @click="confirmChanges">Подтвердить изменения</button>
        </div>
      </div>
    </Modal>

    <Modal v-model="showOrdersModal">
      <div>
        <h2>Мои заказы</h2>
        <div v-if="isLoading">Загрузка...</div>
        <div v-else-if="orders.length === 0">Нет заказов</div>
        <div v-else>
          <div v-for="order in orders" :key="order.id" class="order">
            <h3>Заказ #{{ order.id }}</h3>
            <CardItemListOrder :items="order.items" />
          </div>
        </div>
      </div>
    </Modal>

    <Notification ref="notification" message="Изменения вступили в силу!" />
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '../components/Modal.vue'
import CardItemListOrder from '../components/CardItemListOrder.vue'
import Notification from '../components/Notification.vue'

export default {
  name: 'Profile',
  components: {
    Modal,
    CardItemListOrder,
    Notification
  },
  data() {
    return {
      username: localStorage.getItem('username') || 'Ваш никнейм',
      profilePicture: localStorage.getItem('profilePicture') || '/default-profile.png',
      tempUsername: localStorage.getItem('username') || 'Ваш никнейм',
      tempProfilePicture: localStorage.getItem('profilePicture') || '/default-profile.png',
      showEditModal: false,
      showOrdersModal: false,
      orders: [],
      isLoading: false,
      selectedOrder: null
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.tempProfilePicture = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    confirmChanges() {
      this.username = this.tempUsername
      this.profilePicture = this.tempProfilePicture
      localStorage.setItem('username', this.username)
      localStorage.setItem('profilePicture', this.profilePicture)
      this.$refs.notification.show()
      this.showEditModal = false
    },
    async openOrdersModal() {
      this.showOrdersModal = true
      this.isLoading = true
      try {
        const response = await axios.get('https://33f284ac5b9d00c1.mokky.dev/orders')
        this.orders = response.data
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.profile-picture img {
  border-radius: 50%;
  border: 4px solid #4caf50;
}

.profile-username {
  flex: 1;
  max-width: 300px;
}

.edit-icon {
  position: absolute;
  top: 0;
  right: 0;
}

.profile-actions {
  justify-content: center;
  margin-top: 20px;
}

.btn-confirm {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px auto;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-confirm:hover {
  background-color: #45a049;
}

.btn-action {
  background-color: #2196f3;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-action:hover {
  background-color: #1976d2;
}

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

.order {
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.order:hover {
  background-color: #f0f0f0;
}

.order h3 {
  cursor: pointer;
}

.edit-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.edit-profile input[type='file'] {
  display: block;
  margin-top: 10px;
}

.edit-profile h2 {
  margin-bottom: 20px;
}
</style>
