var iconAttr = {fill: '#E0E0E0', stroke: 'none'};
var paperz = {}, elz = {};

$(function() {

    $(window).scroll(function() {
        if ($("#navBar").offset().top > 200) {
            $("#navBar").addClass("navbar-collapse");
        } else {
            $("#navBar").removeClass("navbar-collapse");
        }
    }).scroll();

    $(function() {
        $('.page-scroll a').bind('click', function(e) {
            var $a = $(this);
            $('html, body').stop().animate({
                scrollTop: $($a.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            e.preventDefault();
        });
    });

    $('.tt').tooltip();

    $('.icon')
            .each(function() {
                var id = $(this).attr('id'),
                        icn = $(this).data('icon'),
                        icn_sx = $(this).data('icon-size-x'),
                        icn_sy = $(this).data('icon-size-y'),
                        icn_trnsfrm = $(this).data('icon-transform'),
                        icn_attr = $(this).data('icon-attr');
                if (undefined === icn_trnsfrm) {
                    var icn_ssx = Math.round(icn_sx / 32);
                    var icn_ssy = Math.round(icn_sy / 32);
                    icn_trnsfrm = 's' + icn_ssx + ',' + icn_ssy + ',0,0';
                }
                if (undefined === icn_attr) {
                    icn_attr = iconAttr;
                }
                paperz[id] = Raphael(id, icn_sx, icn_sy);
                elz[id] = paperz[id].path(iconz[icn]).transform(icn_trnsfrm).attr(icn_attr);
            })
            .on('mouseenter mouseleave', function(e) {
                if (false === $(this).parent().data('iconHover') || false === $(this).data('iconHover')) {
                    return false;
                }
                var id = $(this).attr('id');
                elz[id].stop();
                if ('mouseenter' === e.type) {
                    elz[id].animate({stroke: '#FFF', 'stroke-width': 4}).animate({fill: '#000'}, 500);
                } else {
                    elz[id].animate(iconAttr);
                }
            });

    $('#footer')
            .on('click', function() {
                if (undefined !== (linkURL = $(this).data('forward'))) {
                    window.open(linkURL + '?utm_source=slashsBin&utm_medium=website&utm_campaign=slashsBin');
                    return false;
                }
                if (undefined !== (mask = "CV")) {
                    $('#body #back-page.face .mask').removeClass('putOn').filter('#mask-' + mask).addClass('putOn');
                    var bdy = $('#body');
                    var fpage = bdy.find('#front-page');
                    var shp = fpage.find('#front-core-container #shape');
                    if (1 == bdy.data('flip')) {
                        //fpage.css('display', 'block');
                        bdy.data('flip', 0).removeClass('flip');
                        shp.removeClass('paused');
                    } else {
                        //fpage.css('display', 'none');
                        bdy.data('flip', 1).addClass('flip');
                        shp.addClass('paused');
                    }
                }

                return false;
            });

    $('#core #core-context #core-container').on('click', function(e) {
        var $stg = $(this).find('#stage');
        var $shp = $stg.find('#shape');
        if ($shp.hasClass('ring')) {
            $shp.removeClass('ring').data('iconHover', false).addClass('cube');
            $stg.css('webkitTransform', '')
                    .css('mozTransform', '')
                    .css('transform', '');
        } else {
            $shp.removeClass('cube').data('iconHover', true).addClass('ring');
            $stg.css('webkitTransform', 'translateZ(-200px)')
                    .css('mozTransform', 'translateZ(-200px)')
                    .css('transform', 'translateZ(-200px)');
        }
        return false;
    });

    $('.eMail').on('click', function() {
        var w = 500, h = 300, t = 0, l = 0;
        l = (screen.width - w) / 2;
        t = (screen.height - h) / 2;
        window.open($(this).attr('href'), 'Mohammad Shokri eMail Address',
                'toolbar=0,\
        					scrollbars=0,\
    						location=0,\
        					statusbar=0,\
        					menubar=0,\
        					resizable=0,\
        					fullscreen=0,\
        					directories=0,\
        					width=' + w + ',height=' + h + ',\
        					top=' + t + ',left=' + l);
        return false;
    });

    $('#contact #QR').on('click', function() {
        if (!(M = $(this).data('m'))) {
            $(this).animate({width: 342, height: 342}, 'fast').attr('src', '/assets/img/QR_M.png');
        } else {
            $(this).animate({width: 196, height: 196}, 'fast').attr('src', '/assets/img/QR.png');
        }
        $(this).data('m', !M);
    });
});