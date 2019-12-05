<template>
<main id="mapa">
    <b-navbar type="dark" toggleable="lg" variant="info">
        <b-navbar-brand>
            <div class="mapaLogo">
                <img src="./../assets/logo.png" alt="" srcset="">
                <span>LEOA Med</span>
            </div>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <span class="helloUser">Olá, Bruno</span>
            <b-nav-item @click="actionLogout">Sair</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <div id="mapaContainer">
        <p>Carregando Dados</p>
        <google-map
            v-if="mapReady" 
            name="sample" 
            @onMarkerClick="toggleInfoWindow"
        />
    </div>
    <div class="fade" @click="toggle = false" :class="{ 'show': toggle }"></div>
    <transition name="toggle-sidenav">
        <info-window 
            ref="infoWindow" 
            @onToggleModal="showModal" 
            v-if="toggle" 
            :posto-nome="selectedMarker.nome"
            :posto-endereco="selectedMarker.endereco"
            :posto-id="selectedMarker.objectId" />
    </transition>

    <b-modal ref="adicionarRemedio" id="modalAdicionarRemedio" hide-footer>
        <template v-slot:modal-title>
            Adicionar Remédio
        </template>
        <div class="modalBody">
            <b-input-group prepend="Filtrar">
                <b-form-input v-model="filter" />
            </b-input-group>
            <hr>
            <b-form @submit.prevent="submitAdicionarRemedioForm">
                <div class="modalRemedios">
                    <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="remedios">
                        <b-form-checkbox 
                            v-for="remedio in returnRemedios" 
                            :key="remedio.REGISTRO" 
                            :value="remedio.REGISTRO"
                        >{{ remedio.PRODUTO.toLowerCase() }}</b-form-checkbox>
                    </b-form-checkbox-group>
                </div>
                <hr>
                <div class="modalFooter">
                    <b-button variant="danger" @click="$bvModal.hide('modalAdicionarRemedio')">Cancelar</b-button>
                    <b-button variant="success" v-if="selected.length" type="submit">Adicionar</b-button>
                    <b-button variant="success" v-else disabled>Adicionar</b-button>
                </div>
            </b-form>
        </div>
    </b-modal>
</main>
</template>

<script>
import GoogleMap from './../components/GoogleMap.vue'
import InfoWindow from './../components/InfoWindow.vue'

import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        GoogleMap,
        InfoWindow
    },

    computed: {
        ...mapGetters(['getRemedios']),
        returnRemedios: function() {
            return this.getRemedios.filter(remedio => {
                const { PRODUTO } = remedio
                const { filter } = this

                return PRODUTO.toLowerCase().includes(filter.toLowerCase())

            })
        }

    },

    mounted() {
        this.actionListarTodosRemedios()
        this.actionListarPostos()
            .then(() => this.mapReady = true)
    },

    methods: {
        ...mapActions(['actionListarTodosRemedios', 'actionAdicionarRemedio', 'actionLogout', 'actionListarPostos']),

        toggleInfoWindow(posto) {
            if (!posto) return
            this.toggle = true
        },

        submitAdicionarRemedioForm() {
            if (!this.selectedMarker || this.selected.length === 0) {
                return
            }

            this.submitAdicionarRemedioForm({ 
                postoId: this.selectedMarker.objectId, 
                remedios: this.selected 
            })
            .then(() => {
                alert('Remédios adicionados com sucesso')
            })
        },

        showModal() {
            this.$refs['adicionarRemedio'].show()
        }
    },

    data() {
        return {
            toggle: false,
            selectedMarker: null,
            filter: '',
            selected: [],
            mapReady: false
        }
    }
}
</script>

<style lang="scss">
.mapaLogo {
    height: 3rem;
    display: flex;
    align-items: center;
    img {
        height: 100%;
        width: auto;
    }
    span {
        margin-left: 1rem;
        font-size: 1.5rem;
        line-height: 1.5rem;
    }
}

.helloUser {
    display: inline-block;
    line-height: 2.5rem;
    margin-right: 1rem;
    font-weight: bold;
    color: white;
}

#mapaContainer {
    width: 100%;
    height: calc(100vh - 74px);
    position: relative;

    p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        font-size: 1.25rem;
    }
}

.toggle-sidenav-enter-active,
.toggle-sidenav-leave-active {
  transition: all .2s ease;
}

.toggle-sidenav-enter, 
.toggle-sidenav-leave-to {
  transform: translateX(-100%);
}

.fade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    background-color: rgba($color: #000, $alpha: .2);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;

    &.show {
        visibility: visible;
        opacity: 1;
    }
}

.modalRemedios {
    height: 18rem;
    overflow-y: auto;

    .custom-checkbox {
        padding-top: .5rem;
        padding-bottom: .5rem;
        display: flex;
        align-items: center;

        label {
            text-transform: capitalize;
        }
    }
}

.modalFooter {
    display: flex;
    justify-content: space-between;
}
</style>