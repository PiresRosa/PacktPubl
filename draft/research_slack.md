Flow:
- Nhap email -> confirm code(IOQ-CNO) 
    -> using work email (?) (can check cac hom mail common)
- 

1. Signup

```
curl 'https://slack.com/api/signup.createTeam?_x_id=noversion-1620610383.001' \
  -H 'authority: slack.com' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundarysibS0r2CfOAyVqxM' \
  -H 'accept: */*' \
  -H 'origin: https://slack.com' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://slack.com/intl/en-vn/get-started' \
  -H 'accept-language: vi-VN,vi;q=0.9' \
  -H 'cookie: b=9jor9itj6fch3zm7fnxsdgosm; x=9jor9itj6fch3zm7fnxsdgosm.1620610091; optimizelyOptOut=true; _gcl_au=1.1.1718075168.1620610095; DriftPlaybook=A; _gid=GA1.2.939649478.1620610096; __pdst=faa744d4c28347629a3bcf41faf141da; _li_dcdm_c=.slack.com; _lc2_fpi=e00b11ac9c9b--01f59y778rgjeaxpqdqdjw5qk9; __qca=P0-695446910-1620610096734; c={"banner_slack_homepage":1}; t={}; _ga=GA1.2.170992311.1620610096; OptanonAlertBoxClosed=2021-05-10T01:28:22.445Z; OptanonConsent=isIABGlobal=false&datestamp=Mon+May+10+2021+08%3A28%3A23+GMT%2B0700+(Indochina+Time)&version=6.12.0&hosts=&consentId=cf6cfa15-7b55-4ff2-b989-18b3c3843e1f&interactionCount=1&landingPath=NotLandingPage&groups=C0004%3A1%2CC0002%3A1%2CC0003%3A1%2CC0001%3A1&AwaitingReconsent=false; G_ENABLED_IDPS=google; _ga_QTJQME5M5D=GS1.1.1620610095.1.1.1620610104.0; visitor_id755253=650220351; visitor_id755253-hash=360279e3958ace76e757da53195c07473da4b829496bc0b546d124330d27a0189c9616ccb6f8b733b151fa27e75fd5180958f768; ec=enQtMjA0NjQ3MzYzNTEzOS0xZjQ0YjIwNzc4NmQ5OTIwMjQ5ZGMwMDVlNGEwN2ExMzA3YTkwNDJhYjUyOWM3NzM5MTJiZjNmZTc0ZGRiMWIy; _gat_UA-56978219-1=1' \
  --data-raw $'------WebKitFormBoundarysibS0r2CfOAyVqxM\r\nContent-Disposition: form-data; name="email_misc"\r\n\r\nfalse\r\n------WebKitFormBoundarysibS0r2CfOAyVqxM\r\nContent-Disposition: form-data; name="tz"\r\n\r\nAsia/Bangkok\r\n------WebKitFormBoundarysibS0r2CfOAyVqxM\r\nContent-Disposition: form-data; name="locale"\r\n\r\nen-US\r\n------WebKitFormBoundarysibS0r2CfOAyVqxM\r\nContent-Disposition: form-data; name="last_tos_acknowledged"\r\n\r\ntos_mar2018\r\n------WebKitFormBoundarysibS0r2CfOAyVqxM\r\nContent-Disposition: form-data; name="login"\r\n\r\ntrue\r\n------WebKitFormBoundarysibS0r2CfOAyVqxM\r\nContent-Disposition: form-data; name="in_setup_experiment"\r\n\r\ntrue\r\n------WebKitFormBoundarysibS0r2CfOAyVqxM--\r\n' \
  --compressed
```

2. THem muc dich su dung

```
curl 'https://edgeapi.slack.com/cache/T02195HQ3PF/channels/search' \
  -H 'authority: edgeapi.slack.com' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'accept: */*' \
  -H 'origin: https://app.slack.com' \
  -H 'sec-fetch-site: same-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'accept-language: vi-VN,vi;q=0.9' \
  -H 'cookie: x=9jor9itj6fch3zm7fnxsdgosm.1620610091; optimizelyOptOut=true; _gcl_au=1.1.1718075168.1620610095; DriftPlaybook=A; _gid=GA1.2.939649478.1620610096; _li_dcdm_c=.slack.com; _lc2_fpi=e00b11ac9c9b--01f59y778rgjeaxpqdqdjw5qk9; __qca=P0-695446910-1620610096734; c={"banner_slack_homepage":1}; t={}; _ga=GA1.2.170992311.1620610096; OptanonAlertBoxClosed=2021-05-10T01:28:22.445Z; OptanonConsent=isIABGlobal=false&datestamp=Mon+May+10+2021+08%3A28%3A23+GMT%2B0700+(Indochina+Time)&version=6.12.0&hosts=&consentId=cf6cfa15-7b55-4ff2-b989-18b3c3843e1f&interactionCount=1&landingPath=NotLandingPage&groups=C0004%3A1%2CC0002%3A1%2CC0003%3A1%2CC0001%3A1&AwaitingReconsent=false; G_ENABLED_IDPS=google; ec=enQtMjA0NjQ3MzYzNTEzOS0xZjQ0YjIwNzc4NmQ5OTIwMjQ5ZGMwMDVlNGEwN2ExMzA3YTkwNDJhYjUyOWM3NzM5MTJiZjNmZTc0ZGRiMWIy; d=NNiCem7tj7yjGX8QCKV63m3y9meFirNzj8sat7uTYa4uvzWXEO0tE1vTbcgFDgdlk7uHGAhCeg%2FtGQds%2BMdlZEYlxPYNNoILNkLRI%2F0DGHhI4KJSaIsoiPJO8rxHX1ajUITpJ7gPFIGCJfVqtbLKag7tV%2BH8w4Pu00BVHWKPLGb%2F7hLSq4zc96hp5Q%3D%3D; d-s=1620610384; lc=1620610384; b=.9jor9itj6fch3zm7fnxsdgosm; _ga_QTJQME5M5D=GS1.1.1620610095.1.1.1620610385.0' \
  --data-raw '{"token":"xoxc-2043187819797-2046476706787-2043187835989-16fef6d9e85efddbd08d2265d7719bde2df676e9024eb2bd3334bd41e10e2b9e","query":"cong-cu-tien-ich","check_membership":true}' \
  --compressed
  ```