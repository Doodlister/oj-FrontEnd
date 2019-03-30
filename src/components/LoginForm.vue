<template>
  <div class="loginFrom">
    <Form ref="loginForm"
          :model="loginForm"
          :rules="loginFormRules">
      <FormItem prop="user">
        <Input type="text"
               v-model="loginForm.user"
               placeholder="Username">
        <Icon type="ios-person-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password"
               v-model="loginForm.password"
               placeholder="Password">
        <Icon type="ios-lock-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary"
                style="width:100%"
                @click="handleSubmit('loginForm')">Subbmit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import utils from '../common/utils'
export default {
  name: 'loginForm',
  data () {
    return {
      loginForm: {
        user: '',
        password: ''
      },
      loginFormRules: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let rep = this.login(this.loginForm.user, this.loginForm.password)

          rep.then(response => {
            // 获取用户资料
            let token = response.msg
            this.findProfile(token).then(response => {
              let user = response
              utils.setLoginUser(this, user, token)
              this.$Message.success('欢迎回来!' + user.username)
              this.loginForm.user = ''
              this.loginForm.password = ''
              // 向父组件传递信息
              this.$emit('loginSuccess', response)
              // 设置store状态
              // this.$store.commit('setLogined')
            })
          }).catch(response => {
            // this.$Message.error('登陆失败!' + response)
          })
        } else {

        }
      })
    },
    async login (_username, _password) {
      let param = {
        username: _username,
        password: _password
      }
      try {
        let response = await this.$api.session.login(param)
        return response
      } catch (e) {
        console.log(e)
      }
    },
    async findProfile (_token) {
      let param = {
        token: _token
      }
      try {
        let response = await this.$api.user.findProfile(param)
        return response
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
