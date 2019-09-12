<template>
  <div class="login">
    <div class="weui-cells__title">重置密码</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">账号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="uname"
            class="weui-input"
            type="text"
            placeholder="请输入账号"
            autofocus
            v-on:keyup.enter="$refs.inputpwd.focus()"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">原密码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="upwd"
            ref="inputpwd"
            class="weui-input"
            type="password"
            placeholder="请输入原密码"
            v-on:keyup.enter="$refs.inputnewqpwd1.focus()"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">新密码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="newpwd1"
            ref="inputnewqpwd1"
            class="weui-input"
            type="password"
            placeholder="请输入新密码"
            v-on:keyup.enter="$refs.inputnewqpwd2.focus()"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">新密码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="newpwd2"
            ref="inputnewqpwd2"
            class="weui-input"
            type="password"
            placeholder="请确认新密码"
            v-on:keyup.enter="ResetPassword"
          />
        </div>
      </div>
    </div>
    <div class="weui-cells__tips">首次登录需要重置密码</div>
    <div class="weui-btn-area">
      <a v-on:click="ResetPassword" class="weui-btn weui-btn_block weui-btn_primary">重置密码</a>
    </div>
    <div class="page__ft j_bottom">
      <a href="https://weui.io">
        <img src="../assets/icon_footer.png" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import md5 from 'md5'
import weui from 'weui.js'

export default Vue.extend({
  name: 'login',
  data: () => {
    return {
      uname: '',
      upwd: '',
      newpwd1: '',
      newpwd2: ''
    }
  },
  methods: {
    ResetPassword(): void {
      console.log(this.uname, this.upwd, this.newpwd1, this.newpwd2)
      if (this.newpwd1 !== this.newpwd2) {
        weui.toast('新密码不一致')
        return
      }
      const loading = weui.loading('正在重置密码...')
      const url = 'http://diancan.169youxi.com:3333/login'
      const account = this.uname
      const pwd = md5(this.upwd + account)
      const newpwd = md5(this.newpwd1 + account)
      const data = { account, pwd, newpwd }
      axios
        .post(url, data, { timeout: 3000 })
        .then((ret) => {
          loading.hide()
          console.log('success', ret)
          if (ret.data.code === 'SUCCESS') {
            weui.toast('重置密码成功，请登录', {
              duration: 1000,
              callback: () => {
                this.$router.push('login/')
              }
            })
          } else {
            const errorMsg = ret.data.msg ? ret.data.msg : ret.data.data
            weui.confirm(errorMsg)
          }
        })
        .catch((ret) => {
          loading.hide()
          console.log('fail', ret)
          weui.confirm('网络异常，请稍后重试')
        })
    }
  }
})
</script>
