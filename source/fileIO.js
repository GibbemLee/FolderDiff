var fileIO = {};

const fs = require('fs');

fileIO.receiveInput = function receiveInput(folder1, folder2, callback)
{
  return callback(folder1, folder2);
}


fileIO.readInput = function ReadInput(callback)
{
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let input = [];

  rl.question('folder1? ', function(answer){
    input.push(answer);
    rl.question('folder2? ', function(answer){
      input.push(answer);
      rl.question('result save folder? ', function(answer){
        input.push(answer);
        rl.close();
        return callback(input);
      });
    });
  });

  // let inputCnt = 0;
  // rl.on("line", function(line) {
  //
  //   if(++inputCnt == 3)//들어온 입력이 두개면 체크
  //   {
  //     input.push(line);
  //     checkInput(input, function(result) {
  //       rl.close();
  //       return callback(result);
  //     });
  //   }
  //   input.push(line);
  // });
}

fileIO.readDir = function readDir(inputFolder)
{
  try
  {
    const result = fs.readdirSync(inputFolder, 'utf8');
    return result;
  }
  catch (err)
  {
    if(err.code == 'ENOENT')
    {
      console.error('error!', inputFolder, 'folder does not exist!');
      return null;
    }
  }
}

fileIO.readFile = function readFile(inputFile)
{
  try
  {
    const result = fs.readFileSync(inputFile, 'utf8');
    return result;
  }
  catch (err)
  {
    if(err.code == 'ENOENT')
    {
      console.error('error!', inputFile, 'file does not exist!');
      return null;
    }
  }
}

fileIO.createFile = function createFile(filename, filedata)
{
  fs.writeFile(filename, filedata, function(err){
    if(err)
    {
      return console.log(err);
      //return console.log('err!', filename, 'creation failed');
    }
    // console.log("createFile");
    // console.log('++',filename);

  });
}

fileIO.createFiles = function createFiles(path, nameList, dataList)
{
  if(!path)
  {
    return;
  }

  var index;
  for(index = 0; index < nameList.length; ++index)
  {
    var fileName = nameList[index].replace(/\//g, '.');
    fileName = fileName.replace(/\\/g, '.');
    fileName = fileName.replace(/\:/g, '');
    var filePath = path.concat('/'+fileName).concat('.txt');
    fileIO.createFile(filePath, dataList[index]);
  }
}

fileIO.appendFile = function appendFile(filename, filedata)
{
  try
  {
    fs.appendFileSync(filename, filedata);
  }
  catch(err)
  {
      if(err.code == 'ENOENT')
      {
        return console.error('error!', inputFile, 'file does not exist!');
      }
  }
}

fileIO.copyFile = function copyFile(baseFolder, targetFolder, fileList, callback)
{
  const fileIO = require('./fileIO');
  var copiedFiles = [];

  fileList.forEach(function(file){
    var filePath = baseFolder.concat('/'+file);
    var newFilePath = targetFolder.concat('/'+file);

    copiedFiles.push(newFilePath+'.txt');

    // fs.copyFile(filePath, newFilePath, (err) => {
    //   if(err)
    //   {
    //     return console.error('error!', filepath, 'copy failed');
    //   }
    // });
  });

  callback(copiedFiles);
}

fileIO.deleteFile = function deleteFile(folderPath, fileList, callback)
{
  var deletedFiles = [];

  fileList.forEach(function(filename){
    var filePath = folderPath.concat('/'+filename);
    deletedFiles.push(filePath+'.txt');

    // fs.access(filePath, fs.constants.F_OK, function(err)
    // {
    //   if(err)
    //   {
    //     return console.log(filePath, '삭제할 수 없는 파일입니다.');
    //   }
    //   fs.unlink(filePath, function(err){
    //     if(err)
    //     {
    //       return console.log('err!',err);
    //     }
    //   });
    // });
  });

  callback(deletedFiles);
}

fileIO.copyFolder = function copyFolder(baseFolder, targetFolder, folderList, callback)
{
  const ncp = require('ncp').ncp;
  ncp.limit = 16;

  var copiedFolders = [];

  folderList.forEach(function(folder){
    var path1 = baseFolder.concat('/'+folder);
    var path2 = targetFolder.concat('/'+folder);

    copiedFolders.push(path2+'.txt');

    // ncp(path1, path2, function (err) {
    //   if(err)
    //   {
    //     return console.err('err!',path1,err);
    //   }
    // });
  });

  callback(copiedFolders);
}

fileIO.deleteFolder = function deleteFolder(basefolder, folderList, callback)
{
  const rimraf = require('rimraf');

  var deletedFolders = [];

  folderList.forEach(function(folder){
    var path = basefolder.concat('/'+folder);
    deletedFolders.push(path+'.txt');

    // rimraf(path, function(err){
    //   if(err)
    //   {
    //     return console.log('err!',path,err);
    //   }
    // });
  });

  callback(deletedFolders);
}

fileIO.printDiffResult = function printDiffResult(namelist, mode)
{
  switch(mode)
  {
    case 0: //diff files
      namelist.forEach(function(file){
        console.log('△ '+file);
      })
      break;

    case 1: //copied files
      namelist.forEach(function(file){
        console.log('++ '+file);
      })
      break;

    case 2: //deleted files
      namelist.forEach(function(file){
        console.log('-- '+file);
      })
      break;
  }
}

// function checkInput(input, callback)
// {
//   if(input.length != 3) //inputCnt로 체크하면 쓸모없지만 일단 냅두기
//   {
//     console.log('error! we need 2 inputs');
//     return callback(false);
//   }
//
//   console.log('\nfolder name:', input[0], input[1], 'saved folder:', input[3], '\n');
//   return callback(input);
//
// }

module.exports = fileIO;
