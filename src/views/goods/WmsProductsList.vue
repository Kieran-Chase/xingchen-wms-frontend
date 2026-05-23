<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
      <template #tableTitle>
          <a-button type="primary" v-auth="'goods:wms_products:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
          <a-button  type="primary" v-auth="'goods:wms_products:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          <j-upload-button type="primary" v-auth="'goods:wms_products:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-button  type="primary" v-auth="'goods:wms_products:exportXls'" preIcon="ant-design:export-outlined" @click="print"> 打印条码</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchHandleDelete">
                    <Icon icon="ant-design:delete-outlined"></Icon>
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button v-auth="'goods:wms_products:deleteBatch'">批量操作
                <Icon icon="mdi:chevron-down"></Icon>
              </a-button>
        </a-dropdown>
        <!-- 高级查询 -->
<!--        <super-query :config="superQueryConfig" @search="handleSuperQuery" />-->
      </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <WmsProductsModal @register="registerModal" @success="handleSuccess"></WmsProductsModal>
    <WmsProductImagesList @register="registerProductImgModal" />
  </div>
</template>

<script lang="ts" name="goods-wmsProducts" setup>
  import {ref, reactive, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import WmsProductsModal from './components/WmsProductsModal.vue'
  // import WmsProductsImgModal from './components/WmsProductsImgModal.vue'
  import WmsProductImagesList from './WmsProductImagesList.vue'
  import TenantUserModal from '../system/tenant/components/TenantUserList.vue';
  import {columns, searchFormSchema, superQuerySchema} from './WmsProducts.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './WmsProducts.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { useUserStore } from '/@/store/modules/user';
  import WmsProductImagesModal from './components/WmsProductImagesModal.vue'
  import {hiprint} from "sv-print";
  import productbarcodePanel from "@/views/printTemplate/productbarcode-panel";
  import inorderPanel from "@/views/printTemplate/inorder-panel";
  import {getLodop} from "@/assets/LodopFuncs";
  const queryParam = reactive<any>({});
  const checkedKeys = ref<Array<string | number>>([]);
  const userStore = useUserStore();
  //注册model
  const [registerModal, {openModal}] = useModal();
  const [registerProductImgModal, { openModal: productImgOpenModal }] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
      tableProps:{
           title: '商品信息表',
           api: list,
           columns,
           canResize:false,
           formConfig: {
              //labelWidth: 120,
              schemas: searchFormSchema,
              autoSubmitOnEnter:true,
              showAdvancedButton:true,
              fieldMapToNumber: [
              ],
              fieldMapToTime: [
              ],
            },
           actionColumn: {
               width: 120,
               fixed:'right'
            },
            beforeFetch: (params) => {
              return Object.assign(params, queryParam);
            },
      },
       exportConfig: {
            name:"商品信息表",
            url: getExportUrl,
            params: queryParam,
          },
          importConfig: {
            url: getImportUrl,
            success: handleSuccess
          },
  })

  const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    reload();
  }
   /**
    * 新增事件
    */
  function handleAdd() {
     openModal(true, {
       isUpdate: false,
       showFooter: true,
     });
  }
   /**
    * 编辑事件
    */
  function handleEdit(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: true,
     });
   }
   /**
    * 详情
   */
  function handleDetail(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: false,
     });
   }
   /**
    * 删除事件
    */
  async function handleDelete(record) {
     await deleteOne({id: record.id}, handleSuccess);
   }
   /**
    * 批量删除事件
    */
  async function batchHandleDelete() {
     await batchDelete({ids: selectedRowKeys.value}, handleSuccess);
   }
   /**
    * 成功回调
    */
  function handleSuccess() {
      (selectedRowKeys.value = []) && reload();
   }
   /**
      * 操作栏
      */
  function getTableAction(record){
       return [
         {
           label: '编辑',
           onClick: handleEdit.bind(null, record),
           auth: 'goods:wms_products:edit'
         },
         {
           label: '商品图片',
           onClick: handleSeeImg.bind(null, record.id),
         },
       ]
   }
     /**
        * 下拉操作栏
        */
  function getDropDownAction(record){
       return [
         {
           label: '详情',
           onClick: handleDetail.bind(null, record),
         }, {
           label: '删除',
           popConfirm: {
             title: '是否确认删除',
             confirm: handleDelete.bind(null, record),
             placement: 'topLeft',
           },
           auth: 'goods:wms_products:delete'
         },

       ]
   }
  /**
   * 查看图片
   * @param id
   */
  function handleSeeImg(id) {
    productImgOpenModal(true, {
      productId: id,
    });
  }
  const printData = {
    "productName": "商品名称1",
    "productSpec": "商品规格1",
    "productBarcode": "4243232",
  }
  const printData2 = {
    "productName": "商品名称2",
    "productSpec": "商品规格2",
    "productBarcode": "42432322",
  }
  //获取选择的商品
  function getSelectedProducts() {
    let printDataArray = []
    for(let i=0;i<rowSelection.selectedRows.length;i++){
      console.log(rowSelection.selectedRows[i])
      printDataArray.push(rowSelection.selectedRows[i])
    }
    return printDataArray;
  }
  //web打印
  function print() {
    let printDataArray = getSelectedProducts();
    console.log("打印数据")
    console.log(printDataArray)
    // 创建模板对象
    const hiprintTemplate = new hiprint.PrintTemplate({
      template: productbarcodePanel, // 模板json对象
    });
    // const jqueryObj = hiprintTemplate.getHtml(printData);
    // const html = jqueryObj.html();
    // console.log(html)
    //// 批量打印
    // hiprintTemplate.print([printData, printData, printData]);
    // const template = hiprintTemplate.getJson();
    hiprintTemplate.print(printDataArray, {}, {
      styleHandler: () => {
        return '<link href="https://jzo2o-oss.oss-cn-hangzhou.aliyuncs.com/upload/test/print-lock_1754529290935.css" media="print" rel="stylesheet">'
      }
    })
  }

  //Lodop打印
  function printLodop() {
    // 创建模板对象
    const hiprintTemplate = new hiprint.PrintTemplate({
      template: productbarcodePanel, // 模板json对象
    });
    const template = hiprintTemplate.getJson();
    const jqueryObj = hiprintTemplate.getHtml([printData, printData, printData]);
    const html = jqueryObj.html();
    // console.log(html)
    //样式

    const style = "<style > table, th, td { border: 1px solid black;  }  .hiprint-printPaper { position: relative; padding: 0 0 0 0; page-break-after: always; overflow-x: hidden;overflow: hidden; }</style>";
    // const style = '<link href="http://localhost:63642/print-lock.css" media="print" rel="stylesheet">';
    var strFormHtml = style + "<body>"+ html +"</body>";
    let LODOP = getLodop()//调用getLodop获取LODOP对象
    //打印任务名称
    LODOP.PRINT_INIT("")
    //100%用于分页
    LODOP.ADD_PRINT_HTM(1,1,300,300,strFormHtml);
    LODOP.PREVIEW();
  }
</script>

<style lang="less" scoped>
  :deep(.ant-picker),:deep(.ant-input-number){
    width: 100%;
  }
</style>
