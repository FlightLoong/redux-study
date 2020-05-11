### Redux 笔记
---

#### 4. `redux` 基础使用

##### 4.1  安装相关包

```jsx
yarn add redux react-redux
```

##### 4.2 创建 Store

1.  创建 `Store.js`

2.  在这个文件中创建数据源

   ```jsx
   // createStore 提供唯一数据源的方法
   import { createStore } from 'redux'
   // reducer 主要是对数据的处理, 因为逻辑比较多
   // 为了方便维护，抽取成一个单独的文件
   import reducer from './Reducer.js'
   
   // 提供初始的数据源
   let initValue = {
     apple: 0,
     banana: 0,
     orange: 0
   }
   
   // 创建数据源
   // createStore 方法有两个作用
   //  1、 存储数据   2、修改数据
   // createStore 方法有两个参数
   //  1、用于处理数据修改
   //  2、用于提供初始化数据
   const store = createStore(reducer, initValue)
   
   ```

   

3.  创建 `reducer.js`

4.  在这个文件中定义操作数据的方法

   ```jsx
   /**
    * 提供数据的修改操作
    */
   
   export default (state, action) => {
     return state
   }
   
   ```



##### 4.3 向 `View` 提供数据源

1.  在 `App.js` 文件中导入 `Store.js`

   ```jsx
   // 导入 store 数据源
   import Store from './Store'
   ```

   

2.  导入 `Provider` 组件， 用于向 `View` 组件提供 `Store` 数据源

   ```jsx
   // 导入 Provider 组件
   import { Provider } from 'react-redux'
   ```

3.  使用 `Provider` 组件包裹住 `Cart` 组件，并给 `Provider` 组件提供一个 `store` 属性，代表需要提供的数据

   ```jsx
   render() {
     return (
       <Provider store={store}>
         <div>
           <Header></Header>
           <hr />
           <Item name="苹果" allNum={this.allNum}></Item>
           <Item name="香蕉" allNum={this.allNum}></Item>
           <Item name="橘子" allNum={this.allNum}></Item>
           <hr />
           <Footer count={this.state.num}></Footer>
         </div>
       </Provider>
     )
   }
   ```

   

##### 4.4 `View` 组件中使用 `Store` 中传递的数据

1.  在 `Footer.js` 中导入 `connect` 组件，将 store 中的数据连接到 view 组件中

   ```jsx
   // connect 的作用： 将 store 中的数据连接到 view 组件中
   import { connect } from 'react-redux'
   ```

   

2.  封装一个方法  `mapStateToProps`，将 store 中的数据映射到 view 组件中

   ```jsx
   // 封装一个方法，将 store 中的数据映射到 view 组件中
   function mapStateToProps(state) {
     // state 参数其实就是 store 中全部的数据
     let total = 0
   
     for (let key in state) {
       let v = state[key]
       total += v
     }
   
     return {
       total: total
     }
   }
   ```

   

3.  使用 `connect` 方法将 `store` 和 `view` 组件进行结合

   ```jsx
   export default connect(mapStateToProps)(Header)
   ```

   

4.  在 `view` 视图中使用处理好的数据，注意：这时候 `connect` 已经讲 `store` 转换成了 `props`

   ```jsx
   class Header extends React.Component {
     render() {
       const { total } = this.props
       return (
         <div>
           <p>总数量： {total} 件 </p>
         </div>
       )
     }
   }
   ```

   

##### 4.5 商品条目中使用 `Store` 中传递的数据

1.  在 `Item.jsx` 中导入 `connect` 组件，将 `store` 中的数据连接到 `view` 组件中

   ```jsx
   // connect 的作用： 将 store 中的数据连接到 view 组件中
   import { connect } from 'react-redux'
   ```

   

2.  封装一个方法  `mapStateToProps`，将 `store` 中的数据映射到 `view` 组件中

   ```jsx
   // 参数一： 表示唯一的数据源
   // 参数二： 表示组件本身的 props
   function mapStateToProps(state, ownProps) {
     console.log(ownProps.name)
     // 获取商品名称
     let name = ownProps.name
     // 根据商品的名称获取 state 中对应的数量
     let num = state[name]
     return {
       num, name
     }
   }
   ```

   

3.  使用 `connect` 方法将 `store` 和 `view` 组件进行结合

   ```jsx
   export default connect(mapStateToProps)(Header)
   ```

   

4.   在 `view` 视图中使用处理好的数据，注意：这时候 `connect` 已经讲 `store` 转换成了 `props`

   ```jsx
   render() {
     const { num } = this.props
     return (
       <div>
         <p>
           <span>{this.props.name}</span> <span>数量： {num}</span>&nbsp;&nbsp;&nbsp;
           <button onClick={this.addNum}>+</button>&nbsp;&nbsp;&nbsp;
           <button onClick={this.subNum}>-</button>
         </p>
       </div>
     )
   }
   ```

   

##### 4.6 将事件处理函数映射到视图中

1.   封装一个方法  `mapDispatchToProps`，将事件处理函数映射到 `view `组件中

   ```jsx
   // 处理事件：把事件处理函数映射到 view 组件中
   // 参数 1： 用于进行 action 分发
   // 参数 2： 表示组件本身的 props 属性
   function mapDispatchToProps(dispatch, ownProps) {
     return {
       addNum: () => {
         let action = null
         dispatch(action)
       },
       subNum: () => {
         let action = null
         dispatch(action)
       }
     }
   }
   ```

   

2.  使用 `connect` 方法将事件处理函数和 `view` 组件进行结合

   ```jsx
   export default connect(mapStateToProps, mapDispatchToProps)(Header)
   ```

   

3.   在 `view` 视图中使用处理好的数据，注意：这时候 `connect` 已经将 `事件处理函数` 转换成了 `props`

   ```jsx
   render() {
     const { num, name, addNum, subNum } = this.props
     return (
       <div>
         <p>
           <span>{name}</span> <span>数量： {num}</span>&nbsp;&nbsp;&nbsp;
           <button onClick={addNum}>+</button>&nbsp;&nbsp;&nbsp;
           <button onClick={subNum}>-</button>
         </p>
       </div>
     )
   }
   ```

   

##### 4.7 实现 `Action` 的分发

1.  创建一个 `Actions.js` 文件，产生 `action`

   ```jsx
   /**
    * 产生 Action
    * 
    * action 的本质就是一个对象，该对象描述了一个操作行为
    */
   
   export const add = (production) => {
     return {
       type: 'add',
       name: production
     }
   }
   
   export const sub = (production) => {
     return {
       type: 'sub',
       name: production
     }
   }
   
   ```

   

2.  在 `Item.jsx` 中创导入 `Actions.jsx` 文件，并使用

   ```jsx
   // 导入 actions
   import * as Actions from './Actions'
   ```

   ```jsx
   // 处理事件：把事件处理函数映射到 view 组件中
   // 参数 1： 用于进行 action 分发
   // 参数 2： 表示组件本身的 props 属性
   function mapDispatchToProps(dispatch, ownProps) {
     return {
       addNum: () => {
         let action = Actions.add(ownProps.name)
         dispatch(action)
       },
       subNum: () => {
         let action = Actions.sub(ownProps.name)
         dispatch(action)
       }
     }
   }
   ```

   

##### 4.8 通过 `reducer` 处理数据变更操作

```jsx
/**
 * 提供数据的修改操作
 * 
 * 不能直接修改 state 数据，需要先复制一份原有数据，修改之后，在返回新的数据即可
 */

// 根据 action 的不同修改 state 中对应的数据

// 参数 1、state 表示唯一的数据源
// 参数 2、action 表示视图中触发的 action
export default (state, action) => {
  let newState = null
  switch (action.type) {
    case 'add':
      newState = { ...state }
      newState[action.name] = newState[action.name] + 1
      return newState
      break;
    case 'sub':
      newState = { ...state }
      let num = newState[action.name]
      if (num > 1) {
        newState[action.name] = num - 1
      }
      return newState
      break;
    default:
      return state
  }
}

```



##### 4.9 `Action` 名称统一处理

1.  创建 `ActionName.js` 对 `Action` 名字统一处理

   ```jsx
   export const ADD_ACTION = 'add'
   export const SUB_ACTION = 'sub'
   ```

   

2.  在使用到 `Action` 的地方导入，并使用

   ```jsx
   import * as ACTIONS from './ActionName'
   
   export const add = (production) => {
     return {
       type: ACTIONS.ADD_ACTION,
       name: production
     }
   }
   
   export const sub = (production) => {
     return {
       type: ACTIONS.SUB_ACTION,
       name: production
     }
   }
   
   ```

   