<template>
  <div class="exception-title">
    <el-button type="primary" @click="handleToApply"> 异常处理</el-button>
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
        <el-timeline-item
          v-for="item in detailMonth"
          :key="item[0]"
          :timestamp="year + '/' + month + '/' + item[0]"
          placement="top"
        >
          <el-card>
            <el-space>
              <h4>{{ item[1] }}</h4>
              <p>考勤详情: {{ renderTime(item[0]) }}</p>
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
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { toZero } from '@/utils/common';

const route = useRoute();
const router = useRouter();
const store = useStore();

const signsInfos = computed(() => store.state.signs.infos);

const date = new Date();
const year = date.getFullYear();
const month = ref(Number(route.query.month) || date.getMonth() + 1);

// 拿到异常数据
const ret = (signsInfos.value.detail as { [index: string]: unknown })[
  toZero(month.value)
] as { [index: string]: unknown };
// todo 这里对ret的转换需要看下，如何处理的
const detailMonth = computed(() =>
  Object.entries(ret)
    .filter((v) => v[1] !== '正常出勤')
    .sort()
);

watch(month, () => {
  router.push({
    query: { month: month.value },
  });
});

const handleToApply = () => {
  router.push('/apply');
};

const renderTime = (date: string): string => {
  // time的类型为； [index: string]: unknown
  // 通过toZero(month.value)拿到月份数据；[index: string]: unknown
  // 最终，通过date拿到某天具体的打卡数据
  const ret = (
    (signsInfos.value.time as { [index: string]: unknown })[
      toZero(month.value)
    ] as { [index: string]: unknown }
  )[date];
  // 断言，是否为数组
  if (Array.isArray(ret)) {
    // 拼接为字符串
    return ret.join('-');
  } else {
    return '暂无打卡记录';
  }
};
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
