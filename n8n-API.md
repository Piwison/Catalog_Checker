# API Response from n8n 
# http://localhost:5678/webhook/contentValidation

[
  {
    "productId": "PET001",
    "productName": "[法國皇家 Royal Canin] 柴犬成犬專用乾糧 SHN SHA 3kg",
    "CategoryLevel1": "寵物",
    "CategoryLevel2": "狗飼料/零食",
    "CategoryLevel3": "乾糧",
    "relevanceScore": 4,
    "errorType": [
      "Misleading Information",
      "Irrelevant Content"
    ],
    "justification": "The product name clearly specifies dry food for adult Shiba Inus, but the description includes a statement suggesting it is also suitable for cats and hamsters. Additionally, one bullet point claims it is \"Our most popular choice for all pets big or small\". These statements are highly misleading and irrelevant, as they contradict the product's specific target audience (Shiba Inus).",
    "issueFields": [
      "Product Description",
      "Bullet Points"
    ],
    "url": "http://example.coupang.com/pet001",
    "lastModifiedDate": "2023-10-17"
  },
  {
    "productId": "PET007",
    "productName": "豪華鳥籠 附多種玩具 大型觀賞鳥適用",
    "CategoryLevel1": "寵物",
    "CategoryLevel2": "鳥類用品",
    "CategoryLevel3": "鳥籠/棲木",
    "relevanceScore": 6,
    "errorType": [
      "Irrelevant Content",
      "Misleading Information",
      "Formatting/Readability"
    ],
    "justification": "The product description contains irrelevant information (\"Can also be used to store socks or small books\") which detracts from the product's purpose. One bullet point makes an unsubstantiated and potentially misleading claim (\"makes them sing more\"). There is also a typo (\"tyo\") in a bullet point.",
    "issueFields": [
      "Product Description",
      "Bullet Points"
    ],
    "url": "http://example.coupang.com/pet007",
    "lastModifiedDate": "2023-08-18"
  },
  {
    "productId": "PET010",
    "productName": "豪華倉鼠籠 透明雙層別墅 附跑輪水壺",
    "CategoryLevel1": "寵物",
    "CategoryLevel2": "兔鼠用品",
    "CategoryLevel3": "籠子/棲息屋",
    "relevanceScore": 4,
    "errorType": [
      "Misleading Information",
      "Irrelevant Content"
    ],
    "justification": "The product is explicitly described as a hamster cage, but one of the bullet points misleadingly suggests it is \"Good for small dogs too\". A hamster cage is entirely unsuitable for dogs, rendering this information irrelevant and potentially harmful or confusing to consumers.",
    "issueFields": [
      "bullet_points"
    ],
    "url": "http://example.coupang.com/pet010",
    "lastModifiedDate": "2023-07-23"
  },
  {
    "productId": "DHA008",
    "productName": "智慧燈泡 LED RGBW APP遠端控制 E27螺口",
    "CategoryLevel1": "數位家電",
    "CategoryLevel2": "居家照明",
    "CategoryLevel3": "燈泡/燈管",
    "relevanceScore": 6,
    "errorType": [
      "Irrelevant Content"
    ],
    "justification": "While the product name, description, and most bullet points are semantically consistent and describe the core functionalities well, the inclusion of the bullet point \"So smart, it might do your homework (not really)\" is highly irrelevant and unprofessional for e-commerce product content. Additionally, there is a minor grammatical error in the product description (\"you're\" instead of \"your\").",
    "issueFields": [
      "bullet_points",
      "product_description"
    ],
    "url": "http://example.coupang.com/dha008",
    "lastModifiedDate": "2024-05-18"
  },
  {
    "productId": "DHA014",
    "productName": "音波震動電動牙刷 五種模式 USB充電 (櫻花粉)",
    "CategoryLevel1": "數位家電",
    "CategoryLevel2": "美容/健康家電",
    "CategoryLevel3": "電動牙刷/沖牙機",
    "relevanceScore": 6.5,
    "errorType": [
      "Irrelevant Content",
      "Incomplete Information"
    ],
    "justification": "The content has good semantic relevance regarding core product features (sonic vibration, modes, USB charging). However, the bullet point \"Can also polish silver (do not try)\" is highly irrelevant and potentially confusing. The product description also includes a generic, subjective phrase (\"Brushing teeth are fun with this\") that does not add specific value, and it fails to elaborate on the \"Sakura Pink\" color mentioned in the product name, leading to incomplete information.",
    "issueFields": [
      "bullet_points",
      "description"
    ],
    "url": "http://example.coupang.com/dha014",
    "lastModifiedDate": "2023-01-11"
  }
]