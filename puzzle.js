var pos_max=new Array(4);
 pos_max=[[1,1,1],[1,1,1],[1,1,0],[1,1,1]];
var x,p_x,p_y;
var source=["images/white.png","images/1.jpg","images/2.jpg",
			"images/3.jpg","images/4.jpg","images/5.jpg",
			"images/6.jpg","images/7.jpg","images/8.jpg"];


function find_white(index){
	var x_pos=(index)%3;
	var y_pos=(index-x_pos)/3;
	var x1=x_pos+1,x2=x_pos-1;
	var y1=y_pos+1,y2=y_pos-1;
	//console.log(typeof y1);
	for (var i = 0; i < pos_max.length; i++) {

		var mat=pos_max[i];
		for (var j=0;j<mat.length;j++){
			if(mat[j]===0){
				x=i*3+j;
				p_x=j;
				p_y=i;
				//console.log("old"+x+'...'+p_x+'...'+p_y);
				break;
			}
		}
	}
	try{
		//console.log(pos_max[y_pos][x1]);
		//console.log(pos_max[y1][x_pos]);
		if (pos_max[y_pos][x_pos]==0){
			return false;
		}else if ((pos_max[y_pos][x1]!==0 && pos_max[y_pos][x2]!==0) && (pos_max[y1][x_pos]!==0 && pos_max[y2][x_pos]!==0) ) {
			return false;
		}else{
			pos_max=[[1,1,1],[1,1,1],[1,1,1],[1,1,1]];
			pos_max[y_pos][x_pos]=0;
			//console.log("new"+index+'...'+x_pos+'...'+y_pos);
			
			//console.log(pos_max);
			return true;
		}		
	}catch(err){
		//console.log(err);
		return false;
	}

	//console.log(x_pos+"...."+y_pos);
	//console.log(pos_max[y_pos][x_pos]);
}

function changeData(index,x){
	var ele=$("img")[index];
	//console.log(ele);
	var ele1=$("img")[x];
	//console.log(ele1);
	var aa=ele.src;
	ele.src=ele1.src;
	ele1.src=aa;
}

function check_result(){
	var checked=new Array(9);
	$("img").each(function (){
		var i=parseInt(this.title)+1;
		//console.log(this.src.split('/').pop().indexOf(i.toString())+'.....'+this.src.split('/').pop()+'...'+this.title);
		checked[i-1]=this.src.split('/').pop().indexOf(i.toString());
	});
	for (var i=0;i<checked.length-1;i++){
		if(checked[i]==-1){
			return false;
		}
	}
	return true;
}

function a1111(){
	var mat=new Array();
	for (var i = 0; i < 9; i++) {
		var id = Math.ceil(Math.random()*9);
		if(mat.indexOf(id)== -1){
			mat.push(id);
		}else {
			i=i-1;
		}
	}
	console.log(mat);
	return mat;
}

document.getElementById("reset").onclick=function (){
		var index=a1111();
		$("img").each(function (i,ele){
			m=index[i]-1;
			if(m===0) {
				xx=i%3;
				yy=(i-xx)/3;
				pos_max=[[1,1,1],[1,1,1],[1,1,1],[1,1,1]];
				pos_max[yy][xx]=0;
			}
			console.log(i);
			this.src=source[m];
		})
		
}
/**
 * 点击某一个方块
 * 1.查找周围四个是否有一个是值是0
 * 若是0，就交换src
 * 2.判断1-8个方块的title数字是否在src字符串里面（可用RegExp正则表达式）
 */
$(document).ready(function (){
	$("img").bind("click",function (){
		//查找值
		var s=this.title;
		//查找周围
		var flag=find_white(parseInt(s));
		//console.log(flag);
		if(flag){
			//执行交换src
			changeData(parseInt(s),x);
			//console.log(pos_max);
			//判断是否匹配成功
			//console.log(check_result());
			if (check_result()){
				$("#message span").html("success");
			}
		}
		//console.log(typeof s);
		//console.log(s);
	});
});

