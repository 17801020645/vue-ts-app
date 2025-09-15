<template>
  <div class="apply-title">
    <el-button type="primary">添加审批</el-button>
    <el-space>
      <el-input v-model="searchWord" placeholder="请输入搜索关键词" />
      <el-button type="primary" icon="search">搜索</el-button>
      <el-divider direction="vertical" border-style="dashed" />
      <el-radio-group
        v-model="approverType"
        text-color="#626aef"
        fill="rgb(239, 240, 253)"
        size="default"
      >
        <el-radio-button label="全部" />
        <el-radio-button label="待审批" />
        <el-radio-button label="已通过" />
        <el-radio-button label="未通过" />
      </el-radio-group>
    </el-space>
  </div>
  <div class="apply-table">
    <el-table
      :data="pageApplyList"
      stripe
      border
      height="500"
      show-overflow-tooltip
      :tooltip-formatter="tableRowFormatter"
    >
      <el-table-column prop="applicantname" label="申请人" width="180" />
      <el-table-column prop="reason" label="审批事由" width="180" />
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          {{ scope.row.time.join(' - ') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="approvername" label="审批人" width="180" />
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
    <el-pagination
      size="small"
      background
      layout="jumper,sizes,prev, pager, next,total"
      :total="applyList.length"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import type { TableTooltipData } from 'element-plus';
import type { ChecksState } from '@/store/modules/checks';

const store = useStore();

const defaultType = '全部';
const approverType = ref(defaultType);
const searchWord = ref('');

const applyList = computed(() =>
  store.state.checks.applyList.filter(
    (v) =>
      (v.state === approverType.value || defaultType === approverType.value) &&
      (v.note as string).includes(searchWord.value)
  )
);

const pageCurrent = ref(1);
const pageSize = ref(2);
const pageSizes = ref([10, 20, 30, 40]);

const handleSizeChange = (val: number) => {
  pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
  pageCurrent.value = val;
};
const pageApplyList = computed(() =>
  applyList.value.slice(
    (pageCurrent.value - 1) * pageSize.value,
    pageCurrent.value * pageSize.value
  )
);

const tableRowFormatter = (data: TableTooltipData<ChecksState>) => {
  return `${data.cellValue}`;
};
</script>

<style scoped lang="scss">
.apply-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.apply-table {
  margin: 10px;
  .el-pagination {
    float: right;
    margin: 10px;
  }
}
</style>
