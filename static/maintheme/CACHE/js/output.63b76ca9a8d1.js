;$(document).ready(function(){$('.nav-item[data-menu="products"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$("#product_type").change(function(){var the_type=$.trim($(this).val());$.ajax({url:"/dashboard/get-category-by-product-type?the_type="+the_type+"&&for_product=1",method:"GET",success:function(data){console.log(data);var categoryHtml='<option value="">- Select a Category -</option>';if(data.status==1&&data.categories.length!=0){for(var category of data.categories){categoryHtml+='<option value="'+category.id+'">'+category.title+'</option>';}}
$("#category").html(categoryHtml);},error:function(){}});});});