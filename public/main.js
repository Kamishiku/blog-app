var update = document.getElementById('update')

update.addEventListener('click', function () {
	fetch({ /* request */ })
	.then(res => {
	  if (res.ok) return res.json()
	})
	.then(data => {
	  console.log(data)
	})
})
