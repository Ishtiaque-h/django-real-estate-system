;$(document).ready(function(){$('.nav-item[data-menu="product-types"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$(".save_button").click(function(){var title=$.trim($("#title").val());if(title.length==0){showMessage("Please mention title of the Product Type");}
$.ajax({url:"/dashboard/product-types",method:"POST",data:{csrfmiddlewaretoken:"NEhRALj7Eqy7ENI0hRr7XVsI2N79dJ7w6wiXkyqoyT0Ubi6xnUSQFHRLvyhztnVz",action:"save",title:title},success:function(data){if(data.status==1){$("input").val("");showMessage("Product Type has been saved successfully");}else if(data.status==2){showMessage("Another Product Type with this name already exists");}else{showMessage("Sorry, an error occured");}},error:function(err){showMessage("Sorry, an error occured");}})});});