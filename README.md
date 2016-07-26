# nnload 插件
<br>

### 基本参数
<table width="100%">
<tbody>
	<tr>
    	<td width="35%" align="center"><h2>参数</h2></td>
        <td width="35%" align="center"><h2>说明</h2></td>
        <td width="30%" align="center"><h2>默认值</h2></td>
   </tr>
	<tr>
    	<td align="center">autoLoad</td>
        <td align="center">是否自动加载</td>
        <td align="center">默认为true</td>
    </tr>

	<tr>
    	<td align="center">btn_more_class</td>
        <td align="center">加载更多的样式class</td>
        <td align="center">默认为：btn_more</td>
   	</tr>
    <tr>
    	<td align="center">threshold</td>
        <td align="center">提前加载像素</td>
        <td align="center">默认为0，可根据个人而定</td>
   	</tr>
    <tr>
    	<td align="center">loading_class</td>
        <td align="center">加载div样式class</td>
        <td align="center">默认为loading</td>
   	</tr>
    <tr>
    	<td align="center">content_class</td>
        <td align="center">数据填充div样式class</td>
        <td align="center">默认为list</td>
   	</tr>
    <tr>
    	<td align="center">loading_msg</td>
        <td align="center">正在加载样式布局</td>
        <td align="center">==</td>
   	</tr>
    <tr>
    	<td align="center">noData_msg</td>
        <td align="center">无数据样式布局</td>
        <td align="center">==</td>
   	</tr>
    <tr>
    	<td align="center">loadData</td>
        <td align="center">数据callback</td>
        <td align="center">无</td>
   	</tr>
</tbody>
</table>
<br>
###基本示例代码
<pre><code>
	var currentPage=1;
    $('.content').nnload({
        'autoLoad':false,
        'loadData':function(me){
            $.get('data/data.txt',function(data){
                        setTimeout(function(){
                            $('.list').append(data);
                            me.resetLoad();
                            currentPage++;
                            if(currentPage==5){
                                me.noData(false);
                                me.resetLoad();
                            }
                        },1500);
                    }
            );
        }});
</code></pre>
##注意
1、`$.get()`和`setTimeout()`是为了模拟效果而弄的，与本插件无关。<br>
2、该程序demo要部署在服务器上，才能看到效果。
