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
              <Select v-model="model6"
                      style="width:200px">
                <Option value="JAVA">JAVA</Option>
                <Option value="C++"
                        disabled>C++</Option>
                <Option value="Python">Python</Option>
              </Select>
              <Button style="float: right;"
                      type="primary"
                      label="large">Submit</Button>
              <Input v-model="value6"
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
      problem: {}
    }
  },
  created () {
    this.getProblem(this.$route.params.id)
  },
  methods: {
    async getProblem (id) {
      try {
        let response = await this.$api.problem.findProblemById(id)
        this.problem = response
      } catch (e) {
        console.log(e)
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
