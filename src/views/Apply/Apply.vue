<template>
  <div class="apply-title">
    <el-button type="primary">添加审批</el-button>
    <el-space>
      <el-input v-model="searchWord" placeholder="请输入搜索关键词" />
      <el-button type="primary" icon="search">搜索</el-button>
      <el-divider direction="vertical" />
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部" />
        <el-radio-button label="待审批" />
        <el-radio-button label="已通过" />
        <el-radio-button label="未通过" />
      </el-radio-group>
    </el-space>
  </div>
  <div class="apply-table">
    <el-table :data="applyList" border>
      <el-table-column prop="applicantname" label="申请人" width="180" />
      <el-table-column prop="reason" label="审批事由" width="180" />
      <el-table-column prop="time" label="时间">
        <!-- <template #default="scope">
          {{ scope.row.time.join(' - ') }}
        </template> -->
      </el-table-column>
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="approvername" label="审批人" width="180" />
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="applyList.length"
      :page-size="pageSize"
      @current-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const applyList = computed(() => store.state.checks.applyList);

const defaultType = '全部';
const approverType = ref(defaultType);

const searchWord = ref('');

const pageCurrent = ref(1);
const pageSize = ref(2);
const handleChange = (value: number) => {
  pageCurrent.value = value;
};
const pageApplyList = computed(() =>
  applyList.value.slice(
    (pageCurrent.value - 1) * pageSize.value,
    pageCurrent.value * pageSize.value
  )
);
</script>

<style scoped lang="scss">
.apply-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
