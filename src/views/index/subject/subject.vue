<template>
  <div class="subject-container">
    <!-- 头部卡片 -->
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
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
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="body-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
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
import addDialog from "./components/addDialog";
import editDialog from "./components/editDialog";
import {
  subjectList,
  subjectRemove,
  subjectStatus
} from "../../../api/subject";
export default {
  methods: {
    //点击的是页容量
    handleSizeChange(pageSizes) {
      this.limit = pageSizes;
      this.getData();
    },
    //点击的当前底部123小页
    handleCurrentChange(page) {
      this.page = page;
      this.getData();
    },
    //搜索
    onSubmit() {
      //直接获取数据调用列表接口
      this.getData();
    },
    //清除
    clear() {
      //循环遍历数据 都设置为空
      for (const key in this.formInline) {
        this.formInline[key] = "";
      }
    },
    //编辑
    showEdit(item) {
      this.eddFormVisible=true;
      //深拷贝
      this.$refs.edit.addForm=JSON.parse(JSON.stringify(item));
    },
    changeStatus(item) {
      subjectStatus({
        id: item.id
      }).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.getData();
        }
      });
    },
    removeItem(item) {
      window.console.log(item);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subjectRemove({
            id: item.id
          }).then(res => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              //从新刷新数据
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    getData() {
      subjectList({
        page: this.page,
        limit: this.limit,
        //扩展运算符
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        //表格数据
        this.tableData = res.data.items;
        //保存条数
        this.total = res.data.pagination.total;
      });
    }
  },
  components: {
    //注册新增框
    addDialog,
    editDialog
  },
  created() {
    this.getData();
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
        rid: "",
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