<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { formatDate } from '@/filters'
export default {
  name: 'BaseTableMain',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    config: {
      type: Array,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    op: {
      type: String,
      require: false
    },
    rowKey: {
      type: String,
      required: true
    },
    pageSet: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: {
      type: Number,
      required: true,
      default: 1
    },
    height: {
      type: Number,
      require: true,
      default: 50000
    }
  },
  data() {
    return {
      selection: this.multipleSelection,
      flag: false
    }
  },
  computed: {
    ...mapGetters([
      'isShowID',
      'isRelativeDate',
      'pageLimit'
    ]),
    ...mapState({
      multipleSelection: state => state.options.multipleSelection
    }),
    pageSize() {
      return this.pageLimit
    },
    border() {
      return this.pageSet.border !== false
    },
    stripe() {
      return this.pageSet.stripe !== false
    },
    showHeader() {
      return this.pageSet.showHeader !== false
    }
  },
  watch: {
    listData(val) {
      this.setDataState(true)
      this.handleSelection(this.multipleSelection)
      this.$store.dispatch('https/SET_HTTPS', []) // 加载完表格后，清空移除请求缓存池
    },
    multipleSelection(val) {
      if (val.length === 0) {
        this.clearSelect()
      }
    }
  },
  mounted() {
    this.setDataState(false)
  },
  beforeDestroy() {
    this.selection = null
  },
  methods: {
    ...mapActions({
      setDataState: 'app/setDataState',
      setMultipleSelection: 'options/setMultipleSelection',
      setSortObj: 'options/setSortObj'
    }),
    /**
     * table 选中的表格行数据
     * */
    handleSelectionChange(rows) {
      this.selection = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.selection.push(row.id)
          }
        })
      }
      this.setMultipleSelection(this.selection)
    },
    handleSelection(ids) {
      const rows = this.listData
      this.selection = []
      if (rows.length > 0) {
        rows.forEach(row => {
          if (ids.indexOf(row.id) > -1) {
            this.selection.push(row.id)
            this.$refs.multipleTable.toggleRowSelection(row)
          }
        })
      } else {
        this.clearSelect()
      }
      this.setMultipleSelection(this.selection)
    },
    /**
     * 清空选择的值
     * */
    clearSelect() {
      this.$refs.multipleTable.clearSelection()
    },
    /**
     * table 修改排序
     * */
    handleSortChange(v) {
      let _order = null
      let _prop = v.prop
      if (v.order === 'ascending') {
        _order = 'asc'
      } else if (v.order === 'descending') {
        _order = 'desc'
      } else {
        // order 为null时
        if (this.pageSet.sort) {
          // page有设置排序规则
          _prop = this.pageSet.key
          _order = this.pageSet.sort
        } else {
          // page 没有设置排序，则使用默认的id升序
          _prop = 'id'
          _order = 'desc'
        }
      }
      const _v = {
        key: _prop,
        sort: _order
      }
      this.setSortObj(_v)
    }
  },
  render(h) {
    return <div class='think-table'>
      <el-table
        stripe={this.stripe}
        v-loading={this.loading}
        border={this.border}
        ref='multipleTable'
        tooltip-effect='dark'
        show-header={this.showHeader}
        default-expand-all={true}
        data={this.listData}
        tree-props={{ children: 'children', hasChildren: 'hasChildren' }}
        max-height={this.height}
        class='test'
        row-key={(row) => row[this.rowKey]}
        header-cell-class-name='think-table-header'
        on-sort-change={this.handleSortChange}
        on-selection-change={this.handleSelectionChange}
      >
        {
          this.config.map((item, index) => {
            // 判断ID是否显示，结合VUEX使用
            if (item.prop === 'id' && !this.isShowID || item.hide===true) {
              return ''
            } else if (item.prop.indexOf('Time') > -1 && this.isRelativeDate) { // 判断是否使用相对时间，结合VUEX使用
              return <el-table-column
                prop={item.prop}
                label={item.label}
                width={item.width}
                min-width={item.minWidth}
                sortable={item.sortable}
                fixed={item.fixed}
                key={index}
                type={item.type}
                header-align={item.headerAlign}
                allow-expand={item.allowExpand}
                filters={item.filters}
                align={item.align ? item.align : 'left'}
                selections={this.selection}
                selectable={item.selectable}
                reserve-selection={item.reserveSelection}
                filter-method={item.filterHandler}
              >
                { scope => formatDate(scope.row[item.prop]) }
              </el-table-column>
            } else {
              return <el-table-column
                header-align={item.headerAlign}
                prop={item.prop}
                label={item.label}
                width={item.width}
                min-width={item.minWidth}
                sortable={item.sortable}
                fixed={item.fixed}
                key={index}
                type={item.type}
                allow-expand={item.allowExpand}
                filters={item.filters}
                align={item.align ? item.align : 'left'}
                selections={this.selection}
                selectable={item.selectable}
                reserve-selection={item.reserveSelection}
                filter-method={item.filterHandler}
              >
                {
                  item.template ? scope => item.template(scope, this, h) : ''
                }
              </el-table-column>
            }
          })
        }
      </el-table>
    </div >
  }
}
</script>
<style lang="scss" scoped>

</style>
