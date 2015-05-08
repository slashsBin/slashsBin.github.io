var iconAttr = {
    default: {
        base: {'fill': '#FFF', 'stroke': 'none', 'stroke-width': 0},
        hover: {'fill': '#000', 'stroke': 'none', 'stroke-width': 0}
    },
    darkBlue: {
        base: {'fill': '#000', 'stroke': 'none', 'stroke-width': 0},
        hover: {'fill': '#40A0FF', 'stroke': 'none', 'stroke-width': 0}
    }
};
var paperz = {}, elz = {};

$(function() {

    particlesJS('particles-js', {
        particles: {
            color: '#40A0FF',
            color_random: false,
            shape: 'circle',
            opacity: {
                opacity: 1,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                    sync: false
                }
            },
            size: 8,
            size_random: true,
            nb: 256,
            line_linked: {
                enable_auto: true,
                distance: 128,
                color: '#FFF',
                opacity: 1,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 1
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 256
            },
            detect_on: 'canvas',
            mode: 'grab',
            line_linked: {
                opacity: .4
            },
            events: {
                onclick: {
                    enable: true,
                    mode: 'push',
                    nb: 4
                },
                onresize: {
                    enable: true,
                    mode: 'bounce',
                    density_auto: false,
                    density_area: 800
                }
            }
        },
        retina_detect: true
        });

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
                        icn_theme = $(this).data('icon-theme');
                if (undefined === icn_trnsfrm) {
                    var icn_ssx = Math.round(icn_sx / 32);
                    var icn_ssy = Math.round(icn_sy / 32);
                    icn_trnsfrm = 's' + icn_ssx + ',' + icn_ssy + ',0,0';
                }
                if (undefined === icn_theme) {
                    icn_theme = 'default';
                }
                paperz[id] = Raphael(id, icn_sx, icn_sy);
                elz[id] = paperz[id].path(iconz[icn]).transform(icn_trnsfrm).attr(iconAttr[icn_theme]['base']);
            })
            .on('mouseenter mouseleave', function(e) {
                if (false === $(this).parent().data('iconHover') || false === $(this).data('iconHover')) {
                    return false;
                }
                var id = $(this).attr('id');
                icn_theme = $(this).data('icon-theme');
                if (undefined === icn_theme) {
                    icn_theme = 'default';
                }
                elz[id].stop();
                if ('mouseenter' === e.type) {
                    elz[id].animate(iconAttr[icn_theme]['hover'], 500);
                } else {
                    elz[id].animate(iconAttr[icn_theme]['base']);
                }
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

    $('#core #core-context #core-container #stage').on('click', '.ring .plane', function() {
        if (undefined !== (linkURL = $(this).data('forward'))) {
            window.open(linkURL + '?utm_source=slashsBin&utm_medium=website&utm_campaign=slashsBin');
            return false;
        }
        if (undefined !== (section = $(this).data('section'))) {
            $('html, body').stop().animate({
                scrollTop: $('#' + section).offset().top
            }, 1500, 'easeInOutExpo');
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
            $(this).animate({width: 342, height: 342}, 'fast').attr({'src': '/assets/img/QR_M.png', 'width': '342', 'height': '342'});
        } else {
            $(this).animate({width: 196, height: 196}, 'fast').attr({'src': '/assets/img/QR.png', 'width': '196', 'height': '196'});
        }
        $(this).data('m', !M);
    });
});
