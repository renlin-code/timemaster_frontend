<template>
  <section>
    <Transition name="fade">
      <StartModal twoButtons v-if="showModal.logout" @close="closeModal" @action="logout">
        <template #main-text>
          Are you sure you want to log out of your account?
        </template>

        <template #primary-button> No </template>

        <template #secondary-button> Yes </template>
      </StartModal>
    </Transition>

    <Transition name="fade">
      <StartModal
        twoButtons
        v-if="showModal.delete"
        @close="closeModal"
        @action="$router.push('/settings/confirm-delete')"
      >
        <template #main-text> Are you sure you want to delete your profile? </template>

        <template #primary-button> No </template>

        <template #secondary-button> Yes </template>
      </StartModal>
    </Transition>

    <InnerPage blur :preloader="preloader">
      <template #title> Settings </template>

      <template #scroll-content>
        <h2>Edit profile</h2>
        <div class="buttons main-content-wrapper">
          <SettingsButton @click.native="$router.push('/start/recovery')">
            Change password
          </SettingsButton>
          <SettingsButton @click.native="$router.push('/settings/change-name')">
            Change name
          </SettingsButton>
        </div>
        <div class="buttons main-content-wrapper">
          <LogoutButton @click.native="showModal.logout = true" />
        </div>
        <div class="buttons main-content-wrapper">
          <button
            class="delete-profile timemaster-subtitle"
            @click="showModal.delete = true"
          >
            Delete profile
          </button>
        </div>
      </template>
    </InnerPage>
  </section>
</template>

<script>
import InnerPage from "~/components/layout/InnerPage.vue";
import SettingsButton from "~/components/buttons/SettingsButton.vue";
import LogoutButton from "~/components/buttons/LogoutButton.vue";
import StartModal from "~/components/modals/StartModal.vue";

export default {
  name: "IndexPage",
  layout: "inner",
  components: { InnerPage, SettingsButton, LogoutButton, StartModal },
  data: () => ({
    preloader: true,
    showModal: {
      logout: false,
      delete: false,
    },
  }),
  methods: {
    closeModal() {
      for (let key in this.showModal) {
        this.showModal[key] = false;
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/start");
    },
  },
  async created() {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      this.$router.push("/start/login");
    } else {
      setTimeout(() => {
        this.preloader = false;
      }, 0);
    }
  },
};
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  gap: 18rem;
  margin-bottom: 30rem;
}
.delete-profile {
  color: #de2424;
  text-decoration: underline;
}
</style>
