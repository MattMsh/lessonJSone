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

	var buindingInfo = {
		b1: {
			price: 0,
			available: 0
		},
		b2: {
			price: 0,
			available: 0	
		}
	}

	axios.get('/assets/flats.json').then(function(response){
		
		var flats = response.data;


		flats.forEach(function(flat){
			if(flat.building == 1 && flat.available){
				buindingInfo.b1.available++;
			}
			if(flat.building == 2 && flat.available){
				buindingInfo.b2.available++;
			}

		});

	}).catch(function(error){
		console.log(error);
	})



	mouseOver = function(building){
		var buildingInfo = document.getElementById('buildingInfo');
		buildingInfo.style.display = 'block';

		var available = buindingInfo['b'+building].available;
		var price = buindingInfo['b'+building].price;

		buildingInfo.innerHTML = buildingInfoHtml
			.replace('{building}', building)
			.replace('{available}', available)
			.replace('{price}', price);
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