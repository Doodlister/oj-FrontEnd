<template>
  <div id="app">
    <div class="layout"
         :style="{minHeight:'900px'}">
      <!-- Register Modal -->
      <Modal v-model="modelShow"
             footer-hide>
        <Tabs v-model="activeTab">
          <TabPane label="Login"
                   name="login">
            <!-- loginForm -->
            <LoginFrom @loginSuccess="onLoginSuccess" />
          </TabPane>
          <TabPane label="Register"
                   name="register">
            <!-- register Form -->
            <RegisterForm @registerSuccess="onRegisterSuccess" />
          </TabPane>
        </Tabs>

      </Modal>
      <Layout>
        <Header class="appHader"
                style="z-index: 100"
                :style="{position: 'fixed', width: '100%' , background: bgImg}">
          <Menu mode="horizontal"
                theme="light"
                active-name="notice"
                @on-select="switchPage">
            <div class="layout-nav">
              <MenuItem name="notice">
              <Icon type="md-home" />
              Home
              </MenuItem>
              <MenuItem name="problem">
              <Icon type="ios-browsers-outline" />
              Problem
              </MenuItem>
              <MenuItem name="status">
              <Icon type="md-code" />
              Status
              </MenuItem>
              <MenuItem name="rankList">
              <Icon type="md-list" />
              RankList
              </MenuItem>
            </div>
          </Menu>
          <div class="right">
            <button type="button"
                    v-if="!isLogin"
                    @click="modelShow = true"
                    class="ivu-btn ivu-btn-text">
              <span>Login / Register</span>
            </button>
            <Dropdown v-if="isLogin"
                      @on-click="doDropClick">
              <a href="javascript:void(0)">
                {{user.username}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="profile">Profile</DropdownItem>
                <DropdownItem name="logout">Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content :style="{margin: '88px 20px 0', background: '#fff'}">
          <router-view></router-view>
        </Content>
        <Footer class="layout-footer-center"
                :style="{}">2018-2019 &copy; Doodlsiter</Footer>
      </Layout>
    </div>
  </div>

</template>

<script>
import LoginFrom from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import utils from './common/utils'
export default {
  name: 'app',
  data () {
    return {
      modelShow: false,
      activeTab: 'login',
      bgUrl: require('./assets/memphis-colorful.png')

    }
  },
  methods: {
    switchPage (pageName) {
      if (pageName === 'notice') { this.$router.push({ path: '/' }) } else { this.$router.push({ path: '/' + pageName }) }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    doDropClick (name) {
      if (name === 'logout') {
        utils.setLogout(this)
      }
    },
    onLoginSuccess (user) {
      this.modelShow = false
    },
    onRegisterSuccess (user) {
      this.activeTab = 'login'
    }
  },
  components: {
    LoginFrom,
    RegisterForm
  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsLogin
    },
    user () {
      return this.$store.getters.getUser
    },
    bgImg () {
      return 'url("' + this.bgUrl + '")'
    }
  }
}
</script>

<style scoped>
.appHader {
  background-image: url("/assets/memphis-colorful.png");
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-header {
  box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1);
  height: auto;
}

.ivu-menu {
  box-shadow: 0 0 0 #fff;
  height: auto;
  font-size: 9px;
}
.right {
  margin-right: 5%;
  float: right;
}
</style>
