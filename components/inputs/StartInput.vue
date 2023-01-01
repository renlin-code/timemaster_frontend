<template>
  <div class="start-input">
    <div class="start-input__top">
      <div class="start-input__left-icon">
        <svg class="person" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          v-if="type === 'name'"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.67044 4.26019C4.67044 2.49773 6.0992 1.06897 7.86166 1.06897C9.62412 1.06897 11.0529 2.49773 11.0529 4.26019C11.0529 6.02216 9.6249 7.45062 7.86311 7.4514C7.86263 7.4514 7.86214 7.4514 7.86166 7.4514C6.0992 7.4514 4.67044 6.02265 4.67044 4.26019ZM5.63111 7.80921C4.45314 7.0673 3.67044 5.75515 3.67044 4.26019C3.67044 1.94544 5.54691 0.0689697 7.86166 0.0689697C10.1764 0.0689697 12.0529 1.94544 12.0529 4.26019C12.0529 5.75515 11.2702 7.0673 10.0922 7.80921C12.639 8.63056 14.8577 10.8064 15.7233 13.7147L14.7649 14C13.7675 10.6489 10.7846 8.4514 7.86166 8.4514C7.86093 8.4514 7.86021 8.4514 7.85949 8.4514C4.93724 8.45249 1.95556 10.6497 0.958452 14L0 13.7147C0.865572 10.8064 3.0843 8.63056 5.63111 7.80921Z" fill="#A0A0A0"/>
        </svg>

        <svg class="letter" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          v-else-if="type === 'email'"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7 0.100586H3.6786H3.67859C3.1367 0.100581 2.69963 0.100577 2.34569 0.129495C1.98126 0.15927 1.66117 0.222176 1.36502 0.37307C0.894619 0.612753 0.512168 0.995205 0.272484 1.46561C0.12159 1.76176 0.058684 2.08185 0.0289093 2.44627C-8.70315e-06 2.80021 -4.76097e-06 3.23729 1.26624e-07 3.77918V3.77918V3.80059V10.1994V10.2208C-4.76096e-06 10.7627 -8.75447e-06 11.1998 0.0289093 11.5537C0.0586839 11.9181 0.12159 12.2382 0.272484 12.5344C0.512168 13.0048 0.894619 13.3872 1.36502 13.6269C1.66117 13.7778 1.98126 13.8407 2.34569 13.8705C2.69961 13.8994 3.13667 13.8994 3.67853 13.8994H3.67858H3.7H13.2985H13.3199H13.32C13.8619 13.8994 14.2989 13.8994 14.6528 13.8705C15.0173 13.8407 15.3374 13.7778 15.6335 13.6269C16.1039 13.3872 16.4864 13.0048 16.726 12.5344C16.8769 12.2382 16.9398 11.9181 16.9696 11.5537C16.9985 11.1998 16.9985 10.7627 16.9985 10.2208V10.1994V3.80059V3.77917C16.9985 3.23728 16.9985 2.80021 16.9696 2.44627C16.9398 2.08185 16.8769 1.76176 16.726 1.46561C16.4864 0.995205 16.1039 0.612753 15.6335 0.37307C15.3374 0.222176 15.0173 0.15927 14.6528 0.129495C14.2989 0.100577 13.8618 0.100581 13.3199 0.100586H13.2985H3.7ZM1.81901 1.26408C1.95069 1.19698 2.12454 1.1509 2.42712 1.12617C2.73554 1.10098 3.1317 1.10059 3.7 1.10059H13.2985C13.8668 1.10059 14.263 1.10098 14.5714 1.12617C14.874 1.1509 15.0478 1.19698 15.1795 1.26408C15.4618 1.40789 15.6912 1.63736 15.835 1.9196C15.9021 2.05128 15.9482 2.22512 15.9729 2.52771C15.9981 2.83613 15.9985 3.23228 15.9985 3.80059V10.1994C15.9985 10.7677 15.9981 11.1639 15.9729 11.4723C15.9482 11.7749 15.9021 11.9487 15.835 12.0804C15.6912 12.3626 15.4618 12.5921 15.1795 12.7359C15.0478 12.803 14.874 12.8491 14.5714 12.8738C14.263 12.899 13.8668 12.8994 13.2985 12.8994H3.7C3.1317 12.8994 2.73554 12.899 2.42712 12.8738C2.12454 12.8491 1.95069 12.803 1.81901 12.7359C1.53677 12.5921 1.3073 12.3626 1.16349 12.0804C1.0964 11.9487 1.05031 11.7749 1.02559 11.4723C1.00039 11.1639 1 10.7677 1 10.1994V3.80059C1 3.23228 1.00039 2.83613 1.02559 2.52771C1.05031 2.22512 1.0964 2.05128 1.16349 1.9196C1.3073 1.63736 1.53677 1.40789 1.81901 1.26408ZM3.14786 2.96625C2.9081 2.82925 2.60267 2.91255 2.46567 3.1523C2.32866 3.39206 2.41196 3.69749 2.65172 3.8345L7.75506 6.75069C8.21621 7.01421 8.78233 7.01421 9.24348 6.75069L14.3468 3.8345C14.5866 3.69749 14.6699 3.39206 14.5329 3.1523C14.3959 2.91255 14.0904 2.82925 13.8507 2.96625L8.74734 5.88245C8.59362 5.97029 8.40492 5.97029 8.2512 5.88245L3.14786 2.96625Z" fill="#A0A0A0"/>
        </svg>

        <svg class="key" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          v-else-if="type === 'password'"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2555 0.567885C12.7338 0.046218 11.888 0.0462203 11.3664 0.567886L5.211 6.72324C4.75138 6.51937 4.24279 6.40619 3.70859 6.40619C1.66039 6.40619 0 8.06658 0 10.1148C0 12.163 1.66039 13.8234 3.70859 13.8234C5.75678 13.8234 7.41717 12.163 7.41717 10.1148C7.41717 9.58057 7.30399 9.07198 7.10012 8.61236L8.34061 7.37187L9.3812 8.41246C9.90287 8.93413 10.7487 8.93413 11.2703 8.41246C11.792 7.8908 11.792 7.04501 11.2703 6.52334L10.2297 5.48275L11.3183 4.39414L12.3589 5.43473C12.8806 5.9564 13.7264 5.9564 14.2481 5.43473C14.7697 4.91307 14.7697 4.06728 14.2481 3.54561L13.2075 2.50502L13.2555 2.45701C13.7771 1.93534 13.7771 1.08955 13.2555 0.567885ZM11.932 1.13357C12.1413 0.924324 12.4805 0.924324 12.6898 1.13357C12.899 1.34282 12.899 1.68207 12.6898 1.89132L12.3589 2.22218V2.78786L13.6824 4.1113C13.8916 4.32055 13.8916 4.6598 13.6824 4.86905C13.4731 5.0783 13.1339 5.0783 12.9246 4.86905L11.6012 3.54561H11.0355L9.3812 5.19991V5.76559L10.7046 7.08903C10.9139 7.29827 10.9139 7.63753 10.7046 7.84678C10.4954 8.05602 10.1561 8.05602 9.94689 7.84678L8.62345 6.52334H8.05777L6.33192 8.24919L6.26365 8.72366C6.48896 9.1365 6.61717 9.61007 6.61717 10.1148C6.61717 11.7211 5.31496 13.0234 3.70859 13.0234C2.10222 13.0234 0.8 11.7211 0.8 10.1148C0.8 8.5084 2.10222 7.20619 3.70859 7.20619C4.21329 7.20619 4.68686 7.3344 5.0997 7.55971L5.57417 7.49144L11.932 1.13357ZM2.78515 10.1148C2.78515 9.60478 3.19858 9.19134 3.70858 9.19134C4.21858 9.19134 4.63202 9.60478 4.63202 10.1148C4.63202 10.6248 4.21858 11.0382 3.70858 11.0382C3.19858 11.0382 2.78515 10.6248 2.78515 10.1148ZM3.70858 8.39134C2.75676 8.39134 1.98515 9.16295 1.98515 10.1148C1.98515 11.0666 2.75676 11.8382 3.70858 11.8382C4.66041 11.8382 5.43202 11.0666 5.43202 10.1148C5.43202 9.16295 4.66041 8.39134 3.70858 8.39134Z" fill="#A0A0A0"/>
        </svg>
      </div>
      <input
        :type="nativeInputType"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <button class="start-input__reveal"
        v-if="type === 'password'"
        @touchstart="passwordReveal = true"
        @touchend="passwordReveal = false"
      >
        <svg class="close" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          v-if="!passwordReveal"
        >
          <path d="M11 7.82336C6.44984 7.82336 2.56109 4.92072 1 0.823364M11 7.82336C15.5502 7.82336 19.4389 4.92072 21 0.823364M11 7.82336L11 12.8234M5 5.94483L1.46447 9.48036M17 5.94483L20.5355 9.48036" stroke="#A0A0A0" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <svg class="open" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg"
          v-else-if="passwordReveal"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99993 11.8891C5.94803 11.8891 2.51959 9.77131 1.07035 6.82206C2.47005 3.9461 5.95095 1.75757 10 1.75757C14.049 1.75757 17.5298 3.94603 18.9296 6.82191C17.4804 9.77123 14.0519 11.8891 9.99993 11.8891ZM19.9384 6.61922C20.0007 6.75838 19.9941 6.91085 19.9333 7.03849C18.3589 10.4938 14.4798 12.8891 9.99993 12.8891C5.51646 12.8891 1.63471 10.49 0.062729 7.03016C-0.000323659 6.89139 0.00531074 6.73891 0.0652975 6.61092C1.58152 3.2308 5.51967 0.757568 10 0.757568C14.484 0.757568 18.4249 3.23484 19.9384 6.61922ZM6.70722 6.82331C6.70722 5.4218 8.09537 4.14287 10 4.14287C11.9047 4.14287 13.2928 5.4218 13.2928 6.82331C13.2928 8.22481 11.9047 9.50374 10 9.50374C8.09537 9.50374 6.70722 8.22481 6.70722 6.82331ZM10 3.14287C7.71526 3.14287 5.70722 4.7118 5.70722 6.82331C5.70722 8.93482 7.71526 10.5037 10 10.5037C12.2848 10.5037 14.2928 8.93482 14.2928 6.82331C14.2928 4.7118 12.2848 3.14287 10 3.14287Z" fill="#A0A0A0"/>
        </svg>
      </button>
    </div>
    <span class="start-input__error-msg timemaster-caption"
      :class="{ 'start-input__error-msg--shake' : animationError}"
      v-if="showError"
    >
    {{ errorMessage }}
    </span>
  </div>
</template>

<script>
export default {
  name: "StartInput",
  props: {
    value: null,
    trigger: {
      type: Boolean,
      default: false
    },
    injectedErrorMessage: {
      type: String
    },

    type: null,
    placeholder: {
      type: String
    },
  },
  data: () => ({
    passwordReveal: false,

    errorMessage: "",

    showError: false,
    animationError: false
  }),
  methods: {
    sendError(message) {
      this.errorMessage = message;
      this.showError = true;
      this.animationError = true;
    }
  },
  computed: {
    nativeInputType() {
      if (this.type === "password") {
        return this.passwordReveal ? "text" : "password"
      } else {
        return "test"
      }
    },
  },
  watch: {
    animationError(value) {
      if (value) {
        setTimeout(() => {
          this.animationError = false
        }, 1300)
      }
    },
    injectedErrorMessage(value) {
      this.sendError(value);
    },

    trigger() {
      if(this.$el.hasAttribute("required") && !this.value) {
          this.sendError("This field is required");

      } else {
        switch(this.type) {
          case "name":
            if(this.value.length < 3 || this.value.length > 15) {
              this.sendError("Name length must be between 3-15 characters long")
            }
            else {
              this.showError = false;
            }
            break;
          case "email":
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!this.value.match(validRegex)) {
              this.sendError("This field must be a valid email")
            }
            else {
              this.showError = false;
            }
            break;
          case "password":
            if(this.value.length < 4 || this.value.length > 8) {
              this.sendError("Password length must be between 4-8 characters long")
            }
            else {
              this.showError = false;
            }
            break;
        }
      }
      this.$emit("validate", this.showError);
    }

  }
}
</script>

<style scoped lang="scss">
  .start-input {
    &__top {
      position: relative;
    }
    &__left-icon {
      width: 20rem;
      height: 20rem;
      position: absolute;
      top: calc(50% - 10rem);
      svg {
        width: 100%;
        height: 100%;
      }
    }
    input {
      border: none;
      border-bottom: 1px solid $light_gray;
      outline: none;
      width: 100%;
      padding: 0 32rem;
      background: transparent;
      color: $light_gray;
      font-family: 'Poppins', sans-serif;
      font-size: 20rem;
      line-height: 30rem;
      font-weight: 500;
      &::placeholder {
        color: $light_gray;
        font-family: 'Poppins', sans-serif;
        font-size: 20rem;
        line-height: 30rem;
        font-weight: 500;
      }
    }
    &__reveal {
      position: absolute;
      right: 0;
      top: calc(50% - 7rem);
      width: 22rem;
      height: 14rem;
      svg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }
    &__error-msg {
      display: inline-block;
      float: right;
      color: #DE2424;
      margin-top: 10rem;
      &--shake {
        animation: shake 1200ms 1;
        @keyframes shake {
          10% {
                transform: translateX(10rem);
              }
          20% {
              transform: translateX(-10rem);
          }
          30% {
              transform: translateX(10rem);
          }
          40% {
              transform: translateX(-10rem);
          }
          50% {
              transform: translateX(0);
          }
        }
      }
    }
  }
</style>
