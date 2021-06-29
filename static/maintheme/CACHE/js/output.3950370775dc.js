;function resetFields(){$("input").val("");$(".save_button").removeAttr("disabled");$(".update_button").attr("disabled","");}
$(document).ready(function(){$('.nav-item[data-menu="product-types"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$(".reset_button").click(function(){resetFields();});$(document).on('click','.fa-edit',function(){var type_id=$.trim($(this).data("id"));var type_title=$.trim($(this).data("title"));$(".product_type_id").val(type_id);$("#title").val(type_title);$(".update_button").removeAttr("disabled");$(".save_button").attr("disabled","");});$(".save_button").click(function(){var title=$.trim($("#title").val());if(title.length==0){showMessage("Please mention title of the Product Type");}
$.ajax({url:"/dashboard/product-types",method:"POST",data:{csrfmiddlewaretoken:"gLLxP0L5YlPhqI30QSqfHobGD1GmT8vdzDMDzNSmSOh4XdrxWVRYpaAJ6MQM9Mjg",action:"save",title:title},success:function(data){if(data.status==1){$("input").val("");showMessage("Product Type has been saved successfully");var new_product_type='<tr data-id="'+data.product_type_id+'"><td data-id="'+data.product_type_id+'">'+title+'</td>'+'<td><i class="fa fa-edit" data-id="'+data.product_type_id+'"></i>&nbsp;&nbsp;&nbsp;&nbsp;'+'<i class="fa fa-trash" data-id="'+data.product_type_id+'"></i></td></tr>';$(".content_body").prepend(new_product_type);}else if(data.status==2){showMessage("Another Product Type with this name already exists");}else{showMessage("Sorry, an error occured");}},error:function(err){showMessage("Sorry, an error occured");}})});$(document).on('click','.fa-trash',function(){var type_id=$.trim($(".product_type_id").val());var type_title=$.trim($("#title").val());$.ajax({url:"/dashboard/product-types",method:"POST",data:{csrfmiddlewaretoken:"gLLxP0L5YlPhqI30QSqfHobGD1GmT8vdzDMDzNSmSOh4XdrxWVRYpaAJ6MQM9Mjg",action:"update",type_id:type_id,type_title:type_title},success:function(data){if(data.status==1){$('td[data-id="'+type_id+'"]').text(type_title);resetFields();showMessage('Product Type <span class="delete_title">'+type_title+'</span> has been updated successfully');}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});});$(document).on('click','.fa-trash',function(){var type_id=$.trim($(this).data("id"));var type_title=$.trim($(this).data("title"));$.confirm({title:'Delete Product Type?',content:'Do you want to delete Product Type <span class="delete_title">'+type_title+'</span>?',theme:'material',buttons:{confirm:{text:'Yes',btnClass:'btn-danger',keys:['enter'],action:function(){$.ajax({url:"/dashboard/product-types",method:"POST",data:{csrfmiddlewaretoken:"gLLxP0L5YlPhqI30QSqfHobGD1GmT8vdzDMDzNSmSOh4XdrxWVRYpaAJ6MQM9Mjg",action:"delete",type_id:type_id},success:function(data){if(data.status==1){$('.content_body tr[data-id="'+type_id+'"]').fadeOut(500,function(){$(this).remove();});showMessage('Product Type <span class="delete_title">'+type_title+'</span> has been deleted successfully');}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});}},cancel:{text:'No',btnClass:'btn-no',keys:['esc'],action:function(){}}}});});});