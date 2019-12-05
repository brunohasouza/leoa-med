<template>
<main id="auth">
    <b-container>
        <div class="loginLogo">
            <img src="./../assets/logo.png" alt="">
            <span>LEOA Med</span>
        </div>
        <b-row :class="'fullPageRow'" align-h="center" align-v="center">
            <b-col md="8" lg="4" xs="12">
                <b-card title="Login" class="text-center">
                        <b-form @submit.prevent="submitLoginForm">
                            <b-form-group>
                                <b-input-group prepend="E-mail:">
                                    <b-form-input 
                                        v-model="form.email" 
                                        required 
                                        placeholder="joao@email.com" 
                                        type="email"
                                    />
                                </b-input-group>
                            </b-form-group>
                            <b-form-group>
                                <b-input-group prepend="Senha:">
                                    <b-form-input 
                                        v-model="form.password" 
                                        required
                                        placeholder="123456" 
                                        type="password" 
                                    />
                                </b-input-group>
                            </b-form-group>
                            <b-form-group>
                                <b-button type="submit" block variant="primary">Login</b-button>
                            </b-form-group>
                        </b-form>
                        <hr>         
                        <b-button :to="{ name: 'cadastro' }" block="" variant="outline-secondary">Cadastre-se</b-button>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</main>
</template>

<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions(['actionLogin']),
        submitLoginForm(ev) {
            const { form } = this

            this.mapActions(form)
                .then(() => {
                    this.$router.push({ name: 'mapa' })
                })
                .catch((e) => {
                    alert('Usuário e/ou senha incorretos')
                })
        }
    },

    data() {
        return  {
            form: {
                email: '',
                password: ''
            }
        }
    }
}
</script>

<style lang="scss">
    .fullPageRow {
        min-height: 100vh;

        .card-title {
            margin-bottom: 1.5rem;
        }
    }

    .loginLogo {
        position: fixed;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        box-sizing: content-box;
        height: 3.5rem;
        display: flex;
        align-items: center;
        padding-top: 1rem;

        img {
            height: 100%;
            width: auto;
        }

        span {
            margin: 0;
            margin-left: 1rem;
            font-size: 2.5rem;
            line-height: 2.5rem;
            color: white;
            display: inline-block;
        }
    }
</style>