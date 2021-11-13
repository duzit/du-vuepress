# MVVM 理解

- Model-View-ViewModel 

- Model  
> 数据层，可修改数据，编写业务逻辑 

- View 
> 视图层，负责将数据渲染成页面  

- ViewModel 
> 监听数据层（Model）数据变化，控制视图层（View）行为交互。  
  ViewModel 通过双向绑定把 View 和 Model 连接起来，且同步工作无须人为干涉，是开发人员只需关注  
  业务逻辑，无需频繁操作DOM，不需关注数据状态的同步问题

