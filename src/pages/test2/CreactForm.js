import React from 'react'
import {
    Card,
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import 'antd/dist/antd.css';
import { useDrag } from 'react-dnd'

const FormItem = Form.Item;
const formItemLayout = {
    labelCol : {
        xs : { span : 24 },
        sm : { span : 5 },
        md : { span : 7 },
    },
    wrapperCol : {
        xs : { span : 24 },
        sm : { span : 19 },
        md : { span : 15 },
    },
};


function CreactForm({form:{getFieldDecorator},data}){
    const detail = {}

    return(
        <Card bordered={false} >
            <Form hideRequiredMark style={{ marginTop : 8 }}>
                <Row>
                    <Col span={12}>
                        <Row type="flex" justify="start" >
                            {
                                Object.keys(data).map(function(value,index){
                                    console.log(value,index)
                                    return (
                                        <Col span={24} key={index}>
                                            <FormItem {...formItemLayout} label={data[value].description}>
                                                {getFieldDecorator('nickname', {
                                                    initialValue : detail.nickname || '',
                                                    rules : [
                                                        {
                                                            required : true,
                                                        },
                                                    ],
                                                })(<Input />)}
                                            </FormItem>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <FormItem style={{ marginTop : 32 ,display:'flex',justifyContent:'center'}}>
                            <>
                                <Button type="primary" >
                                    保存
                                </Button>
                                <Button style={{ marginLeft : 8 }} >
                                    取消
                                </Button>
                            </>
                        </FormItem>
                    </Col>
                    <Col span={12}>123</Col>
                </Row>

            </Form>
        </Card>
    )
}

export default Form.create()(CreactForm)