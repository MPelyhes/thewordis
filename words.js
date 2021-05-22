//function to remove all punctuation from a string, except apostrophes
const removePunctuation = (str) => {
  const regex = /[!"#$%&()*+,-./:;<=>?@[\]^_`{|}~]/g;
  return str.replace(regex, "");
}

const wordMap = (str) => {
  //An object that will hold every unique word from a given string, with the word length and number of occurences
  let wordObj = {};
  //Remove all punctuation from a string, turn all the characeters lowecase, and then turn the string into an array of strings
  const cleanStr  = removePunctuation(str).toLowerCase().split(" ");

  for(let word of cleanStr){
    
  }
  return cleanStr;



}

console.log(wordMap("Hello, my name is Mr. Pelyhes, and I don't am ! Here to Talk*&%$#)$_%#@{}. ?/ What ~ do you think of That?"));