import { Button, Modal, Table, Input, Switch,Form, Select, InputNumber} from 'antd';
import React, { useEffect, useState, FC, ChangeEvent } from 'react';
import {useAppDispatch, AppDispatch, useAppSelector} from "../store"
import { getConfigureFileds, selectFields, deleteField, updateField, addNewField} from  '../features/configure/configureSlice';
import { Field } from '../types/configure';


const { Option } = Select;

const fieldExmple: Field =  {
  id: Date.now().toString(),
  type: "",
  label: "",
  required: false,
  visible: false,
}

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const Fieldstable:FC = () => {
    const columns = [
        {
          title: 'Label',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_,record)=>{
            return (
            <>
              <Button onClick={() => {
                setFormField({ ...record });
                setModalVisible(true);
                }}>Edit</Button>
              <Button style={{marginLeft: 12}} onClick={() => onDeleteStudent(record)}>Delete</Button>
            </>)
          }
        }
    ];

    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [formField, setFormField] = useState<Field>(fieldExmple);

    const dispatch:AppDispatch = useAppDispatch();
    useEffect(() => {
      dispatch(getConfigureFileds())
    }, []);

    const datas = useAppSelector(selectFields);
    const onDeleteStudent = (record:Field) => {
      Modal.confirm({
        title: "Are you sure, you want to delete this field?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          dispatch(deleteField(record.id))
        },
      });
    };

    const onCancel = (): void => {   
      setFormField(null)  
      setModalVisible(false);
    };

    const onFinish = (item:Field): void => {
      const exists = datas.find(el => el.id === item?.id)
      if(exists) {
        dispatch(updateField(item));
        setFormField(null);
      }
      else {
        dispatch(addNewField(item));
        setFormField(null);
      }
      form.resetFields();
      setModalVisible(false);
    };

    return (
        <div> 
          <Table dataSource={datas} columns={columns} />
          <Button onClick={()=> setModalVisible(true)} style={{float:'right', marginTop:'10px'}}>Add New Field</Button>
          <Modal
            destroyOnClose
            title="Edit Field"
            visible={modalVisible}
            onOk={form.submit}
            onCancel={onCancel}
          >
          <Form
            colon={false}
            requiredMark={false}
            preserve={false}
            form={form} 
            onFinish={() => onFinish(formField)}
            name="validate_other"
            {...formItemLayout}
            >
            <Form.Item label="Label" initialValue={formField?.label} name="Label" rules={[{ required: true, message: 'Please select your type!' }]}>
                <Input type="text"  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                setFormField((pre) => {
                return { ...pre, label:e.target.value }
              })}}/>
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              hasFeedback
              initialValue={formField?.type}
              rules={[{ required: true, message: 'Please select your type!' }]}
            >
            <Select placeholder="Please select a type"  onChange={(e) => {setFormField((pre) => {return { ...pre, type: e}})}}>
              <Option value="Name">Name</Option>
              <Option value="Text">Text</Option>
              <Option value="Link">Link</Option>
            </Select>
            </Form.Item>
            {formField?.type === 'Text' && 
            <Form.Item label="Rows" name="rows" initialValue={formField?.rows} rules={[{ required: true, message: 'Please select your Rows!' }]}>
              <InputNumber min={1} max={10} onChange={(e) => 
              setFormField((pre) => {return { ...pre, rows:e}})}/>
            </Form.Item>}
            <Form.Item label="Required">
            <Switch checked={formField?.required} onChange={() => setFormField((pre) => {return { ...pre, required:!formField?.required};})}/>
            </Form.Item>
            <Form.Item label="Visible">
            <Switch checked={formField?.visible} onChange={() => setFormField((pre) => {return { ...pre, visible:!formField?.visible}})}/>
            </Form.Item>
          </Form>
          </Modal>
        </div>
    )
}

export default Fieldstable;