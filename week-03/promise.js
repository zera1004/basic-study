function findTreasure() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let find = Math.floor(Math.random() * 100);
      if (find <= 10) resolve("축하합니다! 황금 보물을 발견했습니다!");
      else reject("보물을 찾는 데 실패했습니다. 다시 시도하세요.");
    }, 3000);
  });
}

findTreasure()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });

async function tryCatch () {
  try {
    console.log(await findTreasure())
  } catch (err) {
    console.log(err)
  }
}

tryCatch()