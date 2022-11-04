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

let backSearch=''

let parentCounter=0

for(const digit of digits){
    digit.onmouseup=function(){
        if(tempText.includes('.') && digit.innerHTML=='.' || digit.innerHTML=='Del') return
        if(/[)|%]/g.test(displayText.charAt(displayText.length-1))) displayText+=' x '
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
        if(/[0-9|%|.|)]/g.test(displayText.charAt(displayText.length-1))){
            displayText+=' '+operator.innerHTML+' '
            currentProblem.innerHTML=displayText
        }
        else if(/[x|/|+\-]/g.test(displayText.charAt(displayText.length-2))){
            displayText=displayText.slice(0,-2)
            displayText+=operator.innerHTML+' '
            currentProblem.innerHTML=displayText
            console.log('uhu')
        }
    }
}


let emptyIndexesFiltered=''


chooseInteger.onmouseup=function(){
    console.log(displayText)
    if(displayText.slice(-1)=='-'){
        displayText=displayText.slice(0,-1)
        currentProblem.innerHTML=displayText
    }
    else if(displayText.slice(-1)==' ' || displayText==''){
        displayText+='-'
        currentProblem.innerHTML=displayText
    }
    else if(/[0-9|.|%|(]/.test(displayText.slice(-1))){
        let index=displayText.lastIndexOf(' ')
        let leftParentIndex=displayText.lastIndexOf('(')
        console.log(index + '' + leftParentIndex)
        if(index>leftParentIndex){
            if(/[0-9|%|.]/.test(displayText.slice(index+1,index+2))){
                displayText=displayText.slice(0,index+1) + '-' + displayText.slice(index+1)
                currentProblem.innerHTML=displayText
            }
            else if(displayText.slice(index+1,index+2)=='-') {
                displayText=displayText.slice(0,index+1) + displayText.slice(index+2)
                currentProblem.innerHTML=displayText
            }
        }
        else {
            console.log('sj')
            if(displayText.slice(-1)=='('){
                displayText+='-'
                currentProblem.innerHTML=displayText
            }
            else if(/[0-9|.|%]/.test(displayText.charAt(leftParentIndex+1))){
                displayText=displayText.slice(0,leftParentIndex+1) + '-' + displayText.slice(leftParentIndex+1)
                currentProblem.innerHTML=displayText
            }
            else if(displayText.charAt(leftParentIndex+1)=='-') {
                displayText=displayText.slice(0,leftParentIndex+1) + displayText.slice(leftParentIndex+2)
                currentProblem.innerHTML=displayText
            }
        }
    }

}

percentage.onmouseup=function(){
    if(
        /[(]/g.test(displayText.charAt(displayText.length-1)) ||
        (/[.]/g.test(displayText.charAt(displayText.length-1)) && /[^0-9|]/g.test(displayText.charAt(displayText.length-2)))) return

    if(/[0-9|.| |\-]/g.test(displayText.charAt(displayText.length-1))){
        displayText+='%'
        currentProblem.innerHTML=displayText
    }
    else if(/[)]/g.test(displayText.charAt(displayText.length-1))){
        displayText+=' x %'
        currentProblem.innerHTML=displayText
    }
    else if(/[%]/g.test(displayText.charAt(displayText.length-1))){
        displayText=displayText.slice(0,-1)
        currentProblem.innerHTML=displayText
    }
}

rightParentheses.onmouseup=function(){
    if(/[(]/g.test(displayText.charAt(displayText.length-1))) return
    if(parentCounter>=1){
        parentCounter--
        tempText+=rightParentheses.innerHTML
        displayText+=rightParentheses.innerHTML
        currentProblem.innerHTML=displayText
    }
}

leftParentheses.onmouseup=function(){
    if(/[(|.]/g.test(displayText.charAt(displayText.length-1))) return
    if(/[0-9|(|)|%]/g.test(displayText.charAt(displayText.length-1))){
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
    }
}





equal.onmouseup=function(){
    if(/[0-9]/.test(displayText)){
        if((/[0-9|.|)]/.test(displayText.charAt(displayText.length-1))) || displayText.includes('%') ){
            for(;parentCounter>=1;parentCounter--){
                displayText=displayText+')'
            }
            previousProblem.innerHTML=displayText
            solveParent()
            currentText=displayText.split(' ')
            solvePercents()
            solveMultiplicationAndDivision()
            emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
            solveAdditionAndSubtraction()
            if(!(/[ |%]/.test(displayText))) currentProblem.innerHTML='= '+displayText
            else currentProblem.innerHTML='= '+answer
            clear()
        }
    }
}

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
        noof=displayText.indexOf(')',trueIndex)
        let doof=displayText.slice(trueIndex, noof+1)
        console.log('doof     '+doof)
        currentText=doof.replace(/[)(]/g,'').split(' ')
        currentText=currentText.filter(value => (!(value==' ')))
        console.log('ct     '+currentText)
        if(currentText.length>1){
            solvePercents()
            solveMultiplicationAndDivision()
            emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
            solveAdditionAndSubtraction()
        }
        else answer=currentText
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
    // for(i=0;i<currentText.length-1;i++){
    //     if
    // }
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
        console.log(currentText)
        if(currentText[i]=='%'){
            currentText[i]='0.01'
        }
        else if(currentText[i]=='-%'){
            currentText[i]='-0.01'
        }
        console.log(currentText)
        if(currentText[i].includes('%')){
            currentText[i]=currentText[i].replace('%','')
            answer=Number(currentText[i])/100
            currentText[i]=answer.toFixed(currentText[i].length+2)
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











