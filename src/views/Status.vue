<template>
  <div class="status">
    <Card :bordered="false"
          dis-hover>
      <p slot="title">Status</p>
      <Table @on-row-click="onRowClick"
             :row-class-name="rowClassName"
             :columns="submissionColumn"
             :data="submissionData"
             :loading="tableLoading">
        <template slot-scope="{ row }"
                  slot="statusSolt">
          <Tag v-if="row.result ==0"
               color="primary">Waiting</Tag>
          <Tag v-if="row.result ==1"
               color="success">Accepted</Tag>
          <Tag v-if="row.result ==2"
               color="error">Wrong Answer</Tag>
          <Tag v-if="row.result ==3"
               color="error">Time Limit Exceed</Tag>
          <Tag v-if="row.result ==4"
               color="error">Output Limit Exceed</Tag>
          <Tag v-if="row.result ==5"
               color="error">Memory Limit Exceed</Tag>
          <Tag v-if="row.result ==6"
               color="error">Runtime Error</Tag>
          <Tag v-if="row.result ==7"
               color="error">Presentation Error</Tag>
          <Tag v-if="row.result ==8"
               color="error">Compile Error</Tag>

        </template>

        <template slot-scope="{ row }"
                  slot="createTime">
          {{convertTime(row.createTime)}}

        </template>
      </Table>
      <Page :total="total"
            :current="page"
            :page-size="pageSize"
            show-elevator
            @on-change="changePage"
            style="text-align: center;margin-top:10px" />
    </Card>
  </div>
</template>

<script>

export default {
  name: 'status',
  data () {
    return {
      submissionColumn: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: 'PID',
          key: 'pid'
        },
        {
          title: 'Status',
          slot: 'statusSolt'
        },
        {
          title: 'Submit Time',
          slot: 'createTime'
        },

        {
          title: 'Time',
          key: 'language'
        },
        {
          title: 'Memory',
          key: 'language'
        }, {
          title: 'Language',
          key: 'language'
        },
        {
          title: 'Author',
          key: 'username'
        }
      ],
      submissionData: [],
      tableLoading: true,
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  components: {

  },
  created () {
    this.getSubmissionPage(this.page - 1, this.pageSize)
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
    onRowClick (data, index) {
      // console.log(data, index)
      // this.$router.push({
      //   path: `/problem/${data.id}`
      // })
    },
    changePage (currentPage) {
      this.page = currentPage
      this.getSubmissionPage(this.page - 1, this.pageSize)
    },
    rowClassName (row, index) {
      return 'rowClass'
    },
    async getSubmissionPage (_page, _pageSize) {
      let param = {
        page: _page,
        pageSize: _pageSize
      }
      try {
        let response = await this.$api.submission.submissionPage(param)
        this.submissionData = response.data
        this.page = response.page + 1
        this.total = response.total
        this.pageSize = response.pageSize
        this.tableLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
