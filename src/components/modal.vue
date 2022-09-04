<template>
	<div class="flex z-10 fixed justify-center items-center h-screen w-full">
    <div class="rounded-2xl px-2 py-3 bg-dark-purple w-2/3 sm:w-1/4 mx-auto">
      <p class="text-center text-white ">Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="flex items-center justify-around mt-2 ">
        <button @click="closeModal" class="bg-bright-purple">Return</button>
        <button @click="closeInvoice" class="bg-red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations} from "vuex";

export default {
	name: "modal",
	methods: {
    ...mapMutations(["TOGGLE_MODAL", "TOGGLE_INVOICE"]),
    closeModal() {
      this.TOGGLE_MODAL();
    },
    closeInvoice() {
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE();
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE();
      }
    },
  },
}
</script>
