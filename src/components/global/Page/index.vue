<template>
  <div>
    <i v-show="pageSet.pageLoading" class="el-icon-loading" />
    <el-pagination
      v-show="!pageSet.pageLoading"
      :disabled="loading"
      :current-page.sync="currentPage"
      :page-size.sync="limit"
      :page-sizes="pageSet.pageSizes ? pageSet.pageSizes : pageSizes"
      :background="hasBackground"
      :layout="layout"
      :small="small"
      :pager-count="5"
      :total="pageSet.countTotal"
      :hide-on-single-page="false"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      <span class="el-pagination__total" style="margin-right: 0">{{ currentPage }}/{{ countPage }} 页</span>
    </el-pagination>
  </div>

</template>

<script>
import { getFilter } from '@/utils/list-filter'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'BasePage',
  props: {
    countTotal: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: ''
    },
    newValue: {
      type: [String, Number],
      default: ''
    },
    pageLoading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    pageSet: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    }
  },
  data() {
    return {
      lastValueArr: [],
      hasBackground: true,
      layout: this.pageSet.layout ? this.pageSet.layout : 'total, sizes, prev, slot, next',
      small: false
    }
  },
  computed: {
    ...mapGetters([
      'pageLimit'
    ]),
    ...mapState({
      sortObject: state => state.options.sortObject,
      lastValue: state => state.options.lastValue
    }),
    currentPage: {
      get() {
        return this.pageSet.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    limit: {
      get() {
        return this.pageLimit
      },
      set(val) {
      }
    },
    countPage: {
      get() {
        let _countPage = 1
        if (this.pageSet.countTotal <= this.limit) {
          _countPage = 1
        } else {
          _countPage = Math.ceil(this.pageSet.countTotal / this.limit)
        }
        return _countPage
      },
      set() {
      }
    }
  },
  watch: {
    lastValue(val) {
      if (!val) {
        this.lastValueArr = ['']
      }
    }
  },
  beforeDestroy() {
    this.lastValueArr = null
  },
  mounted() {
    if (this.type || this.type === 'topPage') {
      this.hasBackground = false
      this.layout = 'prev, slot, next'
      this.small = true
    }
  },
  methods: {
    ...mapActions({
      setPageSize: 'app/setPageSize',
      setDataState: 'app/setDataState',
      setLastValue: 'options/setLastValue'
    }),
    setData() {
      return this.limit
    },
    setFilter(_filter) {
      // 是否有设置ID筛选项，没有的话默认设置ID > 0 (未删除的数据)
      const hasID = _filter.filter(item => {
        return item.key === 'id'
      })
      if (hasID.length === 0) {
        _filter.push({
          key: 'id',
          type: 'largeThanNumber',
          value: 0
        })
      }
      // 获取filterStr
      const _lastValueArrVal = this.lastValueArr[this.currentPage - 1] ? this.lastValueArr[this.currentPage - 1] : this.lastValue
      const _lastValue = this.currentPage === 1 ? '' : _lastValueArrVal
      const _filterPage = {
        key: this.sortObject.key,
        sort: this.sortObject.sort,
        lastValue: _lastValue,
        limit: this.limit,
        filter: _filter
      }
      this.filterStr = getFilter(_filterPage)
      return this.filterStr
    },
    handleCurrentChange(val) {
      this.lastValueArr[0] = ''
      if (!this.lastValueArr[val - 1]) {
        this.lastValueArr[val - 1] = this.lastValue
      }
      this.currentPage = val
      this.$emit('handleCurrentChange', val)
    },
    handleSizeChange(val) {
      this.setDataState(false)
      const _that = this
      _that.currentPage = 1
      this.setLastValue('')
      this.$emit('handleSizeChange')
      this.setPageSize(val)
    }
  }
}
</script>

<style scoped>

</style>
