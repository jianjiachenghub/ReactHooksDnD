import {
    Layout,
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import 'antd/dist/antd.css';
import React,{useState,useEffect} from 'react';
import {useDrag,useDrop} from 'react-dnd';
import axios from 'axios';
import {GLOBAL_URL} from '../../utils/ip';
import DragBox from "./dragBox";
import Dustbin from  "./Dustbin";
import './menu.css'

const { Header, Footer, Sider, Content } = Layout;

function DndMenu(props) {
    //请求数据hooks
    console.log(props)
    const getData = async () => {
        const result = await axios(
            `${GLOBAL_URL}/list`
        );
        console.log(result)
        const data = result.data[0]
        const api = getKey(data.apiPath)
        getTreeData(api,data.apiPath)
        const originalData = getOriginalData(data.apiPath,data.apiDefinitions)
        setData(originalData)
    }

    const getOriginalData = (data,apiDefinitions) => {
        console.log(data)
        let arr = []
        for(let keys in data){
            const  keyData = data[keys]
            if(keys.lastIndexOf('/') === 0){
                const typeApiData = getFirstAttribute(keyData)
                if(typeApiData.hasOwnProperty('parameters')){
                    const {parameters: [{schema: {originalRef}}]} = typeApiData
                    let obj = {
                        name:keys,
                        data:apiDefinitions[originalRef]
                    }
                    arr.push(obj)
                }

            }
        }
        return arr
    }

    function getFirstAttribute(data){
        for (let key in data)
            return data[key];
    }
    const getKey = (data) => {
        let arr = []

        for(let keys in data){
            const apiArr = keys.split('/')
            arr.push('/'+apiArr[1])
        }
        return Array.from(new Set(arr))
    }

    const getTreeData = (api,data) => {
        let gMenuData = [];
        api.forEach(function (value,index) {
            gMenuData.push({
                title: value,
                icon: "setting",
                child: [],
            })
        })
        gMenuData.forEach(function (value) {
            var index = 0;
            for(let firstMenu in data){
                if(firstMenu.indexOf(value.title)!==-1){
                    value.child.push(
                        {
                            title: firstMenu,
                            icon: "",
                            child: [],
                        }
                    )
                    for(let secondMenu in data[firstMenu]){
                        value.child[index].child.push(
                            {
                                title: secondMenu,
                                icon: "",
                            },
                        )
                    }
                    index++
                }

            }
        })
        console.log(gMenuData)
    }

    useEffect(() => {
        getData()
    },[]);

    const [returnData, setData] = useState([]);
    console.log(returnData)


    //拖动交互hooks
    const [data, drager] = useDrag({
        item: { type: 'dragBox' }
    })
    const [collectProps, droper] = useDrop({
        // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
        drop:item =>console.log(item),
        accept: 'dragBox',
        // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
        collect: (minoter) => ({
            isOver: minoter.isOver()
        })
    })
    const handleDrop  = (item)=>
    {
        setDropData(item)
        console.log(item)
    }
    const bg = collectProps.isOver ? 'deeppink' : 'white';
    const content = collectProps.isOver ? '快松开，放到碗里来' : '将 Box 组件拖动到这里'


    //菜单交互hooks
    const [dropData, setDropData] = useState({});


    const { getFieldDecorator } = props.form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

        return (
            <>
                <Layout>
                    <Header>
                        <Row type="flex" >
                            <Col span={2}>
                                表单生成器
                            </Col>
                            <Col span={10} type="flex" align="middle">
                                <Form {...formItemLayout}>
                                    <Form.Item label="Url">
                                            {getFieldDecorator('Url', {
                                                rules: [
                                                    {
                                                        type: 'url',
                                                        message: 'The input is not a url',
                                                    },
                                                    {
                                                        required: true,
                                                        message: 'Please input url!',
                                                    },
                                                ],
                                            })(<Input />)}

                                    </Form.Item>
                                </Form>

                            </Col>
                            <Col  span={4}>
                                <Button type="primary">
                                    Send
                                </Button>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Sider>
                            {returnData.map(({ name, data }, index) => (
                                <DragBox
                                    name={name}
                                    data={data}
                                    key={index}
                                />
                            ))}
                        </Sider>
                        <Content>
                            <Dustbin
                                onDrop={item => handleDrop(item)}
                                data={dropData}
                            />
                        </Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
            </>

        );

}

export default Form.create()(DndMenu)