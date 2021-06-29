;function resetFields(){$("input").val("");$(".save_button").removeAttr("disabled");$(".update_button").attr("disabled","");}
$(document).ready(function(){$('.nav-item[data-menu="categories"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$(".reset_button").click(function(){resetFields();});$("#product_type").change(function(){var the_type=$.trim($(this).val());$.ajax({url:"/dashboard/get-category-by-product-type?the_type="+the_type,method:"GET",success:function(data){var categoryHtml='<option value="">- Select a Parent Category -</option>';if(data.status==1&&data.categories.length!=0){for(var category of data.categories){categoryHtml+='<option value="'+category.id+'">'+category.title+'</option>';}}
$("#parent_category").html(categoryHtml);},error:function(){}});});$(document).on('click','.fa-edit',function(){var unit_id=$.trim($(this).data("id"));var unit_title=$.trim($('td[data-id="'+unit_id+'"]').text());$("#unit_id").val(unit_id);$("#title").val(unit_title);$(".update_button").removeAttr("disabled");$(".save_button").attr("disabled","");});$(".save_button").click(function(){var product_type=$.trim($("#product_type").val());if(product_type.length==0){showMessage("Please select a product type");}
var parent_category=$.trim($("#parent_category").val());var title=$.trim($("#title").val());if(title.length==0){showMessage("Please mention title of the Category");}
$.ajax({url:"/dashboard/categories",method:"POST",data:{csrfmiddlewaretoken:"OzOjpCz5UGlKsSPesItnMVIEddVd3Gb38dLdq7kb2DU1OZngadnN1dpiqu3uBDWs",action:"save",product_type:product_type,title:title,parent_category:parent_category},success:function(data){console.log(data);return;if(data.status==1){$("input").val("");showMessage("Category has been saved successfully");var new_category='<tr data-id="'+data.category_id+'"><td data-id="'+data.category_id+'">'+title+'</td><td>'+$(".gh")+'</td><td></td><td><i class="fa fa-edit" data-id="" data-title=""></i>&nbsp;&nbsp;<i class="fa fa-trash" data-id="" data-title=""></i></td></tr>';$(".content_body").prepend(new_unit);}else if(data.status==2){showMessage("Another Category with this name already exists");}else{showMessage("Sorry, an error occured");}},error:function(err){showMessage("Sorry, an error occured");}})});$(document).on('click','.update_button',function(){var unit_id=$.trim($("#unit_id").val());var unit_title=$.trim($("#title").val());$.ajax({url:"/dashboard/units",method:"POST",data:{csrfmiddlewaretoken:"OzOjpCz5UGlKsSPesItnMVIEddVd3Gb38dLdq7kb2DU1OZngadnN1dpiqu3uBDWs",action:"update",unit_id:unit_id,unit_title:unit_title},success:function(data){if(data.status==1){$('td[data-id="'+unit_id+'"]').text(unit_title);resetFields();showMessage('Unit <span class="delete_title">'+unit_title+'</span> has been updated successfully');}else if(data.status==2){showMessage("Another Unit with this name already exists");}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});});$(document).on('click','.fa-trash',function(){var unit_id=$.trim($(this).data("id"));var unit_title=$.trim($(this).data("title"));resetFields();$.confirm({title:'Delete Unit?',content:'Do you want to delete Unit <span class="delete_title">'+unit_title+'</span>?',theme:'material',buttons:{confirm:{text:'Yes',btnClass:'btn-danger',keys:['enter'],action:function(){$.ajax({url:"/dashboard/units",method:"POST",data:{csrfmiddlewaretoken:"OzOjpCz5UGlKsSPesItnMVIEddVd3Gb38dLdq7kb2DU1OZngadnN1dpiqu3uBDWs",action:"delete",unit_id:unit_id},success:function(data){if(data.status==1){$('.content_body tr[data-id="'+unit_id+'"]').fadeOut(500,function(){$(this).remove();});showMessage('Unit <span class="delete_title">'+unit_title+'</span> has been deleted successfully');}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});}},cancel:{text:'No',btnClass:'btn-no',keys:['esc'],action:function(){}}}});});});