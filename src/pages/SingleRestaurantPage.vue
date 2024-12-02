<script>
    // axios
    import axios from 'axios';

    export default {
        data() {
            return { 
                    defaultUrl: 'http://127.0.0.1:8000/api/restaurants',
                    restaurant: null,
                    src: 'https://img.freepik.com/foto-gratuito/casseruola-deliziosa-su-un-supporto-di-legno_140725-949.jpg?t=st=1732115219~exp=1732118819~hmac=a770c4e44b39756dc35b8e695723d986b23128123c95a768703d5215ea5b9dfe&w=1380',
                    is_visible: true,
                    cart: [],
                }
        },
        mounted(){
            this.getSingleRestaurant();
            this.loadCart();
        },
        computed: {
            cartTotal() {
                return this.cart.reduce((total, item) => {
                    return total + (item.price * item.quantity);
                }, 0).toFixed(2); // Restituisce il totale con due decimali
            },
            cartCount() {
            // Conta tutti gli articoli nel carrello, sommando le quantità
            return this.cart.reduce((total, item) => total + item.quantity, 0);
            },
        },
        methods: {
            getSingleRestaurant() {
                axios
                    .get(this.defaultUrl + '/' + this.$route.params.slug)
                    .then(res => {
                        this.restaurant = res.data.data.restaurant;
                        this.restaurant.menu_items.forEach(menu_item => {
                            if (menu_item.image) {
                                menu_item.image = `http://127.0.0.1:8000/storage/${menu_item.image}`;
                            } else {
                                menu_item.image = this.src;
                            }
                            menu_item.isAdded = false;
                        });
                        const validCart = this.cart.filter(item =>
                            this.restaurant.menu_items.some(menu_item => menu_item.id === item.id)
                        );

                        // If the cart has been modified, update localStorage
                        if (validCart.length !== this.cart.length) {
                            this.cart = validCart; // Update cart to only valid items
                            this.saveCart(); // Update localStorage with the valid cart
                        }
                    });
            },
            goToCheckout() {
                const restaurantSlug = this.$route.params.slug; 
                if (!restaurantSlug) {
                    console.error("Slug is missing!");
                    return;
                }
                this.$router.push({ name: 'checkout', params: { slug: restaurantSlug } });
            },
            addToCart(menu_item) {
                const cartItem = this.cart.find(item => item.id === menu_item.id);
                if (cartItem) {
                    cartItem.quantity += 1;
                } else {
                    this.cart.push({ ...menu_item, quantity: 1 });
                }
                menu_item.isAdded = true;
                setTimeout(() => {
                    menu_item.isAdded = false;
                }, 2000);
                
                this.saveCart(); // Save the cart after adding an item
            },
            increaseQuantity(item) {
                item.quantity += 1;
                this.saveCart();
            },
            decreaseQuantity(item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    this.removeItem(item);
                }
                this.saveCart();
            },
            removeItem(item) {
                this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
                this.saveCart();
            },
            loadCart() {
                const restaurantSlug = this.$route.params.slug;
                const savedCart = localStorage.getItem(`cart_${restaurantSlug}`);
                if (savedCart) {
                    this.cart = JSON.parse(savedCart);
                }
            },
            saveCart() {
                const restaurantSlug = this.$route.params.slug; 
                localStorage.setItem(`cart_${restaurantSlug}`, JSON.stringify(this.cart)); // Save cart to localStorage
            }
        }
    }
</script>


<template>

    <!-- navbar -->
    <header>

    <!-- Navbar breakpoint dispositivi desktop -->
    <div class="container-sm d-none d-md-block">

        <nav class="navbar navbar-expand-lg mt-2">

            <div class="collapse navbar-collapse d-flex justify-content-between">

                <router-link class="navbar-brand" to="/">
                <i class="fa-solid fa-burger text-warning"></i> 
                Delive<strong class="text-warning">Boo</strong>
                </router-link>

                <button type="button"
                        class="btn btn-outline-dark border-dark-subtle position-relative"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBothOptions"
                        aria-controls="offcanvasWithBothOptions">

                        <i class="fa-solid fa-cart-shopping text-warning me-2"></i>
                        Carrello
                        <span v-if="this.cart.length>0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-black">
                            {{ cartCount }}
                        </span>
                </button>

            </div>

        </nav>

    </div>

    <!-- Navbar breakpoint dispositivi mobile -->
    <div class="container-sm d-block d-md-none">

        <nav class="navbar navbar-expand-lg">
            
            <div class="collapse navbar-collapse d-flex justify-content-between">

                <a class="navbar-brand w-75 fs-1" href="#">
                    <i class="fa-solid fa-burger text-warning"></i> 
                    Delive<strong class="text-warning">Boo</strong>
                </a>

                <button class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i class="fa-solid fa-bars fa-2x text-warning"></i>
                </button>

                <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    
                    <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        Deliveboo
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <a class="nav-link" href="http://127.0.0.1:8000/register">
                            <i class="fa-solid fa-house text-warning me-2"></i>
                                Registrati 
                        </a>
                        <a class="nav-link mt-3" href="http://127.0.0.1:8000/login">
                            <i class="fa-solid fa-house text-warning me-2"></i>
                                Accedi 
                        </a>
                        <div>
                            <hr class="text-warning">
                        </div>
                        <a class="nav-link mt-3" href="#">
                            Chi Siamo
                        </a>
                        <a class="nav-link mt-3" href="#">
                            Contatti
                        </a>
                        <a class="nav-link mt-3" href="#">
                            Informativa sulla privacy
                        </a>
                        <a class="nav-link mt-3" href="#">
                            Partner
                        </a>
                        <a class="nav-link mt-3" href="#">
                            FAQ
                        </a>
                    </div>

                </div>

            </div>

            <form class="d-flex my-2 w-100" role="search">
                <input class="form-control me-2" type="search" placeholder="Cerca ristoratnte per nome o tipologia" aria-label="Search">
                <button class="btn btn-outline-dark border-dark-subtle" type="submit">Cerca</button>
            </form>

        </nav>

    </div>

    </header>

    <!-- main -->
    <div class="container mt-5" v-if="restaurant != null">
        <div class="d-flex justify-content-between">
            <h1>
                {{ restaurant.restaurant_name }}
            </h1>
        </div>

        <!-- carrello -->
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            
            <div class="offcanvas-header">
              <h4 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Carrello</h4>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
                <p>Ecco i dettagli del tuo ordine:</p>

                <div v-if="cart.length === 0">
                    <p>Il carrello è vuoto.</p>
                </div>

                <div v-else>
                    <div class="card mb-4">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in cart" :key="index">
                                <div>

                                    <strong>{{ item.item_name }}</strong> - {{ item.price }} €
                                    <br>
                                    <small class="text-muted">
                                        Totale: {{ (item.price * item.quantity).toFixed(2) }} €
                                    </small>

                                </div>

                                <div class="d-flex align-items-center">
                                    
                                    <button class="btn btn-sm btn-outline-warning me-2 quantity-button" @click="decreaseQuantity(item)">-</button>
                                    <span>{{ item.quantity }}</span>
                                    
                                    <button class="btn btn-sm btn-outline-warning ms-2 quantity-button" @click="increaseQuantity(item)">+</button>
                                    
                                    <button class="btn btn-sm btn-outline-danger ms-3" @click="removeItem(item)">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>

                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="d-flex justify-content-between align-items-center my-3">
                        <h5>Totale:</h5>
                        <h5 class="text-end">{{ cartTotal }} €</h5>
                    </div>

            <router-link 
                    :to="{ name: 'checkout', params: { slug: restaurant.slug } }"
                >
                    <button class="btn btn-outline-dark border-dark-subtle btn-warning">
                        Vai al checkout
                    </button>
            </router-link>
                </div>
            </div>
        </div>

        <!-- card piatti -->
        <div class="row">

            <div class="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex" v-for="menu_item in restaurant.menu_items.filter(item => item.is_visible)" :key="menu_item.id">

                <div id="menuitem" class="card rounded-top-5 p-2 align-self-stretch flex-grow-1">

                    <img :src="menu_item.image" class="rounded-circle border border-dark-subtle border-1 shadow-sm" :alt="menu_item.item_name">

                    <div class="card-body text-center">
                        <h6 class="card-title mb-2 fw-bold">{{ menu_item.item_name }}</h6>
                        <p class="mb-2">{{ menu_item.description }}</p>
                    </div>

                    <div class="d-flex align-items-center justify-content-evenly mb-2">
                        <div class="badge rounded-pill text-bg-warning">
                            {{ menu_item.price }} € 
                        </div>

                        <button class="add-to-cart"
                            @click="addToCart(menu_item)"
                            :class="{ 'add-to-cart': true, 'added': menu_item.isAdded }"
                            :disabled="menu_item.isAdded"
                        >
                            <div class="default">Aggiungi</div>
                            <div class="cart">
                                <div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div class="dots"></div>
                        </button>
                    </div>

                </div>

            </div>

        </div>
    </div>

</template>

<style lang="scss" scoped>
    //  @use '../../assets/scss/main.scss' as *;
    @use '../assets/scss/main.scss' as *;
    // Import all of Bootstrap's CSS
    @import "bootstrap/scss/bootstrap";

    h1{
    margin-bottom: 100px;
    }
    .col-md-6{
    .card{
        margin-bottom: 80px;
    }
    }
    .quantity-button{
    width: 25px;
    height: 25px;
    border-radius: 100%;
    line-height: 10px;
    }
    .card{
    box-shadow: 0 0 5px rgba(14, 14, 14, 0.2); 
    transition: box-shadow .3s;
    position: relative;

    & img{
        width: 150px;
        height: 150px;
        object-fit: cover;
        position: absolute;
        text-align: center;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
    }

    & .card-body{
        margin-top: 80px;
    }

    }
    #menuitem:hover{
    border: 1px solid rgb(255, 206, 30);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.503); 
    }

    // cart
    .add-to-cart {
        --color: #000000;
        --icon: var(--color);
        --cart: #000000;
        --dots: #000000;
        --background: #ffc107;
        --shadow: #{rgba(#00093D, .16)};
        width: 157.47px;
        height: 42.68px;

        cursor: pointer;

        position: relative;
        outline: none;
        border: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        font-size: 16px;
        border-radius: 22px;
        padding: 12px 32px;
        font-weight: 500;
        line-height: 20px;
        transform: scale(var(--s, .97));
        box-shadow: 0 var(--s-y, 4px) var(--s-b, 12px) var(--shadow);
        color: var(--color);
        background: var(--background);
        transition: transform .3s, box-shadow .3s;

        .default {
            padding-left: 16px;
            position: relative;
            opacity: var(--o, 1);
            transform: scale(var(--s, 1));
            transition: transform .3s, opacity .3s;
            transition-delay: var(--d, .3s);
            &:before,
            &:after {
                content: '';
                width: 2px;
                height: 12px;
                left: 0;
                top: 4px;
                border-radius: 1px;
                background: var(--icon);
                position: absolute;
                transform: rotate(var(--r, 0deg));
                transition: transform .25s;
            }
            &:after {
                --r: 90deg;
            }
        }
        .success {
            opacity: var(--o, 0);
            transform: translate(-50%, var(--y, 12px));
            position: absolute;
            top: 12px;
            left: 50%;
            transition: opacity .3s, transform .3s;
            transition-delay: var(--d, 0s);
        }
        .dots {
            width: 4px;
            height: 4px;
            top: 20px;
            left: 50%;
            margin-left: -7px;
            border-radius: 2px;
            position: absolute;
            transform-origin: 10px 50%;
            background: var(--dots);
            box-shadow: 5px 0 0 var(--dots), 10px 0 0 var(--dots);
            opacity: var(--o, 0);
            transform: scale(var(--s, .4));
            transition: opacity .3s, transform .3s;
            transition-delay: var(--d, 0s);
        }
        .cart {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            border-radius: inherit;
            overflow: hidden;
            -webkit-mask-image: -webkit-radial-gradient(white, black);
            &:before {
                content: '';
                position: absolute;
                width: 20px;
                height: 16px;
                background: var(--background);
                top: 17px;
                right: 100%;
                z-index: 1;
                margin-right: -20px;
                transform: translateX(-18px) rotate(-16deg);
            }
            & > div {
                top: 13px;
                right: 100%;
                transform: translateX(-18px) rotate(-16deg);
                position: absolute;
                z-index: 2;
                transform-origin: 1px 21px;
                &:before,
                &:after {
                    content: '';
                    position: absolute;
                    top: var(--t, 4px);
                    left: var(--l, 0);
                    height: 2px;
                    width: var(--w, 18px);
                    background: var(--cart);
                    border-radius: 1px;
                }
                &:after {
                    --w: 16px;
                    --t: 14px;
                    --l: 1px;
                }
                & > div {
                    width: 2px;
                    height: var(--h, 15px);
                    border-radius: 1px;
                    transform: rotate(var(--r, -8deg));
                    background: var(--cart);
                    position: relative;
                    &:before,
                    &:after {
                        content: '';
                        position: absolute;
                        background: inherit;
                    }
                    &:after {
                        width: 4px;
                        height: 4px;
                        border-radius: 2px;
                        bottom: var(--b, -6px);
                        left: var(--l, 0);
                    }
                    &:first-child {
                        &:before {
                            border-radius: inherit;
                            top: 0;
                            right: 0;
                            height: 2px;
                            width: 6px;
                            transform-origin: 5px 1px;
                            transform: rotate(16deg);
                        }
                    }
                    &:last-child {
                        --h: 12px;
                        --r: 8deg;
                        position: absolute;
                        left: 16px;
                        bottom: -1px;
                        &:after {
                            --l: -2px;
                            --b: -5px;
                        }
                    }
                }
            }
        }
        &.added {
            .default {
                --o: 0;
                --s: .8;
                --d: 0s;
                &:before {
                    --r: -180deg;
                }
                &:after {
                    --r: -90deg;
                }
            }
            .dots {
                --o: 1;
                --s: 1;
                --d: .3s;
                animation: dots 2s linear forwards;
            }
            .success {
                --o: 1;
                --y: 0;
                --d: 1.8s;
            }
            .cart {
                &:before,
                & > div {
                    animation: cart 2s forwards;
                }
            }
        }
    }
    @keyframes cart {
        41%,
        49%,
        57%,
        60% {
            transform: translateX(72px) rotate(0deg);
        }
        40%,
        47%,
        54% {
            transform: translateX(72px) rotate(0deg) translateY(1px);
        }
        100% {
            transform: translateX(180px) rotate(-16deg);
        }
    }
    @keyframes dots {
        5% {
            transform: translateY(0);
        }
        25% {
            transform: translateY(-20px) rotate(-32deg);
            box-shadow: 5px 0 0 var(--dots), 10px 0 0 var(--dots);
        }
        31% {
            box-shadow: 5px -4px 0 var(--dots), 10px -8px 0 var(--dots);
        }
        32%,
        50% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        45%,
        100% {
            box-shadow: 5px 0 0 var(--dots), 10px 0 0 var(--dots);
        }
        51%,
        100% {
            opacity: 0;
        }
    } 
</style>