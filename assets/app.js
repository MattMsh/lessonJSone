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

	var buindingInfoObject = {
		b1: {
			price: 999,
			available: 0
		},
		b2: {
			price: 999,
			available: 0	
		}
	}

	axios.get('/assets/flats.json').then(function(response){
		
		const { data } = response;

		var eacher = function(flat){
		//	if(flat.available) buindingInfoObject['b' + flat.building].available++;

			if(flat.building == 1 && flat.available){
				buindingInfoObject.b1.available++;
			}
			if(flat.building == 2 && flat.available){
				buindingInfoObject.b2.available++;
			}

			if(flat.building == 1 && flat.price < buindingInfoObject.b1.price){
				buindingInfoObject.b1.price = flat.price;
			}
			
			if(flat.building == 2 && flat.price < buindingInfoObject.b2.price){
				buindingInfoObject.b2.price = flat.price;
			}

		};

		data.forEach(eacher);

	}).catch(function(error){
		console.log(error);
	})



	mouseOver = function(building){
		var buildingInfo = document.getElementById('buildingInfo');
		buildingInfo.style.display = 'block';

		var available = buindingInfoObject['b'+building].available;
		var price = buindingInfoObject['b'+building].price;

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