<template>
  <div class="exception-title">
    <el-button type="primary"> 异常处理</el-button>
    <el-space>
      <el-button plain>{{ year }}年</el-button>
      <el-select v-model="month">
        <el-option
          v-for="item in 12"
          :key="item"
          :value="item"
          :label="item + '月'"
        />
      </el-select>
    </el-space>
  </div>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="false" description="暂无异常考勤" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <el-space>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <el-space>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="12">
      <el-empty v-if="false" description="暂无申请审批" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
            <p class="apply-info">Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const date = new Date();
const year = date.getFullYear();
const month = ref(Number(route.query.month) || date.getMonth() + 1);

watch(month, () => {
  router.push({
    query: { month: month.value },
  });
});
</script>

<style scoped lang="scss">
.exception-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.el-select {
  width: 80px;
}
.el-timeline {
  margin: 10px;
}
.apply-info {
  margin: 10px;
}
.apply-info {
  margin: 10px;
}
</style>
