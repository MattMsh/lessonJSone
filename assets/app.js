var buildingInfoHtml = '<div class="flat-info show">'+
		'<div class="flat-info__row">'+
			'<div class="flat-info__floor">'+
				'<h6 id="floor"> {building} </h6>'+
				'<p>корпус</p>'+
			'</div>'+
			'<div class="flat-info__text">'+
				'<h6 id="text"> {available} </h6>'+
				'<p>в продаже</p>'+
			'</div>'+
		'</div>'+
		'<div class="flat-info__price">'+
			'цена от <b id="price">{price}</b> млн.'+
		'</div>'+
	'</div>';

	// axios.get('/assets/flats.json').then(function(response){
		
	// });


	mouseOver = function(building, event){
		var buildingInfo = document.getElementById('buildingInfo');
		buildingInfo.style.left = event.offsetX +'px';
		buildingInfo.style.top = event.offsetY +'px';
		buildingInfo.style.display = 'block';


		buildingInfo.innerHTML = buildingInfoHtml
			.replace('{building}', building)
			.replace('{available}', 0)
			.replace('{price}', 0);
	}
	mouseOut = function(){
		var buildingInfo = document.getElementById('buildingInfo');
		buildingInfo.style.display = 'none';
	}
	mouseMove = function(event){
		var buildingInfo = document.getElementById('buildingInfo');
		buildingInfo.style.left = event.offsetX +'px';
		buildingInfo.style.top = event.offsetY +'px';
	}