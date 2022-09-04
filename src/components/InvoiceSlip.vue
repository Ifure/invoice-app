<template>
  <div @click="checkClick" ref="invoiceWrap" class="fixed z-10 text-sm w-full flex text-white shadow-xl shahow-purple rounded top-0 left-0 md:left-10 bottom-0 md:right-0">
    <form @submit.prevent="submitForm"  class="p-3 overflow-y-scroll scrollbar-hide w-full md:w-1/3  bg-purple ">
      <Loader  v-show="loading" />
      <h1 class='mb-5 text-xl font-bold' >New Invoice</h1>
      <h1 >Edit Invoice</h1>

      
      <div class="flex flex-col mb-5 ">
        <h4 class="text-md text-bright-purple mb-1">Bill From</h4>
        <div class="input flex flex-col mb-3">
          <label for="billerStreetAddress" >Street Address</label>
          <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
        </div>
        <div class="flex mb-3">
          <div class="input flex flex-col ">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input  mx-2 flex flex-col">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>
          <div class="input flex flex-col">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>

      
      <div class="mb-5  flex flex-col">
        <h4 class="text-md text-bright-purple mb-1">Bill To</h4>
        <div class="input flex flex-col mb-3">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input flex flex-col mb-3">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input flex flex-col mb-3">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
        </div>
        <div class=" flex mb-3">
          <div class="input flex flex-col">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input mx-2 flex flex-col">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>
          <div class="input flex flex-col">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>
      </div>

      
      <div class=" flex  flex-col">
        <div class="flex mb-3">
          <div class="mr-2 flex flex-col">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
          </div>
          <div class=" flex flex-col">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>
        <div class="text-dark-blue flex flex-col mb-3">
          <label class="text-white" for="paymentTerms">Payment Terms</label>
          <select class='cursor-pointer text-white bg-dark-blue py-3 rounded'  required type="text" id="paymentTerms" v-model="paymentTerms">
            <option class='bg-transparent text-white p-2 border-b-1 border' value="30">Net 30 Days</option>
            <option class='bg-transparent text-white p-2' value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="mb-3 flex flex-col">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="productDescription" />
        </div>
        <div class="w-full ">
          <h3 class='mb-3 '>Item List</h3>
          <div class=" flex w-full"> 
            <div class=" basis-8/12 ">Items Name</div>
            <div class="basis-1/12  mx-1 ">Qty</div>
            <div class="basis-2/12 mr-1">Price</div>
            <div class="basis-3/12">Total</div>
          </div>
          <div class="relative flex w-full mb-5" v-for="(item, i) in invoiceItemList" :key="i">  
            <div class=" basis-8/12 "><input type="text" class="pl-2" v-model="item.itemName" ></div>
            <div class="basis-1/12  mx-1 "><input type="text" class="pl-2" v-model="item.qty" ></div>
            <div class="basis-2/12 mr-1"><input type="text" class="pl-2" v-model="item.price"></div>
            <div class="basis-3/12 pl-2 mt-2 font-bold"><span>${{ (item.total = item.qty * item.price) }}</span></div>
            <img class=" absolute top-3 right-3 w-5 h-5 cursor-pointer" src="@/assets/icon-delete.svg" alt="" @click="deleteInvoice(id)" /> 
          </div>

          <div class="flex bg-dark-blue items-center justify-center py-4 w-full rounded cursor-pointer" @click="addNewInvoiceItem">
            <img src="@/assets/icon-plus.svg" alt=""  class="mr-2"/>
            Add New Item
          </div>
        </div>
      </div>

     
      <div class="mt-3 flex justify-between">
        <div class="left">
          <button type="button" @click="closeInvoice" class="bg-red">Cancel</button>
        </div>
        <div class="justify-end flex">
          <button  type="submit" @click="saveDraft" class="bg-dark-purple">Save Draft</button>
          <button  type="submit" @click="publishInvoice" class="bg-bright-purple">Create Invoice</button>
          <button type="sumbit" class="bg-dark-purple">Update Invoice</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {uid} from "uid"
import { collection, addDoc } from "firebase/firestore"; 
import app from "../firebase/firebaseInit";
import Loader from "../components/loader.vue"


export default {
  name: "InvoiceSlip",
  data() {
    return {
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      initialInvoiceDate: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDatetotal: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  components: {
    Loader,
  },
  created(){
    this.initialInvoiceDate = Date.now()
    this.invoiceDate = new Date(this.initialInvoiceDate).toLocaleDateString("en-us", {year:"numeric", month:"short",day:"2-digit"});
   
  },
 
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDatetotal = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms)); 
      this.paymentDueDate = new Date(this.paymentDueDatetotal).toLocaleDateString("en-us", {year:"numeric", month:"short",day:"2-digit"});
    },
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE', 'TOGGLE_MODAL']),

    checkClick(e){
      if(e.target === this.$refs.invoiceWrap) {
        this.TOGGLE_MODAL()
      }
    },

     closeInvoice() {
      this.TOGGLE_INVOICE()
    },
    // addNewItem
   addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },
    deleteInvoice(id){
      this.invoiceItemList.splice(id, 1)
    },
    publishDraft(){
      this.invoicePending = true
    },
    saveDraft(){
      this.invoiceDraft = true
    },

    calculateInvoiceTotal() {
      this.invoiceTotal = 0
      this.invoiceItemList.forEach(item => {
      this.invoiceTotal += item.total;
      console.log(this.invoiceTotal)
      });
    },

    async uploadInvoice() { 
     if (this.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }
      this.loading = true;
      this.calculateInvoiceTotal();

      try {
        const docRef = await addDoc(collection(app,"invoices"), {
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.initialInvoiceDate,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDatetotal,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null
      });
         console.log("Document written with ID: ", docRef.id);
       }catch (e) {
          console.error("Error adding document: ", e);
        }
      this.loading = false
      this.TOGGLE_INVOICE();
    },
    submitForm(){
      this.uploadInvoice()
    }
  },
  
};
</script>