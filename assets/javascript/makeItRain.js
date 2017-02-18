

function makeItRain() {

    var $dollaBills = $(),

    createDollas = function () {
        var numBills = 100;
        for (var i = 0; i < numBills; ++i) {
            var $dollaBill = $('<img class="dolla" src="assets/images/dollaBillYall.png">');
            $dollaBill.css({
                'left': (Math.random() * $('#dollaBillsHolder').width()) + 'px',
                'top': (- Math.random() * $('#dollaBillsHolder').height()) + 'px',
                'transform': 'rotate('+(- Math.random() * 360 ) + 'deg)'
            }); 
            $dollaBills = $dollaBills.add($dollaBill);
        }
        $('#billsAll').prepend($dollaBills);
    },
    
    animDollas = function() {
        $dollaBills.each(function() {
            
            var singleAnimation = function($bill) {
                $bill.animate({
                    top: "110%",
                }, Math.random() + 6500, function(){
                	$(this).remove();
                });
            };
            singleAnimation($(this));
        });
    };
    
    createDollas();
    animDollas();
}


