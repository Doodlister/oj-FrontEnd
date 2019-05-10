<template>
  <div class="problemContent">

    <Card :bordered="false"
          dis-hover>
      <Tabs value="Description">
        <TabPane label="Description"
                 name="Description">
          <Row type="flex">

            <Col span="12"
                 order="1">
            <Card :bordered="false"
                  dis-hover>
              <div>
                <Divider orientation="left">
                  <p class="title">Description</p>
                </Divider>
                <p class="content">{{problem.description}}</p>
              </div>

              <div>
                <Divider orientation="left">
                  <p class="title">Input</p>
                </Divider>
                <p class="content">{{problem.inputDescription}}</p>
              </div>

              <div>
                <Divider orientation="left">
                  <p class="title">Output</p>
                </Divider>
                <p class="content">{{problem.outputDescription}}</p>
              </div>

              <div>
                <Divider orientation="left">
                  <p class="title">Sample Input</p>
                </Divider>
                <p class="content">1 1</p>
              </div>

              <div>
                <Divider orientation="left">
                  <p class="title">Sample Output</p>
                </Divider>
                <p class="content">2</p>
              </div>
            </Card>
            </Col>
            <Col span="12"
                 order="2">
            <Card :bordered="false"
                  dis-hover>
              <Select v-model="language"
                      style="width:200px">
                <Option v-for="item in languageList"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
              </Select>
              <div style="display: inline-block;margin-left:20px"
                   v-if="showStatus">
                <Icon type="md-code" />
                <Tag type="dot"
                     :color="statusColor">{{statusText}}</Tag>
              </div>

              <Button style="float: right;"
                      type="primary"
                      label="large"
                      @click="submit">Submit</Button>
              <Input v-model="code"
                     type="textarea"
                     :rows="30"
                     placeholder="Enter something..." />
            </Card>
            </Col>
          </Row>

        </TabPane>
        <TabPane label="Submission"
                 name="Submission">Submission</TabPane>
        <TabPane label="Statistics"
                 name="Statistics">Statistics</TabPane>
      </Tabs>
    </Card>

  </div>
</template>

<script>

export default {
  name: 'problemContent',
  data () {
    return {
      language: '',
      problem: {},
      code: '',
      languageList: [
        {
          value: 'C',
          label: 'C'
        }, {
          value: 'Java',
          label: 'Java'
        }
      ],
      submissionId: '',
      intervalId: '',
      showStatus: false,
      statusColor: '',
      statusText: ''
    }
  },
  created () {
    this.getProblem(this.$route.params.id)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  methods: {
    async getProblem (id) {
      try {
        let response = await this.$api.problem.findProblemById(id)
        this.problem = response
      } catch (e) {
        console.log(e)
      }
    },
    async submit () {
      let param = {
        code: this.code,
        language: this.language
      }
      try {
        let response = await this.$api.submission.submission(param, this.$route.params.id)
        // 取回SubmissionID 用于轮询提交结果
        this.submissionId = response.id
        // 展示状态Tag
        this.showStatus = true
        this.statusColor = 'primary'
        this.statusText = 'Waiting'
        this.intervalId = self.setInterval(this.inqueyResult, 1000)
      } catch (e) {
        console.log(e)
      }
    },
    async inqueyResult () {
      if (this.submissionId == '') {
        clearInterval(this.intervalId)
      } else {
        let response = await this.$api.submission.getResult(this.submissionId)
        if (response.result != 0) {
          clearInterval(this.intervalId)
          this.setStatusTag(response.result)
        }
      }
    },
    setStatusTag (resultCode) {
      switch (resultCode) {
        case 1:
          this.showStatus = true
          this.statusColor = 'success'
          this.statusText = 'AC'
          break
        case 2:
          this.showStatus = true
          this.statusColor = 'error'
          this.statusText = 'WA'
          break
        case 3:
          this.showStatus = true
          this.statusColor = 'error'
          this.statusText = 'TLE'
          break
        case 4:
          this.showStatus = true
          this.statusColor = 'error'
          this.statusText = 'OLE'
          break
        case 5:
          this.showStatus = true
          this.statusColor = 'error'
          this.statusText = 'MLE'
          break
        case 6:
          this.showStatus = true
          this.statusColor = 'error'
          this.statusText = 'RE'
          break
        case 7:
          this.showStatus = true
          this.statusColor = 'error'
          this.statusText = 'PE'
          break
        case 8:
          this.showStatus = true
          this.statusColor = 'error'
          this.statusText = 'CE'
          break
      }
    }
  }

}
</script>
<style>
.title {
  font-size: 20px;
  font-weight: 400;
  margin: 25px 0 8px;
  color: #9799ca;
}
p .content {
  margin-left: 25px;
  margin-right: 20px;
  font-size: 15px;
}
</style>
