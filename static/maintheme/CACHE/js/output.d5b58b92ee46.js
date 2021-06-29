;function resetFields(){$("input").val("");$(".save_button").removeAttr("disabled");$(".update_button").attr("disabled","");}
$(document).ready(function(){$('.nav-item[data-menu="categories"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$(".reset_button").click(function(){resetFields();});$(document).on('click','.fa-edit',function(){var category_id=$.trim($(this).data("id"));var title=$.trim($(this).attr("data-title"));var product_type=$.trim($(this).attr("data-product_type"));var parent=$.trim($(this).attr("data-parent"));console.log(parent);$("#product_type").val("");$("#product_type").val(product_type);$("#title").val(title);$(".update_button").removeAttr("disabled");$(".save_button").attr("disabled","");$.ajax({url:"/dashboard/get-category-by-product-type?the_type="+the_type,method:"GET",success:function(data){var categoryHtml='<option value="">- Select a Parent Category -</option>';if(data.status==1&&data.categories.length!=0){for(var category of data.categories){categoryHtml+='<option value="'+category.id+'">'+category.title+'</option>';}}
$("#parent_category").html(categoryHtml);$("#category_id").val(category_id);},error:function(){}});});$("#product_type").change(function(){var the_type=$.trim($(this).val());$.ajax({url:"/dashboard/get-category-by-product-type?the_type="+the_type,method:"GET",success:function(data){var categoryHtml='<option value="">- Select a Parent Category -</option>';if(data.status==1&&data.categories.length!=0){for(var category of data.categories){categoryHtml+='<option value="'+category.id+'">'+category.title+'</option>';}}
$("#parent_category").html(categoryHtml);},error:function(){}});});$(".save_button").click(function(){var product_type=$.trim($("#product_type").val());if(product_type.length==0){showMessage("Please select a product type");}
var parent_category=$.trim($("#parent_category").val());var title=$.trim($("#title").val());if(title.length==0){showMessage("Please mention title of the Category");}
$.ajax({url:"/dashboard/categories",method:"POST",data:{csrfmiddlewaretoken:"jrLAHRR4CwuP7hWbPsHgCglz9DMXyMzsD5IuImCaKt36toudxXBGRy2dmUUe6JkR",action:"save",product_type:product_type,title:title,parent_category:parent_category},success:function(data){if(data.status==1){showMessage("Category has been saved successfully");var the_type=$("#product_type option:selected").text();var parent=$("#parent_category option:selected").text();$("input, select").val("");if(parent_category.length==0){parent="--";}
var new_category='<tr data-id="'+data.category_id+'"><td data-id="'+data.category_id+'">'+title+'</td><td>'+the_type+'</td><td>'+parent+'</td><td><i class="fa fa-edit" data-id="'+data.category_id+'" data-title="'+title+'"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash" data-id="'+data.category_id+'" data-title="'+title+'"></i></td></tr>';$(".content_body").prepend(new_category);}else if(data.status==2){showMessage("Another Category with this name already exists");}else{showMessage("Sorry, an error occured");}},error:function(err){showMessage("Sorry, an error occured");}})});$(document).on('click','.update_button',function(){var unit_id=$.trim($("#unit_id").val());var unit_title=$.trim($("#title").val());$.ajax({url:"/dashboard/units",method:"POST",data:{csrfmiddlewaretoken:"jrLAHRR4CwuP7hWbPsHgCglz9DMXyMzsD5IuImCaKt36toudxXBGRy2dmUUe6JkR",action:"update",unit_id:unit_id,unit_title:unit_title},success:function(data){if(data.status==1){$('td[data-id="'+unit_id+'"]').text(unit_title);resetFields();showMessage('Unit <span class="delete_title">'+unit_title+'</span> has been updated successfully');}else if(data.status==2){showMessage("Another Unit with this name already exists");}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});});$(document).on('click','.fa-trash',function(){var category_id=$.trim($(this).data("id"));var title=$.trim($(this).data("title"));resetFields();$.confirm({title:'Delete Category?',content:'Do you want to delete Category <span class="delete_title">'+title+'</span>?',theme:'material',buttons:{confirm:{text:'Yes',btnClass:'btn-danger',keys:['enter'],action:function(){$.ajax({url:"/dashboard/categories",method:"POST",data:{csrfmiddlewaretoken:"jrLAHRR4CwuP7hWbPsHgCglz9DMXyMzsD5IuImCaKt36toudxXBGRy2dmUUe6JkR",action:"delete",category_id:category_id},success:function(data){if(data.status==1){$('.content_body tr[data-id="'+category_id+'"]').fadeOut(500,function(){$(this).remove();});showMessage('Category <span class="delete_title">'+title+'</span> has been deleted successfully');}else{showMessage("Sorry, an error ocured");}},error:function(data){showMessage("Sorry, an error ocured");}});}},cancel:{text:'No',btnClass:'btn-no',keys:['esc'],action:function(){}}}});});});