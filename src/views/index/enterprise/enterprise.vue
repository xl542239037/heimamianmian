<template>
  <div class="subject-container">
    <!-- 头部卡片 -->
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="body-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.create_time | formtime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{ scope.row.status === 1 ? "禁用" : "启用" }}</el-button>
            <el-button type="text" @click="removeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增 -->
    <addDialog></addDialog>
    <!-- 编辑 -->
    <editDialog ref="edit"></editDialog>
  </div>
</template>

<script>
import addDialog from './components/addDialog'
import{enterpriseList} from '../../../api/enterprise'
export default {
methods: {
  getEnterprise(){
    enterpriseList({
      page:this.page,
      limit:this.limit,
      ...this.formInline
    }).then(res=>{
      window.console.log(res);
      this.tableData=res.data.items
    })
  },
  onSubmit(){
    this.getEnterprise();
  }
},
  components: {
    //注册新增框
    addDialog,
    editDialog
  },
  created() {
    this.getEnterprise();
  },
  data() {
    return {
      //页码
      page: 1,
      //每一页多少条
      limit: 2,
      //总条数
      total: 0,
      //页容量 数组
      pageSizes: [2, 4, 6, 9],
      //顶部行内表单
      formInline: {
        eid: "",
        name: "",
        uesername: "",
        status: ""
      },
      //列表数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      //控制是否显示新增框
      addFormVisible: false,
      eddFormVisible: false
    };
  }
};
</script>

<style lang='less'>
.subject-container {
  .head-card {
    // 设置按钮的容器尺寸
    .el-form-item__content {
      width: 145px;
    }
    .short-input .el-form-item__content {
      width: 100px;
    }
    .btn-form-item .el-form-item__content {
      width: 100%;
    }
  }

  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .body-card {
    margin-top: 19px;
  }

  // 高亮的span
  span.red {
    color: #ff4b4b;
  }
  .has-gutter {
    // float: right;
    // justify-content: center;
    .cell {
      //  flex: 1
    }
  }
}
</style>