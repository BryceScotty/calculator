const digits=document.querySelectorAll('.digit')
const basicOperators=document.querySelectorAll('.operator')
const specialOperators=document.querySelectorAll('.orange')
const clearButton=document.querySelector('.clearAll')
const currentProblem=document.querySelector('.currentProblem')
const equal=document.querySelector('.equal')
const previousProblem=document.querySelector('.previousProblem')
const chooseInteger=document.querySelector('.chooseInteger')
const percentage=document.querySelector('.percentage')
const decimal=document.querySelector('.decimal')
const deleteButton=document.querySelector('.delete')
const bottomHalf=document.querySelector('.bottomHalf')
const screen=document.querySelector('.screen')
const leftParentheses=document.querySelector('.leftParentheses')
const rightParentheses=document.querySelector('.rightParentheses')

// let ayo=prompt('enter number','')

let currentText=[]

let tempText=''

let displayText=''

let answer=''

let parentCounter=0

for(const digit of digits){
    digit.onmouseup=function(){
        if(tempText.includes('.') && digit.innerHTML=='.' || digit.innerHTML=='Del') return
        // if(/[)|%]/g.test(displayText.charAt(displayText.length-1))){
        //     tempText+=digit.innerHTML
        //     displayText+=digit.innerHTML
        //     currentProblem.innerHTML=displayText
        // }
        if(!(tempText.includes('%'))){
            tempText+=digit.innerHTML
            displayText+=digit.innerHTML
            currentProblem.innerHTML=displayText
    }
}}

deleteButton.onmouseup=function(){
    if(displayText.slice(-1)==' '){
        displayText=displayText.slice(0,-2)
    }
    if(displayText.slice(-1)==')'){
        parentCounter++
        console.log(parentCounter)
    }
    if(displayText.slice(-1)=='(') {
        parentCounter--
        console.log(parentCounter)
    }
    displayText=displayText.slice(0,-1)
    currentProblem.innerHTML=displayText
    currentText=displayText.split(' ')
    tempText=currentText[currentText.length-1]
    console.log(displayText)
    console.log(currentText)

    console.log('yxu')
}

for(const operator of basicOperators){
    operator.onmouseup=function(){
        if(/[0-9]/g.test(tempText)){
        displayText+=' '+operator.innerHTML+' '
        currentProblem.innerHTML=displayText
        currentText.push(tempText)
        currentText.push(operator.innerHTML)
        tempText=''
    }
}}

let emptyIndexesFiltered=''


chooseInteger.onmouseup=function(){
    let index=displayText.lastIndexOf(tempText)
    if(!(tempText.includes('-')))  tempText='-'+tempText 
    else tempText=tempText.replace('-','')
    displayText=displayText.slice(0,index) + tempText
    currentProblem.innerHTML=displayText
    currentText=displayText.split(' ')
}

percentage.onmouseup=function(){
    if(/[(]/g.test(displayText.charAt(displayText.length-1))) return
    if(/[0-9]/g.test(tempText)){
        let index=displayText.lastIndexOf(tempText)
        if(!(tempText.includes('%')))  tempText+='%' 
        else tempText=tempText.replace('%','')
        displayText=displayText.slice(0,index) + tempText
        currentProblem.innerHTML=displayText
    }}

rightParentheses.onmouseup=function(){
    if(/[(]/g.test(displayText.charAt(displayText.length-1))) return
    if(parentCounter>=1){
    parentCounter--
    tempText+=rightParentheses.innerHTML
    displayText+=rightParentheses.innerHTML
    currentProblem.innerHTML=displayText
}}
leftParentheses.onmouseup=function(){
    if(/[(|.]/g.test(displayText.charAt(displayText.length-1))) return
    if(/[0-9]/g.test(displayText.charAt(displayText.length-1)) || displayText.charAt(displayText.length-1)==')'){
        tempText+=' x '+leftParentheses.innerHTML
        displayText+=' x '+leftParentheses.innerHTML
        currentProblem.innerHTML=displayText
        parentCounter++
    }
    else{
    tempText+=leftParentheses.innerHTML
    displayText+=leftParentheses.innerHTML
    currentProblem.innerHTML=displayText
    parentCounter++
}}





equal.onmouseup=function(){
    if(/[0-9]/g.test(tempText) && (currentText.length>1 || tempText.includes('%') )){
    currentText.push(tempText)
    solveParent()
    currentText=displayText.split(' ')
    solvePercents()
    solveMultiplicationAndDivision()
    emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
    solveAdditionAndSubtraction()
    previousProblem.innerHTML=displayText
    currentProblem.innerHTML='= '+answer
    // console.log(displayText)
    // console.log(currentText)
    clear()
}}

clearButton.onmouseup=function(){
    clear()
    currentProblem.innerHTML=''
}

let boof=0
solveParent=function(){
    currentText=displayText.split('')
    // while(displayText.includes('(')){
    //     currentText.reduce((value, item, index) =>{
    //         if(item=='('){
    //             value++
    //             if(value>=boof){
    //                 boof=index
    //             }
    //         }
    //         else if(item==')'){
    //             value--
    //         }
    //         console.log('value    '+value)
    //         return value
    //     },0)
    while(displayText.includes('(')){
        let trueIndex=displayText.lastIndexOf('(')
        // console.log('boof=  '+boof)
        noof=displayText.indexOf(')',trueIndex)
        let doof=displayText.slice(trueIndex, noof+1)
        console.log('doof     '+doof)
        currentText=doof.replace(/[)(]/g,'').split(' ')
        currentText=currentText.filter(value => (!(value==' ')))
        solvePercents()
        solveMultiplicationAndDivision()
        emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
        solveAdditionAndSubtraction()
        displayText=displayText.replace(doof,answer)
        console.log('answer    '+answer)
        boof=0
        console.log('noof   '+noof)
console.log('displaytext        '+displayText)
        currentText=displayText.split('')
    }


}

solveAdditionAndSubtraction= function(){
    console.log(emptyIndexesFiltered)
    for(i=0;i<emptyIndexesFiltered.length-2;i+=2){
        if(emptyIndexesFiltered[i+1]=='+'){
            console.log(emptyIndexesFiltered)
            answer=Number(emptyIndexesFiltered[i])+Number(emptyIndexesFiltered[i+2])
            emptyIndexesFiltered[i+2]=answer
            console.log(emptyIndexesFiltered)
        }
        if(emptyIndexesFiltered[i+1]=='-'){
            console.log(emptyIndexesFiltered)
            answer=Number(emptyIndexesFiltered[i])-Number(emptyIndexesFiltered[i+2])
            emptyIndexesFiltered[i+2]=answer
            console.log(emptyIndexesFiltered)
        }
    }
}

solveMultiplicationAndDivision =function(){
    currentText=currentText.map(item => item.includes('--') ? item.replace('--',''): item)
    console.log(currentText)
    for(i=0;i<currentText.length-2;i+=2){
        if(currentText[i+1]=='x'){
            console.log(currentText)
            answer=Number(currentText[i])*Number(currentText[i+2])
            currentText[i+2]=String(answer)
            currentText[i]=''
            currentText[i+1]=''
            console.log(currentText)
        }
        if(currentText[i+1]=='/'){
            console.log(currentText)
            answer=Number(currentText[i])/Number(currentText[i+2])
            currentText[i+2]=String(answer)
            currentText[i]=''
            currentText[i+1]=''
            console.log(currentText)
        }
    }
}

solvePercents=function(){
    for(i=0;i<currentText.length;i++){
        if(currentText[i].includes('%')){
            currentText[i]=currentText[i].replace('%','')
            answer=Number(currentText[i])/100
            currentText[i]=answer.toFixed(currentText[i].length+1)
        }
    }
}


clear =function(){
    tempText=''
    answer=''
    currentText=[]
    displayText=''
    parentCounter=0
}






const slider=document.querySelector('.slider')
const sliderBox=document.querySelector('.theme')


sliderBox.onmouseup=function(){
    if(/[a-b]/.test(slider.style.transform)) slider.style.transform=''
    else slider.style.transform=`translateX(100%)`
    for(const specialOperator of specialOperators){
        specialOperator.classList.toggle('orangeWhiteMode')
    }
    for(const digit of digits){
        digit.classList.toggle('digitWhiteMode')
    }
    for(const operator of basicOperators){
        operator.classList.toggle('operatorWhiteMode')
    }
    document.body.classList.toggle('bodyWhiteMode')
    bottomHalf.classList.toggle('bottomHalfWhiteMode')
    screen.classList.toggle('screenWhiteMode')
    slider.classList.toggle('sliderWhiteMode')
    sliderBox.classList.toggle('sliderBoxWhiteMode')
    equal.classList.toggle('equalANDclearAllWhiteMode')
    clearButton.classList.toggle('equalANDclearAllWHiteMode')
    equal.classList.toggle('equalANDclearAllWHiteMode')
}












// .2\cdot (22-3/33\cdot (256-3/2\cdot (25-2)\cdot (22-3)\cdot (2-2)))






// (256 - 3 / 2 x (25 - 2) x (22 - 3) x (2 - 2)))


