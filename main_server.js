var main = {};
var fileIO = require("./fileIO");

// fileIO.readInput(function(result) {
//
//   if(result == null)
//   {
//     console.log('input is error');
//     return;
//   }
//
//   const folder1 = result[0];
//   const folder2 = result[1];
//
//   main.searchDiff(folder1, folder2);
//
// });

main.searchDiff = function searchDiff(folder1, folder2, savePath)
{
  const fileList1 = fileIO.readDir(folder1);
  const fileList2 = fileIO.readDir(folder2);

  if(fileList1 == null || fileList2 == null)
  {
    console.log('readDir is error');
    return;
  }

  var search = require("./searchMatchList");

  //폴더
  search.searchMatchFolderList(fileList1, fileList2, function(matchList, firstList, secondList){

    matchList.forEach(function(folder){ // 다시 비교
      const newFolder1 = folder1.concat('/').concat(folder);
      const newFolder2 = folder2.concat('/').concat(folder);

      searchDiff(newFolder1, newFolder2, savePath);
    });

    fileIO.copyFolder(folder2, folder1, secondList, function(copiedFolders){// 두번째 폴더에만 있는 폴더 추가
      fileIO.printDiffResult(copiedFolders, 1);
    });

    fileIO.deleteFolder(folder1, firstList, function(deletedFolders){// 첫번째 폴더에만 있는 폴더 삭제
      fileIO.printDiffResult(deletedFolders, 2);
    });

  });

  //파일
  search.searchMatchFileList(fileList1, fileList2, function(matchList, firstList, secondList){
    const fileDiff = require('./fileDiff');

    //파일 diff 결과 list로 저장
    fileDiff.matchedFileDiff(folder1, folder2, matchList, function(diffFiles, resultList){
      fileIO.printDiffResult(diffFiles, 0);
      fileIO.createFiles(savePath, diffFiles, resultList);
    });
    fileIO.copyFile(folder2, folder1, secondList, function(copiedFiles){
      fileIO.printDiffResult(copiedFiles, 1);
    }); // 두번째 폴더에만 있는 파일을 첫번째 폴더로 복사
    fileIO.deleteFile(folder1, firstList, function(deletedFiles){
      fileIO.printDiffResult(deletedFiles, 2)
    }); // 첫번째 폴더에만 있는 파일은 삭제
  });

}

module.exports = main;
