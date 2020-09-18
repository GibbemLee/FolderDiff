var fileDiff = {};

const fileIO = require("./fileIO");
const fs = require('fs');

fileDiff.matchedFileDiff = function matchedFileDiff(folder1, folder2, matchList, callback)
{
  var diffFiles = [];
  var resultList = [];

  matchList.forEach(function(file){
    var filename1 = folder1.concat('/'+file);
    var filename2 = folder2.concat('/'+file);

    var diffresult = diff(filename1, filename2, file, function(diffresult, ischanged){
      if(ischanged == true)
      {
        resultList.push(diffresult);
        diffFiles.push(filename1);
      }
    });

  });

  callback(diffFiles, resultList);
}

function diff(filename1, filename2, file, callback)
{
  const fileDiff = require("./fileDiff");
  const Diff = require('diff');

  var filedata1 = fileIO.readFile(filename1);
  var filedata2 = fileIO.readFile(filename2);

  if(filedata1 == false || filedata2 == false)
  {
    return;
  }

  const diff = Diff.diffLines(filedata1, filedata2);

  var diffresult = '';
  var applydiff = '';
  var ischanged = false;
  diff.forEach((part) => {
    if(part.added) // 추가된 부분
    {
      applydiff = applydiff.concat(part.value);
      diffresult = diffresult.concat('++ '+part.value);
      ischanged = true;
    }
    else if(part.removed) // 삭제된 부분
    {
      ischanged = true;
      diffresult = diffresult.concat('-- '+part.value);
    }
    else //변화없음
    {
      applydiff = applydiff.concat(part.value);
      diffresult = diffresult.concat('△ '+part.value);
    }
  });

  if(ischanged == true)
  {
    //fileIO.createFile(filename1, applydiff);
  }

  callback(diffresult, ischanged);
}


module.exports = fileDiff;
