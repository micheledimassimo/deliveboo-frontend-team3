<script>
//axios
import axios from 'axios';
//braintree
import dropin from 'braintree-web-drop-in';

export default {
  data() {
    return {
      defaultUrl: 'http://127.0.0.1:8000/api/orders',
      cart: [],
      loading: false,
      dropinInstance: null,
      newOrder: {
        customer_email: '',
        customer_name: '',
        customer_address: '',
        customer_number: '',
        total_price: 0,  
      },
      message: '',
      error: '',
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    },
  },
  mounted() {
    this.loadCart(); 
    this.initializeDropin(); 
  },
  methods: {
    async initializeDropin() {
                try {
                    const response = await axios.get('http://localhost:8000/api/braintree/token');
                    const clientToken = response.data.clientToken;

                    this.dropinInstance = await dropin.create({
                    authorization: clientToken,
                    container: '#dropin-container',
                    });
                } catch (error) {
                    console.error('Errore nella creazione del drop-in:', error);
                }
                },
                async submitPayment() {
                if (!this.dropinInstance) {
                    alert('Drop-in non inizializzato!');
                    return;
                }

                this.loading = true;

                try {
                    const payload = await this.dropinInstance.requestPaymentMethod();
                    const response = await axios.post('http://localhost:8000/api/braintree/checkout', {
                    nonce: payload.nonce,
                    
                    amount: this.cartTotal, // importo dinamico
                    });
                    
                } catch (error) {
                    console.error('Errore durante il pagamento:', error);
                    alert('Errore durante il pagamento.');
                } finally {
                    this.loading = false;
                }
            },
    loadCart() {
      const cartItems = JSON.parse(localStorage.getItem(`cart_${this.$route.params.slug}`));
      
      if (cartItems && cartItems.length > 0) {
        this.cart = cartItems;
        this.newOrder.total_price = this.cartTotal; 
      } else {
        this.error = 'Il carrello è vuoto. Non puoi procedere con l\'ordine.';
      }
    },
    sendOrder() {
      if (!this.cart.length) {
        this.error = 'Il carrello è vuoto.';
        return;
      }

      const orderData = {
        items: this.cart,
        total_price: this.cartTotal, 
        restaurant_slug: this.$route.params.slug,
        customer: { 
            email: this.newOrder.customer_email,
            name: this.newOrder.customer_name,
            address: this.newOrder.customer_address,
            number: this.newOrder.customer_number,
        },
    };

        console.log("Sending Order Data:", orderData);

      axios
        .post(this.defaultUrl, orderData)
        .then((res) => {
          this.message = 'Ordine inviato con successo!';
          this.error = '';

          localStorage.removeItem(`cart_${this.$route.params.slug}`);

          this.newOrder = {
            customer_email: '',
            customer_name: '',
            customer_address: '',
            customer_number: '',
            total_price: 0,
          };
          this.cart = []; 
        })
        .catch((err) => {
          console.log(err.response); 
          this.error = err.response?.data?.message || 'Errore durante l\'invio dell\'ordine. Controlla i dati e riprova.';
          this.message = '';
        });
    },
  },
};
</script>

<template>
  <div class="container mt-4">
     
  <!--navbar-->
  <nav class="navbar navbar-expand-lg mt-2">

      <div class="collapse navbar-collapse d-flex justify-content-between">

        <a class="navbar-brand" href="#">
          <i class="fa-solid fa-burger text-warning"></i> 
          Delive<strong class="text-warning">Boo</strong>
        </a>

        <button class="btn btn-outline-dark border-dark-subtle" type="submit">
          <a class="nav-link" href="http://localhost:5173">
              <i class="fa-solid fa-house text-warning me-2"></i>
              Homepage
          </a>
        </button>

      </div>

  </nav>


    <div v-if="message" class="alert alert-success">{{ message }}</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="container-sm my-5">
      <h2>Checkout</h2>
      <div class="row">
        <!--braintree payment-->
         
        <!--form-->
        <div class="col-8">
          <form @submit.prevent="sendOrder" v-if="cart.length > 0">
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label for="customer_email" class="form-label">Email</label>
                <input type="email" v-model="newOrder.customer_email" class="form-control" id="customer_email" minlength="6" maxlength="255" placeholder="Inserisci la tua email" required />
              </div>

              <div class="col-md-6">
                <label for="customer_name" class="form-label">Nome</label>
                <input type="text" v-model="newOrder.customer_name" class="form-control" id="customer_name" minlength="3" maxlength="64" placeholder="Inserisci il tuo nome" required />
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label for="customer_address" class="form-label">Indirizzo</label>
                <input type="text" v-model="newOrder.customer_address" class="form-control" id="customer_address" minlength="3" maxlength="255" placeholder="Inserisci il tuo indirizzo" required />
              </div>

              <div class="col-md-6">
                <label for="customer_number" class="form-label">Numero di Telefono</label>
                <input type="text" v-model="newOrder.customer_number" class="form-control" id="customer_number" minlength="10" maxlength="15" placeholder="Inserisci il tuo numero di telefono" required />
              </div>
            </div>
            
            <div class="my-3">
                <div id="dropin-container"></div>
                <button @click="submitPayment" :disabled="loading">Inserisci metodo di pagamento</button>
          </div>

            <div class="col-12">
              <button type="submit" class="btn btn-outline-dark border-dark-subtle btn-warning">Invia Ordine</button>
            </div>
          </form>
          
        </div>

      
         <!--cart checkout-->
        <div class="col-4">
          <div v-if="cart.length > 0">
            <h3 class="text-center">Riepilogo Ordine</h3>
            <ul>
              <li v-for="(item, index) in cart" :key="index">
                <strong class="me-2">{{ item.name }}</strong> - €{{ item.price }} x {{ item.quantity }}
              </li>
            </ul>
            <div class="text-center">
              <strong>Total: €{{ cartTotal }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
   

  </div>
</template>

<style lang="scss">
  @use '../assets/scss/main.scss' as *;
</style>
