// cards.js

//PURE FUNCTIONS

function frequencies(arr) {
  const aa = [1,2,3,4,5,6,7,8,9], bb = [0,0,0,0,0,0,0,0,0];
  for ( var i = 0; i < aa.length; i++ ) {
    bb[i] = arr.filter(x=>(x==aa[i])).length;
  }
  return [aa, bb];
}

function card(r, s) {return {rank: r, suite: s}}

function cardtoindex(c) {
  const s = {C: 0, D: 13, H: 26, S: 39}
  const r = {'2': 0, '3': 1, '4': 2, '5': 3, '6': 4, '7': 5, '8': 6, '9': 7, T: 8, J: 9, Q: 10, K: 11, A: 12}
  return(s[c.suite] + r[c.rank])
}

function indextosuite(i) {return ['C', 'D', 'H', 'S'][Math.min(Math.floor(i/13),3)]}

function indextorank(i) {return ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'][i%13]}

function indextostring(i) {return indextorank(i) + indextosuite(i)}

function indextocard(i) {return {rank: indextorank(i), suite: indextosuite(i)}}

function cardtopng(c) {return "./pngcards/" + c.rank + c.suite + ".png"}

const allranks = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']

function subset(big,small) {return (small.filter(x=>big.has(x))).length == small.length;};

function maxrank(hand) {
  let f = (r) => hand.some(x=>x==r)
  if      (f('A')) {return 'A'}
  else if (f('K')) {return 'K'}
  else if (f('Q')) {return 'Q'}
  else if (f('J')) {return 'J'}
  else if (f('T')) {return 'T'}
  else if (f('9')) {return '9'}
  else if (f('8')) {return '8'}
  else if (f('7')) {return '7'}
  else if (f('6')) {return '6'}
  else if (f('5')) {return '5'}
  else if (f('4')) {return '4'}
  else if (f('3')) {return '3'}
  else if (f('2')) {return '2'}
  else {return 'X'}
}

function flush(a) {
  function cs(s) {return a.map(indextosuite).filter(x=>x==s).length}; //count suites
  let flushsuite = ['D','S','C','H'].filter(y=>cs(y)>4)[0];
  if (flushsuite) {
    let fcards = a.filter(aa=>indextosuite(aa)==flushsuite).map(indextorank);
    let flushrank = maxrank(fcards);
    flsh.textContent = `FLUSH ${flushrank}`;
    jkc2.textContent = flushrank;
    return flushrank;
  } else {
    flsh.textContent = "";
    return false;
  }
}

function straight(a) {
  let b = a.map(indextorank)
  let c = new Set(b)
  let srank = undefined
  if      (subset(c,['T', 'J', 'Q', 'K', 'A'])) {srank ='A'}
  else if (subset(c,['9', 'T', 'J', 'Q', 'K'])) {srank ='K'}
  else if (subset(c,['8', '9', 'T', 'J', 'Q'])) {srank ='Q'}
  else if (subset(c,['7', '8', '9', 'T', 'J'])) {srank ='J'}
  else if (subset(c,['6', '7', '8', '9', 'T'])) {srank ='T'}
  else if (subset(c,['5', '6', '7', '8', '9'])) {srank ='9'}
  else if (subset(c,['4', '5', '6', '7', '8'])) {srank ='8'}
  else if (subset(c,['3', '4', '5', '6', '7'])) {srank ='7'}
  else if (subset(c,['2', '3', '4', '5', '6'])) {srank ='6'}
  else if (subset(c,['A', '2', '3', '4', '5'])) {srank ='5'}
  else {srank = false}
  if (srank) {strt.textContent = `STRAIGHT ${srank}`
              jkc2.textContent =srank} 
  else {strt.textContent = ""}
  return srank
}

function height(a) {
  var b = a.map(indextorank)
  function cr(r) {return b.filter(x=>x==r).length}
  var c = false
  var d = false
  var e = false
  var f = straight(a)
  var g = flush(a)
  var flag = 0
  var h = false
  for (let i=0; i<b.length; i++) {
    if (cr(b[i])==4) {c = true}
    else if (cr(b[i])==3) {d = true}
    else if (cr(b[i])==2) {
      if (flag>2) {h = true} 
      else {flag++; e = true}   
    }
  }
  if ((f && g) && (f==g)) {qds.textContent = "STRFL"; return '9'} //need to add overlap restriction
  else if (c)             {qds.textContent = "4KIND"; return '8'}
  else if (d && e)        {qds.textContent = "FULLH"; return '7'}
  else if (g)             {qds.textContent = "FLUSH"; return '6'}
  else if (f)             {qds.textContent = "STRHT"; return '5'}
  else if (d)             {qds.textContent = "3KIND"; return '4'} 
  else if (h)             {qds.textContent = "2PAIR"; return '3'}
  else if (e)             {qds.textContent = "2KIND"; return '2'} 
  else                    {qds.textContent = "HIGHC"; return '1'}
}

function jkcompare(me,you) {
  let f = new Map([['2',1],['3',2],['4',3],['5',4],['6',5],
                   ['7',6],['8',7],['9',8],['T',9],['J',10],
                   ['Q',11],['K',12],['A',13]]);
  let firstme = me[0];
  let secondme = me[1];
  let firstyou = you[0];
  let secondyou = you[1];
  if (firstme > firstyou) {return 'me';}
  else if (firstyou > firstme) {return 'you';}
  else if (f.get(secondme)>f.get(secondyou)) {return 'me';}
  else if (f.get(secondyou)>f.get(secondme)) {return 'you';}
  else {return 'tie';}
}

function jkcode(a) {
  var x = height(a)
  jkc.textContent = x
  return x
}

function jkcode2(a) {
  let j = jkcode(a)
  const b = a.map(indextorank)  //ranks
  let cr = r => b.filter(x=>x==r).length //cr countrank
  let hr = {'1': 1, '2': 2, '3': 2, '4': 3, '7': 3, '8': 4}[height(a)]
  let targetrank = r => cr(r) == hr //boolean function
  let rankofmaxset = maxrank(b.filter(targetrank))
  if ((j=='1') || (j=='2') || (j=='3') || (j=='4') || (j=='7') || (j=='8')) {
    jkc2.textContent = rankofmaxset;
    return rankofmaxset;}
  else if (j=='6') {return flush(a)}
  else if ((j=='5') || (j=='9')) {return straight(a)}
}


// IMPURE UTILITIES

function print(s) {
  var str = document.createTextNode(s)
  var p = document.createElement("p")
  p.appendChild(str)
  div1.appendChild(p)
}


// THREE GLOBAL SYMBOLS HOLD STATE: myhand, yohand, deck

var myhand = {h1: null, h2: null, f1: null, f2: null, f3: null, p1: null, p2: null};
var yohand = {y1: null, y2: null}

const freshdeck = []
for (let i = 0; i < 52; i++) {freshdeck[i] = i}
Object.freeze(freshdeck)
var deck = [...freshdeck]


// FUNCTIONS THAT READ STATE

function ahand() {
  let mh = myhand
  return [mh.h1,mh.h2,mh.f1,mh.f2,mh.f3,mh.p1,mh.p2]
}

function yhand() {
  let mh = myhand
  let yh = yohand
  return [yh.y1,yh.y2,mh.f1,mh.f2,mh.f3,mh.p1,mh.p2]
}

function deckhas(x) {return deck.filter(y=>y==x).length > 0}

function indices() {
  let mh = myhand
  h1i.textContent = mh.h1
  h2i.textContent = mh.h2
  f1i.textContent = mh.f1
  f2i.textContent = mh.f2
  f3i.textContent = mh.f3
  p1i.textContent = mh.p1
  p2i.textContent = mh.p2
}

function cards(a) {
  var its = indextostring
  c1.textContent = its(a[0])
  c2.textContent = its(a[1])
  c3.textContent = its(a[2])
  c4.textContent = its(a[3])
  c5.textContent = its(a[4])
  c6.textContent = its(a[5])
  c7.textContent = its(a[6])
}

function myflush() {
  var a = ahand()
  return flush(a)
}

function mystraight() {
  var a = ahand()
  return straight(a)
}

function myheight() {
  var a = ahand()
  return height(a)
}

function myjkcode() {
  var a = ahand()
  return jkcode(a)
}

function myjkcode2() {
  var a = ahand()
  return jkcode2(a)
}  


// FUNCTIONS THAT CHANGE STATE

function refresh() {deck = [...freshdeck]}

function pluck() {
  let x = Math.floor(deck.length*Math.random())
  let y = deck[x]
  deck.splice(x,1)  //change state
  return y
}

function take(c) {
  const i = deck.indexOf(c)
  const y = deck[i]
  deck.splice(i,1)  //change state
  return y
}

//UI
function clickcard(c) {
    var ca = indextocard(pluck())
    c.src = cardtopng(ca)
    myhand[c.id] = cardtoindex(ca)  //change state
}

//UI
function bclick(rf, sf, c) {
  const i = cardtoindex(card(rf.value, sf.value));
  while (deckhas(i)) {
    deck = deck.filter(x=>x != i)
    c.src = cardtopng(indextocard(i))
    myhand[c.id] = i  //change state
  }
}

function sclick(rf, sf, c) {
  var i = cardtoindex(card(rf, sf))
  while (deckhas(i)) {
    deck = deck.filter(x=>x != i)
    c.src = cardtopng(indextocard(i))
    myhand[c.id] = i  //change state
  }
}


// COMPOSITE FUNCTIONS USING STATE

//UI
function gimmie() {
  let tempdeck = [...deck]
  var spots = [h1, h2, f1, f2, f3, p1, p2]
  var locks = [!(lo1.checked), 
               !(lo2.checked), 
               !(lo3.checked), 
               !(lo4.checked), 
               !(lo5.checked), 
               !(lo6.checked), 
               !(lo7.checked)]
  var loose = []
  for (let i=0; i<7; i++) {
    if (locks[i]) loose.push(spots[i])
  }
  loose.forEach(c=>clickcard(c))
  let a = ahand();
  indices(a)
  cards(a)
  deck = [...tempdeck]
  return `${jkcode(a)}${jkcode2(a)}`
}

function gimyou() {
  let tempdeck = [...deck]
  let a = ahand()
  let ay = a.slice(2)
  ay.push(pluck())
  ay.push(pluck())
  deck = [...tempdeck]
  return `${jkcode(ay)}${jkcode2(ay)}`
}

function tryYou() {
  let tempdeck = [...deck]
  let a = ahand()
  let ay = a.slice(2)
  one = pluck()
  two = pluck()
  ay.push(one)
  ay.push(two)
  deck = [...tempdeck]
  return {score: `${jkcode(ay)}${jkcode2(ay)}`, one: one, two: two}
}

//UI
function runsim() {
  var mydata = []
  for (let i=0; i<1000; i++) {
    mydata.push(gimmie()[0]);
  }
  let [x,y] = frequencies(mydata)
  charrts.barrs(y)
}

//UI
function headtohead() {
  let sc = [0,0,0]
  for (let i=0; i<2000; i++) {
    let m = gimmie()
    let y = gimyou()
    let r = (jkcompare(m,y))
    if (r=='me') {sc[0]++}
    else if (r=='you') {sc[2]++}
    else if (r=='tie') {sc[1]++}
  }
  let rr = Math.floor(0.05*(sc[0]+0.5*sc[1])+0.5)
  hth.textContent = `${rr}`
  return rr
}

//UI
function ratehole(rr1,ss1,rr2,ss2) {
  lo1.checked = false
  lo2.checked = false
  sclick(rr1, ss1, h1)
  sclick(rr2, ss2, h2)
  lo1.checked = true
  lo2.checked = true
  return headtohead()
}

//UI
function betterhands() {
  let iterations = 2000
  let hands = new Set()
  let scores = new Set()
  for (let i=0; i<2000; i++) {
    lo1.checked = true
    lo2.checked = true
    lo3.checked = true
    lo4.checked = true
    lo5.checked = true
    let m = gimmie()
    let yo = tryYou()
    let y = yo.score
    let r = (jkcompare(m,y))
    if (r=='you') {
      hands.add([yo.one,yo.two])
      scores.add([m,y])
    }
  }
  bh.textContent = Math.floor(100*hands.size/iterations)
  return {hands, scores}
}