let netmask = require('netmask')
	.Netmask
exports.getpackage = function (subnet, date, sim, comment) {
	var block = new netmask(subnet)
	let first = block.first
	let last = block.last
	let packageIp = []
	var start = pearWanIP(first)
	var stop = pearWanIP(last)

	var temp = {}
console.log(start);
console.log(stop);
	if (sim == 1) {
		for (var i = Number(start); i <= Number(stop); i++) {
			packageIp.push({
				ai_name: 'AIS' + first.substring(0, first.indexOf('.', 4) + 1) + '' + i + '.1',
				ai_date: date,
				ai_ip: first.substring(0, first.indexOf('.', 4) + 1) + '' + i + '.1',
				ai_comment: comment
			})
		}
	} else if (sim == 2) {
		for (var i = Number(start); i <= Number(stop); i++) {
			packageIp.push({
				dt_name: 'DTAC' + first.substring(0, first.indexOf('.', 4) + 1) + '' + i + '.1',
				dt_date: date,
				dt_ip: first.substring(0, first.indexOf('.', 4) + 1) + '' + i + '.1',
				dt_comment: comment
			})
		}
	}

	return packageIp
}
exports.getIp = function (ais, dtac, cus) {
	let iais = subip(ais)
	let idtac = subip(dtac)
	let data = iais.map((item, index) => {
		return {
			Ia_ais : item,
			Ia_dtac: idtac[index],
			 Ia_uc: cus
		}
	})

	return data
}

function subip(ip) {
	var str = ip.substring(0, ip.indexOf('.', 6) + 1)
	var temp = []
	for (var i = 1; i <= 254; i++) {
		temp.push(str + '' + i)
	}

	return temp
}
function pearWanIP(ip){
    return ip.substring(ip.indexOf('.',4)+1,ip.lastIndexOf('.'));
}
