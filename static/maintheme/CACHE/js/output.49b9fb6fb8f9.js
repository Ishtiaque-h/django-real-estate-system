;function showMessage(message){$(".showMessage").css("animation","none");setTimeout(function(){$(".showMessage").html(message).css("animation","animateMessage 6s forwards");},100);}
var sliding=false;$(document).ready(function(){$.ajax({url:"/get-user-data?title="+document.title,method:"GET",success:function(data){}});$(".nav-primary .nav-item").css("display","none");if(window.innerWidth<992){$(".hide_in_mobile").remove();$(".searcher_table").DataTable({paging:false,searching:false,pageLength:50,responsive:true,bDestroy:true,columnDefs:[{responsivePriority:1,targets:0},{responsivePriority:2,targets:-1}],});}
$(document).on('click','.nav-section',function(){var click_id=$(this).attr("id");$('.sidebar-wrapper .nav-item:not([data-slide="'+click_id+'"])').slideUp(300);$('.sidebar-wrapper .nav-item[data-slide="'+click_id+'"]').slideToggle(400);if($('.fa[data-icon="'+click_id+'"]').hasClass("fa-plus-circle")){$('.fa[data-icon="'+click_id+'"]').removeClass("fa-plus-circle").addClass("fa-minus-circle");$('.sidebar-wrapper .fa:not([data-icon="'+click_id+'"])').removeClass("fa-minus-circle").addClass("fa-plus-circle");}else{$('.fa[data-icon="'+click_id+'"]').removeClass("fa-minus-circle").addClass("fa-plus-circle");}
$('.fa-check-square-o').removeClass("fa-plus-circle").addClass("fa-check-square-o");});$(document).on('click','#view_remarks',function(){if(sliding){return;}
sliding=true;var slided=$(this).data("slided");$(this).data("slided",!slided);if(slided){$(this).html("View Remarks");$(this).siblings(".remarks_holder").slideUp(400,function(){sliding=false;});}else{$(this).html("Hide Remarks");$(this).siblings(".remarks_holder").slideDown(500,function(){sliding=false;});}});});