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
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                    }
                },
            "color": {
                "value": "#40A0FF"
                },
            "shape": {
                "type": "polygon",
                "stroke": {
                    "width": 0,
                    "color": "#FFFFFF"
                    },
                "polygon": {
                    "nb_sides": 6
                    }
                },
            "opacity": {
                "value": 0.8,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                    }
                },
            "size": {
                "value": 8,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                    }
                },
            "line_linked": {
                "enable": true,
                "distance": 128,
                "color": "#FFFFFF",
                "opacity": 1,
                "width": 1
                },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                    }
                }
            },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                    },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                    },
                "resize": true
                },
            "modes": {
                "repulse": {
                    "distance": 128
                    },
                "push": {
                    "particles_nb": 4
                    },
                "remove": {
                    "particles_nb": 2
                    }
                }
            },
        "retina_detect": true
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
            $(this).animate({width: 400, height: 400}, 'fast').attr({'width': '400', 'height': '400'});
        } else {
            $(this).animate({width: 200, height: 200}, 'fast').attr({'width': '200', 'height': '200'});
        }
        $(this).data('m', !M);
    });

    var favicon = new Favico({
        animation: 'fade',
        bgColor: '#000',
        textColor: '#fff',
        type: 'circle',
        fontFamily: 'monospace',
        fontStyle: 'normal',
        position: 'down'
        });
    var faviconIndex = 0;
    var faviconData = ['c', 'a', 't', ' ', '/', 'd', 'e', 'v', '/', 'i', 'n', 'f', 'i', 'n', 'i', 't', 'y', '/', 'm', 'y', 's', 't', 'e', 'r', 'i', 'e', 's', ' ', '|', ' ', '/', 's', 'B', 'i', 'n', '/', 'c', 'y', 'b', 'e', 'r', 'R', 'o', 'z', 'e', '.', 'm', 'd', ' ', '-', '0', ' ', '>', ' ', '/', 'd', 'e', 'v', '/', 'n', 'u', 'l', 'l', ' ', '2', '>', '&', '1', ']', ';'];
    window.setInterval(function() {
        favicon.badge( faviconData[faviconIndex] );
        faviconIndex = (faviconIndex == faviconData.length - 1) ? 0 : ++faviconIndex;
    }, 4000);
});
