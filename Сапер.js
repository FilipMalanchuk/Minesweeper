var hor = 20; // горизонтальный размер поля
var ver = 20; // вертикальный размер поля
var mines = 100;

document.getElementById("start").onclick = function() {
	hor = Number(document.getElementById("rows").value)
	ver = Number(document.getElementById("cols").value)
	mines = Number(document.getElementById("mines").value);
	if (mines >= hor*ver) {
		document.getElementById("helper").innerText = "Введите другое значение"
		return setTimeout(()=>document.getElementById("helper").innerText = "",2000)
	}
	if(true) {
		document.querySelectorAll(".row").forEach(item => item.remove())
	}
	start()
}

function start() {
for (let i = 0;i<ver;i++) {
	addDiv() // добавляет ряды
}

	//задает ширину каждого ряда по горизонтали
	document.querySelectorAll(".row").forEach(item => {
		item.style.cssText = `width: ${hor * 24}px`
	})


// добавляет в ряды клетки
for (let i = 0;i<hor;i++) {
	document.querySelectorAll(".row").forEach(item => {
		item.appendChild(document.createElement("div")).classList.add("cell")
	})
}

document.querySelectorAll(".cell").forEach(item => {
	item.innerText = "0"
	item.classList.add("closed")
})

function addDiv () {
	const createDiv = document.createElement("div");
	document.body.appendChild(createDiv).classList.add("row")
}

// добавляем классы с индексом
for (let i =0;i<hor*ver;i++) {
	document.querySelectorAll(".cell")[i].classList.add(`index${i}`)
}
// добавляем классы со счетчиком по горизонтали
for (let i =0;i<hor*ver;i++) {
	document.querySelectorAll(".cell")[i].classList.add(`hor${i%hor+1}`)
}

// добавляем классы со счетчиком по вертикали
let count = 0;
for (let i = 0;i<hor;i++) {
	for(let y = i;y<hor*ver;y+=hor) {
		document.querySelectorAll(".cell")[y].classList.add(`ver${count%ver+1}`)
		count++
	}
}

	//добавляет клик всем клеткам
	let firstclick = true

	document.querySelectorAll(".cell").forEach(elem =>elem.onclick = function() {
		if(firstclick) {
			firstclick = false;
			gameStart(Number(elem.className.split(" ")[2].substring(5)));
			checkIfZero(elem)
		}
		else if(elem.className.indexOf("opened") === -1) {
			checkCell(elem)
		}
		return 
	})


	function gameStart (indexofStart) {
	// генерация мин

	let minesIndexSet = new Set();


	while (minesIndexSet.size < mines) {
		let random = Math.floor(Math.random() * (ver * hor))
		if (random !== indexofStart) {
			minesIndexSet.add(random)
		}
	}
	minesIndexSet.forEach(itemindex => {
		document.querySelectorAll(".cell")[itemindex].classList.add("mine")
	})

	// генерация цифр около мин

	let mineArr = []	
	// собираем элементы с минами
	for(let i=0;i<hor*ver;i++){
		let currentElem = document.querySelectorAll(".cell")[i];
		if (currentElem.className.indexOf("mine") !== -1) {
			mineArr.push(currentElem)
		}
	}

	for(let i =0;i<mineArr.length;i++) {
		let count = 0;
		let curMine = mineArr[i];
		let curVer = Number(curMine.className.split(" ")[4].substring(3))
		let curHor = Number(curMine.className.split(" ")[3].substring(3))
		let curIndex = Number(curMine.className.split(" ")[2].substring(5))
	// console.log(curIndex)
	
	let arrIndex = [curIndex-hor-1,curIndex-hor,curIndex-hor+1,curIndex-1,curIndex+1,curIndex+hor-1,curIndex+hor,curIndex+hor+1];

	let verArr = [curVer - 1,curVer,curVer + 1];
	let horArr = [curHor - 1,curHor,curHor + 1];


	for(let y=0;y<3;y++) {
		for (let h = 0;h<3;h++) {
			if ((horArr[y] >0 && horArr[y] < hor+1) && (verArr[h] > 0 && verArr[h]<ver+1)) {

				// console.log(document.querySelectorAll(`.hor${horArr[y]}.ver${verArr[h]}`))
				document.querySelector(`.hor${horArr[y]}.ver${verArr[h]}`).innerText = Number(document.querySelector(`.hor${horArr[y]}.ver${verArr[h]}`).innerText) + 1
			}
		}
	}
}
// покраска, убирание нулей, цвет задан до 3 включительно, дальше белый
document.querySelectorAll(".cell").forEach(item =>{
	let curText = Number(item.innerText);
	curText === 0 ? item.style.cssText = "font-size:0px;" : curText === 1 ? item.style.cssText = "color:#0A0AB0;" : curText === 2 ? item.style.cssText = "color:#0BF300" : curText === 3 ? item.style.cssText = "color:red" : curText === 4 ? item.style.cssText = "color:#0804B3" : curText === 5 ? item.style.cssText = "color:#BB0909" : curText === 6 ? item.style.cssText = "color:#0EBBBD" : curText === 7 ? item.style.cssText = "color:#CB15E6" : item.style.cssText = "color:#4B3131"
})
}

	// проверка на мину
	function checkCell(elem) {
		if (elem.className.indexOf("mine") !== -1) {
			document.querySelectorAll(".mine").forEach(item => {
				item.style.cssText = `background-color: red;`
			})
		}
		else {
			checkIfZero(elem)
		}
	}
	// проверка клетки, дает клас открывающий клетку, запускает клики клеток рядом если 0
	function checkIfZero(elem) {
		if (elem.className.indexOf("opened") === -1) {
			elem.classList.add("opened");
			if (elem.innerText === "0") {
				let curHor = Number(elem.className.split(" ")[3].substring(3))
				let curVer = Number(elem.className.split(" ")[4].substring(3))
				let curIndex = Number(elem.className.split(" ")[2].substring(5))

				let verArr = [curVer+1,curVer,curVer-1];
				let horArr = [curHor+1,curHor,curHor-1];

				arr = []
				for (let i = 0;i<horArr.length;i++) {
					for(let y = 0;y<verArr.length;y++) {
						if ((horArr[i] > 0 && horArr[i] <= hor) && (verArr[y] > 0 && verArr[y] <= ver)) {

							arr.push(document.querySelector(`.ver${verArr[y]}.hor${horArr[i]}`))
						}
					}
				}

				arr = arr.filter(item => item.className.indexOf("opened") === -1)
				for (item of arr) {
					checkIfZero(item)
				}
				arr = []
			}
		}
	}

} //end of start function