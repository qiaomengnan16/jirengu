## 标题
https://qiaomengnan16.github.io/jirengu/m39_images_lazy_load_1/%E7%80%91%E5%B8%83%E6%B5%812/index.html
## 懒加载原理

1、页面上的多个图片标签引用的是同一张loading照片，同时自定义一个属性保存真实的url路径
2、页面初始化显示的时候或者浏览器发生滚动的时候判断图片是否处于页面可见状态
3、如果图片处于可见状态，则通过js重新修改img的src，值为真实的url路径

## 瀑布流原理

1.瀑布流的布局的要素，元素的宽度必须要一致，高度可以不一致，元素的摆放通过position:absolute放置
2.获取到容器的宽度，除以元素宽度，得到容器一行可以摆放的容器个数，个数也就是布局最终的列数
3.初始化一个数组，数组长度是布局的列数，并且为每个下标的值初始化为0，用于保存每列元素的高度
4.循环每个元素, 循环的内部再循环列数组，得到当前高度最小的一列，然后将当前元素的top设置为 该列的高度  ，并且将（top值+元素实际高度）设置给当前数组列下表元素，当前元素的left设置为 下标 * 元素宽度，这样最终形成瀑布流布局


## 实现原理

通过ajax请求数据，数据请求回来后调用瀑布流方法设置元素所在位置，
下拉到底部时进行远程请求