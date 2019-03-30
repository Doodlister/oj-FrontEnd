<template>
  <div class="noticeItem">
    <Card style="width:100%;margin-bottom: 10px;">
      <Row>
        <Col span="14">
        <div style="word-wrap: break-word;">
          <router-link :to='src'>
            <h3>{{title}}</h3>
          </router-link>
        </div>
        </Col>
        <Col span="7">
        <div style="text-align:center">
          {{time}}
        </div>
        </Col>
        <Col span="3">
        <div style="text-align:center">
          {{author}}
        </div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'NoticeItem',
  props: {
    title: String,
    src: String,
    time: String,
    author: String
  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
