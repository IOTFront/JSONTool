/**
 * 
 * @authors 杨威 (YangWei)
 * @date    2016-08-09 10:27:07
 * @version 0.0.1
 */

var JsonTool={
	/* 名称：ToTree
	 * 功能：将Json转化为树状Json
	 * 参数：as > 传入的Json
	 * 		 idStr > json对象的唯一标记key
	 * 		 pidStr > json对象中存储的父级标记key
	 * 		 chindrenStr > 子节点保存的key名
	 * 返回：是树状json
	 */
	toTree:function(as, idStr, pidStr, chindrenStr) {
		//格式化数据
		var r = [],
			hash = {},
			id = idStr,
			pid = pidStr,
			children = chindrenStr,
			i = 0,
			j = 0,
			a=JSON.parse(JSON.stringify(as));
			len = a.length;
		for (; i < len; i++) {
			hash[a[i][id]] = a[i];
		}
		for (; j < len; j++) {
			var aVal = a[j],
				hashVP = hash[aVal[pid]];
			if (hashVP) {
				!hashVP[children] && (hashVP[children] = []);
				hashVP[children].push(aVal);
			} else {
				r.push(aVal);
			}
		}
		return r;		 
	},
	/* 名称：ParseTree
	 * 功能：解析树结构
	 * 参数：argument > 传入的Json
	 * 		 chindrenStr >  子节点的key
	 * 返回：同级的json
	 */
	prseTree:function (argument,chindrenStr){	
		var This=this;	
		var key=chindrenStr;
		//console.log(argument)
		var sp=[];
		for (var a = 0; a < argument.length; a++) {

			if(argument[a][key].length>0){
		 		var sc=This.ParseTree(argument[a][key],key);
		 		for (var i = 0; i < sc.length; i++) {
		 			sp.push(sc[i]);
		 		}
			}
			argument[a][key]=undefined;
		 	 sp.push(argument[a]);

		 };
		return sp;
	},
}
