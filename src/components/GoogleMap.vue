<template>
    <div class="google-map" :id="mapName"></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
    props: ['name'],

    mounted: function () {        
        this.init()
    },

    computed: {
        ...mapGetters(['getPostos'])
    },

    methods: {
        ...mapActions(['actionListarPostos']),
        init() {
            this.actionListarPostos()
                .then(() => {
                    this.setupMap()
                    this.setupMarkers()
                })
                .catch(e => {
                    console.error(e)
                })            
        },

        setupMap() {
            const element = document.getElementById(this.mapName)
            
            const options = {
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            }

            this.map = new google.maps.Map(element, options)
        },

        setupMarkers() {
            const bounds = new google.maps.LatLngBounds()

            this.getPostos.forEach(posto => {
                const position = new google.maps.LatLng(posto.lat, posto.lng)

                const marker = new google.maps.Marker({
                    position,
                    map: this.map,
                    icon: 'http://localhost:8080/icon.png'
                })

                google.maps.event.addListener(marker, 'click', (ev) => {
                    this.$emit('onMarkerClick', posto)
                })

                this.map.fitBounds(bounds.extend(position))
            })
        }
    },

    data: function () {
        return {
            mapName: this.name + "-map",
            map: null,
            markers: []
        }
    }
};
</script>

<style>
.google-map {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: transparent;
}
</style>