
import { Form, Input,message, Button } from 'antd';
import { useEffect, FC } from 'react';
import { getConfigureFileds, selectFields } from '../features/configure/configureSlice';
import {useAppDispatch, AppDispatch, useAppSelector } from "../store"

const { TextArea } = Input;


const Profile:FC= () => {

  const dispatch:AppDispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getConfigureFileds())
  }, []);

  const [form] = Form.useForm();
  const datas = useAppSelector(selectFields);
  const visible = datas.filter(item => item.visible)
  const onFinish = (): void => {
    message.success('Fields passed the validation');
    form.resetFields();
  };

  return (
    <main>
      <Form form={form} requiredMark={false} name="nest-messages" onFinish={onFinish} colon={false}>
        {visible.map(el => {
          return (
          <Form.Item  label={el.label} name={el.label} 
            rules={ el.type==='Link' ? 
            [
              { required: el.required, message: `Please input your ${el.label}!` },
              {type:"url", message: "Must be Link"}
            ]:
            [{required: el.required, message: `Please input your ${el.label}!` }]
          }
          >
            {el.rows ? <TextArea  autoSize={{ minRows: el.rows}}/> :  <Input />}
          </Form.Item>
          )
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginLeft:'250px'}}>
            Submit
          </Button>
        </Form.Item>
     </Form>
   </main>  
  );
};

export default Profile;