//import 'bootstrap/scss/bootstrap.scss';
import scss from '../css/color.scss';
import api from './api';
import card from './hello.html'
//import $ from 'jquery';
$('.title').html('Hello Webpack');
Vue.component('Card',{
    template:card,
    props:['teams']
})
var vm=new Vue({
    el:'#app',
    data:{
        msg:'hello',
        cav:[
            { name:'K. Love'},
            { name:'L. James'},
            { name:'D. Rose'},
            { name:'D. Wade'}
        ],
        pacers:[
            {name:'T. Young'},
            {name:'B. Bogdanovic'},
            {name:'D. Sabonis'},
            {name:'V. Oladipo'}
        ]
    }
})
console.log(api.title)