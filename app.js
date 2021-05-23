//Main funciton file which will be used to bring all the app logic together
// import {wordMap} from "./words";
//function to remove all punctuation from a string, except apostrophes
const removePunctuation = (str) => {
  const regex = /[!"#$%&()*+,-./:;<=>?@[\]^_`{|}~]/g;
  return str.replace(regex, "");
}

//Function takes in a string and returns an obj conatining the unique words, word lengths, and number of occurences
 const wordMap = (str) => {
  //An object that will hold every unique word from a given string, with the word length and number of occurences
  const wordObj = {};
  //Remove all punctuation from a string, turn all the characeters lowecase, and then turn the string into an array of strings
  const cleanStr  = removePunctuation(str).toLowerCase().split(" ");
  // Loop through the string array and add each unique word to the word obj. For duplicated words we add to the count
  for(let word of cleanStr){
    if(word.length && !wordObj[word]){
      wordObj[word] = { "length" : word.length,"count" : 1 };
    } else if(word.length && wordObj[word]){
      wordObj[word]["count"]++;
    }
  }
  return wordObj;
}

const wordCount = (obj) =>{
  let count = 0;
  for(let key in obj){
    count += obj[key]["count"];
  }
  return count;
}

const uniqueWords = (obj) => {
  let count = 0;
  for(let key in obj){
    count++;
  }
  return count;
}

//returns the total length of all strings combined (no spaces)
const totalLength = (obj) => {
  let result = 0;
  for(let key in obj){
    result += (obj[key]["count"] * obj[key]["length"])
  }
  return result;
}

const avgWordLength = (obj) => {
  let count = wordCount(obj);
  let length  = totalLength(obj);
  return (length/count).toFixed(2);
}

console.log(avgWordLength("A Republican Wyoming state senator who's running against US Rep. Liz Cheney for her House seat told a local newspaper he impregnated a 14-year-old girl when he was 18-years-old after he referenced the incident during a Facebook Live stream."));

////// UI Manipulation/Creation ///////////

const submitBtn = document.querySelector('#submit-button');
const text = document.querySelector('#text')
const body = document.querySelector('body');

submitBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  createUI(removePunctuation(text.value));
})

const createUI = (str) => {
  const words = wordMap(str);
  // Add container with all words and occurences to the ui
  const wordsContainer = document.createElement('div');
  wordsContainer.classList.add('words-container')

  for(let el in words){
    const word = document.createElement('div');
    word.classList.add('words');
    word.innerText = `${el}`;
    const wordExtras = document.createElement('div'); 
    const countSpan = document.createElement('span');
    countSpan.innerText = `count: ${words[el]["count"]}`
    const lengthSpan = document.createElement('span');
    lengthSpan.innerText = `length: ${words[el]["length"]}`
    wordExtras.classList.add('extras', 'bubble');
    wordExtras.append(countSpan, lengthSpan);
    word.appendChild(wordExtras);
    wordsContainer.appendChild(word);
  }

  const wordStats = document.createElement('div');
  wordStats.classList.add('stats');
  const totalChars = document.createElement('p');
  totalChars.innerText = `Total Characters: ${text.value.length}`;
  const allWords = document.createElement('p');
  allWords.innerText = `Total Words: ${wordCount(words)}`;
  const unique = document.createElement('p');
  unique.innerText = `Unique Words: ${uniqueWords(words)}`;
  const avgLength = document.createElement('p');
  avgLength.innerText = ` Avg. Word Length: ${avgWordLength(words)}`

  wordStats.append(totalChars, allWords, unique, avgLength);

  body.append(wordStats, wordsContainer);
}