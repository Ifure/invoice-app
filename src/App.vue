<template>
  <div class="flex w-full ">
    <div class="bg-dark-blue w-full h-screen flex flex-col sm:flex-row">
      <Navigation/>
      <div class="flex  relative flex-col">
        <Modal v-if="modal"/>
        <transition
          enter-active-class="transform translate transition ease duration-1000"
          enter-class="-translate-x-full"
          enter-to-class="-translate-x-0"
          leave-active-class="transform translate transition ease duration-1000"
          leave-from-class="-translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <InvoiceSlip v-if="invoiceModal"/>
        </transition>
         <router-view />
      </div>
    </div>
    <!-- <div class=" flex flex-col text-center justify-center items-center h-screen bg-dark-blue text-white">
      <h2>
        Sorry, this app is not supported on Mobile Devices. 
      </h2>
      <p class="mt-2">To use this app, please use a computer or tablet</p>
    </div> -->
  </div>
 
  
</template>

<script>
import {mapState} from'vuex'
import Navigation from "./components/navigation"
import InvoiceSlip from "./components/InvoiceSlip.vue"
import Modal from "./components/modal"
export default {
  data() {
    return {
      mobile: null,
    };
  },

  name: 'App',
  components: {
    Navigation ,
    InvoiceSlip,
    Modal,
  },
  
  // created(){
  //   this.checkScreen();
  //   window.addEventListener('resize', this.checkScreen)
  // },
  // methods: {
  //   checkScreen(){
  //     const windowWidth = window.innerWidth;
  //       if (windowWidth <= 750) {
  //       this.mobile = true;
  //       return;
  //     }
  //     this.mobile = false;
  //   },
  // },
  computed: {
    ...mapState(['invoiceModal', 'modal'])
  }
}
</script>

