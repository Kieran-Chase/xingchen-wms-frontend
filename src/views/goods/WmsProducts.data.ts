import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import {list} from "@/views/goods/WmsProductBrand.api";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '货主',
    align: 'center',
    dataIndex: 'ownerName',
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'productName',
  },
  {
    title: '品牌',
    align: 'center',
    dataIndex: 'productBrandName',
  },
  {
    title: '商品规格',
    align: 'center',
    dataIndex: 'productSpec',
  },
   {
     title: '单位',
    align: 'center',
    dataIndex: 'unit',
   },
  {
    title: 'sku编码',
    align: 'center',
    dataIndex: 'productCode',
  },
  {
    title: '商品批次',
    align: 'center',
    dataIndex: 'productBatch',
  },
  {
    title: '商品条码',
    align: 'center',
    dataIndex: 'productBarcode',
  },
  {
    title: '供应商条码',
    align: 'center',
    dataIndex: 'supplierBarcode',
  },
  // {
  //  title: '宽',
  //  align:"center",
  //  dataIndex: 'width'
  // },
  // {
  //  title: '长',
  //  align:"center",
  //  dataIndex: 'length'
  // },
  // {
  //  title: '高',
  //  align:"center",
  //  dataIndex: 'height'
  // },
  // {
  //  title: '体积',
  //  align:"center",
  //  dataIndex: 'volume'
  // },
  // {
  //  title: '毛重',
  //  align:"center",
  //  dataIndex: 'grossWeight'
  // },
  // {
  //  title: '净重',
  //  align:"center",
  //  dataIndex: 'netWeight'
  // },
  {
    title: '商品分类',
    align: 'center',
    dataIndex: 'categoryName',
  },
  {
    title: '包装规格',
    align: 'center',
    dataIndex: 'packagingSpec',
  },
  {
    title: '养护周期(天)',
    align: 'center',
    dataIndex: 'maintenanceCycle',
  },
  {
    title: '保质期(天)',
    align: 'center',
    dataIndex: 'shelfLife',
  },
  {
    title: '是否保质期管控',
    align: 'center',
    dataIndex: 'isExpiryControlled',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  //货主
   {
     label: '货主',
     field: 'ownerId',
     component: 'JSearchSelect',
     componentProps: {
      dict: 'wms_cargo_owners,owner_name,id',
      // options: [
      //   { label: 'Default', value: 'default' },
      //   { label: 'IFrame', value: 'iframe' },
      // ],
      //是否为搜索模式
      showSearch: true,
      //是否禁用
      disabled: false,
    },
   },
  //商品编号
  {
    label: 'sku编码',
    field: 'productCode',
    component: 'Input',
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '货主',
    field: 'ownerId',
    component: 'JSearchSelect',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入货主!' }];
    },
    componentProps: {
      dict: 'wms_cargo_owners,owner_name,id',
      // options: [
      //   { label: 'Default', value: 'default' },
      //   { label: 'IFrame', value: 'iframe' },
      // ],
      //是否为搜索模式
      showSearch: true,
      //是否禁用
      disabled: false,
    },
  },

  {
    label: '商品名称',
    field: 'productName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入商品名称!' }];
    },
  },
  //品牌
   {
     label: '品牌',
      field: 'productBrand',
     component: 'ApiSelect',
     componentProps: {
       api: list,
       resultField: 'records',
       labelField: 'name',
       valueField: 'id',
     },
   },
  {
    label: '商品规格',
    field: 'productSpec',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: 'sku编码',
    field: 'productCode',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入sku编码!' }];
    },
  },
  {
    label: '商品批次',
    field: 'productBatch',
    component: 'Input',
  },
  // {
  //   label: '货主id',
  //   field: 'ownerId',
  //   component: 'Input',
  //   dynamicRules: ({model,schema}) => {
  //         return [
  //                { required: true, message: '请输入货主id!'},
  //         ];
  //    },
  // },

  {
    label: '商品条码',
    field: 'productBarcode',
    component: 'Input',
    //不可编辑
    componentProps: {
      disabled: true,
    }
  },
  {
    label: '供应商条码',
    field: 'supplierBarcode',
    component: 'Input',
  },
  // {
  //   label: '宽',
  //   field: 'width',
  //   component: 'InputNumber',
  // },
  // {
  //   label: '长',
  //   field: 'length',
  //   component: 'InputNumber',
  // },
  // {
  //   label: '高',
  //   field: 'height',
  //   component: 'InputNumber',
  // },
  {
    label: '体积',
    field: 'volume',
    component: 'InputNumber',
  },
  {
    label: '毛重',
    field: 'grossWeight',
    component: 'InputNumber',
  },
  {
    label: '净重',
    field: 'netWeight',
    component: 'InputNumber',
  },
  // {
  //   label: '商品一级分类',
  //   field: 'categoryId',
  //   component: 'Input',
  // },
  {
    label: '商品分类',
    field: 'categoryId',
    component: 'JTreeSelect',
    // helpMessage: ['component模式'],
    componentProps: {
      dict: 'wms_product_categories,category_name,id',
      pidField: 'parent_id',
      pidValue: '0'
    },
  },
  {
    label: '包装规格',
    field: 'packagingSpec',
    component: 'Input',
  },
  {
    label: '养护周期(天)',
    field: 'maintenanceCycle',
    component: 'InputNumber',
  },
  {
    label: '保质期(天)',
    field: 'shelfLife',
    component: 'InputNumber',
  },

  {
    label: '是否保质期管控',
    field: 'isExpiryControlled',
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'dict_item_status',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态: 0-禁用, 1-启用!' }];
    },
  },
  // {
  //   label: '商品图片',
  //   field: 'productImgs',
  //   component: 'JImageUpload',
  //   componentProps: {
  //     fileMax: 3,
  //   },
  // },
  // {
  //   label: '状态',
  //   field: 'status',
  //   component: 'InputNumber',
  // },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

// 高级查询数据
export const superQuerySchema = {
  productName: { title: '商品名称', order: 0, view: 'text', type: 'string' },
  ownerId: { title: '货主id', order: 1, view: 'text', type: 'string' },
  productCode: { title: 'sku编码', order: 2, view: 'text', type: 'string' },
  productBarcode: { title: '商品条码', order: 3, view: 'text', type: 'string' },
  width: { title: '宽', order: 4, view: 'number', type: 'number' },
  length: { title: '长', order: 5, view: 'number', type: 'number' },
  height: { title: '高', order: 6, view: 'number', type: 'number' },
  volume: { title: '体积', order: 7, view: 'number', type: 'number' },
  grossWeight: { title: '毛重', order: 8, view: 'number', type: 'number' },
  netWeight: { title: '净重', order: 9, view: 'number', type: 'number' },
  categoryId: { title: '商品分类', order: 10, view: 'text', type: 'string' },
  packagingSpec: { title: '包装规格', order: 11, view: 'text', type: 'string' },
  maintenanceCycle: { title: '养护周期(天)', order: 12, view: 'number', type: 'number' },
  shelfLife: { title: '保质期(天)', order: 13, view: 'number', type: 'number' },
  unit: { title: '计量单位', order: 14, view: 'text', type: 'string' },
  isExpiryControlled: { title: '是否保质期管控', order: 15, view: 'number', type: 'number' },
  status: { title: '状态', order: 16, view: 'number', type: 'number', dictCode: 'dict_item_status' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
