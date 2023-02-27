const axios = require('axios');

const autoUpload = async (number = '45568') => {
  const response = await axios.get('https://realfabric.net/del.php', {
      params: {
          'mode': 'del',
          'id': process.env.SHOP_MEMBER_ID,
          'num': number,
          // 'num': '45568',
          'gubun': 'myreg_list'
      },
      headers: {
          'Host': 'realfabric.net',
          'Sec-Ch-Ua': '"Not A(Brand";v="24", "Chromium";v="110"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"macOS"',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-User': '?1',
          'Sec-Fetch-Dest': 'document',
          'Referer': 'https://realfabric.net/my_selling_product.php?search_action=search&wait=b',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
          'Connection': 'close',
          'Cookie': `shop_member_id=${process.env.SHOP_MEMBER_ID}; shop_member_pass=${process.env.SHOP_MEMBER_PASS}`
    }
  });
  return response.data;
}

module.exports = autoUpload;