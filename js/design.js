
yepnope({complete: function() {
    var disable = function(blk) {
	var t = $("[name=style-disabled]").val();
	if (t == 'shadow-bw') {
	    blk.removeClass('color').addClass('bw');
	    $("img",blk).removeClass('shown').filter(".shadow-bw").addClass('shown');
	} else if (t == 'shadow-color') {
	    blk.removeClass('bw').addClass('color');
	    $("img",blk).removeClass('shown').filter(".shadow-color").addClass('shown');
	} else if (t = 'vegetable-bw') {
	    blk.removeClass('color').addClass('bw');
	    $("img",blk).removeClass('shown').filter(".vegetable-bw").addClass('shown');
	
	}
    }

       var hover = function(blk) {
	var t = $("[name=style-hover]").val();
	if (t == 'vegetable-bw') {
	    blk.removeClass('color').addClass('bw');
	    $("img",blk).removeClass('shown').filter(".vegetable-bw").addClass('shown');
	} else if (t == 'vegetable-color') {
	    blk.removeClass('bw').addClass('color');
	    $("img",blk).removeClass('shown').filter(".vegetable-color").addClass('shown');

	}
    }

 
    var select = function(blk) {
	var t = $("[name=style-selected]").val();
	if (t == 'vegetable-color') {
	    blk.removeClass('bw').addClass('color');
	    $("img",blk).removeClass('shown').filter(".vegetable-color").addClass('shown');
	} else if (t == 'vegetable-bw') {
	    blk.removeClass('color').addClass('bw');
	    $("img",blk).removeClass('shown').filter(".vegetable-bw").addClass('shown');
	} 
    }



    $(".block").hover(
	function(e) { 
	    if (!$(this).hasClass('selected')) {
		hover($(this));
	    }
	},
	function(e) { 
	    if ($(this).hasClass('selected')) {
		select($(this));		
	    } else  {
		disable($(this)); 
	    }
	}
    );

    $(".block img, .block span").click(function(e) {
	var s = $(this).parent(".block");
	var o = s.siblings(".block");
	s.addClass("selected");
	o.removeClass("selected");
	disable(o);
	select(s);
    });
    $("[name=style-disabled]").change(function(e) {
	disable($(".block:not(.select)"));
    });
    $("[name=style-selected]").change(function(e) {
	select($(".block.select"));
    });
    
    }
});
