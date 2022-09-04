<template >
  <div class=" px-2 py-3 text-white rounded  shadow-xl  sm:mx-72 sm:my-28 sm:w-10/12">
    <div class="mb-5 flex justify-between px-5 ">
      <div class="w-1/2  flex  flex-col ">
        <h1 class='text-lg font-bold'>Invoices</h1>
        <span class="md:hidden">5 Invoices</span>
        <span class="hidden md:block">There are 5 total Invoices</span>
      </div>
      <div class=" flex ">
        <div @click="toggleDropMenu" class="relative cursor-pointer flex items-center" >
          <p class="hidden md:block">Filter by status</p>
          <p class="md:hidden">Filter</p>
            <img src="@/assets/icon-arrow-down.svg" alt="" class="ml-1 w-3 h-2" />
            <ul v-show="dropMenu" class="absolute top-12 px-3 py-2 list-none bg-purple shadow-lg rounded-lg">
              <li class="p-1 border-b-2 border-gray-800 text-sm">Draft</li>
              <li class="p-1 border-b-2 border-gray-800 text-sm">Pending</li>
              <li class="p-1 border-b-2 border-gray-800 text-sm">Paid</li>
              <li class="p-1  border-gray-700 text-sm">Clear preview</li>
            </ul>
        </div>
        <div @click="newInvoice" class="bg-bright-purple px-2 rounded-full  flex items-center mx-2">
          <div class=" mr-1 bg-white rounded-full w-5 h-5 flex justify-center items-center">
            <img src="@/assets/icon-plus.svg" alt="" class=" w-3 h-3  "/>
          </div>
          <span  class="hidden md:block">New Invoice</span>
          <span  class=" px-1 md:hidden">New </span>
           
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  name: "Home",
   data() {
    return {
      dropMenu: null,
    };
  },
  components: {},
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),
    newInvoice() {
      this.TOGGLE_INVOICE();
    },

    toggleDropMenu() {
    this.dropMenu = !this.dropMenu;
    },
  }
};
</script>