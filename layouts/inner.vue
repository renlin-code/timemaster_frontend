<template>
  <Transition name="fade">
    <div class="screen">
      <DesktopRejetion />

      <InnerInputModal class="inner-modal-task"
        blur
        placeholder="Add new task"
        v-model="taskData.name"
        :maxlength="30"
        v-if="showModal.fromHome"
        @close="showModal.fromHome = false"
      >
        <template #scroll-content>
          <CategoriesAccordion class="inner-modal-task__categories"
            @selectCategory="selectCategory"
          />

          <CalendarAccordion class="inner-modal-task__calendar" />

          <ImportantButton class="inner-modal-task__important"
            @select="setImportant"
          />
        </template>

        <template #button>
          <OkButton
            @click.native="submitTask"
          />
        </template>
      </InnerInputModal>










      <div class="front-layer"
        :class="{'front-layer--open' : frontOpen}"
      >
        <header>
        <HeaderDefault
          @openMenu="frontOpen=true"
        />
        </header>
        <main>
          <Nuxt />
        </main>
        <div class="front-layer__cover-layer"
          v-if="frontOpen"
          @click="frontOpen=false"
        ></div>
      </div>

      <div class="back-layer"
      >
        <div class="back-layer__bg">
          <svg class="back-layer__bg-main-layer" viewBox="0 0 650 645" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8727 388.274C-7.50209 342.624 -1.90349 285.74 20.7698 241.636C43.0801 198.237 101.019 187.622 133.668 151.356C163.898 117.777 166.144 61.8034 204.361 37.7035C242.551 13.6205 292.434 28.0392 337.296 22.9476C387.331 17.2688 438.15 -11.3924 485.481 5.79734C532.667 22.9341 558.979 72.6545 587.642 113.868C615.112 153.366 646.854 194.09 649.83 242.109C652.751 289.239 616.315 328.671 603.778 374.196C591.846 417.523 596.06 463.776 577.511 504.709C556.421 551.252 534.071 603.437 488.996 627.505C443.947 651.559 386.965 646.518 337.8 632.706C292.235 619.906 261.57 579.646 222.67 552.686C189.332 529.581 155.787 509.341 123.803 484.396C84.5314 453.766 31.3307 434.119 11.8727 388.274Z" fill="#EAF4F9" fill-opacity="0.3"/>
          </svg>
          <svg class="back-layer__bg-secondary-layer" viewBox="0 0 650 645" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8727 388.274C-7.50209 342.624 -1.90349 285.74 20.7698 241.636C43.0801 198.237 101.019 187.622 133.668 151.356C163.898 117.777 166.144 61.8034 204.361 37.7035C242.551 13.6205 292.434 28.0392 337.296 22.9476C387.331 17.2688 438.15 -11.3924 485.481 5.79734C532.667 22.9341 558.979 72.6545 587.642 113.868C615.112 153.366 646.854 194.09 649.83 242.109C652.751 289.239 616.315 328.671 603.778 374.196C591.846 417.523 596.06 463.776 577.511 504.709C556.421 551.252 534.071 603.437 488.996 627.505C443.947 651.559 386.965 646.518 337.8 632.706C292.235 619.906 261.57 579.646 222.67 552.686C189.332 529.581 155.787 509.341 123.803 484.396C84.5314 453.766 31.3307 434.119 11.8727 388.274Z" fill="#EAF4F9" fill-opacity="0.3"/>
          </svg>
          <svg class="back-layer__bg-circle1" viewBox="0 0 50 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.8" cx="24.9995" cy="24.2583" r="24" transform="rotate(76.5759 24.9995 24.2583)" fill="#F8FDFF"/>
          </svg>
          <svg class="back-layer__bg-circle2" viewBox="0 0 50 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.8" cx="24.9995" cy="24.2583" r="24" transform="rotate(76.5759 24.9995 24.2583)" fill="#F8FDFF"/>
          </svg>
          <svg class="back-layer__bg-circle3" viewBox="0 0 50 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.8" cx="24.9995" cy="24.2583" r="24" transform="rotate(76.5759 24.9995 24.2583)" fill="#F8FDFF"/>
          </svg>
        </div>
        <div class="back-layer__content">
          <NavMenu
            @click.native="frontOpen=false"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import HeaderDefault from '~/components/headers/HeaderDefault.vue';
import DesktopRejetion from '~/components/others/DesktopRejetion.vue';
import NavMenu from '~/components/navigation/NavMenu.vue';
import InnerInputModal from '~/components/modals/InnerInputModal.vue';
import OkButton from '~/components/buttons/OkButton.vue';
import CategoriesAccordion from '~/components/uiKit/CategoriesAccordion.vue';
import CalendarAccordion from '~/components/uiKit/CalendarAccordion.vue';
import ImportantButton from '~/components/buttons/ImportantButton.vue';


  export default {
      components: { DesktopRejetion, HeaderDefault, NavMenu, InnerInputModal, OkButton, CategoriesAccordion, CalendarAccordion, ImportantButton },
      data: () => ({
        frontOpen: false,
        showModal: {
          fromHome: false
        },

        taskData: {
          name: "",
          date: "",
          important: false,
          categoryId: null
        }

      }),
      methods: {
        selectCategory(id) {
          this.taskData.categoryId = id;
        },
        setImportant(value){
          this.taskData.important = value;
        },
        submitTask() {
          console.log(this.taskData);
        }
      },

      created() {
        const isNew = !localStorage.getItem("savedDevice");
        if (isNew) {
          this.$router.push("/start")
        }
      },
      mounted() {
        this.$nuxt.$on('openModalFromHome', () => {
          this.taskData = {};
          this.showModal.fromHome = true;
        })

      }
  }
</script>

<style scoped lang="scss">
  .screen {
    max-width: 450rem;
    height: 100vh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .front-layer {
    position: absolute;
    width: 100%;
    z-index: 2;
    background-image: url("~/static/img/background1.png");
    background-color: #FFFFFF;
    background-position: center;
    background-size: cover;
    min-height: 100vh;
    box-shadow: 0rem 2rem 6rem rgba(0, 0, 0, 0.25), 2rem 2rem 6rem rgba(0, 0, 0, 0.25);
    transition: all 320ms ease-in-out;
    &__cover-layer {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      cursor: pointer;
      border-radius: 35rem;
      z-index: 2;
    }

    &--open {
      transform: translateX(253rem) scale(0.93);
      border-radius: 35rem;
    }
  }

  .back-layer {
    position: relative;
    height: 100%;
    &__bg {
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 100%;
      background-color: $main-color;
      &-main-layer {
        position: absolute;
        left: -126rem;
        width: 650rem;
        height: 645rem;
        animation-name: main-layer;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 26s;
        @keyframes main-layer {
          0%, 100% {
            transform: scale(1.1) translate(-57rem, -68rem);
          }
          50% {
            transform: scale(0.8)  rotate(-26deg);
          }
        }
      }
      &-secondary-layer {
        position: absolute;
        left: -373rem;
        bottom: -553rem;
        width: 650rem;
        height: 645rem;
        animation-name: secondary-layer;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 17s;
        @keyframes secondary-layer {
          0%, 100% {
            transform: scale(1.1) rotate(15deg);
          }
          50% {
            transform: scale(1);
          }
        }
      }
      &-circle1 {
        position: absolute;
        width: 50rem;
        height: 50rem;
        left: 210rem;
        bottom: 319rem;
        animation-name: circle1;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 37s;
        transform-origin: 20rem 100rem;
        @keyframes circle1 {
          100% {
            transform: rotate(-360deg);
          }
        }
      }
      &-circle2 {
        position: absolute;
        width: 30rem;
        height: 30rem;
        left: 100rem;
        top: 157rem;
        animation-name: circle2;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 18s;
        @keyframes circle2 {
          0%, 100% {
          }
          50% {
            transform: translate(30rem, -54rem);
          }
        }
      }
      &-circle3 {
        position: absolute;
        width: 36rem;
        height: 36rem;
        left: 222rem;
        top: 265rem;
        animation-name: circle3;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 21s;
        @keyframes circle3 {
          0%, 100% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(0.55) translate(-26rem, 40rem);
          }
        }
      }
    }
    &__content {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .inner-modal-task {
    &__categories {
      margin-bottom: 32rem;
    }
    &__calendar {
      margin-bottom: 32rem;
    }
  }
</style>
