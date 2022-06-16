$(function() {
  // 点击去注册账号的连接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show() 
  })

  // 点击去登录的连接
  $('#link_login').on('click',function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // layui中没有密码验证，所以到自定义验证
  // 从layui中获取form对象.导入了layui就有了layui对象，和4$一样
  var form = layui.form
  // 获得layer对象
  var layer = layui.layer
  
  // 通过form.verify()函数来自定义校验规则
  form.verify({
    // 自定义了一个pwd密码校验规则
    pwd: [
      /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
    ],
    // 定义repwd两次输入密码须一致
    // 用户输入的值通过value来拿到
    repwd: function (value) {
      // 通过形参拿到确认密码中的内容
      // 还需要拿到密码中的内容，然后进行一次等于的判断
      // 如果判断失败，return一个提示的消息
     var pwd =  $('.reg-box [name=password]').val()
     if(pwd !== value){
       return '两次密码不一致！'
     }
    }

  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    // 发起ajax请求 查看接口文档 根路径加具体的地址 
    // 查看文档里的参数名和返回值
    var  data = {username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()}
    $.post('/api/reguser',
     data,
    function (res) {
      if(res.status !==0){
        return layer.msg(res.message);
      }
        layer.msg('注册成功，请登录！')
        // 模拟人的点击去登录行为
        $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
  // 阻止默认提交的行为
  e.preventDefault()
  $.ajax({
    url: '/api/login',
    method: 'POST',
    // 快速获取表单中的数据
    data: $(this).serialize(),
    success: function (res) {
      if(res.status !== 0){
        return layer.msg('登录失败！')
      }
      layer.msg('登录成功！')
      // 将登录成功得到的token字符串，
      // 保存到localStorage中
      localStorage.setItem('token',res.token)
      // 调到后台主页
      // console.log(res.token)
      location.href = '/index.html'
    }
  })
  })
})