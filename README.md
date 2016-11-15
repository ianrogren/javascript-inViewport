inViewport
---

A light weight, pure javascript plugin used to determine whether an element is in the viewport. Optional parameters for a user to specify the either the minimum number of pixels exposed or minimum percentage of the element's dimensions exposed within the viewport.  Based off of the <a href="https://github.com/moagrius/isOnScreen" target="_blank">jQuery.isOncreen</a> plugin with the ability to switch from percentage to pixels.

See the inViewport.js in action <a href="http://ianrogren.github.io/javascript-inViewport/">here</a>.

### Browser Support

| <img src="http://i.imgur.com/dJC1GUv.png" width="48px" height="48px" alt="Chrome logo"> | <img src="http://i.imgur.com/o1m5RcQ.png" width="48px" height="48px" alt="Firefox logo"> | <img src="http://i.imgur.com/8h3iz5H.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="http://i.imgur.com/j3tgNKJ.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| All ✔ | All ✔ | All ✔ | All ✔ |

### Basic Usage

Can append to any element or class:

``` html
<script src='inviewport.js'></script>
<script>
	// Check element in viewport by percentage
	// 50% horizontally and 50% vertically before firing
	var selector_A = document.querySelector('#selector-A');
	selector_A.inViewport(0.5, 0.5);

	// Check element in viewport by percentage
	// 150px horizontally and 175px vertically before firing
	var selector_B = document.querySelector('#selector-B');
	selector_B.inViewport(150, 175, 'pixel');	
</script>
```

### Custom Options

| Settings | Default Value | Description
| --- | --- | --- |
| x | <pre>1</pre> |  The minimum horizontal value that must be exposed before determining whether the element is within the viewport.  
| y | <pre>1</pre> |  The minimum vertical value that must be exposed before determining whether the element is within the viewport. 
| percentage/pixel | <pre>Percentage</pre> | The option to set the exposure value by a percentage of the element exposed or by the number of pixels the element is exposed.  By default, this plugin will accept a percentage value from 0 - 1 where 1 is 100%.  To switch over to pixels, use "pixel" as the third argument.

### Licence 
``` html
		                    __
		            _,..,_ (, )
		         .,'      `,./
		       .' :`.----.': `,
		      :   : ^    ^ :   ;
		     :   :  6    6  :   ;
		     :   :          :   ;
		     :   :    __    :   ;
< MIT >       :   `:'.--.`:'   ;
		       `.  : o  o :  .'
		        :   `----'   :  
		        : .  :'`:  . :
		        `.:.'    `.:.' 
```


