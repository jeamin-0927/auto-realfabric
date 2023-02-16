const axios = require('axios');
const { GPT3 } = require('../../utils/openai');
// await GPT3("say hello")

module.exports = async () => {
  const ideationRow = await GPT3(`
    Please tell me just one pattern idea for cushions or blankets.
    Please make the data in JSON format and arrange it in array.
    Please include colors (three, hex method, list), pattern, and detailed description in JSON as below.
    Don't mark any other characters than JSON.
    And please translate the pattern into Korean and enter it in "KR-pattern".
    And please translate the description into Korean and enter it in "KR-comment".
    Also, please connect 10 search keywords with a comma and translate them into Korean in "KR-search-keyword".
    And please select one of the Korean categories(꽃, 자연, 동물, 줄무늬, 도트, 기하학, 타이포그래피, 유아용, 나라별, 특별한 무늬, 기념일, 컷트지, 무지, 굿디자이너) and enter it in "KR-category" in Korean.
    And please translate the comment and summarize it into 20 characters and enter it in Korean in "KR-short".

    {"color": ["#","#","#"],  "pattern": "", "comment": "", "KR-pattern": "", "KR-comment": "", "KR-short": "", "KR-search-keyword": "", "KR-category": ""}

    JUST ONE IDEA PLEASE.
  `);
  const ideation = JSON.parse(ideationRow);
  const ideationDialog = `Generate ${ideation.pattern} pattern. Use color of ${ideation.color}, like ${ideation.comment}. Please don't put it in an object and show it to me. Please just show the pattern. Please draw it in 200dpi. Let the pattern repeat in the picture. Draw the pattern repeatedly in the picture so that it connects when the same picture is connected.`;
  // console.log(ideationDialog);

  const headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` 
  }
  const bodyContent = JSON.stringify({
    "prompt": ideationDialog,
    "n": 1,
    "size": "1024x1024"
  });
  const reqOptions = {
    url: "https://api.openai.com/v1/images/generations",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  const dalleRow = await axios.request(reqOptions);
  // console.log(dalleRow.data);
  const dalle = dalleRow.data.data[0].url;

  return { ideation, dalle };
};