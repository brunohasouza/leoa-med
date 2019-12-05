<template>
<main id="auth">
    <b-container>
        <div class="loginLogo">
            <img src="./../assets/logo.png" alt="">
            <span>LEOA Med</span>
        </div>
        <b-row :class="'fullPageRow'" align-h="center" align-v="center">
            <b-col md="8" lg="4" xs="12">
                <b-card title="Cadastre-se" class="text-center">
                        <b-form @submit.prevent="submitCadastroForm">
                            <b-form-group>
                                <b-input-group prepend="Nome:">
                                    <b-form-input 
                                        placeholder="João da Silva" 
                                        required
                                        v-model="form.nome"
                                    />
                                </b-input-group>
                            </b-form-group>
                            <b-form-group>
                                <b-input-group prepend="E-mail:">
                                    <b-form-input 
                                        placeholder="joao@email.com" 
                                        required
                                        v-model="form.email"
                                        type="email" 
                                    />
                                </b-input-group>
                            </b-form-group>
                            <b-form-group>
                                <b-input-group prepend="Senha:">
                                    <b-form-input 
                                        placeholder="123456" 
                                        required
                                        min="6"
                                        v-model="form.senha"
                                        type="password" 
                                    />
                                </b-input-group>
                            </b-form-group>
                            <b-form-group>
                                <b-button type="submit" block variant="primary">Cadastrar Usuário</b-button>
                            </b-form-group>
                        </b-form>
                        <hr>         
                        <b-button :to="{ name: 'login' }" block="" variant="outline-secondary">Voltar para Login</b-button>
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
        ...mapActions(['actionCadastro']),
        
        submitCadastroForm(ev) {
            const { form } = this

            this.actionCadastro(form)
                .then(() => {
                    alert('Usuário cadastrado com sucesso. Pode fazer login.')
                })
                .catch(() => {
                    alert('Erro ao cadastrar usuário')
                })
        }
    },

    data() {
        return {
            form: {
                nome: '',
                email: '',
                senha: ''
            }
        }
    }
}
</script>

<style>

</style>