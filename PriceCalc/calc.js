function setInput(idName)
{
	setAllUnfocus();
	document.getElementById(idName).setAttribute("class","width25pFocus");
	document.getElementById("selected").value = idName;
	
	if (isNaN(document.getElementById(idName).innerHTML))
	{
		document.getElementById(idName).innerHTML = "";
	}
	
	
}

function keyInput(key)
{
	sel = document.getElementById("selected").value;
	if (sel.indexOf("quantity") >= 0 || sel.indexOf("price") >= 0)
	{
		selBox = document.getElementById(sel);
		if (key == "bk")
		{
			selBox.innerHTML = selBox.innerHTML.substring(0, selBox.innerHTML.length - 1);
			
		}
		else if (!(key == "." && selBox.innerHTML.indexOf(".") >= 0))
		{
			selBox.innerHTML = selBox.innerHTML + key;
		}
	}
}

function setAllUnfocus()
{
	for (var i=1; i<=3; i++)
	{
		var obj = document.getElementById("quantity" + i);
		obj.setAttribute("class","width25p");
		if (isNaN(obj.innerHTML) || obj.innerHTML == "")
		{
			obj.innerHTML = "-";
		}
	}
	for (var i=1; i<=3; i++)
	{
		var obj = document.getElementById("price" + i);
		obj.setAttribute("class","width25p");
		if (isNaN(obj.innerHTML) || obj.innerHTML == "")
		{
			obj.innerHTML = "-";
		}
	}
}

function calcResult()
{
	for (var i=1; i<=3; i++)
	{
		document.getElementById("unit-price" + i).innerHTML = "-";
		document.getElementById("result" + i).innerHTML = "-";
		document.getElementById("result" + i).setAttribute("class","width25p");
		
		if (!isNaN(document.getElementById("quantity" + i).innerHTML) && !isNaN(document.getElementById("price" + i).innerHTML) && document.getElementById("quantity" + i).innerHTML != "" && document.getElementById("price" + i).innerHTML != "")
		{
			document.getElementById("unit-price" + i).innerHTML = (parseFloat(document.getElementById("price" + i).innerHTML) / parseFloat(document.getElementById("quantity" + i).innerHTML)).toString().substring(0,8);
		}
	}
	
	var cheap = 999999999;
	var cheap_i = 0;
	
	for (var i=1; i<=3; i++)
	{
		if (document.getElementById("unit-price" + i).innerHTML != "-")
		{
			if (parseFloat(document.getElementById("unit-price" + i).innerHTML) < cheap)
			{
				cheap = parseFloat(document.getElementById("unit-price" + i).innerHTML);
				cheap_i = i;
			}
		}
	}
	setInput("result" + cheap_i);
	document.getElementById("result" + cheap_i).innerHTML = '\u2714';
}

function allCls()
{
	for (var i=1; i<=3; i++)
	{
		var obj = document.getElementById("quantity" + i);
		obj.innerHTML = "-";
	}
	for (var i=1; i<=3; i++)
	{
		var obj = document.getElementById("price" + i);
		obj.innerHTML = "-";
	}
	for (var i=1; i<=3; i++)
	{
		var obj = document.getElementById("unit-price" + i);
		obj.innerHTML = "-";
		obj.setAttribute("class","width25p");
	}
	for (var i=1; i<=3; i++)
	{
		var obj = document.getElementById("result" + i);
		obj.innerHTML = "?";
		obj.setAttribute("class","width25p");
	}

	document.getElementById("selected").value = "quantity1";
	setInput("quantity1");

}

function reInput()
{
	if (document.getElementById("selected").value.indexOf("quantity") >= 0 
	|| document.getElementById("selected").value.indexOf("price") >= 0 )
	{
		document.getElementById(document.getElementById("selected").value).innerHTML = "";
	}
}

function moveFocus(towards)
{
	sel = document.getElementById("selected").value;
	obj = document.getElementById(sel);
	posX = 0;
	posY = 0;
	if (sel.indexOf("quantity") >= 0 || sel.indexOf("price") >= 0)
	{
		if (sel.indexOf("quantity") >= 0)
			posY = 1;
		if (sel.indexOf("price") >= 0)
			posY = 2;
		presentName = sel.substring(0, sel.length - 1);
		posX = parseInt(sel.substring(sel.length - 1, sel.length));
		if (obj.innerHTML == "")
			obj.innerHTML = "-";
		
		switch (towards)
		{
			case "L":
				if (posX > 1)
				{
					posX--;
					document.getElementById(sel).setAttribute("class","width25p");
					document.getElementById(presentName + posX).setAttribute("class","width25pFocus");
					document.getElementById("selected").value = presentName + posX;
				}
				break;
			case "R":
				if (posX < 3)
				{
					posX++;
					document.getElementById(sel).setAttribute("class","width25p");
					document.getElementById(presentName + posX).setAttribute("class","width25pFocus");
					document.getElementById("selected").value = presentName + posX;
				}
				break;
			case "U":
				if (posY == 2)
				{
					posY = 1;
					document.getElementById(sel).setAttribute("class","width25p");
					document.getElementById("quantity" + posX).setAttribute("class","width25pFocus");
					document.getElementById("selected").value = "quantity" + posX;
				}
				break;
			case "D":
				if (posY == 1)
				{
					posY = 2;
					document.getElementById(sel).setAttribute("class","width25p");
					document.getElementById("price" + posX).setAttribute("class","width25pFocus");
					document.getElementById("selected").value = "price" + posX;
				}
				break;
		}
		
		if (document.getElementById(document.getElementById("selected").value).innerHTML == "-")
			document.getElementById(document.getElementById("selected").value).innerHTML = "";
	}
}
