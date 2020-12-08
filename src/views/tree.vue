<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="输入关键字进行过滤" v-model="infoText">
        </el-input>
        <el-tree
          ref="infoTree"
          :filter-node-method="filterNodeInfo"
          :data="infoData"
          show-checkbox
          node-key="infoId"
          :props="defaultInfo"
          @node-click="handleNodeInfo"
          @check-change="checkChangeInfo"
        >
        </el-tree>
      </el-col>
      <el-col :span="8">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="deptText"
        ></el-input>
        <el-tree
          ref="deptTree"
          :filter-node-method="filterNodeDept"
          :data="deptData"
          show-checkbox
          node-key="deptId"
          :props="defaultDept"
          @node-click="handleNodeDept"
          @check-change="checkChangeDept"
        >
        </el-tree>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="输入关键字进行过滤" v-model="optText"></el-input>
        <el-tree
          ref="optTree"
          :filter-node-method="filterNodeOpt"
          :data="optData"
          show-checkbox
          node-key="optId"
          :props="defaultOpt"
          @node-click="handleNodeOpt"
          @check-change="checkChangeOpt"
        >
        </el-tree>
      </el-col>
    </el-row>
    <div class="buttons">
      <el-button @click="loadData">加载</el-button>
      <el-button @click="getCheckData">获取选中数据</el-button>
    </div>
  </div>
</template>

<script>
import { filterArray } from "@/utils/common";
export default {
  data() {
    return {
      infoData: [],
      deptData: [],
      optData: [],
      checkData: [], //这个是树结构
      infoText: "",
      deptText: "",
      optText: "",
      curretInfoId: "",
      curretDeptId: "",
      curretOptId: "",
      defaultInfo: {
        id: "infoId",
        children: "children",
        label: "label",
      },
      defaultDept: {
        id: "deptId",
        children: "children",
        label: "label",
      },
      defaultOpt: {
        id: "optId",
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    infoText(val) {
      this.$refs.infoTree.filter(val);
    },
    deptText(val) {
      this.$refs.deptTree.filter(val);
    },
    optText(val) {
      this.$refs.buttonTree.filter(val);
    },
  },

  methods: {
    //1.数据  2.部门 3.操作
    //第一步加载三棵树数据
    //第二步获取选中数据 只勾选数据
    //第三步点击 数据权限 先清空部门和操作只勾选部门
    //第四步点击 部门权限 先清空操作只勾选部门

    loadData() {
      let infoArr = [
        { infoId: 1, pId: "", label: "系统管理" },
        { infoId: 2, pId: "1", label: "账号管理" },
        { infoId: 3, pId: "1", label: "菜单管理" },
        { infoId: 4, pId: "1", label: "角色管理" },
        { infoId: 5, pId: "", label: "报表" },
        { infoId: 6, pId: "5", label: "成本报表" },
        { infoId: 7, pId: "5", label: "收入报表" },
        { infoId: 8, pId: "6", label: "生产成本" },
        { infoId: 9, pId: "6", label: "生活成本" },
        { infoId: 10, pId: "7", label: "软件收入" },
      ];
      let infoTree = filterArray(infoArr, "infoId", "pId", "children");
      this.infoData = infoTree;

      let deptArr = [
        { deptId: 1, pId: "", label: "总公司" },
        { deptId: 2, pId: "1", label: "美国分公司" },
        { deptId: 3, pId: "2", label: "纽约办事处" },
        { deptId: 4, pId: "1", label: "厦门分公司" },
        { deptId: 5, pId: "4", label: "厦门软件部" },
        { deptId: 6, pId: "1", label: "北京分公司" },
        { deptId: 7, pId: "6", label: "北京商业部" },
        { deptId: 8, pId: "6", label: "北京事业部" },
      ];
      let deptTree = filterArray(deptArr, "deptId", "pId", "children");
      this.deptData = deptTree;
      let optArr = [
        { optId: 1, pId: "", label: "查询" },
        { optId: 2, pId: "", label: "新增" },
        { optId: 3, pId: "", label: "编辑" },
        { optId: 4, pId: "", label: "删除" },
        { optId: 5, pId: "", label: "详情" },
        { optId: 6, pId: "", label: "导入" },
        { optId: 7, pId: "", label: "导出" },
        { optId: 8, pId: "", label: "下载" },
      ];
      let optTree = filterArray(optArr, "optId", "pId", "children");
      this.optData = optTree;
    },
    getCheckData() {
      let checkData = [
        {
          infoId: 4,
          pId: "1",
          label: "角色管理",
          dept: [
            {
              deptId: 5,
              pId: "4",
              label: "厦门软件部",
              opt: [
                { optId: 1, pId: "", label: "查询" },
                { optId: 2, pId: "", label: "新增" },
                { optId: 3, pId: "", label: "编辑" },
                { optId: 4, pId: "", label: "删除" },
                { optId: 5, pId: "", label: "详情" },
              ],
            },
            {
              deptId: 7,
              pId: "6",
              label: "北京商业部",
              opt: [{ optId: 1, pId: "", label: "查询" }],
            },
            {
              deptId: 8,
              pId: "6",
              label: "北京事业部",
              opt: [
                { optId: 1, pId: "", label: "查询" },
                { optId: 5, pId: "", label: "详情" },
              ],
            },
          ],
        },
        {
          infoId: 8,
          pId: "6",
          label: "生产成本",
          dept: [
            {
              deptId: 5,
              pId: "4",
              label: "厦门软件部",
              opt: [
                { optId: 1, pId: "", label: "查询" },
                { optId: 7, pId: "", label: "导出" },
              ],
            },
            {
              deptId: 7,
              pId: "6",
              label: "北京商业部",
              opt: [
                { optId: 1, pId: "", label: "查询" },
                { optId: 6, pId: "", label: "导入" },
              ],
            },
          ],
        },
      ];
      let checkInfo = checkData.map((item) => item.infoId);
      this.$refs.infoTree.setCheckedKeys(checkInfo);
      this.checkData = checkData;
      //let res= this.$refs.infoTree.setCheckedKeys([3]);
    },
    filterNodeInfo(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    filterNodeDept(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    filterNodeOpt(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeInfo(data) {
      let _this = this;
      console.log(data);

      _this.$refs.deptTree.setCheckedKeys([]);
      _this.$refs.optTree.setCheckedKeys([]);
      _this.curretInfoId = data.infoId;
      _this.curretDeptId = "";
      _this.curretOptId = "";
      console.log(_this.checkData);
      let dept = _this.checkData.find(
        (ele) => ele.infoId === _this.curretInfoId
      );
      console.log(dept);
      if (dept !== undefined && dept !== null) {
        let checkDept = dept.dept.map((item) => item.deptId);
        console.log(checkDept);
        _this.$refs.deptTree.setCheckedKeys(checkDept);
      }
    },
    handleNodeDept(data) {
      this.$refs.optTree.setCheckedKeys([]);
      this.curretDeptId = data.deptId;
      this.curretOptId = "";
      let dept = this.checkData.find((ele) => ele.infoId === this.curretInfoId);
      if (dept !== undefined && dept !== null) {
        let opt = dept.dept.find((ele) => ele.deptId === this.curretDeptId);
        if (opt !== undefined && opt !== null) {
          let checkOpt = opt.opt.map((item) => item.optId);
          this.$refs.optTree.setCheckedKeys(checkOpt);
        }
      }
    },

    handleNodeOpt(data) {
      console.log(data);
    },
    checkChangeInfo() {
        //这边对checkData操作存储
    },
    checkChangeDept() {
           //这边对checkData操作存储
    },
    checkChangeOpt() {
           //这边对checkData操作存储
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

.login {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0px 20px 10px 20px;
  /* background: orange; */
  /* transform居中 */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* flex居中 */
  /* display: flex;
  justify-content: center;
  align-items: center; */

  /* margin居中 */
  /* width: 250px;
  height: 180px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto; */
}
</style>
