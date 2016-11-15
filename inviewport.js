Object.prototype.inViewport = function (x, y, percentage) {
	if(x === null || typeof x === 'undefined') x = 1;
  if(y === null || typeof y === 'undefined') y = 1;
  if(percentage === null || typeof percentage === 'undefined') percentage = true;
 
  var win = typeof window !== 'undefined' && window;

  var viewport = {
  	top: win.pageYOffset,
  	left: win.pageXOffset,
  	bottom: win.pageYOffset + win.innerHeight,
  	right: win.pageXOffset + win.innerWidth
  };

  var bounds 							  = this.getBoundingClientRect(),
  		top_visible 				  = bounds.top >= 0 && bounds.top < win.innerHeight,
  		bottom_visible 			  = bounds.bottom > 0 && bounds.bottom <= win.innerHeight,
  		left_visible				  = bounds.left >= 0 && bounds.left < win.innerWidth,
  		right_visible				  = bounds.right > 0 && bounds.right <= win.innerWidth,
  		vertical_showing 		  = 0,
      vertical_percentage   = 0,
  		horizontal_showing 	  = 0,
      horizontal_percentage = 0,
      y_pos                 = win.pageYOffset + bounds.top,
      x_pos                 = win.pageXOffset + bounds.left;


  // Get the percentage of the element showing vertically
  if (top_visible === true && bottom_visible === false) {
  	vertical_showing = Math.abs(bounds.top - win.innerHeight);
    vertical_percentage = Math.abs((bounds.top - win.innerHeight)/bounds.height);
  } else if (top_visible === false && bottom_visible === true) {
  	vertical_showing = bounds.bottom;
    vertical_percentage = Math.abs(bounds.bottom/bounds.height);
  } else if (top_visible === true && bottom_visible === true) {
  	vertical_showing = y;
    vertical_percentage = 1;

  }

  // Get the percentage of the element showing horizontally
  if (right_visible === true && left_visible === false) {
  	horizontal_showing = bounds.right;
    horizontal_percentage = Math.abs(bounds.right/bounds.width);
  } else if (right_visible === false && left_visible === true) {
  	horizontal_showing = Math.abs(viewport.right-bounds.left);
    horizontal_percentage = Math.abs((viewport.right-bounds.left)/bounds.width);
  } else if (right_visible === true && left_visible === true) {
  	horizontal_showing = x;
    horizontal_percentage = 1;
  }


  // Check to see if the element is in the viewport but 
  // the height takes up the whole screen
  if(y_pos <= viewport.top && viewport.bottom <= (y_pos + bounds.height)) {
    return true;
  }

  // Check to see if the element is in the viewport but 
  // the width takes up the whole screen
  if(x_pos <= viewport.left && viewport.right <= (x_pos + bounds.width)) {
    return true;
  }

  // Check to see if element should be calculated by 
  // percentage exposed or number of pixels exposed
  if(percentage == 'pixel') {
    if(vertical_showing >= y && horizontal_showing >= x) {
      return true;
    }
  } else {
  	if(vertical_percentage >= y && horizontal_percentage >= x) {
  		return true;
  	}
  }
};


