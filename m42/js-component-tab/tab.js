/**
 * Created by qiaohao on 2018/11/3.
 */
function Tab(node){
    this.init(node)
    this.bind()
}


Tab.prototype = {
    constructor : Tab,
    init : function (node) {
        this.node = node
    },
    bind : function () {
        var _this = this
        this.node.onclick = function () {
            _this.show()
        }
    },
    show : function () {
        var _this = this
        document.querySelectorAll('.tab-container').forEach(function (tab) {
            tab.classList.remove('active')
        })
        _this.node.classList.add('active');
    }

}


var tab1 = new Tab(document.querySelectorAll('.tab-container')[0])
var tab2 = new Tab(document.querySelectorAll('.tab-container')[1])
var tab3 = new Tab(document.querySelectorAll('.tab-container')[2])

