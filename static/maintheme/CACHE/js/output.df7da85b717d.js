;$(document).ready(function(){$('.nav-item[data-menu="products"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$(document).on('click','.fa-edit',function(){var unit_id=$.trim($(this).data("id"));var unit_title=$.trim($('td[data-id="'+unit_id+'"]').text());$("#unit_id").val(unit_id);$("#title").val(unit_title);$(".update_button").removeAttr("disabled");$(".save_button").attr("disabled","");});$(".save_button").click(function(){var title=$.trim($("#title").val());if(title.length==0){showMessage("Please mention title of the Unit");}
$.ajax({url:"/dashboard/units",method:"POST",data:{csrfmiddlewaretoken:"txqddKsxayfULINf0LLBxXdzvlXynBlXZI844iwooA6Ey9S2idV9ykwViSR6pHD5",action:"save",title:title},success:function(data){if(data.status==1){$("input").val("");showMessage("Unit has been saved successfully");var new_unit='<tr data-id="'+data.unit_id+'"><td data-id="'+data.unit_id+'">'+title+'</td>'+'<td><i class="fa fa-edit" data-id="'+data.unit_id+'" data-title="'+title+'"></i>&nbsp;&nbsp;&nbsp;&nbsp;'+'<i class="fa fa-trash" data-id="'+data.unit_id+'" data-title="'+title+'"></i></td></tr>';$(".content_body").prepend(new_unit);}else if(data.status==2){showMessage("Another Unit with this name already exists");}else{showMessage("Sorry, an error occured");}},error:function(err){showMessage("Sorry, an error occured");}})});});