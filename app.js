
// random card
function randomArrayNumber(totalPhotos){
    const random = []
    while (random.length < totalPhotos * 2) {
        let numberRandom = Math.floor(Math.random() * totalPhotos + 1)
    
        if(random.filter(number => number === numberRandom).length < 2){
            random.push(numberRandom)
        }
    }
    return random
}
// function randomArrayNumber(totalPhotos2){
//     const random = []
//     while (random.length < totalPhotos2 * 2) {
//         let numberRandom = Math.floor(Math.random() * totalPhotos2 + 1)
    
//         if(random.filter(number => number === numberRandom).length < 2){
//             random.push(numberRandom)
//         }
//     }
//     return random
// }

const cards = document.querySelector('.cards');
const flipTime = 0.1;
const totalPhotos = 8;
const totalPhotos2 = 9;

// render card
function renderCard(){
    cards.innerHTML = ''
    randomArrayNumber(totalPhotos).forEach(number => {
        cards.insertAdjacentHTML('beforeend', `
            <li style="transition: ${flipTime}s ease-in-out;" class="card rotate0">
                <div onclick="clickFontView(this)" class="view front-view">
                    <i class="icofont-question"></i>
                </div>
                <div class="view back-view">
                    <img src="./img/${number}.jpg" alt="">
                </div>
            </li>
        `)
    })
}
function renderCard2(){
    cards.innerHTML = ''
    randomArrayNumber(totalPhotos2).forEach(number => {
        cards.insertAdjacentHTML('beforeend', `
            <li style="transition: ${flipTime}s ease-in-out;" class="card rotate0">
                <div onclick="clickFontView(this)" class="view front-view">
                    <i class="icofont-question"></i>
                </div>
                <div class="view back-view">
                    <img src="./img2/${number}.jpg" alt="">
                </div>
            </li>
        `)
    })
}
var capanh = document.getElementById('capanh');
var getcapcanh = document.querySelector('option');

renderCard2();
function setSpeed() { 
if (capanh.value == 1){
renderCard();
time = 30
}else if (capanh.value == 2){
renderCard2();
time = 35
}
firstCard = 1
secondCard = 2
flips = 0
counttime = 0
click = 0
correct = 0
spanTime.innerHTML = time + 's'
spanFlips.innerHTML = flips
clearInterval(countdown)
countdown = ''
if(document.getElementById("demnguoc").value == 1){
spanTime.innerHTML = time + 's'
}else if (document.getElementById("demnguoc").value == 2){
spanTime.innerHTML = counttime + 's'
}
}

let firstCard = 1
let secondCard = 2
let flips = 0
//let timeMax = 30
let counttime = 0
let time = 35;
let click = 0
let correct = 0

const spanTime = document.querySelector('.details .time span')
const spanFlips = document.querySelector('.details .flips span')
const achievementTime = document.querySelector('.achievement .time span')
const achievementFlips = document.querySelector('.achievement .flips span')
const achievementDate = document.querySelector('.achievement .date')
spanTime.innerHTML = 35 + 's'
spanFlips.innerHTML = flips
let countdown = ''

const getAchievement = JSON.parse(localStorage.getItem('achievement'))

if(getAchievement != null){
    document.querySelector('.achievement').classList.add('show')
    achievementDate.innerHTML = getAchievement.date
    achievementTime.innerHTML = getAchievement.time + 's'
    achievementFlips.innerHTML = getAchievement.flips
}

function clickFontView(_this){
    const card = _this.parentElement
    
    // card đầu tiên
    if(firstCard === 1)
    {
        _this.style.pointerEvents = 'none'
        
        firstCard = card
        firstCard.classList.replace('rotate0', 'rotate180')
        flips++
        spanFlips.innerHTML = flips

    }
    
    // card thứ 2
    else if(secondCard === 2)
    {
        _this.style.pointerEvents = 'none'
        
        secondCard = card
        secondCard.classList.replace('rotate0', 'rotate180')
        flips++
        spanFlips.innerHTML = flips
        
        // second Card mở ra rồi làm gì thì làm
        setTimeout(()=>{
            const firstSrc = firstCard.querySelector('.back-view img').src
            const secondSrc = secondCard.querySelector('.back-view img').src

            // nếu chọn đúng
            if(firstSrc === secondSrc)
            {
                correct++
                if (capanh.value == 2){
                    if(correct == totalPhotos2)
                    {
                        clearInterval(countdown)
                    }
                }else if (capanh.value == 1){
                    if(correct == totalPhotos)
                    {
                        clearInterval(countdown)
                    }
                }

                firstCard = 1
                secondCard = 2
            }
            // nếu chọn sai
            else
            {   
                firstCard.classList.add('shake')
                secondCard.classList.add('shake')
                
                // khi hiệu ứng rung kết thúc
                secondCard.onanimationend = function(){

                    firstCard.classList.replace('rotate180', 'rotate0')
                    secondCard.classList.replace('rotate180', 'rotate0')

                    firstCard.classList.remove('shake')
                    secondCard.classList.remove('shake')

                    firstCard.querySelector('.front-view').style.pointerEvents = 'all'
                    secondCard.querySelector('.front-view').style.pointerEvents = 'all'

                    if(time <= 0){
                        secondCard.classList?.replace('rotate0', 'time-out')
                        secondCard.classList?.replace('rotate180', 'time-out')
                    } 
                    
                    secondCard.onanimationend = function(){}

                    firstCard = 1
                    secondCard = 2
                }
            }
        }, flipTime * 1000) 
    }

    // đếm giờ

    if (document.getElementById("demnguoc").value == 1){
    
    if(flips === 1){
        countdown = setInterval(()=>{
            time -= 0.1
            spanTime.innerHTML = time.toFixed(1) + 's'

            // hết giờ
            if(time <= 0)
            {
                clearInterval(countdown)
                spanTime.innerHTML = 0 + 's'

                cards.querySelectorAll('.card.rotate0').forEach(card =>{
                    card.classList.replace('rotate0', 'time-out')
                })
                firstCard.classList?.replace('rotate180', 'time-out')
                firstCard.classList?.replace('rotate0', 'time-out')
            } 
            
        }, 100)
    }
}else if (document.getElementById("demnguoc").value == 2)
{
if(flips === 1){
    countdown = setInterval(()=>{
        counttime += 0.1
        spanTime.innerHTML = counttime.toFixed(1) + 's'

        // hết giờ
        if (capanh.value == 2){
        if(correct == totalPhotos2)
        {
            clearInterval(countdown)
        }
    }else if (capanh.value == 1){
        if(correct == totalPhotos)
        {
            clearInterval(countdown)
        }
    }
        
    }, 100)
}
}

   return
}
function setSpeed2(){
       if (capanh.value == 1){
        renderCard();
        time = 30;

    }else if (capanh.value == 2){
        renderCard2();
        time = 35;
    }
    firstCard = 1
    secondCard = 2
    flips = 0
    counttime = 0
    click = 0
    correct = 0
if(document.getElementById("demnguoc").value == 1){
    spanTime.innerHTML = time + 's'
}else if (document.getElementById("demnguoc").value == 2){
    spanTime.innerHTML = counttime + 's'
   }
    spanFlips.innerHTML = flips
    clearInterval(countdown)
    countdown = '' 
}
document.querySelector('.refresh').onclick = function(){
    if (capanh.value == 1){
        renderCard();
        time = 30;

    }else if (capanh.value == 2){
        renderCard2();
        time = 35;
    }
    firstCard = 1
    secondCard = 2
    flips = 0
    counttime = 0
    click = 0
    correct = 0
if(document.getElementById("demnguoc").value == 1){
    spanTime.innerHTML = time + 's'
}else if (document.getElementById("demnguoc").value == 2){
    spanTime.innerHTML = counttime + 's'
   }
    spanFlips.innerHTML = flips
    clearInterval(countdown)
    countdown = ''
}

