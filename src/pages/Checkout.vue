<script>
    // axios
    import axios from 'axios';

    export default {
        data() {
            return { 
                defaultUrl: 'http://127.0.0.1:8000/api/orders',
                newOrder: {
                    customer_email: '',
                    customer_name: '',
                    customer_address: '',
                    customer_number: '',
                    total_price: ''
                },
                message: '',
                error: ''
            }
        },
        props: {
            cart: {
                type: Array,
                required: true,
            },
            cartTotal: {
                type: String,
                required: true,
            },
        },
        methods: {
            sendOrder() {
                this.newOrder.total_price = this.cartTotal;; // Usa il totale calcolato del carrello

                axios
                    .post(this.defaultUrl, this.newOrder)
                    .then(res => {
                        console.log(res.data.message);
                        this.message = 'Ordine inviato con successo!';
                        this.error = '';

                        this.newOrder = {
                            customer_email: '',
                            customer_name: '',
                            customer_address: '',
                            customer_number: '',
                            total_price: ''
                        };
                    })
                    .catch((err) => {
                        console.log(error.response?.data || err);

                        this.error = 'Errore durante l\'invio dell\'ordine. Controlla i dati e riprova.';
                        this.message = '';
                    });
            },

        },
    }
</script>

<template>
    <div class="container mt-4">
        <h2>Contact Page</h2>

        <div>
            <h4>Riepilogo del Carrello</h4>
            <ul>
                <li v-for="item in cart" :key="item.id">
                    {{ item.item_name }} x{{ item.quantity }} - {{ (item.price * item.quantity).toFixed(2) }} €
                </li>
            </ul>
            <p><strong>Totale: {{ cartTotal }} €</strong></p>
        </div>

        <div v-if="message" class="alert alert-success">{{ message }}</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <!-- form -->
        <form @submit.prevent="sendOrder">
            <div class="row g-3 mb-3">
                <div class="col-md-6">
                    <label for="customer_email" class="form-label">Email</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        v-model="newOrder.customer_email" 
                        id="customer_email" 
                        minlength="6" 
                        maxlength="255" 
                        placeholder="Inserisci la tua email" 
                        required/>
                </div>

                <div class="col-md-6">
                    <label for="customer_name" class="form-label">Nome</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model="newOrder.customer_name" 
                        id="customer_name" 
                        minlength="3" 
                        maxlength="64" 
                        placeholder="Inserisci il tuo nome" 
                        required/>
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col-md-6">
                    <label for="customer_address" class="form-label">Indirizzo</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model="newOrder.customer_address" 
                        id="customer_address" 
                        minlength="3" 
                        maxlength="255" 
                        placeholder="Inserisci il tuo indirizzo" 
                        required/>
                </div>

                <div class="col-md-6">
                    <label for="customer_number" class="form-label">Numero di Telefono</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model="newOrder.customer_number" 
                        id="customer_number" 
                        minlength="10" 
                        maxlength="15" 
                        placeholder="Inserisci il tuo numero di telefono" 
                        required/>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="total_price" class="form-label">Prezzo Totale</label>
                <input 
                    type="number" 
                    class="form-control" 
                    v-model="newOrder.total_price" 
                    id="total_price" 
                    min="1" 
                    step="0.01" 
                    placeholder="Inserisci il prezzo totale" 
                    required/>
            </div>

            <div class="col-12">
                <button type="submit" class="btn btn-primary">Invia Ordine</button>
            </div>
        </form>
    </div>
    
</template>

<style lang="scss">
  @use '../assets/scss/main.scss' as *;

</style>