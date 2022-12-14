const problemHolder=document.querySelector('.problemHolder')
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
const powers=document.querySelector('.powers')


let ayo=prompt('enter number','')

let currentText=[]

let displayText=ayo

let answer=''

let parentCounter=0

let imaginaryNumbers=false

let problemCounter=0


for(const digit of digits){
    digit.onmouseup=function(){
        if(digit.innerHTML=='.' || digit.innerHTML=='Del') return
        if(/[)|%]/g.test(displayText.charAt(displayText.length-1))) displayText+=' x '
        console.log(Math.sqrt((2)))
        displayText+=digit.innerHTML
        currentProblem.innerHTML=displayText
    }
}

for(const operator of basicOperators){
    operator.onmouseup=function(){
        if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
        else if(/[0-9|%|.|)]/g.test(displayText.charAt(displayText.length-1))){
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

decimal.onmouseup=function(){
    let lastDecimalIndex=displayText.lastIndexOf('.')
    let lastPower=displayText.lastIndexOf('^')
    if(displayText.lastIndexOf(' ')>lastDecimalIndex || displayText.lastIndexOf('(')>lastDecimalIndex || !/[ |.]/.test(displayText)  || lastDecimalIndex<lastPower){
        if(/[)|%]/.test(displayText.slice(-1))){
            displayText+=' x ' + decimal.innerHTML
            currentProblem.innerHTML=displayText
        }
        else{
        displayText+=decimal.innerHTML
        currentProblem.innerHTML=displayText
        }
    }
}

deleteButton.onmouseup=function(){
    if(displayText.slice(-1)==')'){
        parentCounter++
        console.log(parentCounter)
    }
    if(displayText.slice(-1)=='(') {
        parentCounter--
        console.log(parentCounter)
    }
    if(displayText.slice(-1)==' '){
        displayText=displayText.slice(0,-3)
        currentProblem.innerHTML=displayText
    }
    else {
    displayText=displayText.slice(0,-1)
    currentProblem.innerHTML=displayText
    }
}


let emptyIndexesFiltered=''


chooseInteger.onmouseup=function(){
    console.log(displayText)
    if(displayText.slice(-1)=='-'){
        displayText=displayText.slice(0,-1)
        currentProblem.innerHTML=displayText
    }
    else if(/[ |^]/.test(displayText.slice(-1)) || displayText==''){
        displayText+='-'
        currentProblem.innerHTML=displayText
    }
    else if(displayText.slice(-1)==')'){
        let integerParenthesesCounter=1
        for(i=displayText.length-2;integerParenthesesCounter>0;i--){
            if (displayText[i]==')') integerParenthesesCounter++
            else if (displayText[i]=='('){
                integerParenthesesCounter--
                if(integerParenthesesCounter==0){
                    console.log(displayText[i])
                    if(!(displayText[i-1]=='-')){
                        displayText=displayText.slice(0,i) + '-'+ displayText.slice(i)
                        currentProblem.innerHTML=displayText
                    }
                    else if(displayText[i-1]=='-'){
                        displayText=displayText.slice(0,i-1) + displayText.slice(i)
                        currentProblem.innerHTML=displayText
                    }
                }
            }
        }
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
    if(displayText=='' || displayText.slice(-1)=='('){
        console.log('sjsj')
        displayText+='%'
        console.log(displayText)
        currentProblem.innerHTML=displayText
        console.log(currentProblem.innerHTML)
    }
    else if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
    else if(/[0-9|.| |\-]/g.test(displayText.charAt(displayText.length-1))){
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
    else if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
    if(parentCounter>=1){
        parentCounter--
        displayText+=rightParentheses.innerHTML
        currentProblem.innerHTML=displayText
    }
}

leftParentheses.onmouseup=function(){
    if(/[(]/g.test(displayText.charAt(displayText.length-1))) return
    else if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
    if(/[0-9|(|)|%|.]/g.test(displayText.charAt(displayText.length-1))){
        displayText+=' x '+leftParentheses.innerHTML
        currentProblem.innerHTML=displayText
        parentCounter++
    }
    else{
        displayText+=leftParentheses.innerHTML
        currentProblem.innerHTML=displayText
        parentCounter++
    }
}


powers.onmouseup=function(){
    if(/[-|^| |(]/.test(displayText.slice(-1)) || displayText.length==0) return
    displayText+=powers.innerHTML
    currentProblem.innerHTML=displayText
}

equal.onmouseup=function(){
    if(/[0-9]/.test(displayText)){
        if(/[0-9|.|)|%]/.test(displayText.slice(-1))){
            if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
            for(;parentCounter>=1;parentCounter--){
                displayText=displayText+')'
            }
            problemCounter++
            const problemHolder=document.createElement('p')
            problemHolder.classList.add('problem'+problemCounter)
            screen.appendChild(problemHolder)
            previousProblem.innerHTML=currentProblem.innerHTML
            solveParent()
            currentText=displayText.split(' ')
            console.log(currentText)
            console.log(displayText)
            solveExponents()
            solvePercents(currentText)
            solveMultiplicationAndDivision()
            emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
            solveAdditionAndSubtraction()
            if(imaginaryNumbers) currentProblem.innerHTML='Answer Included Imaginary Numbers'
            else if(!(/[ |%|^]/.test(displayText))) currentProblem.innerHTML='= '+displayText
            else currentProblem.innerHTML='= '+answer
            if(/[-\-]/.test(currentProblem.innerHTML)) currentProblem.innerHTML=currentProblem.innerHTML.replaceAll('--','')
            clear()
        }
    }
}

transferProblemNumbers=function(){
    
}

clearButton.onmouseup=function(){
    clear()
    currentProblem.innerHTML=''
}

let tempBlog=''

solveExponents=function(){
    console.log('xxx   '+displayText)
    console.log(currentText)
    tempBlog=String(currentText)
    for(i=0;i<currentText.length;i++){
        console.log('ye')
        if(currentText[i].includes('^')){
            let currentTextSubArray=currentText[i].replace('(','').split(/[\^|(]/)
            solvePercents(currentTextSubArray)
            for(j=currentTextSubArray.length-2;j>=0;j--){
                console.log('parent!!!  ' +currentTextSubArray[j+1])
                let dotIndex=currentTextSubArray[j+1].indexOf('.')
                let postDecimal=''
                if(dotIndex>-1){
                    postDecimal=currentTextSubArray[j+1].slice(dotIndex)
                }
                else postDecimal=0
                console.log(postDecimal)
                if(currentTextSubArray[j].includes('-') && /[(|)]/.test(currentTextSubArray[j]) && /[1-9]/.test(postDecimal)){
                    imaginaryNumbers=true
                }
                if(/[)]/.test(currentTextSubArray[j+1])) currentTextSubArray[j+1]=currentTextSubArray[j+1].replaceAll(')','')
                if(currentTextSubArray[j+1].includes('--')) currentTextSubArray[j+1]=currentTextSubArray[j+1].replaceAll('--','')
                // if(/[--]/.test(currentTextSubArray[j])) currentTextSubArray[j].replaceAll('--','')
                if(currentTextSubArray[j].includes(')') ){
                    currentTextSubArray[j]=currentTextSubArray[j].replace(')','')
                    currentTextSubArray[j]=Number(currentTextSubArray[j])**Number(currentTextSubArray[j+1])
                    console.log('beep')
                }
                else if (currentTextSubArray[j]=='-') {
                    console.log(currentTextSubArray[j])
                    console.log(currentTextSubArray[j+1])
                    currentTextSubArray[j]=-1*Number(currentTextSubArray[j+1])
                }
                else if (currentTextSubArray[j].includes('-') && !/[)]/.test(currentTextSubArray[j])) {
                    currentTextSubArray[j]=currentTextSubArray[j].replace('-','')
                    currentTextSubArray[j]=(Number(currentTextSubArray[j])**Number(currentTextSubArray[j+1]))*-1

                }
                else{
                    currentTextSubArray[j]=Number(currentTextSubArray[j])**Number(currentTextSubArray[j+1])               
                }
                currentTextSubArray[j+1]=''
                currentTextSubArray[j]=String(currentTextSubArray[j])
                currentTextSubArray=currentTextSubArray.filter(value => (!(value=='')))
                console.log(currentTextSubArray)
                console.log(currentTextSubArray[j])
                console.log(currentText.length)
                // if(!displayText.includes(' ')) currentText=Array(currentTextSubArray)
                currentText[i]=String(currentTextSubArray)
                console.log(currentText)
                answer=String(currentTextSubArray[j])
            }
        }
    }
    console.log(tempBlog)
    tempBlog=tempBlog.replaceAll(',',' ')
    console.log(currentText)
    console.log(displayText)
    displayText=displayText.replace(tempBlog,currentText.join(' '))
    console.log('jj  '+displayText)
}

let boof=0

solveParent=function(){
    currentText=displayText.split('')
    while(displayText.includes('(')){
        let trueIndex=displayText.lastIndexOf('(')
        let noof=displayText.indexOf(')',trueIndex)
        let doof=displayText.slice(trueIndex, noof+1)
        console.log('doof     '+doof)
        currentText=doof.replace(/[)|(]/g,'').split(' ')
        currentText=currentText.filter(value => (!(value==' ')))
        console.log('ct     '+currentText)
        solveExponents()
        if(currentText.length>1){
            solvePercents(currentText)
            solveMultiplicationAndDivision()
            emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
            solveAdditionAndSubtraction()
        }
        else answer=currentText
        console.log(answer)
        console.log(displayText.charAt(trueIndex-1))
        console.log(displayText.charAt(noof+1))
        console.log(displayText)
        if(displayText.charAt(noof+1)=='^'){
            displayText=displayText.replace(doof,'('+answer+')')
            console.log('exp     '+displayText)
            let spaceIndex=displayText.indexOf(' ',trueIndex)
            let powerSymbol=displayText.indexOf('^',trueIndex)
            let firstRightParent=displayText.indexOf(')', powerSymbol)
            console.log(firstRightParent)
            console.log(spaceIndex)
            if(firstRightParent>-1) tempBlog=displayText.slice(trueIndex,firstRightParent)
            else if(spaceIndex>-1) tempBlog=displayText.slice(trueIndex, displayText.indexOf(' ',trueIndex))
            else if(spaceIndex==-1) tempBlog=displayText.slice(trueIndex)
            currentText=tempBlog.split(' ')
            console.log('temp   '+tempBlog)
            solveExponents()
        }
        else {
            displayText=displayText.replace(doof,answer)
            console.log('shit')
        }
        console.log('answer    '+answer)
        console.log('noof   '+noof)
        console.log('displaytext        '+displayText)

        // if(boof==5){
        //     sssssss
        // }
        // boof++

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
            emptyIndexesFiltered[i+2]=String(answer)
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

solvePercents=function(arrayOfChoice){
    for(g=0;g<arrayOfChoice.length;g++){
        console.log(arrayOfChoice)
        if(arrayOfChoice[g]=='%'){
            arrayOfChoice[g]='0.01'
        }
        else if(arrayOfChoice[g]=='-%'){
            arrayOfChoice[g]='-0.01'
        }
        console.log(arrayOfChoice)
        if(/[%]/.test(arrayOfChoice[g])){
            arrayOfChoice[g]=arrayOfChoice[g].replace('%','')
            answer=Number(arrayOfChoice[g])/100
            arrayOfChoice[g]=answer.toFixed(arrayOfChoice[g].length+2)
        }
    }
}

clear =function(){
    answer=''
    currentText=[]
    displayText=''
    parentCounter=0
    imaginaryNumbers=false
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

