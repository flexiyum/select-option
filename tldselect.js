jQuery(function ($) {
	'use strict';
	
    // Custom input type select function
	
    $('select.domainList').each(function(options) {
        var $this = $(this),
            numberOfOptions = $(this).children('option');

        $this.addClass('select-hidden');
        $this.wrap('<div class="select ml-auto mr-2"></div>');
        $this.after('<div class="select-styled"></div>');

        var styledSelect = $this.next('.select-styled');
        styledSelect.text($this.children('option').eq(0).text());

        var list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter(styledSelect);

        for (var i = 0; i < numberOfOptions.length; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo(list);
        }

        var listItems = list.children('li');

        styledSelect.on('click', function (e) {
            e.stopPropagation();
            $('.select-styled.active').not(this).each(function () {
                $(this).removeClass('active').next('.select-options').fadeIn();
            });
            $(this).toggleClass('active').next('.select-options').toggle();
            $(this).parent().toggleClass('focus');
        });

        listItems.on('click', function (e) {
            e.stopPropagation();
            styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            list.hide();
            if ($(this).parent().parent().hasClass('focus')) {
                $(this).parent().parent().removeClass('focus');
            }
        });

        $(document).on('click', function () {
            styledSelect.removeClass('active');
            list.hide();
        });
    });

    $(document).ready(function () {
		
		var domain_name = '';
        
        $('.domain-search-form .select-options li').on('click', function () {
			
			var sld = $('.domain-search-form').find('input[name="domain"]').val();
			if ($('input[name="domain"]').val() != '') {
				sld = sld.split('.', 1)[0];
				$('.domain-search-form input[name="domain"]').attr('value', sld);
				if (sld != '') {
                    var tld = $('.domain-search-form').find('.select-styled').text();
                    domain_name = $('.domain-search-form input[name="domain"]').val(sld + '' + tld);
                }
                else {
    				$text('Please enter your domain.', 'wdc');
                }
			}
		});
		
		$('#search p').each(function () {
            var $this = $(this);
            if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.remove();
        });
		
        $('input').each(function (e) {
            $(this).attr('autocomplete', 'off');
            $(this).attr('autocorrect', 'off');
        });
    });
	
}); // JQuery end
