;function resetFields(){$("input").val("");$(".save_button").removeAttr("disabled");$(".update_button").attr("disabled","");}
$(document).ready(function(){$('.nav-item[data-menu="brands"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$(".reset_button").click(function(){resetFields();});$(document).on('click','.fa-edit',function(){var brand_id=$.trim($(this).data("id"));var brand_title=$.trim($('td[data-id="'+brand_id+'"]').text());$("#brand_id").val(brand_id);$("#title").val(brand_title);$(".update_button").removeAttr("disabled");$(".save_button").attr("disabled","");});$(".save_button").click(function(){var title=$.trim($("#title").val());if(title.length==0){showMessage("Please mention title of the Brand");return;}
$.ajax({url:"/dashboard/brands",method:"POST",data:{csrfmiddlewaretoken:"BSTicfDFyt7HVH0rD2wLdISiuUK92Sj4VwQcdKoLGqGYhOytlxqbs0zWHbSqAP4t",action:"save",title:title},success:function(data){if(data.status==1){$("input").val("");showMessage("Brand has been saved successfully");var new_brand='<tr data-id="'+data.brand_id+'"><td data-id="'+data.brand_id+'">'+title+'</td>'+'<td><i class="fa fa-edit" data-id="'+data.brand_id+'" data-title="'+title+'"></i>&nbsp;&nbsp;&nbsp;&nbsp;'+'<i class="fa fa-trash" data-id="'+data.brand_id+'" data-title="'+title+'"></i></td></tr>';$(".content_body").prepend(new_brand);}else if(data.status==2){showMessage("Another Brand with this name already exists");}else{showMessage("Sorry, an error occured");}},error:function(err){showMessage("Sorry, an error occured");}})});$(document).on('click','.update_button',function(){var brand_id=$.trim($("#brand_id").val());var brand_title=$.trim($("#title").val());if(brand_title.length==0){showMessage("Please mention title of the Brand");return;}
$.ajax({url:"/dashboard/brands",method:"POST",data:{csrfmiddlewaretoken:"BSTicfDFyt7HVH0rD2wLdISiuUK92Sj4VwQcdKoLGqGYhOytlxqbs0zWHbSqAP4t",action:"update",brand_id:brand_id,brand_title:brand_title},success:function(data){if(data.status==1){$('td[data-id="'+brand_id+'"]').text(brand_title);resetFields();showMessage('Brand <span class="delete_title">'+brand_title+'</span> has been updated successfully');}else if(data.status==2){showMessage("Another Brand with this name already exists");}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});});$(document).on('click','.fa-trash',function(){var brand_id=$.trim($(this).data("id"));var brand_title=$.trim($(this).data("title"));resetFields();$.confirm({title:'Delete Brand?',content:'Do you want to delete Brand <span class="delete_title">'+brand_title+'</span>?',theme:'material',buttons:{confirm:{text:'Yes',btnClass:'btn-danger',keys:['enter'],action:function(){$.ajax({url:"/dashboard/brands",method:"POST",data:{csrfmiddlewaretoken:"BSTicfDFyt7HVH0rD2wLdISiuUK92Sj4VwQcdKoLGqGYhOytlxqbs0zWHbSqAP4t",action:"delete",brand_id:brand_id},success:function(data){if(data.status==1){$('.content_body tr[data-id="'+brand_id+'"]').fadeOut(500,function(){$(this).remove();});showMessage('Brand <span class="delete_title">'+brand_title+'</span> has been deleted successfully');}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});}},cancel:{text:'No',btnClass:'btn-no',keys:['esc'],action:function(){}}}});});});