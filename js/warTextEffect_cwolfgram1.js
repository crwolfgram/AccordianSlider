//Text effect on "The War" p.textDrop
$(function () {

    var $textDrop = $('p.textDrop');
    var $dustPuffs = $('div#dustPuffs');


    //Setting itnitial css
    $textDrop.css({

        opacity: 0.2,
        transform: 'scale(8, 17)',
        top: '-9.375rem'

    });

    //Falling into place animation
    $textDrop.animate({

        opacity: 0.8,
        transform: 'scale(1)',
        top: '10px'

    }, 1000, 'easeInCubic', function () {

        $dustPuffs.css('display', 'block');

        $dustPuffs.children("span.dustPuffs").each(function () {

            $(this).animate({

                opacity: '.2',
                transform: 'scale(3, 2)'

            }, 1500);

        }).promise().done(function () {
            
            $dustPuffs.animate({

                opacity: 0

            }, 800, function () {

                $dustPuffs.css({

                    opacity: 1,
                    transform: 'scale(1,1)'

                });

                $textDrop.animate({

                    left: '-12.5rem'

                }, 400, 'easeOutElastic');

            });

        });

    }).animate({

        transform: 'scale(1.1)'

    }, 50, function () {

        $textDrop.animate({

            transform: 'scale(1)'

        }, 150);

    });
});