;$(document).ready(function(){$('.nav-item[data-menu="product-types"]').addClass("active");$('.nav-item[data-slide="setup"]').show();$('.fa[data-icon="setup"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$(".save_button").click(function(){var title=$.trim($("#title").val());if(title.length==0){showMessage("Please mention title of the Product Type");}
$.ajax({url:"/dashboard/product-types",method:"POST",data:{csrfmiddlewaretoken:"fDXOnobffxFW8Ob5SS1iPmzuV4CnYfUiyvYU7biw907JFjzCYVs1x8YxoPMNeTIl",action:"save",title:title},success:function(data){if(data.status==1){console.log(data);$("input").val("");showMessage("Product Type has been saved successfully");}else if(data.status==2){showMessage("Another Product Type with this name already exists");}else{showMessage("Sorry, an error occured");}},error:function(err){showMessage("Sorry, an error occured");}})});});