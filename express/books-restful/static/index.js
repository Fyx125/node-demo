/*
静态文件---主页面js
 */
$(function () {
    //渲染列表数据
    function initList() {
        $.ajax({
            type: 'get',
            url: '/books',
            dataType: 'json',
            success: function (data) {
                //渲染数据列表
                var html = template('indexTpl', {list: data});
                $('#dataList').html(html);
                //渲染完成后才可以操作DOM
                $('#dataList').find('tr').each(function (index, element) {
                    var td = $(element).find('td:eq(5)');
                    var id = $(element).find('td:eq(0)').text();
                    //绑定编辑图书的单击事件
                    td.find('a:eq(0)').click(function () {
                        editBook(id);
                    });
                    //绑定删除图书的单击事件
                    td.find('a:eq(1)').click(function () {
                        deleteBook(id);
                    });
                    //绑定添加图书的单击事件
                    addBook();
                    //重置表单
                    $('#myForm').get(0).reset();
                    $('#myForm').find('input[type=hidden]').val('');
                });
            }
        });
    }

    initList();

    //添加弹窗
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        height: 300
    });

    //去除表单中的空值项（隐藏域id没值时）
    function serializeNotNull(serStr) {
        return serStr.split("&").filter(str => !str.endsWith("=")).join("&");
    }

    //添加图书----弹窗显示
    function addBook() {
        $('#addBookId').click(function () {
            $("#dialog").dialog("open");
            $("#dialog").dialog({title: '添加图书'});

            //添加图书--数据提交
            $('#submit').unbind('click').click(function () {
                $.ajax({
                    type: 'post',
                    url: '/books/book',
                    data: serializeNotNull($('#myForm').serialize()),
                    dataType: 'json',
                    success: function (data) {
                        if (data.flag == '1') {
                            $("#dialog").dialog("close");
                            //添加成功后重新渲染页面
                            initList();
                        }
                    }
                });
            })
        });
    }

    //编辑图书信息
    function editBook(id) {
        $.ajax({
            type: 'get',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function (data) {
                $("#dialog").dialog("open");
                $("#dialog").dialog({title: '编辑图书'});
                var form = $('#myForm');
                form.find('input[name=id]').val(data.id);
                form.find('input[name=name]').val(data.name);
                form.find('input[name=author]').val(data.author);
                form.find('input[name=category]').val(data.category);
                form.find('input[name=description]').val(data.description);

                //对表单数据进行重新绑定
                $('#submit').unbind('click').click(function () {
                    $.ajax({
                        type: 'put',
                        url: '/books/book',
                        data: $('#myForm').serialize(),
                        dataType: 'json',
                        success: function (data) {
                            if (data.flag == '1') {
                                $("#dialog").dialog("close");
                                //编辑成功后重新渲染页面
                                initList();
                            }
                        }
                    });
                })
            }
        })
    }

    //删除图书信息
    function deleteBook(id) {
        $.ajax({
            type: 'delete',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function (data) {
                if (data.flag == '1') {
                    //删除成功后重新渲染页面
                    initList();
                }
            }
        });
    }
});