

export const KEY = 'goodsdata';
export var valueObj = {goodsId:0,count:0};
//向localStorage存储数据
export function setItem(value) {
	// console.log(1)
	var jsonString = localStorage.getItem(KEY);
	jsonString = jsonString || '[]';  //[]中括号要加引号变成字符串
	// console.log(2)
	var arr = JSON.parse(jsonString); //函数转字符串
	
	arr.push(value);
	localStorage.setItem(KEY,JSON.stringify(arr))

}
//在localStorage取数据
export function getItem() {
	var jsonString = localStorage.getItem(KEY);
	jsonString = jsonString || '[]';
	return JSON.parse(jsonString)
}
//移除数据
export function removeItem(id) {
	var arr = getItem();
	for(var i = arr.length-1; i >= 0; i--){
		if(arr[i].goodsId == id ){
			arr.splice(i,1)
		}
	}
	localStorage.setItem(KEY,JSON.stringify(arr))
}




//合并localStorage里面的数据
export function getgoodsObject() {
	var arr = getItem();
	var resObj = {};
	for(var i=0;i<arr.length;i++){
		var item = arr[i];
		if(!resObj[item.goodsId]){
			resObj[item.goodsId] = item.count;
		}else{
			var count = resObj[item.goodsId];
			resObj[item.goodsId] = count + item.count;
		}
	}
	return resObj
}

//把carproamount加减后的数据存储到localStorage里面去。
export function updataData(resObj) {
	var arr = getItem();
	// var count = 1;
	//判断式加还是减
	var num = 0;
	if(resObj.type == 'add'){
		arr.push({goodsId:resObj.goodsid,count:1})
	}else{
		for(var i = 0; i < arr.length; i++){
			if (arr[i].goodsId == resObj.goodsid) {
				if(arr[i].count>1){
					arr[i].count = arr[i].count - 1;
					break;
				}else{
					//在这要设置一个判断，最少要留下一条。不然会全部被删掉了。
					for(var j = 0;j<arr.length;j++){
						if (arr[j].goodsId == resObj.goodsid) {
							num++
						}
					}
					if(num > 1){
							arr.splice(i,1);
							break;
						}else{
							break
					}
					
				}
			}
		}
	}
	localStorage.setItem(KEY,JSON.stringify(arr))
}