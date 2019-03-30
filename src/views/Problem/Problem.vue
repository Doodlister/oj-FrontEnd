<template>
  <div class="problem">
    <Card :bordered="false"
          dis-hover>
      <p slot="title">Problem</p>
      <Table @on-row-click="onRowClick"
             :row-class-name="rowClassName"
             :columns="problemColumn"
             :data="problemData"
             :loading="tableLoading"></Table>
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
  name: 'problem',
  data () {
    return {
      problemColumn: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'Title',
          key: 'title'
        },
        {
          title: 'Total',
          key: 'submissionNumber'
        },
        {
          title: 'Accept',
          key: 'acceptedNumber'
        },
        {
          title: 'Difficulty',
          key: 'difficulty'
        }
      ],
      problemData: [],
      tableLoading: true,
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  components: {

  },
  created () {
    this.getProblemPage(this.page - 1, this.pageSize)
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
      this.$router.push({
        path: `/problem/${data.id}`
      })
    },
    changePage (currentPage) {
      this.page = currentPage
      this.getProblemPage(this.page - 1, this.pageSize)
    },
    rowClassName (row, index) {
      return 'rowClass'
    },
    async getProblemPage (_page, _pageSize) {
      let param = {
        page: _page,
        pageSize: _pageSize
      }
      try {
        let response = await this.$api.problem.problemPage(param)
        this.problemData = response.data
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

<style>
.ivu-table .rowClass td {
  cursor: pointer;
}
</style>
