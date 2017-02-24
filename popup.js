var binary = document.getElementById("binary");
var decimal = document.getElementById("decimal");
var hex = document.getElementById("hex");
var delCheckbox = document.getElementById("del");

binary.addEventListener('keyup', function() {
	var binval = validate(this.value, /[01]*/);
	
	setViewValue(decimal, parseInt(binval, 2));
	setViewValue(hex, dec2hex(decimal.value));
});

decimal.addEventListener('keyup', function() {
	var decval = validate(this.value, /[0-9]*/);
	
	setViewValue(binary, dec2bin(decval));
	setViewValue(hex, dec2hex(decval));
});

hex.addEventListener('keyup', function(e) {	
	var hexval = validate(purify(this.value), new RegExp('[0-9a-f]*', 'i'));
	
	if(hexval !== this.value)
		setViewValue(hex, hexval);
		
	setViewValue(decimal, parseInt(hexval, 16));
	setViewValue(binary, dec2bin(decimal.value));
});

delCheckbox.addEventListener('click', function() {
	if(this.checked)
		setViewValue(hex, delimiterify(hex.value));
	else
		setViewValue(hex, purify(hex.value));
});

function setViewValue(view, value) {
	view.value = value || '';
}

function dec2hex(dec) {
	var asInt = parseInt(dec);
	if(asInt)
		return asInt.toString(16).toUpperCase();
}

function dec2bin(dec) {
	var asInt = parseInt(dec);
	if(asInt)
		return formatBin(asInt.toString(2));
}

function validate(value, regex) {
	if(value.toString().match(regex)[0] === value.toString())
		return value;
}

function purify(hex) {
	return hex.replace(/[-:\s]/g, '');
}

function delimiterify(hex) {
	var newhex = "";
	hex = hex.length % 2 ? '0' + hex : hex;
	
	for(var i=0; i<hex.length; i++) {
		if(i>0 && i % 2 === 0)
			newhex += ":";
		newhex += hex[i];
	}
	
	return newhex;
}

// Format the binary value string to always display a multiple of 8 bits
// TODO: There has to be a better way to format the string though
function formatBin(binStr) {
	if(!binStr) return;

	i = 0;
	len = binStr.length;
	while(div = len / (8 * ++i) > 1) {};

	for(j = len; j < 8*i; ++j) {
		binStr = '0' + binStr;
	}

	return binStr;
}