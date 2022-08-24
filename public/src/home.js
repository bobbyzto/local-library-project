function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  return borrowed.length;
}

function getMostCommonGenres(books) {
  let obj = {}; // created an empty object
  books.forEach((book)=>{ // loops through every book object
    if(obj[book.genre]){ // it will access the genre Science
      obj[book.genre]++; //it increments the value of Science
    } else {
      obj[book.genre] = 1 // initialize key of book genre with value of 1
    }  //>{ "Science": 3, }
  });
  let genreCount = []; // accumulator array
  for (let [key, value] of Object.entries(obj)) { // loop through key: value pairs in obj
    genreCount.push({ // declare new object labelling key and value, pushing this new object to array
      'name' : key,
      'count' : value
    });
  }
  genreCount.sort((a,b) => b.count - a.count); // sort objects by count highest to lowest
  return genreCount.slice(0, 5); // return top 5 objects from array
};



function getMostPopularBooks(books) {
  let mostBorrowed = books.sort((a,b)=> b.borrows.length - a.borrows.length).slice(0,5);
  let titleAndCount = mostBorrowed.reduce((result, book)=>{
    result.push({
      'name': book.title,
      'count': book.borrows.length,
    });
  return result;}, [])
  return titleAndCount;
}

function getMostPopularAuthors(books, authors) {
  let mostBorrowed = books.sort((a,b)=> b.borrows.length - a.borrows.length).slice(0,5);
  mostBorrowed.map(book => book['author'] = authors.find(author => author.id === book.authorId));
  // console.log(mostBorrowed);
  let authorAndCount = mostBorrowed.reduce((result, book)=>{
    result.push({
      'name': `${book.author.name.first} ${book.author.name.last}`,
      'count': book.borrows.length,
    });
  return result;}, [])
  return authorAndCount;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
