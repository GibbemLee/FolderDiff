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

    var diffresult = diff(filename1, filename2, file);

    diffFiles.push(filename1);
    resultList.push(diffresult);
  });

  callback(diffFiles, resultList);
}

function diff(filename1, filename2, file)
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

  fileIO.createFile(filename1, "");
  var diffresult = '';

  diff.forEach((part) => {
    if(part.added) // 추가된 부분
    {
      fileIO.appendFile(filename1, part.value);
      diffresult = diffresult.concat('++ '+part.value);
    }
    else if(part.removed) // 삭제된 부분
    {
      diffresult = diffresult.concat('-- '+part.value);
    }
    else //변화없음
    {
      fileIO.appendFile(filename1, part.value);
      diffresult = diffresult.concat('△ '+part.value);
    }
  });

  return diffresult;
}


module.exports = fileDiff;
