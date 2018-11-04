#组件功能
实现了一个原生tab，每个tab拥有自己的点击事件 和 显示方法，手动点击tab或者调用tab的show()方法都可以使tab进行显示


#组件实现方式
对象初始化的时候传入一个对应的node节点，并为该节点绑定点击事件，
当该节点被点击时，调用show方法，对tab进行显示，其他tab进行隐藏


#如何使用
var tab1 = new Tab(document.querySelectorAll('.tab-container')[0])
new一个Tab对象，传入一个对应的节点

点击该节点 或者 直接调用 tab1.show() 都可以使得该节点进行显示