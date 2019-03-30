<template>
  <div class="registerForm">
    <Form ref="registerForm"
          :model="registerForm"
          :rules="registerFormRules">
      <FormItem prop="user">
        <Input type="text"
               v-model="registerForm.user"
               placeholder="Username">
        <Icon type="ios-person-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password"
               v-model="registerForm.password"
               placeholder="Password">
        <Icon type="ios-lock-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="email">
        <Input type="text"
               v-model="registerForm.email"
               placeholder="Email">
        <Icon type="ios-mail-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary"
                style="width:100%"
                @click="handleSubmit('registerForm')">subbmit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'registerForm',
  data () {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please fill in the user name'))
      } else {
        this.checkUsername(value).then(response => {
          if (response.code == '40001') {
            callback(new Error('The User name had been register alerday'))
          } else {
            callback()
          }
        })
      }
    }
    return {
      registerForm: {
        user: '',
        password: '',
        email: ''
      },
      registerFormRules: {
        user: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please fill in the email.', trigger: 'blur' },
          { type: 'email', message: 'Invilidate Email', trigger: 'blur' }
        ]
      },
      isRegistered: false

    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let rep = this.register(this.registerForm.user, this.registerForm.password, this.registerForm.email)
          rep.then(response => {
            this.$Message.success('注册成功!' + response.username)
            this.registerForm.user = ''
            this.registerForm.password = ''
            this.registerForm.email = ''
            this.$emit('registerSuccess', response)
          }).catch(response => {
            this.$Message.error('注册失败!' + response)
          })
        } else {
          // this.$Message.error('Fail!')
        }
      })
    },
    async checkUsername (_username) {
      let param = {
        username: _username
      }
      try {
        let response = await this.$api.user.checkUsername(param)
        return response
      } catch (e) {
        console.log(e)
      }
    },
    async register (_username, _password, _email) {
      let param = {
        username: _username,
        password: _password,
        email: _email
      }
      try {
        let response = await this.$api.user.register(param)
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
