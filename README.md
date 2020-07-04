## 拖动加载API字段
实现通过鼠标拖拽一个后台API到Form实现自动加载API所以的字段成表单
拖动组件采用`react-dnd`这个插件，数据交互和页面更新等等使用Hooks实现
Hooks官方文档[https://react.docschina.org/docs/hooks-intro.html](https://react.docschina.org/docs/hooks-intro.html)
ReactDnd官方文档[http://react-dnd.github.io/react-dnd/](http://react-dnd.github.io/react-dnd/)
## 实现流程 

### 数据源
[http://jianjiacheng.com/json/swagger.json](http://jianjiacheng.com/json/swagger.json)

### 项目结构

![](http://photo.jianjiacheng.com/blog/s2/2.png) 

### 实现流程

![](http://photo.jianjiacheng.com/blog/s2/1.png)

### 效果图
![](http://photo.jianjiacheng.com/blog/s2/3.gif)

### Demo源码
[https://github.com/jianjiachenghub/ReactHooksDnD.git](https://github.com/jianjiachenghub/ReactHooksDnD.git)

## 拖动加载组件封装DragBox
组件需要使用useDrag这个dnd插件封装好的hook
然后将hook返回的函数赋值给DOM的ref属性进行操作
Items 是拖拽数据的表现形式，用 Object 来表示。
```
import React from 'react'
import { useDrag } from 'react-dnd'
import { Menu, Icon ,Button} from 'antd';
const DragBox = ({ name, data }) => {
    const [{ opacity }, drager] = useDrag({
        item: { name, type:'dragBox',data},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    return (
       <div ref={ drager }><Button value="large" type="dashed" block>{name}</Button></div>
    )
}
export default DragBox
```

## 接受拖动的组件Dustbin
accept属性指定只能接受拖动的item里type为dragBox的
drop是一个监听滑动完成的一个回调
```
import React from 'react'
import { useDrop } from 'react-dnd'
import CreactForm from "./CreactForm"
const style = {
    minHeight: 780,
    height: '100%',
    border: '1px dashed black'
}
const Dustbin = ({onDrop,data}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'dragBox',
        drop: onDrop,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })


    const getForm = (data)=>{
        if (Object.keys(data).length !== 0) {
            const {data:{properties}} = data
            return <CreactForm data={properties}/>
        }
    }
    return (
        <div ref={drop} style={{ ...style}}>
            {getForm(data)}
        </div>
    )
}
export default Dustbin
```
## 界面的展示组件DndMenu
在这个数据的JS代码部分解析好数据并传递给子组件
```
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
```
## 启用DND需要放到DndProvider中
```

import React from 'react'
import ReactDOM from 'react-dom'
import DndMenu from './menu'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

function Dnd() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <DndMenu />
            </DndProvider>
        </div>
    )
}
export default Dnd
```

## HOOKS组件注意的问题

### useEffect()请求数据的逻辑
- useEffect() 可以让你在函数组件中执行副作用操作
- 默认情况下，它在第一次渲染之后和每次更新之后都会执行。
- 但是我们不需要在更新的时候再次产生副作用
- 第二个参数来告诉react只有当这个参数的值发生改变时，才执行我们传的副作用函数
- 可以在effect的第二个参数带个空数组表示不监听任何值的改变来执行副作用
```
    useEffect(() => {
        getData()
    },[]);
```
- 这里采用await解析出axios返回的数据然后调用更新函数
```


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
    
    const [returnData, setData] = useState([]);//根据returnData去渲染UI
```

### 函数式组件间的数据交流
以前使用Class语法时在子组件内部使用this.props可以拿到父组件传递的数据
而现在的函数式语法可以直接在子组件的参数使用解构赋值拿到上层传递的数据
```
const DragBox = ({ name, data }) => {
}


function DndMenu(props) {
    return (
        <DragBox
           name={name}
           data={data}
           key={index}
        />
    )
}

```

### hooks组件怎么使用AntDesign的表单函数
以前的Class语法在组件内部想要调用Ant里面Form的函数只需要类修饰器@后
就能在组件内部使用this.props调用到form的API

```
@Form.create()
@connect(({ usersModal, basicdata, loading }) => ({
  usersModal,
  basicdata,
  loading : loading.models.usersModal,
  loadingEditFlag : loading.effects['usersModal/saveEditFlag'],
  loadingUpdate : loading.effects['usersModal/UpdateUser'],
  loadingGet : loading.effects['usersModal/getUser'],
  loadingAdd : loading.effects['usersModal/addUser'],
}))
class UserDetail extends PureComponent {
}
```

现在则可以再导出组件的时候直接将组件传入Form.create()返回的函数

```
export default Form.create()(DndMenu)
```








