<template>
<div class="infoWindow__cotainer">
    <div class="infoWindow__cotainer--inner">
            <div class="infoWindow__cotainer--fixed">
                <b-card-title>{{postoNome}}</b-card-title>
                <b-card-sub-title>{{postoEndereco}}</b-card-sub-title>
                <br>
                <div class="infoWindow__cotainer--button">
                    <b-button 
                        :class="'btnAdicionar'" 
                        block 
                        pill 
                        variant="success"
                        @click="$emit('onToggleModal')"
                    >Adicionar Remédio</b-button>
                </div>
                <hr>
                <b-input-group prepend="Filtrar">
                    <b-form-input v-model="filter" />
                </b-input-group>
            </div>
            <div class="infoWindow__cotainer--remedios" v-if="getLoading === 1 && returnRemedios.length > 0">
                <div class="infoWindow__cotainer--remedio" v-for="remedio in returnRemedios" :key="remedio.REGISTRO">
                    <b-card-title :class="'capitalize'">{{ remedio.PRODUTO.toLowerCase() }}</b-card-title>
                    <b-card-sub-title :class="'capitalize'"><strong>Laboratório: </strong>{{ remedio.LABORATORIO.toLowerCase() }}</b-card-sub-title>
                    <b-card-text :class="'capitalize'"><strong>Substância: </strong>{{ remedio.SUBSTANCIA.toLowerCase() }}</b-card-text>
                    <b-card-text :class="'capitalize'"><strong>Registro: </strong>{{ remedio.REGISTRO.toLowerCase() }}</b-card-text>
                    <b-card-text :class="'capitalize'"><strong>Tarja: </strong>{{ remedio.TARJA.toLowerCase() }}</b-card-text>
                    <b-button 
                        pill 
                        variant="outline-danger" 
                        :class="'removerRemedio'" 
                        size="sm" 
                        @click="actionRemoverRemedioPosto({
                            postoId, 
                            remedioId: remedio.objectId
                        })"
                    >Remover</b-button>
                    <hr>
                </div>
            </div>
            <div class="infoWindow__cotainer--loading" v-else-if="getLoading === 1 && returnRemedios.length === 0">
                <b-card-sub-title>Nenhum remédio registrado</b-card-sub-title>
            </div>
            <div class="infoWindow__cotainer--loading loading" v-else-if="getLoading === 0">
                <b-card-sub-title>Carregando lista de remédios</b-card-sub-title>
            </div>
            <div class="infoWindow__cotainer--loading error" v-else>
                <b-card-sub-title>Ocorreu um erro ao listar os remédios</b-card-sub-title>
            </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        postoNome: {
            type: String,
            required: true
        },

        postoEndereco: {
            type: String,
            required: true
        },
        
        postoId: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters(['getRemediosPosto', 'getLoading']),
        returnRemedios: function() {
            return this.getRemediosPosto.filter(remedio => {
                const { LABORATORIO, PRODUTO, REGISTRO, SUBSTANCIA } = remedio
                const { filter } = this

                return LABORATORIO.toLowerCase().includes(filter.toLowerCase())
                    || PRODUTO.toLowerCase().includes(filter.toLowerCase())
                    || REGISTRO.toLowerCase().includes(filter.toLowerCase())
                    || SUBSTANCIA.toLowerCase().includes(filter.toLowerCase())

            })
        }
    },
    mounted() {
        this.actionListarRemediosPosto({ postoId: this.postoId })
    },
    methods: {
        ...mapActions(['actionListarRemediosPosto', 'actionRemoverRemedioPosto'])
    },
    data() {
        return {
            filter: ''
        }
    }
}
</script>

<style lang="scss">
.infoWindow__cotainer {
    position: fixed;
    left: 0;
    top: 74px;
    height: calc(100vh - 74px);
    width: 30rem;
    background-color: white;
    z-index: 999;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 
        0px 8px 10px 1px rgba(0, 0, 0, 0.14), 
        0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;

    &--loading {
        padding: 1.5rem 0;

        .card-subtitle {
            width: 100%;
            text-align: center;
        }

        &.loading {
            .card-subtitle {
                color:darkcyan !important;
            }
        }

        &.error {
            .card-subtitle {
                color: crimson !important;
            }
        }
    }

    &--inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;

        .capitalize {
            text-transform: capitalize !important;
        }

        .card {
            &-body {
                height: 100%;
                flex-direction: column;
            }

            &-title {
                margin-bottom:1rem;
                flex-grow: 0;
                flex-shrink: 0;
            }

            &-subtitle {
                margin: 0;
                flex-grow: 0;
                flex-shrink: 0;
            }
        }

        .input-group {
            flex-grow: 0;
            flex-shrink: 0;
            margin-bottom:1rem;
        }

        & > hr {
            flex-grow: 0;
            flex-shrink: 0;            
        }
    }

    &--fixed {
        flex-shrink: 0;
        flex-grow: 0;
    }

    &--remedios {
        flex: 1;
        height: 100%;
        overflow-y: auto;
    }

    &--remedio {
        position: relative;
        .card {
            &-text {
                margin-bottom: 0;
            }

            &-subtitle {
                margin-bottom: .5rem;
            }

            &-title {
                margin-bottom: .5rem;
            }
        }

        .removerRemedio {
            position: absolute;
            right: 1rem;
            bottom: 1rem;
        }
    }
}
</style>