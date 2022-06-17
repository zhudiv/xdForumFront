<template>
  <el-form-item :rules="item.rules" :prop="item.key">
    <el-input
      v-if="item.type==='input'"
      v-bind="$attrs"
      :type="item.subtype"
      :placeholder="item.placeholder"
      :disabled="item.disable"
      :readonly="item.readonly"
      :title-text="item.label"
      :prefix-icon="item.prefixIcon"
      :suffix-icon="item.suffixIcon"
      :clearable="item.clearable"
      v-on="$listeners"
    />

    <input-number
      v-else-if="item.type==='number'"
      v-bind="$attrs"
      v-on="$listeners"
    />

    <el-checkbox
      v-else-if="item.type==='checkbox'"
      v-bind="$attrs"
      v-on="$listeners"
    />

    <el-checkbox
      v-else-if="item.type==='switch' && item.appearance==='checkbox'"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <el-switch
      v-else-if="item.type==='switch'"
      v-bind="$attrs"
      v-on="$listeners"
    />

    <el-rate
      v-else-if="item.type==='rate'"
      v-bind="$attrs"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      text-color="#ff9900"
      v-on="$listeners"
    />

    <el-color-picker
      v-else-if="item.type==='color'"
      v-bind="$attrs"
      :color-format="item.format"
      v-on="$listeners"
    />

    <el-slider
      v-else-if="item.type==='slider'"
      v-bind="$attrs"
      :range="item.isRange"
      v-on="$listeners"
    />

    <el-radio-group
      v-else-if="item.type==='radio'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        :is="item.button?'el-radio-button':'el-radio'"
        v-for="o in item.options"
        :key="o.value"
        :label="o.value"
        :disabled="pageLoading || loading"
        :border="item.border"
      >{{ o.label }}</component>
    </el-radio-group>

    <el-checkbox-group
      v-else-if="item.type==='checkboxGroup'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        :is="item.button?'el-checkbox-button':'el-checkbox'"
        v-for="o in item.options"
        :key="o.value"
        :disabled="o.disabled"
        :label="o.value"
        :border="item.border"
      >{{ o.label }}</component>
    </el-checkbox-group>

    <el-select
      v-else-if="item.type==='select'"
      v-bind="$attrs"
      :title-text="item.label"
      v-on="$listeners"
    >
      <el-option
        v-for="o in item.options"
        :key="o.id"
        :label="o.name"
        :value="o.id"
        :disabled="o.disabled"
      />
    </el-select>

    <el-cascader
      v-else-if="item.type==='cascader'"
      v-bind="$attrs"
      :options="item.options||require('@/utils/address.json').data||ajaxOptions"
      :placeholder="item.placeholder"
      :clearable="true"
      :props="options"
      :filterable="item.filterable"
      v-on="$listeners"
    />

    <el-time-picker
      v-else-if="item.type==='time'"
      :format="item.valueFormat"
      v-bind="$attrs"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      v-on="$listeners"
    />

    <el-date-picker
      v-else-if="item.type==='date'"
      :type="item.subtype"
      :format="item.viewFormat||item.valueFormat"
      v-bind="$attrs"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      v-on="$listeners"
    />
    <span v-else>未知控件类型</span>
  </el-form-item>
</template>

<script>
import { getAddrOption, getCityOption, getDistOption } from '@/utils/address'

export default {
  name: 'BaseSearchItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    pageLoading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: {}
    }
  },
  created() {

  },
  mounted() {
  },
  beforeDestroy() {
    this.options = null
  },
  methods: {
    ajaxOptions() {
      this.options = {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level } = node
          if (level === 0) {
            const { result } = await getAddrOption() // 获取省接口
            const nodes = result.map(item => {
              return {
                value: item.addrId,
                label: item.name,
                leaf: false
              }
            })
            resolve(nodes)
          } else if (level === 1) {
            const { result } = await getCityOption(node.data.value) // 获取市接口
            const nodes = result.map(item => {
              return {
                value: item.addrId,
                label: item.name,
                leaf: false
              }
            })
            nodes.unshift({
              value: 0,
              label: '全部',
              leaf: true
            })
            resolve(nodes)
          } else if (level === 2) {
            const { result } = await getDistOption(node.data.value)// 获取区县
            const nodes = result.map(item => {
              return {
                value: item.addrId,
                label: item.name,
                leaf: true
              }
            })
            nodes.unshift({
              value: 0,
              label: '全部',
              leaf: true
            })
            resolve(nodes)
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
