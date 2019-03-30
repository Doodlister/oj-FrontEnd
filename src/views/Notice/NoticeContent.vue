<template>
  <div class="noticeContent">
    <Card :bordered="false"
          dis-hover>
      <p slot="title">
        <span style="font-size: 20px;">{{notice.title}} </span>
      </p>
      {{notice.content}}
    </Card>
  </div>
</template>

<script>

export default {
  name: 'noticeContent',
  data () {
    return {
      notice: {}
    }
  },
  created () {
    this.getNotice(this.$route.params.id)
  },
  methods: {
    async getNotice (id) {
      try {
        let response = await this.$api.notice.findNoticeById(id)
        this.notice = response
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>
