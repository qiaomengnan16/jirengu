/**
 * Created by qiaohao on 2018/10/24.
 */
$(function () {

    //
    // $('footer>div').click(function(){
    //     var index = $(this).index()
    //     $('section').hide().eq(index).fadeIn()
    //     $(this).addClass('active').siblings().removeClass('active')
    // })
    //
    //
    //
    // var index = 0
    // var isLoading = false
    //
    // function start() {
    //     if(isLoading) return
    //     $('.loading').show()
    //     isLoading = true
    //     $.ajax({
    //         url : 'http://api.douban.com/v2/movie/top250',
    //         type : 'GET',
    //         data : {
    //             start : index,
    //             count : 20
    //         },
    //         dataType: 'jsonp'
    //
    //     }).done(function(ret){
    //         console.log(ret)
    //         setData(ret)
    //         index += 20
    //     }).fail(function(){
    //         console.log('error....')
    //     }).always(function () {
    //         isLoading = false
    //         $('.loading').hide()
    //     })
    // }
    //
    // start()
    //
    //
    //
    // $('main').scroll(function(){
    //     if($('section').eq(0).height() - 10 <= $('main').scrollTop() + $('main').height()){
    //         start()
    //     }
    // })
    //
    //
    // function setData(data){
    //     data.subjects.forEach(function(movie){
    //         var tpl = '<div class="item"> \
    //             <a href="#"> \
    //                 <div class="cover"> \
    //                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg"/> \
    //                 </div> \
    //                 <div class="detail"> \
    //                     <h2>霸王别姬</h2> \
    //                     <div class="extra"><span class="score">9.3分</span> / <span class="collect">1000</span>收藏</div> \
    //                     <div class="extra"><span class="year">1994</span> / <span class="type">剧情、爱情</span></div> \
    //                     <div class="extra">导演：<span class="director">张艺谋</span></div> \
    //                     <div class="extra">主演：<span class="actor">张国荣、张丰毅、巩俐</span></div> \
    //                 </div> \
    //             </a> \
    //         </div> '
    //
    //         var $node = $(tpl)
    //         $node.find('.cover img').attr('src',movie.images.medium)
    //         $node.find('.detail h2').text(movie.title)
    //         $node.find('.score').text(movie.rating.average)
    //         $node.find('.collect').text(movie.collect_count)
    //         $node.find('.year').text(movie.year)
    //         $node.find('.type').text(movie.genres.join(' / '))
    //         $node.find('.director').text(function(){
    //             var directorArr = []
    //             movie.directors.forEach(function(item){
    //                 directorArr.push(item.name)
    //             })
    //             return directorArr.join('、')
    //         })
    //         $node.find('.actor').text(function(){
    //             var actorArr = []
    //             movie.casts.forEach(function(item){
    //                 actorArr.push(item.name)
    //             })
    //             return actorArr.join('、')
    //         })
    //
    //         $('#top250').eq(0).append($node)
    //
    //
    //     })
    // }



    var top250 = {
        init : function () {
            this.$element = $("#top250")
            this.isLoading = false
            this.index = 0
            this.isFinish = false
            this.bind()
            this.start()
        },
        bind : function () {
            var _this = this
            _this.$element.scroll(function(){
                if(_this.isToBottom() && !_this.isFinish){
                    _this.getData(function(movie){
                        _this.render(movie)
                    })
                }
            })
        },
        start : function () {
            var _this = this
            _this.getData(function (data) {
                _this.render(data)
            })
        },
        getData : function (callback) {
            var _this = this
            if(_this.isLoading) return
            _this.isLoading = true
            _this.showLoading()
            $.ajax({
                url : 'http://api.douban.com/v2/movie/top250',
                data : {
                    start : _this.index || 0
                },
                dataType : 'jsonp'
            }).done(function(ret){
                console.log(ret)
                _this.index += 20
                if(_this.index >= ret.total){
                    _this.isFinish = true
                }
                callback && callback(ret)
            }).fail(function () {
                console.log('数据异常')
            }).always(function () {
                _this.isLoading = false
                _this.hideLoading()
            })
        },
        render : function (data) {
            var _this = this
            data.subjects.forEach(function(movie){
                _this.$element.find('.container').append(Helper.createNode(movie))
            })
        },
        isToBottom : function () {
            return this.$element.find('.container').height() <= this.$element.height() + this.$element.scrollTop() + 10
        },
        showLoading : function () {
            this.$element.find('.loading').show()
        },
        hideLoading : function () {
            this.$element.find('.loading').hide()
        }
    }


    var Helper = {
        createNode : function (movie) {
            var tpl = '<div class="item"> \
                <a href="#"> \
                    <div class="cover"> \
                       <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg"/> \
                    </div> \
                    <div class="detail"> \
                        <h2>霸王别姬</h2> \
                        <div class="extra"><span class="score">9.3分</span> / <span class="collect">1000</span>收藏</div> \
                        <div class="extra"><span class="year">1994</span> / <span class="type">剧情、爱情</span></div> \
                        <div class="extra">导演：<span class="director">张艺谋</span></div> \
                        <div class="extra">主演：<span class="actor">张国荣、张丰毅、巩俐</span></div> \
                    </div> \
                </a> \
            </div> '
            var $node = $(tpl)
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                var directorArr = []
                movie.directors.forEach(function(item){
                    directorArr.push(item.name)
                })
                return directorArr.join('、')
            })
            $node.find('.actor').text(function(){
                var actorArr = []
                movie.casts.forEach(function(item){
                    actorArr.push(item.name)
                })
                return actorArr.join('、')
            })
            return $node
        }
    }


    var usBox = {
        init : function () {
            console.log('usBox OK')
            this.$element = $("#US")
            this.isLoading = false
            this.index = 0
            this.isFinish = false
            this.bind()
            this.start()
        },
        bind : function () {
            var _this = this
        },
        start : function () {
            var _this = this
            _this.getData(function (data) {
                _this.render(data)
            })
        },
        getData : function (callback) {
            var _this = this
            if(_this.isLoading) return
            _this.isLoading = true
            _this.showLoading()
            $.ajax({
                url : 'http://api.douban.com/v2/movie/us_box',
                dataType : 'jsonp'
            }).done(function(ret){
                callback && callback(ret)
            }).fail(function () {
                console.log('数据异常')
            }).always(function () {
                _this.isLoading = false
                _this.hideLoading()
            })
        },
        render : function (data) {
            var _this = this
            data.subjects.forEach(function(movie){
                movie = movie.subject
                _this.$element.find('.container').append(Helper.createNode(movie))
            })
        },
        isToBottom : function () {
            return this.$element.find('.container').height() <= this.$element.height() + this.$element.scrollTop() + 10
        },
        showLoading : function () {
            this.$element.find('.loading').show()
        },
        hideLoading : function () {
            this.$element.find('.loading').hide()
        }
    }

    var search = {
        init : function () {
            console.log('search OK')
            this.$element = $("#search")
            this.isLoading = false
            this.index = 0
            this.isFinish = false
            this.keyword = ''
            this.bind()
            this.start()
        },
        bind : function () {
            var _this = this
            this.$element.find('.button').click(function(){
                _this.keyword = _this.$element.find('input').val()
                _this.start()
            })
        },
        start : function () {
            var _this = this
            _this.getData(_this.keyword,function (data) {
                _this.render(data)
            })
        },
        getData : function (keyword,callback) {
            var _this = this
            _this.showLoading()
            $.ajax({
                url : 'http://api.douban.com/v2/movie/search',
                dataType : 'jsonp',
                data : {
                    q : keyword
                }
            }).always(function () {
                _this.$element.find('.container').html('')
                _this.isLoading = false
                _this.hideLoading()
            }).done(function(ret){
                callback && callback(ret)
            }).fail(function () {
                console.log('数据异常')
            })
        },
        render : function (data) {
            var _this = this
            console.log(data)
            data.subjects.forEach(function(movie){
                console.log(movie)
                _this.$element.find('.container').append(Helper.createNode(movie))
            })
        },
        isToBottom : function () {
            return this.$element.find('.container').height() <= this.$element.height() + this.$element.scrollTop() + 10
        },
        showLoading : function () {
            this.$element.find('.loading').show()
        },
        hideLoading : function () {
            this.$element.find('.loading').hide()
        }
    }


    var app = {
        init : function(){
            this.$tabs = $('footer>div')
            this.$panels = $('section')
            this.bind()
            top250.init()
            usBox.init()
            search.init()

        },
        bind : function(){
            var _this = this
            this.$tabs.on('click',function(){
                $(this).addClass('active').siblings().removeClass('active')
                _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
            })
        },
        start : function(){
            console.log('start')
        },
        render : function () {

        },
        setData : function() {

        },
        getData : function () {

        }
    }


    app.init()


})