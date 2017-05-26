/**
	Base class for all drawable objects, makes ordering automatic.
	Code by Rob Kleffner, 2011
*/

module.exports = (Enjine) => {

Enjine.Drawable = function() {
    this.ZOrder = 0;
};

Enjine.Drawable.prototype = {
    Draw: function(context) { }
};

};
