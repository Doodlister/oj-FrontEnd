<template>
  <div class="notice">
    <Card :bordered="false"
          dis-hover>
      <p slot="title">Notice</p>
      <div v-for="(item,index) in items"
           v-bind:key="index">
        <NoticeItem :title="item.title"
                    :src="'./notice/'+item.id"
                    :time="convertTime(item.createTime)"
                    :author="item.author" />
      </div>
      <Page :total="total"
            :current="page"
            :page-size="pageSize"
            show-elevator
            @on-change="changePage"
            style="text-align: center;" />
    </Card>
  </div>
</template>

<script>
import NoticeItem from '@/components/NoticeItem.vue'

export default {
  name: 'notice',
  data () {
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  components: {
    NoticeItem
  },
  created () {
    this.getNoticePage(this.page - 1, this.pageSize)
  },
  methods: {
    convertTime (timestamp) {
      var d = new Date(timestamp)
      var date = (d.getFullYear()) + '-' +
        (d.getMonth() + 1) + '-' +
        (d.getDate()) + ' ' +
        (d.getHours()) + ':' +
        (d.getMinutes()) + ':' +
        (d.getSeconds())
      return date
    },
    changePage (currentPage) {
      this.page = currentPage
      this.getNoticePage(this.page - 1, this.pageSize)
    },
    async getNoticePage (_page, _pageSize) {
      let param = {
        page: _page,
        pageSize: _pageSize
      }
      try {
        let response = await this.$api.notice.noticePage(param)
        this.items = response.data
        this.page = response.page + 1
        this.total = response.total
        this.pageSize = response.pageSize
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
