var searchMatchList = {};

searchMatchList.searchMatchFileList = function searchMatchFileList(fileList1, fileList2, callback)
{
  let matchList = [];
  let firstList = [];
  let secondList = [];

  // 동일한 파일 및 첫번째 폴더에만 있는 파일 찾기
  fileList1.forEach(function(file1){
    if(file1.includes('.') == true) // 파일인 경우
    {
      var ismatched = false;
      fileList2.some(function(file2){
        if(file1 == file2)
        {
          matchList.push(file1);
          ismatched = true;
        }
        return (ismatched == true); // 찾으면 루프 종료
      });

      if(ismatched == false)
      {
        firstList.push(file1);
      }
    }
  });

  //두번째 폴더에만 있는 파일 찾기
  fileList2.forEach(function(file2){
    if(file2.includes('.') == true)
    {
      var ismatched = false;
      fileList1.some(function(file1){
        if(file1 == file2)
        {
          ismatched = true;
        }
        return (ismatched == true);
      });

      if(ismatched == false)
      {
        secondList.push(file2);
      }
    }
  });

  callback(matchList, firstList, secondList);
}

searchMatchList.searchMatchFolderList = function searchMatchFolderList(fileList1, fileList2, callback)
{
  let matchList = [];
  let firstList = [];
  let secondList = [];

  // 동일한 파일 및 첫번째 폴더에만 있는 폴더 찾기
  fileList1.forEach(function(file1){
    if(file1.includes('.') == false) // 폴더인 경우
    {
      var ismatched = false;
      fileList2.some(function(file2){
        if(file1 == file2)
        {
          matchList.push(file1);
          ismatched = true;
        }
        return (ismatched == true); // 찾으면 루프 종료
      });

      if(ismatched == false)
      {
        firstList.push(file1);
      }
    }
  });

  //두번째 폴더에만 있는 폴더 찾기
  fileList2.forEach(function(file2){
    if(file2.includes('.') == false) // 폴더인 경우
    {
      var ismatched = false;
      fileList1.some(function(file1){
        if(file1 == file2)
        {
          ismatched = true;
        }
        return (ismatched == true);
      });

      if(ismatched == false)
      {
        secondList.push(file2);
      }
    }
  });

  callback(matchList, firstList, secondList);
}

module.exports = searchMatchList;
