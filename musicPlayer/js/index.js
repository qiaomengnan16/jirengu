/**
 * Created by qiaohao on 2018/10/14.
 */



var musicList = []
var currentIndex = 0
var audio = new Audio()
audio.autoplay = true
var clock



getMusicList(function(list){
    musicList = list
    loadMusic(currentIndex)
    generateList(musicList)
})

function generateList(list){
    list.forEach(function(value){
        var li = document.createElement('li');
        li.innerText = value.auther + '-' + value.title
        $('.list').appendChild(li)
    })
}

audio.onplay = function () {
    clock = setInterval(function () {
        $('.musicbox .progress-now').style.width =  (audio.currentTime / audio.duration) * 100 + '%'
        var min = Math.floor(audio.currentTime / 60)
        var sec = Math.floor(audio.currentTime % 60) + ''
        sec = sec.length === 2 ? sec : '0' + sec
        $('.musicbox .time').innerText = min + ':' + sec
    },1000)
    $('.list').children[currentIndex].classList.add('selected')
    this.querySelector('.fa').classList.remove('fa-play')
    this.querySelector('.fa').classList.add('fa-pause')

}

audio.onpause = function () {
    clearInterval(clock)
}

audio.onended = function () {
    currentIndex = ( musicList.length +  --currentIndex) % musicList.length
    loadMusic(currentIndex)
}

$('.musicbox .play').onclick = function () {
    if(audio.paused){
        audio.play()
        this.querySelector('.fa').classList.remove('fa-play')
        this.querySelector('.fa').classList.add('fa-pause')
    }else{
        audio.pause()
        this.querySelector('.fa').classList.remove('fa-pause')
        this.querySelector('.fa').classList.add('fa-play')
    }
}

$('.musicbox .forward').onclick = function () {
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(currentIndex)
}

$('.musicbox .back').onclick = function () {
    currentIndex = ( musicList.length +  --currentIndex) % musicList.length
    loadMusic(currentIndex)
}


$('.musicbox .bar').onclick = function (e) {
    console.log(e)
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
}


function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','music.json',true)
    xhr.onload = function () {
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status ===304){
            callback(JSON.parse(this.responseText))
        }else{
            console.log('获取数据失败')
        }
    }
    xhr.onerror = function () {
        console.log('网络异常')
    }
    xhr.send()
}


function loadMusic(index){
    var musicObj = musicList[index]
    audio.src = musicObj.src
    console.log(musicObj.src)
    $('.musicbox .title').innerText = musicObj.title
    $('.musicbox .auther').innerText = musicObj.auther
    $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')'

}


function $(selector){
    return document.querySelector(selector)
}

$('.list').onclick = function(e){
    if(e.target.nodeName.toLowerCase() == 'li'){
        for(var i = 0 ; i < this.children.length ; i ++){
            if(e.target == this.children[i]){
                currentIndex = i
                loadMusic(currentIndex)
            }else{
                this.children[i].classList.remove('selected')
            }

        }
    }

}
